import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { TodaysPricesStrip } from "@/components/layout/TodaysPricesStrip";
import { Wrap, Display, Warm, Lede, Kicker, Action } from "@/components/marketing/ui";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * Lives at the app root, outside the (public) layout — so no navbar, no footer,
 * and `font-body` has to be set here to get the marketing typefaces.
 *
 * The page ends with real prices rather than a dead end. Somebody who mistyped
 * a URL still came here for a reason, and the most useful thing to hand them is
 * the thing the site is for.
 */
export default function NotFound() {
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
          <Kicker>Error 404</Kicker>

          <Display as="h1" className="mt-5">
            You&rsquo;ve reached <Warm>an empty stall</Warm>
          </Display>

          <Lede className="mt-7">
            This page doesn&rsquo;t exist, or it moved. Nothing is wrong with
            your account and nothing has been lost — it&rsquo;s just not here.
          </Lede>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Action href="/">Back to the start</Action>
            <Action href="/intelligence" variant="outline">
              See today&rsquo;s prices
            </Action>
          </div>

          <p className="mt-8 text-[14px] text-bark-soft">
            Followed a link from us to get here?{" "}
            <Link
              href="/contact"
              className="font-medium text-leaf-deep underline decoration-1 decoration-leaf/40 underline-offset-4 transition-colors hover:decoration-leaf"
            >
              Tell us which one
            </Link>{" "}
            and we&rsquo;ll fix it.
          </p>

          <TodaysPricesStrip />
        </div>
      </Wrap>
    </main>
  );
}
