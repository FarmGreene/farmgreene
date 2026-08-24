# Top Movers Widget — Design

## Context

`TopMoversWidget.tsx` (farmgreene dashboard) renders hardcoded `MOVERS_DATA` (fake gainers/decliners with fictional markets like "Ibadan"/"Zaria"). The backend endpoint and the entire frontend data layer to power this already exist and are committed on this branch (`implementing_agent_workflow`, commit `9d0a3c8`): `GET /app/commodities/top-movers?limit=`, `getTopMovers()` in `lib/services/commodity.service.ts`, and `useTopMovers(limit)` in `lib/hooks/useCommodities.ts` (its own doc comment already says "Powers the TopMoversWidget on the dashboard"). This is a single-file rewrite wiring the widget to that existing hook — no backend or type changes.

## Data mapping

`useTopMovers(30)` returns `{ gainers: CommodityMover[], decliners: CommodityMover[] }`, each item: `{ id, name, slug, category, unit, average_price, price_change, date, regional_breakdown }` (both `average_price`/`price_change` are numeric strings).

Slice client-side to the top 6 gainers / top 5 decliners (matching today's mock row counts, per the arrays already being sorted by the backend — gainers descending by `price_change`, decliners ascending). Row mapping:
- name → `item.name`
- subtitle (was "market") → `item.unit` (the mock's per-market breakdown has no backend equivalent at this aggregation level; unit is always present and real)
- price → `` ₦${Math.round(parseFloat(item.average_price)).toLocaleString()} `` (matches the `₦{price.toLocaleString()}` convention already used in `CommodityIndex.tsx`/`CommodityIntelligenceGrid.tsx`)
- change → `` ${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(1)}% `` where `changePercent = parseFloat(item.price_change)`
- up/down arrow + color → sign of `changePercent`
- row key → `item.id` (real uuid, replacing the mock's numeric `id`)

## States

- **Loading** (`isLoading`): skeleton rows in place of the list, same row count as the target slice (6/5), using the existing `@/components/ui/skeleton` component (already used by `MarketSnapshot.tsx`/`AIInsightWidget.tsx` in this same session's earlier work).
- **Empty per tab**: if a slice comes back empty (e.g. no decliners today), show a small "No gainers today" / "No decliners today" message in place of the row list — do not show a blank scroll area.
- **Error** (`isError`): a compact inline message ("Couldn't load top movers") in place of the tabs — same honesty principle applied to `MarketSnapshot.tsx` earlier this session (no fabricated rows on fetch failure).

## "View All" button

Becomes a `Link` (`next/link`) to `/dashboard/intelligence` (the existing commodity intelligence listing page) instead of an inert `Button`.

## Out of scope

- No backend changes — endpoint, service, hook, and types are already complete and committed.
- No sparklines, anomaly detection, or other items from the file's existing "FUTURE IDEAS & PM NOTES" comment block — that comment block stays as-is, untouched by this change.
- No changes to `regional_breakdown` — unused by this widget, already unused by the mock too.

## Testing

No test framework configured in this repo (consistent with the rest of this session's frontend work). Verification: `npx tsc --noEmit` clean, `npm run build` clean, manual dev-server check of loading/loaded/empty-per-tab states.
