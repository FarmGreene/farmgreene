import { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  Tractor,
  Wallet,
  MapPin,
  Smartphone,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Become an Agent",
  description:
    "Join Farmgreene's field-agent network. Collect real market prices and onboard equipment owners across Nigeria — earn as you grow the platform's reach.",
};

const AGENT_APP_URL =
  process.env.NEXT_PUBLIC_AGENT_APP_URL ?? "http://localhost:3100";

const whatYouDo = [
  {
    icon: ClipboardList,
    title: "Collect market prices",
    body: "Visit markets in your area and submit real commodity prices. Your data powers the intelligence farmers and traders rely on.",
  },
  {
    icon: Tractor,
    title: "Onboard equipment owners",
    body: "Sign up tractor and machinery owners on the spot — capture their details and equipment so farmers nearby can rent.",
  },
];

const whyJoin = [
  {
    icon: Wallet,
    title: "Earn as you go",
    body: "Get rewarded for every approved submission and every owner you bring onto the platform.",
  },
  {
    icon: MapPin,
    title: "Work your own area",
    body: "You know your markets best. Cover the towns and LGAs closest to you, on a schedule that fits.",
  },
  {
    icon: Smartphone,
    title: "Simple mobile tools",
    body: "A lightweight app built for the field — capture prices, photos and GPS in a few taps, even on the move.",
  },
  {
    icon: Users,
    title: "Be the ground network",
    body: "You're the link between local markets and a national platform helping Nigerian agriculture grow.",
  },
];

const steps = [
  {
    n: "01",
    title: "Apply",
    body: "Tell us where you're based and the markets you can cover.",
  },
  {
    n: "02",
    title: "Get verified",
    body: "Complete a quick onboarding — identity, coverage area and payout details.",
  },
  {
    n: "03",
    title: "Start earning",
    body: "Head to your markets, submit prices, onboard owners, and get paid.",
  },
];

export default function AgentsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-green-900 text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28 text-center">
          <span className="inline-block rounded-full bg-green-800 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-100">
            Farmgreene Field Agents
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Become a Farmgreene Agent
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-green-100">
            Be the eyes and ears of Nigerian agriculture. Collect real market
            prices, onboard equipment owners, and earn as you grow the platform
            in your community.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white font-semibold text-green-900 hover:bg-green-50"
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
              className="border-green-300 bg-transparent font-semibold text-white hover:bg-green-800 hover:text-white"
            >
              <Link href="/contact">Talk to our team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What you'll do */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            What an agent does
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Two simple, high-impact jobs — both done from your phone, in the
            markets you already know.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {whatYouDo.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why join */}
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Why become an agent
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Flexible work with real earnings and real impact for your
              community.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyJoin.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <Icon className="h-6 w-6 text-green-600" />
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            From sign-up to your first payout in three steps.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map(({ n, title, body }) => (
            <div key={n} className="relative">
              <span className="text-4xl font-bold text-green-200">{n}</span>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-900 text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to join the network?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-green-100">
            Already approved as an agent? Head to your workspace to get started.
            New here? Reach out and we&apos;ll get you set up.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white font-semibold text-green-900 hover:bg-green-50"
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
              className="border-green-300 bg-transparent font-semibold text-white hover:bg-green-800 hover:text-white"
            >
              <Link href="/contact">Contact us to apply</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-green-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> No upfront cost
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Work your own hours
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Earn per submission
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
