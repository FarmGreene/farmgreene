# Market Snapshot Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hardcoded copy in `MarketSnapshot.tsx` (farmgreene dashboard) with real data — deterministic gainers/decliners/volume stats computed via if/else from existing commodity price data, plus a dedicated GROQ-generated narrative blurb, both refreshed on the existing daily insight cron.

**Architecture:** New `market_snapshots` table + `MarketSnapshotService`/`MarketSnapshotController`, living alongside the existing `MarketInsight` system in `farm-backend`'s `src/main/insights/` module and sharing its cron. `farmgreene` gets a new type/service/hook mirroring the existing `useLatestInsight` pattern, and `MarketSnapshot.tsx` is rewritten to consume it.

**Tech Stack:** NestJS + TypeORM (backend), raw SQL for the volume-baseline query, GROQ REST API via `axios` (same pattern as `InsightService`), Next.js + React Query + `date-fns` (frontend, no new dependencies).

**Reference spec:** `docs/superpowers/specs/2026-08-09-market-snapshot-widget-design.md`

---

### Task 1: Status/volume enums

**Files:**
- Create: `farm-backend/src/shared/enums/market-status.enum.ts`
- Create: `farm-backend/src/shared/enums/volume-level.enum.ts`

- [ ] **Step 1: Create the enum files**

`farm-backend/src/shared/enums/market-status.enum.ts`:
```ts
export enum MarketStatus {
  BULLISH = 'BULLISH',
  BEARISH = 'BEARISH',
  NEUTRAL = 'NEUTRAL',
}
```

`farm-backend/src/shared/enums/volume-level.enum.ts`:
```ts
export enum VolumeLevel {
  HIGH = 'HIGH',
  MED = 'MED',
  LOW = 'LOW',
}
```

- [ ] **Step 2: Commit**

```bash
cd farm-backend
git add src/shared/enums/market-status.enum.ts src/shared/enums/volume-level.enum.ts
git commit -m "feat: add MarketStatus and VolumeLevel enums"
```

---

### Task 2: Pure threshold logic (TDD)

**Files:**
- Create: `farm-backend/src/main/insights/market-snapshot.logic.ts`
- Test: `farm-backend/src/main/insights/market-snapshot.logic.spec.ts`

- [ ] **Step 1: Write the failing test**

`farm-backend/src/main/insights/market-snapshot.logic.spec.ts`:
```ts
import { determineMarketStatus, determineVolumeLevel } from './market-snapshot.logic';
import { MarketStatus } from '../../shared/enums/market-status.enum';
import { VolumeLevel } from '../../shared/enums/volume-level.enum';

describe('market-snapshot.logic', () => {
  describe('determineMarketStatus', () => {
    it('returns BULLISH when gainers outweigh decliners', () => {
      expect(determineMarketStatus(10, 4)).toBe(MarketStatus.BULLISH);
    });

    it('returns BEARISH when decliners outweigh gainers', () => {
      expect(determineMarketStatus(3, 9)).toBe(MarketStatus.BEARISH);
    });

    it('returns NEUTRAL when sums are equal', () => {
      expect(determineMarketStatus(5, 5)).toBe(MarketStatus.NEUTRAL);
    });

    it('returns NEUTRAL when there are no movers at all', () => {
      expect(determineMarketStatus(0, 0)).toBe(MarketStatus.NEUTRAL);
    });
  });

  describe('determineVolumeLevel', () => {
    it('returns MED when there is no baseline history', () => {
      expect(determineVolumeLevel(50, 0)).toBe(VolumeLevel.MED);
    });

    it('returns HIGH when today exceeds 120% of baseline', () => {
      expect(determineVolumeLevel(130, 100)).toBe(VolumeLevel.HIGH);
    });

    it('returns LOW when today is below 80% of baseline', () => {
      expect(determineVolumeLevel(70, 100)).toBe(VolumeLevel.LOW);
    });

    it('returns MED at the 120% boundary (not strictly greater)', () => {
      expect(determineVolumeLevel(120, 100)).toBe(VolumeLevel.MED);
    });

    it('returns MED at the 80% boundary (not strictly less)', () => {
      expect(determineVolumeLevel(80, 100)).toBe(VolumeLevel.MED);
    });

    it('returns MED for a typical baseline day', () => {
      expect(determineVolumeLevel(100, 100)).toBe(VolumeLevel.MED);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd farm-backend && npx jest market-snapshot.logic -v`
