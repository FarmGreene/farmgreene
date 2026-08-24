"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Wrap, Display, Warm, Lede, Kicker, Action } from "@/components/marketing/ui";

/**
 * Deliberately fetches nothing.
 *
 * The 404 page ends with live prices, because being lost means the app is
 * fine. This page is the opposite: whatever failed may well be the network or
 * the API, so an error screen that also makes requests risks failing twice and
 * showing broken furniture on top of a broken page.
 *
 * `digest` is the only handle support has on a production error — the real
 * message is stripped from client bundles — so it's shown rather than hidden.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="morning-light font-body relative min-h-screen overflow-hidden bg-field py-14 md:py-20">
      <Wrap>
        <Link
          href="/"
          className="inline-block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-4 focus-visible:ring-offset-field"
        >
          <Logo textSize="text-xl" />
        </Link>

        <div className="mt-20 max-w-2xl md:mt-28">
          <Kicker>Something went wrong</Kicker>

          <Display as="h1" className="mt-5">
            This one&rsquo;s <Warm>on our side</Warm>
          </Display>

          <Lede className="mt-7">
            The page failed to load. Your account and your data are untouched —
            nothing was saved or lost by this. Try again, and if it keeps
            happening, send us the code below and we&rsquo;ll trace it.
          </Lede>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="group inline-flex items-center gap-3 rounded-full bg-leaf py-2 pl-6 pr-2 text-[15px] font-semibold text-white transition-colors hover:bg-leaf-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-field"
            >
              Try again
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-leaf transition-transform duration-500 group-hover:-rotate-180">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>

            <Action href="/" variant="outline">
              Back to the start
            </Action>
          </div>

          {error.digest && (
            <div className="mt-10 rounded-2xl border border-bark/10 bg-white p-5">
              <p className="font-data text-[11px] uppercase tracking-[0.18em] text-bark-soft">
                Reference code
              </p>
              <p className="mt-2 select-all font-data text-[15px] tabular-nums text-bark">
                {error.digest}
              </p>
              <p className="mt-3 text-[14px] leading-[1.6] text-bark-soft">
                Copy this into a note on the{" "}
                <Link
                  href="/contact"
                  className="font-medium text-leaf-deep underline decoration-1 decoration-leaf/40 underline-offset-4 transition-colors hover:decoration-leaf"
                >
                  contact page
                </Link>{" "}
                — it points us straight at what failed.
              </p>
            </div>
          )}
        </div>
      </Wrap>
    </main>
  );
}
