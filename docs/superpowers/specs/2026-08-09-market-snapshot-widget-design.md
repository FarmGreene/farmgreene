# Market Snapshot Widget — Design

## Context

`MarketSnapshot.tsx` (farmgreene dashboard) is currently 100% hardcoded copy: "Market is Bullish", "Vol: High", "Gainers: 12", "Losers: 4", "Updated 12m ago". This design makes it real, using a hybrid approach: deterministic if/else stats for the numbers (trustworthy, free, instant) and a dedicated AI-generated blurb for the narrative sentence (richer copy than a template can produce). This mirrors the existing `MarketInsight`/`AIInsightWidget` pattern already in the codebase (GROQ-backed, daily cron, cached row), but is a separate, market-wide signal rather than a single-commodity mover story.

## Backend (`farm-backend`)

New `market_snapshots` table + service, sibling to the existing `MarketInsight` system (`src/main/insights/`).

### Entity — `src/shared/entities/market-snapshot.entity.ts`

```ts
@Entity('market_snapshots')
@Index(['createdAt'])
export class MarketSnapshot {
  id: string; // uuid pk
  status: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  gainersCount: number;
  declinersCount: number;
  volumeLevel: 'HIGH' | 'MED' | 'LOW';
  description: string | null; // AI blurb; null if generation skipped (no key)
  source: {
    gainersCount: number;
    declinersCount: number;
    volumeLevel: string;
    topGainer: { name: string; changePercent: number } | null;
    topDecliner: { name: string; changePercent: number } | null;
    todaySubmissionTotal: number;
    trailing30dAvgSubmissionTotal: number;
  };
  createdAt: Date;
}
```

### Service — `src/main/insights/market-snapshot.service.ts`

`generateSnapshot()`:

1. Call `commodityService.getTopMovers(<large limit>)`. That method currently does `sorted = latest.filter(...).sort(...).slice(0, limit)` *before* splitting into `gainers`/`decliners` — with the default limit of 10 it silently truncates market breadth. Call it with a limit covering all active commodities (e.g. `await this.commodityRepo.count({ where: { isActive: true } })`, or a generous constant) so gainers/decliners reflect the whole market, not just the top 10 movers by magnitude.
2. `status`: sum positive `price_change` across gainers vs sum of `abs(price_change)` across decliners. Bigger sum → that direction. Equal (including both zero, i.e. no movers) → `NEUTRAL`.
3. `volumeLevel`: raw SQL —
   ```sql
   -- today's total
   SELECT COALESCE(SUM(submission_count), 0) AS total
   FROM commodity_daily_averages WHERE date = CURRENT_DATE;

   -- trailing 30-day daily average (excluding today)
   SELECT COALESCE(AVG(daily_total), 0) AS avg FROM (
     SELECT date, SUM(submission_count) AS daily_total
     FROM commodity_daily_averages
     WHERE date >= CURRENT_DATE - INTERVAL '30 days' AND date < CURRENT_DATE
     GROUP BY date
   ) t;
   ```
   `today / baseline > 1.2` → HIGH, `< 0.8` → LOW, else MED. If baseline is `0` (no history yet, e.g. fresh deployment) → MED.
4. `description`: if `GROQ_API_KEY` is set, call GROQ (same `axios` shape as `InsightService.callGroq`) with a prompt grounded only in the computed numbers (gainers/decliners counts, status, volume level, top gainer/decliner name + %). Strict JSON `{ "body": string }`, 1-2 sentences, explicitly told not to invent regions/causes not given. If no key, or the call fails, `description` is stored as `null` — this is not fatal, see Edge Cases.
5. Persist and return the row.

`getLatest()`: `findOne({ order: { createdAt: 'DESC' } })` — same shape as `InsightService.getLatest`.

### Controller — `src/main/insights/market-snapshot.controller.ts`

```ts
@Controller('app/market-snapshot')
export class MarketSnapshotController {
  @Get('latest')
  getLatest() { return this.marketSnapshotService.getLatest(); }
}
```

### Cron — extend `InsightCronService`

Same 6am schedule (`INSIGHT_CRON_SCHEDULE`) and bootstrap-seed-if-empty behavior, now driving both generators. Each wrapped in its own try/catch so one failing doesn't block the other:

```ts
async handleDailyGeneration() {
  try { await this.insightService.generateInsight(); } catch (e) { /* log */ }
  try { await this.marketSnapshotService.generateSnapshot(); } catch (e) { /* log */ }
}
```

Same treatment in `seedIfEmpty()` — seed whichever of the two has no row yet.

### Migration + module registration

New migration for `market_snapshots` (follows the `CommodityWeeklyPrices` migration convention). Register `MarketSnapshot` entity, `MarketSnapshotService`, `MarketSnapshotController` in `insight.module.ts` (renaming to something like `insights.module.ts` conceptually not required — same module, just more providers).

## Frontend (`farmgreene`)

- `types/market-snapshot.ts` — mirrors the backend shape (status/volumeLevel as string unions, `description: string | null`, `createdAt: string`).
- `lib/services/market-snapshot.service.ts` — `getLatestMarketSnapshot()` → `GET /app/market-snapshot/latest`, same try/catch + error-handling convention as the rest of the service layer.
- `lib/hooks/useMarketSnapshot.ts` — react-query hook, same convention as `useLatestInsight` (`lib/hooks/useInsight.ts`).
- `components/dashboard/widgets/MarketSnapshot.tsx` — rewritten to consume the hook:
  - Headline word ("Bullish"/"Bearish"/"Mixed") driven by `status` (`NEUTRAL` → "Mixed" reads better than "Neutral" in the existing sentence structure).
  - Description paragraph = `snapshot.description`, falling back to a static sentence ("Market data updated — no notable moves today.") when `description` is `null`.
  - Vol/Gainers/Losers chips = `volumeLevel`/`gainersCount`/`declinersCount`.
  - "Updated Xm ago" via `date-fns`'s `formatDistanceToNowStrict(new Date(snapshot.createdAt))` (already a farmgreene dependency, no new install).
  - Loading skeleton state and "no snapshot yet" empty state, same pattern as `AIInsightWidget`.

## Edge Cases

- **No movers at all** (fresh data, everything flat): `gainersCount`/`declinersCount` both `0`, `status` → `NEUTRAL`. GROQ prompt handles this explicitly ("no notable movers today" framing) rather than being told to invent one.
- **No `GROQ_API_KEY` configured**: stats (`status`, counts, `volumeLevel`) still compute and save normally — only `description` is skipped (`null`). Widget still shows real numbers, just with the static fallback sentence instead of AI copy. This differs from `InsightService`, which currently returns `null` (no row at all) when there's no key — intentional divergence here since the stats have value independent of the AI blurb.
- **No submission history yet** (new deployment, <30 days of data): trailing-30-day baseline query returns `0`/empty → `volumeLevel` defaults to `MED` rather than dividing by zero or reading as artificially `HIGH`.
- **`getTopMovers` limit**: must not reuse the default `limit = 10` — confirmed via reading the existing implementation that truncation happens before the gainers/decliners split, so a small limit would undercount both.

## Testing

- Unit tests for the pure threshold/status functions (extracted as standalone functions parametrized by input numbers, same convention as `iso-week.util.spec.ts`) — covers the bullish/bearish tie-breaking and the volume HIGH/MED/LOW boundaries including the zero-baseline case.
- Manual `curl` of `GET /app/market-snapshot/latest` and a manual trigger of `generateSnapshot()` to confirm the GROQ call shape and JSON parsing.
- Dev-server click-through: widget renders real stats, loading state, and the no-data/no-key fallback paths.