Expected: FAIL with "Cannot find module './market-snapshot.logic'"

- [ ] **Step 3: Write the implementation**

`farm-backend/src/main/insights/market-snapshot.logic.ts`:
```ts
import { MarketStatus } from '../../shared/enums/market-status.enum';
import { VolumeLevel } from '../../shared/enums/volume-level.enum';

/**
 * Sums of % change across gainers vs decliners (decliners passed as
 * absolute value) — whichever side is larger decides the headline.
 * Equal sums (including the 0/0 no-movers case) are NEUTRAL.
 */
export function determineMarketStatus(
  gainersPercentSum: number,
  declinersPercentSumAbs: number,
): MarketStatus {
  if (gainersPercentSum === declinersPercentSumAbs) return MarketStatus.NEUTRAL;
  return gainersPercentSum > declinersPercentSumAbs
    ? MarketStatus.BULLISH
    : MarketStatus.BEARISH;
}

/**
 * Compares today's total submissions to the trailing 30-day daily average.
 * No baseline yet (fresh deployment) defaults to MED rather than dividing
 * by zero or reading as artificially HIGH.
 */
export function determineVolumeLevel(
  todayTotal: number,
  baselineAvg: number,
): VolumeLevel {
  if (baselineAvg <= 0) return VolumeLevel.MED;
  const ratio = todayTotal / baselineAvg;
  if (ratio > 1.2) return VolumeLevel.HIGH;
  if (ratio < 0.8) return VolumeLevel.LOW;
  return VolumeLevel.MED;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd farm-backend && npx jest market-snapshot.logic -v`
Expected: PASS (10 tests)

- [ ] **Step 5: Commit**

```bash
cd farm-backend
git add src/main/insights/market-snapshot.logic.ts src/main/insights/market-snapshot.logic.spec.ts
git commit -m "feat: add market snapshot status/volume threshold logic"
```

---

### Task 3: MarketSnapshot entity

**Files:**
- Create: `farm-backend/src/shared/entities/market-snapshot.entity.ts`

- [ ] **Step 1: Create the entity**

`farm-backend/src/shared/entities/market-snapshot.entity.ts`:
```ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { MarketStatus } from '../enums/market-status.enum';
import { VolumeLevel } from '../enums/volume-level.enum';

/**
 * Daily, cron-generated deterministic read on market-wide gainers/decliners/
 * volume, with an optional AI-generated narrative blurb. One row per
 * generation; the API always serves the latest. Sibling to MarketInsight.
 */
@Entity('market_snapshots')
@Index(['createdAt'])
export class MarketSnapshot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MarketStatus })
  status: MarketStatus;

  @Column({ name: 'gainers_count', type: 'int' })
  gainersCount: number;

  @Column({ name: 'decliners_count', type: 'int' })
  declinersCount: number;

  @Column({ name: 'volume_level', type: 'enum', enum: VolumeLevel })
  volumeLevel: VolumeLevel;

  /** AI-generated narrative; null if GROQ_API_KEY is unset or the call failed. */
  @Column({ type: 'text', nullable: true })
  description: string | null;

  /** Snapshot of the numbers the description (if any) was grounded in, for auditability. */
  @Column({ type: 'jsonb' })
  source: {
    gainersCount: number;
    declinersCount: number;
    volumeLevel: VolumeLevel;
    topGainer: { name: string; changePercent: number } | null;
    topDecliner: { name: string; changePercent: number } | null;
    todaySubmissionTotal: number;
    trailing30dAvgSubmissionTotal: number;
  };

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
```

- [ ] **Step 2: Commit**

```bash
cd farm-backend
git add src/shared/entities/market-snapshot.entity.ts
git commit -m "feat: add MarketSnapshot entity"
```

---

### Task 4: Migration for `market_snapshots`

**Files:**
- Create: `farm-backend/src/migrations/1782600600000-MarketSnapshots.ts`

