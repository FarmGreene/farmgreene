import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ClipboardList,
  Tractor,
  Wallet,
  MapPin,
  Smartphone,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Become an Agent",
  description:
    "Join Farmgreene's field-agent network. Collect real market prices and onboard equipment owners across Nigeria — earn as you grow the platform's reach.",
};

const AGENT_APP_URL =
  process.env.NEXT_PUBLIC_AGENT_APP_URL ?? "http://localhost:3100";

const whyJoin = [
  {
    icon: Wallet,
    title: "Earn as you go",
    body: "Get rewarded for every approved price submission and every owner you bring onto the platform.",
  },
  {
    icon: MapPin,
    title: "Work your own area",
    body: "You know your markets best. Cover the towns and LGAs closest to you, on a schedule that fits your life.",
  },
  {
    icon: Smartphone,
    title: "Built for the field",
    body: "A lightweight mobile app — capture prices, photos and GPS in a few taps, even on a patchy connection.",
  },
  {
    icon: Users,
    title: "Be the ground network",
    body: "You're the human link between local markets and a national platform moving Nigerian agriculture forward.",
  },
];

const steps = [
  {
    n: "01",
    title: "Apply",
    body: "Tell us where you're based and which markets you can cover. Takes a few minutes.",
  },
  {
    n: "02",
    title: "Get verified",
    body: "Complete a quick onboarding — your identity, coverage area and payout details.",
  },
  {
    n: "03",
    title: "Start earning",
    body: "Head to your markets, submit prices, onboard owners, and get paid for your work.",
  },
];

export default function AgentsPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* ───────── Hero ───────── */}
      <section className="relative isolate">
        {/* soft decorative wash */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/80 via-white to-white dark:from-emerald-950/20 dark:via-slate-950 dark:to-slate-950" />
        <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-900/20" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          {/* copy */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              Farmgreene Field Agents
            </span>
            <h1 className="font-heading mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Be the eyes of Nigerian{" "}
              <span className="text-emerald-600">agriculture</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Collect real market prices, onboard equipment owners, and earn as
              you grow Farmgreene in your community — straight from the field,
              from your phone.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 bg-emerald-600 px-7 text-base font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
              >
                <a href={AGENT_APP_URL}>
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-slate-300 px-7 text-base font-semibold dark:border-slate-700"
              >
                <Link href="/contact">Talk to our team</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
              {["No upfront cost", "Work your own hours", "Earn per submission"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* hero image */}
          <div className="relative animate-in fade-in zoom-in-95 duration-700">
            <div className="absolute -inset-3 -z-10 rotate-2 rounded-[2.5rem] bg-emerald-100/70 dark:bg-emerald-900/20" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
              <Image
                src="/images/stakeholder-agent.jpg"
                alt="A Farmgreene field agent at a local market"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            {/* floating badge card */}
            <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="pr-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Now onboarding
                </p>
                <p className="text-xs text-slate-500">across Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── What an agent does (alternating image blocks) ───────── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            The role
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Two simple, high-impact jobs
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Both done from your phone, in the markets you already know.
          </p>
        </div>

        <div className="mt-16 space-y-16 lg:space-y-24">
          {/* Block 1 */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-3 -z-10 -rotate-2 rounded-[2rem] bg-emerald-50 dark:bg-emerald-950/20" />
              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                <Image
                  src="/images/market-hero.png"
                  alt="A busy Nigerian commodity market"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                <ClipboardList className="h-6 w-6" />
              </div>
              <h3 className="font-heading mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                Collect market prices
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Visit markets in your area and submit real commodity prices. Your
                data powers the intelligence that farmers, traders and buyers
                across Nigeria rely on every day.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "A few taps per commodity — no paperwork",
                  "Photos & GPS captured automatically",
                  "Get paid for every approved submission",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Block 2 */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900">
                <Tractor className="h-6 w-6" />
              </div>
              <h3 className="font-heading mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                Onboard equipment owners
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Sign up tractor and machinery owners on the spot. Capture their
                details and equipment so nearby farmers can rent — and you earn
                for every owner you bring on.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Add an owner & their equipment in one screen",
                  "Snap a photo, capture the location, done",
                  "Earn for every owner onboarded",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rotate-2 rounded-[2rem] bg-slate-100 dark:bg-slate-800/40" />
              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                <Image
                  src="/images/rental-process.png"
                  alt="Agricultural equipment ready for rental"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Why join ───────── */}
      <section className="relative bg-slate-50 dark:bg-slate-900/40">
        {/* faint grid texture */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent)] dark:opacity-[0.06]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Why join
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Flexible work, real earnings, real impact
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyJoin.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/40 dark:text-emerald-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-bold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── How it works (timeline) ───────── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
            Getting started
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            From sign-up to your first payout
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Three steps. No cost to join.
          </p>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent md:block dark:via-emerald-900" />
          {steps.map(({ n, title, body }) => (
            <div key={n} className="relative text-center md:text-left">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-bold text-emerald-600 shadow-lg ring-1 ring-emerald-100 md:mx-0 dark:bg-slate-900 dark:ring-emerald-900">
                {n}
              </div>
              <h3 className="font-heading mt-5 text-xl font-bold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Closing CTA (image background) ───────── */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/market-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-emerald-950/85" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center text-white">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to join the network?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
            Already approved as an agent? Open your workspace. New here? Reach out
            and we&apos;ll get you set up.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 bg-white px-7 text-base font-semibold text-emerald-900 hover:bg-emerald-50"
            >
              <a href={AGENT_APP_URL}>
                Open the agent app
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/40 bg-transparent px-7 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Contact us to apply</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
