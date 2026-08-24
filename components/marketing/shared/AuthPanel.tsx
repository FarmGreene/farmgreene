"use client";

import Image from "next/image";
import { useCommodityIndex } from "@/lib/hooks/useCommodities";
import { formatNaira, direction } from "./Figure";
import { cn } from "@/lib/utils";

/**
 * The side panel shared by login, signup and the password-reset pages.
 *
 * It used to carry a testimonial attributed to "Adebayo O., Osun State Farmer
 * Cooperative" — a person and an organisation that do not exist. A made-up
 * endorsement on the sign-in page is a bad first promise to make to someone
 * about to trust you with price data, so it shows the real thing instead:
 * today's actual prices, so whoever is signing in can see what they're signing
 * in for. If the index has nothing, the rows simply don't render.
 */
export function AuthPanel() {
  const { data } = useCommodityIndex({ limit: 5 });

  const items = (data?.data ?? []).filter(
    (c) => typeof c.currentPrice === "number" && c.currentPrice > 0,
  );

  return (
    <div className="relative hidden overflow-hidden bg-loam lg:flex lg:flex-col lg:justify-center lg:p-14 lg:text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/stakeholder-agent.jpg"
          alt=""
          fill
          sizes="50vw"
          className="object-cover opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-loam/90 via-loam/80 to-loam" />
      </div>

      <div className="relative">
        <p className="font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          Today&rsquo;s prices,{" "}
          <em className="font-display font-normal italic text-sun">
            waiting for you
          </em>
        </p>

        {items.length > 0 && (
          <ul className="mt-9 space-y-px overflow-hidden rounded-2xl border border-white/10">
            {items.map((c) => {
              const change = c.latestAverage?.priceChange ?? c.sevenDayChange;
              const dir = direction(change);

              return (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-4 bg-white/[0.04] px-5 py-3.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium text-white">
                      {c.name}
                    </p>
                    <p className="mt-0.5 font-data text-[11px] text-white/45">
                      per {c.unit}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-data text-[15px] font-semibold tabular-nums text-white">
                      {formatNaira(c.currentPrice)}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 font-data text-[11px] font-semibold tabular-nums",
                        dir === "up" && "text-[#6FD3A8]",
                        dir === "down" && "text-[#E39685]",
                        dir === "flat" && "text-white/40",
                      )}
                    >
                      {dir === "flat" || typeof change !== "number"
                        ? "steady"
                        : `${change > 0 ? "+" : "−"}${Math.abs(change).toFixed(1)}%`}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="relative mt-10 font-data text-[11px] leading-relaxed text-white/40">
        Recorded in real markets. Reviewed before publishing.
      </p>
    </div>
  );
}