- [ ] **Step 1: Create the migration**

`farm-backend/src/migrations/1782600600000-MarketSnapshots.ts`:
```ts
import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Adds market_snapshots — a daily, cron-generated deterministic read on
 * market-wide gainers/decliners/volume, with an optional AI-generated
 * narrative blurb. Sibling table to market_insights.
 */
export class MarketSnapshots1782600600000 implements MigrationInterface {
  name = 'MarketSnapshots1782600600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."market_snapshots_status_enum" AS ENUM('BULLISH', 'BEARISH', 'NEUTRAL')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."market_snapshots_volume_level_enum" AS ENUM('HIGH', 'MED', 'LOW')`,
    );
    await queryRunner.query(`
      CREATE TABLE "market_snapshots" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "status" "public"."market_snapshots_status_enum" NOT NULL,
        "gainers_count" integer NOT NULL,
        "decliners_count" integer NOT NULL,
        "volume_level" "public"."market_snapshots_volume_level_enum" NOT NULL,
        "description" text,
        "source" jsonb NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_market_snapshots_id" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_market_snapshots_created_at" ON "market_snapshots" ("created_at")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "market_snapshots"`);
    await queryRunner.query(`DROP TYPE "public"."market_snapshots_volume_level_enum"`);
    await queryRunner.query(`DROP TYPE "public"."market_snapshots_status_enum"`);
  }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd farm-backend && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd farm-backend
git add src/migrations/1782600600000-MarketSnapshots.ts
git commit -m "feat: add market_snapshots migration"
```

**Note:** Do not run `npm run migration:run` against the shared dev database directly — per this project's established practice, give the user the exact command and let them run it (see the earlier `CommodityWeeklyPrices` migration incident). Surface this command in the final summary instead of executing it yourself.

---

### Task 5: MarketSnapshotService

**Files:**
- Create: `farm-backend/src/main/insights/market-snapshot.service.ts`

- [ ] **Step 1: Write the service**

`farm-backend/src/main/insights/market-snapshot.service.ts`:
```ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { MarketSnapshot } from '../../shared/entities/market-snapshot.entity';
import { MarketStatus } from '../../shared/enums/market-status.enum';
import { VolumeLevel } from '../../shared/enums/volume-level.enum';
import { CommodityService } from '../commodities/commodity.service';
import { determineMarketStatus, determineVolumeLevel } from './market-snapshot.logic';

interface TopMover {
  name: string;
  changePercent: number;
}

@Injectable()
export class MarketSnapshotService {
  private readonly logger = new Logger(MarketSnapshotService.name);

  constructor(
    @InjectRepository(MarketSnapshot)
    private readonly snapshotRepo: Repository<MarketSnapshot>,
    private readonly commodityService: CommodityService,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  async getLatest(): Promise<MarketSnapshot | null> {
    return this.snapshotRepo.findOne({
      where: {},
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Computes deterministic market-wide stats (status, gainers/decliners
   * counts, volume level) from existing commodity price data, then asks an
   * LLM for a short grounded narrative on top. The stats always save even
   * if the LLM call is skipped or fails — this method never returns null.
   */
  async generateSnapshot(): Promise<MarketSnapshot> {
    // getTopMovers slices to `limit` BEFORE splitting gainers/decliners, so
    // pass a limit large enough to cover every active commodity.
    const { gainers, decliners } = await this.commodityService.getTopMovers(100_000);

    const gainersPercentSum = gainers.reduce(
      (sum, g) => sum + parseFloat(g.price_change),
      0,
    );
    const declinersPercentSumAbs = decliners.reduce(
      (sum, d) => sum + Math.abs(parseFloat(d.price_change)),
      0,
    );
    const status = determineMarketStatus(gainersPercentSum, declinersPercentSumAbs);

    const [{ total: todayTotalRaw }] = await this.dataSource.query<
      { total: string }[]
    >(
      `SELECT COALESCE(SUM(submission_count), 0) AS total FROM commodity_daily_averages WHERE date = CURRENT_DATE`,
    );
    const [{ avg: baselineAvgRaw }] = await this.dataSource.query<
      { avg: string }[]
    >(
      `SELECT COALESCE(AVG(daily_total), 0) AS avg FROM (
        SELECT date, SUM(submission_count) AS daily_total
        FROM commodity_daily_averages
        WHERE date >= CURRENT_DATE - INTERVAL '30 days' AND date < CURRENT_DATE
        GROUP BY date
      ) t`,
    );
    const todayTotal = parseFloat(todayTotalRaw);
    const baselineAvg = parseFloat(baselineAvgRaw);
    const volumeLevel = determineVolumeLevel(todayTotal, baselineAvg);

    const topGainer: TopMover | null = gainers[0]
      ? { name: gainers[0].name, changePercent: parseFloat(gainers[0].price_change) }
      : null;
    const topDecliner: TopMover | null = decliners[0]
      ? { name: decliners[0].name, changePercent: parseFloat(decliners[0].price_change) }
      : null;

    const description = await this.generateDescription({
      status,
      gainersCount: gainers.length,
      declinersCount: decliners.length,
      volumeLevel,
      topGainer,
      topDecliner,
    });

    const snapshot = this.snapshotRepo.create({
      status,
      gainersCount: gainers.length,
      declinersCount: decliners.length,
      volumeLevel,
      description,
      source: {
        gainersCount: gainers.length,
        declinersCount: decliners.length,
        volumeLevel,
        topGainer,
        topDecliner,
        todaySubmissionTotal: todayTotal,
        trailing30dAvgSubmissionTotal: baselineAvg,
      },
    });
    return this.snapshotRepo.save(snapshot);
  }

  private async generateDescription(data: {
    status: MarketStatus;
    gainersCount: number;
    declinersCount: number;
    volumeLevel: VolumeLevel;
    topGainer: TopMover | null;
    topDecliner: TopMover | null;
  }): Promise<string | null> {
    const apiKey = this.configService.get<string>('GROQ_API_KEY');
    if (!apiKey) {
      this.logger.warn('GROQ_API_KEY not set — skipping market snapshot description.');
      return null;
    }

    const model = this.configService.get<string>(
      'GROQ_MODEL',
      'llama-3.3-70b-versatile',
    );

    const prompt = `Market status: ${data.status}
Gainers: ${data.gainersCount} commodities
Decliners: ${data.declinersCount} commodities
Trading volume: ${data.volumeLevel}
${data.topGainer ? `Top gainer: ${data.topGainer.name} (+${data.topGainer.changePercent.toFixed(1)}%)` : 'No notable gainer today.'}
${data.topDecliner ? `Top decliner: ${data.topDecliner.name} (${data.topDecliner.changePercent.toFixed(1)}%)` : 'No notable decliner today.'}

Write a short, broad market-wide summary for Nigerian farmers and traders based ONLY on the numbers above. Do not invent any figures, regions, or causes not given here. If gainers and decliners are both 0, say the market was flat/quiet today.
Respond with strict JSON only, no markdown fences: {"body": string}
- body: 1-2 sentences, plain, grounded, no hype.`;

    try {
      const { data: response } = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.4,
          max_tokens: 150,
          response_format: { type: 'json_object' },
        },
        {
          headers: { Authorization: `Bearer ${apiKey}` },
          timeout: 15_000,
        },
      );

      const content = response?.choices?.[0]?.message?.content;
      if (!content) throw new Error('Empty completion content');

      const parsed = JSON.parse(content) as Partial<{ body: string }>;
      if (!parsed.body) throw new Error('Malformed snapshot JSON from model');
      return parsed.body;
    } catch (error) {
      this.logger.error(
        `Groq market snapshot generation failed: ${(error as Error).message}`,
      );
      return null;
    }
  }
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd farm-backend && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd farm-backend
git add src/main/insights/market-snapshot.service.ts
git commit -m "feat: add MarketSnapshotService"
```

---

### Task 6: MarketSnapshotController

**Files:**
- Create: `farm-backend/src/main/insights/market-snapshot.controller.ts`

- [ ] **Step 1: Write the controller**

`farm-backend/src/main/insights/market-snapshot.controller.ts`:
```ts
import { Controller, Get } from '@nestjs/common';
import { MarketSnapshotService } from './market-snapshot.service';

@Controller('app/market-snapshot')
export class MarketSnapshotController {
  constructor(private readonly marketSnapshotService: MarketSnapshotService) {}

  /** Public — latest daily market-wide snapshot, or null if none has generated yet. */
  @Get('latest')
  getLatest() {
    return this.marketSnapshotService.getLatest();
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd farm-backend
git add src/main/insights/market-snapshot.controller.ts
git commit -m "feat: add MarketSnapshotController"
```

---

### Task 7: Wire into InsightModule and the daily cron

**Files:**
- Modify: `farm-backend/src/main/insights/insight.module.ts`
- Modify: `farm-backend/src/main/insights/insight-cron.service.ts`

- [ ] **Step 1: Update the module**

Replace the full contents of `farm-backend/src/main/insights/insight.module.ts`:
```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketInsight } from '../../shared/entities/market-insight.entity';
import { MarketSnapshot } from '../../shared/entities/market-snapshot.entity';
import { CommodityModule } from '../commodities/commodity.module';
import { InsightService } from './insight.service';
import { MarketSnapshotService } from './market-snapshot.service';
import { InsightCronService } from './insight-cron.service';
import { InsightController } from './insight.controller';
import { MarketSnapshotController } from './market-snapshot.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MarketInsight, MarketSnapshot]),
    CommodityModule,
  ],
  controllers: [InsightController, MarketSnapshotController],
  providers: [InsightService, MarketSnapshotService, InsightCronService],
  exports: [InsightService, MarketSnapshotService],
})
export class InsightModule {}
```

- [ ] **Step 2: Update the cron service**

Replace the full contents of `farm-backend/src/main/insights/insight-cron.service.ts`:
```ts
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InsightService } from './insight.service';
import { MarketSnapshotService } from './market-snapshot.service';

@Injectable()
export class InsightCronService implements OnApplicationBootstrap {
  private readonly logger = new Logger(InsightCronService.name);

  constructor(
    private readonly insightService: InsightService,
    private readonly marketSnapshotService: MarketSnapshotService,
  ) {}

  /**
   * On boot, seed today's insight and market snapshot if either is missing.
   * The daily cron only runs at 6am, so without this the widgets would stay
   * empty after every restart until the next scheduled run.
   */
  onApplicationBootstrap(): void {
    void this.seedIfEmpty();
  }

  private async seedIfEmpty(): Promise<void> {
    try {
      const latest = await this.insightService.getLatest();
      if (!latest) {
        this.logger.log('No insight yet — generating at startup…');
        const insight = await this.insightService.generateInsight();
        this.logger.log(
          insight
            ? `Startup insight generated: "${insight.headline}"`
            : 'Startup insight generation skipped (no key or no mover data).',
        );
      } else {
        this.logger.log(
          `Latest insight already present (generated ${latest.createdAt.toISOString()}) — skipping startup seed.`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Startup insight seed failed: ${(error as Error).message}`,
      );
    }

    try {
      const latestSnapshot = await this.marketSnapshotService.getLatest();
      if (!latestSnapshot) {
        this.logger.log('No market snapshot yet — generating at startup…');
        const snapshot = await this.marketSnapshotService.generateSnapshot();
        this.logger.log(
          `Startup market snapshot generated: status=${snapshot.status}`,
        );
      } else {
        this.logger.log(
          `Latest market snapshot already present (generated ${latestSnapshot.createdAt.toISOString()}) — skipping startup seed.`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Startup market snapshot seed failed: ${(error as Error).message}`,
      );
    }
  }

  /**
   * Daily at 06:00 (configurable via INSIGHT_CRON_SCHEDULE) — after overnight
   * price aggregation has settled. Each generator is wrapped separately so
   * one failing never blocks the other.
   */
  @Cron(process.env.INSIGHT_CRON_SCHEDULE ?? '0 6 * * *')
  async handleDailyGeneration(): Promise<void> {
    this.logger.log('Daily insight generation started');
    try {
      const insight = await this.insightService.generateInsight();
      this.logger.log(
        insight
          ? `Daily insight generated: "${insight.headline}"`
          : 'Daily insight generation skipped (no key or no mover data).',
      );
    } catch (error) {
      this.logger.error(
        `Daily insight generation failed: ${(error as Error).message}`,
        (error as Error).stack,
      );
    }

    this.logger.log('Daily market snapshot generation started');
    try {
      const snapshot = await this.marketSnapshotService.generateSnapshot();
      this.logger.log(
        `Daily market snapshot generated: status=${snapshot.status}`,
      );
    } catch (error) {
      this.logger.error(
        `Daily market snapshot generation failed: ${(error as Error).message}`,
        (error as Error).stack,
      );
    }
  }
}
```

- [ ] **Step 3: Verify it compiles**

Run: `cd farm-backend && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Run the full backend test suite**

Run: `cd farm-backend && npm test`
Expected: PASS, including the 10 new `market-snapshot.logic` tests

- [ ] **Step 5: Commit**

```bash
cd farm-backend
git add src/main/insights/insight.module.ts src/main/insights/insight-cron.service.ts
git commit -m "feat: wire market snapshot generation into the daily insight cron"
```

---

### Task 8: Frontend types

**Files:**
- Create: `farmgreene/types/market-snapshot.ts`

- [ ] **Step 1: Create the type file**

`farmgreene/types/market-snapshot.ts`:
```ts
export type MarketStatus = "BULLISH" | "BEARISH" | "NEUTRAL";
export type VolumeLevel = "HIGH" | "MED" | "LOW";

export interface MarketSnapshot {
  id: string;
  status: MarketStatus;
  gainersCount: number;
  declinersCount: number;
  volumeLevel: VolumeLevel;
  description: string | null;
  source: {
    gainersCount: number;
    declinersCount: number;
    volumeLevel: VolumeLevel;
    topGainer: { name: string; changePercent: number } | null;
    topDecliner: { name: string; changePercent: number } | null;
    todaySubmissionTotal: number;
    trailing30dAvgSubmissionTotal: number;
  };
  createdAt: string;
}
```

- [ ] **Step 2: Commit**

```bash
cd farmgreene
git add types/market-snapshot.ts
git commit -m "feat: add MarketSnapshot type"
```

---

### Task 9: Frontend service + hook

**Files:**
- Create: `farmgreene/lib/services/market-snapshot.service.ts`
- Create: `farmgreene/lib/hooks/useMarketSnapshot.ts`

- [ ] **Step 1: Create the service**

`farmgreene/lib/services/market-snapshot.service.ts`:
```ts
import { apiClient } from "@/lib/api/axios";
import { MarketSnapshot } from "@/types/market-snapshot";

/** GET /market-snapshot/latest — public, latest daily market-wide snapshot (or null). */
export async function getLatestMarketSnapshot(): Promise<MarketSnapshot | null> {
  const { data } = await apiClient.get("/market-snapshot/latest");
  return data;
}
```

- [ ] **Step 2: Create the hook**

`farmgreene/lib/hooks/useMarketSnapshot.ts`:
```ts
import { useQuery } from "@tanstack/react-query";
import { getLatestMarketSnapshot } from "@/lib/services/market-snapshot.service";

/** The snapshot only refreshes once a day, so a long staleTime avoids refetch churn. */
export function useMarketSnapshot() {
  return useQuery({
    queryKey: ["market-snapshot", "latest"],
    queryFn: getLatestMarketSnapshot,
    staleTime: 30 * 60 * 1000,
  });
}
```

- [ ] **Step 3: Commit**

```bash
cd farmgreene
git add lib/services/market-snapshot.service.ts lib/hooks/useMarketSnapshot.ts
git commit -m "feat: add market snapshot service and hook"
```

---

### Task 10: Rewrite the widget

**Files:**
- Modify: `farmgreene/components/dashboard/widgets/MarketSnapshot.tsx`

- [ ] **Step 1: Replace the full file contents**

`farmgreene/components/dashboard/widgets/MarketSnapshot.tsx`:
```tsx
"use client";

import React from "react";
import { TrendingUp, TrendingDown, Activity, Globe } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketSnapshot } from "@/lib/hooks/useMarketSnapshot";
import { MarketStatus, VolumeLevel } from "@/types/market-snapshot";

const STATUS_LABEL: Record<MarketStatus, string> = {
  BULLISH: "Bullish",
  BEARISH: "Bearish",
  NEUTRAL: "Mixed",
};

const STATUS_COLOR: Record<MarketStatus, string> = {
  BULLISH: "text-emerald-400",
  BEARISH: "text-rose-400",
  NEUTRAL: "text-amber-400",
};

const VOLUME_LABEL: Record<VolumeLevel, string> = {
  HIGH: "High",
  MED: "Medium",
  LOW: "Low",
};

export default function MarketSnapshot() {
  const { data: snapshot, isLoading } = useMarketSnapshot();
  const status = snapshot?.status ?? "NEUTRAL";
  const volumeLevel = snapshot?.volumeLevel ?? "MED";

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2 overflow-hidden border-none shadow-xl bg-linear-to-br from-green-950 via-emerald-900 to-slate-900 text-white relative group min-h-[220px] flex flex-col justify-center">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-blue-500/5 blur-[80px] pointer-events-none"></div>

      <CardContent className="p-6 md:p-8 relative z-10 flex flex-col justify-center h-full gap-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-3 w-40 bg-white/10" />
            <Skeleton className="h-8 w-64 bg-white/10" />
            <Skeleton className="h-4 w-full max-w-sm bg-white/10" />
            <div className="flex gap-3">
              <Skeleton className="h-8 w-24 bg-white/10" />
              <Skeleton className="h-8 w-28 bg-white/10" />
              <Skeleton className="h-8 w-24 bg-white/10" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-300/80 text-xs font-medium uppercase tracking-wider">
              <Globe className="h-3 w-3" />
              Global Market Overview
              <span className="w-1 h-1 rounded-full bg-emerald-400 mx-1"></span>
              {snapshot
                ? `Updated ${formatDistanceToNowStrict(new Date(snapshot.createdAt))} ago`
                : "No data yet"}
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                Market is <span className={STATUS_COLOR[status]}>{STATUS_LABEL[status]}</span>
              </h2>
              <p className="text-emerald-100/70 text-sm max-w-sm leading-relaxed">
                {snapshot?.description ?? "Market data updated — no notable moves today."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
                <Activity className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-medium">
                  Vol: <span className="text-white ml-1">{VOLUME_LABEL[volumeLevel]}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-medium">
                  Gainers: <span className="text-white ml-1">{snapshot?.gainersCount ?? 0}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
                <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                <span className="text-xs font-medium">
                  Losers: <span className="text-white ml-1">{snapshot?.declinersCount ?? 0}</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd farmgreene && npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd farmgreene
git add components/dashboard/widgets/MarketSnapshot.tsx
git commit -m "feat: wire MarketSnapshot widget to real backend data"
```

---

### Task 11: Verification

- [ ] **Step 1: Backend build**

Run: `cd farm-backend && npm run build`
Expected: succeeds with no errors

- [ ] **Step 2: Give the user the migration command (do not run it yourself)**

Surface this to the user rather than executing it:
```bash
cd farm-backend && npm run migration:run
```

- [ ] **Step 3: Manual curl check (after migration has run and the server is up)**

```bash
curl http://localhost:8920/api/v1/app/market-snapshot/latest
```
Expected: `null` before the first cron/bootstrap run has completed, or a JSON object with `status`, `gainersCount`, `declinersCount`, `volumeLevel`, `description`, `source`, `createdAt` after it (the app's `onApplicationBootstrap` seed runs automatically on startup, so this should be populated shortly after boot).

- [ ] **Step 4: Frontend build**

Run: `cd farmgreene && npm run build`
Expected: succeeds with no errors

- [ ] **Step 5: Dev-server click-through**

Start both dev servers, open the farmgreene dashboard, and confirm:
- Widget shows a loading skeleton briefly, then real numbers.
- Headline word matches `status` (Bullish/Bearish/Mixed) and is color-coded.
- Description paragraph shows either the AI blurb or the static fallback sentence.
- "Updated Xm ago" reflects the actual `createdAt` of the latest snapshot.
- Vol/Gainers/Losers chips show real counts, not the old hardcoded 12/4/High.
