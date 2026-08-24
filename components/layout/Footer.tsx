import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { FaXTwitter } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { Container } from "@/components/marketing/shared/Layout";
import { Eyebrow } from "@/components/marketing/shared/Figure";
import { Action } from "@/components/marketing/ui";

/**
 * Every link here points at a route that exists. The previous footer linked to
 * /co-op, /market-prices, /careers, /blog, /privacy, /terms and /cookies —
 * none of which are routes — carried Instagram and LinkedIn icons pointing at
 * "#", and had a newsletter form whose submit handler was `preventDefault()`
 * and nothing else. A control that silently does nothing is worse than no
 * control, so those are gone until there's something real behind them.
 */

const platformLinks = [
  { name: "Market intelligence", href: "/intelligence" },
  { name: "Equipment marketplace", href: "/marketplace" },
  { name: "Collect prices with us", href: "/agents" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

/** Sit on the bottom rule rather than in a column — findable, not promoted. */
const legalLinks = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="bg-bush-900 text-white">
      <Container>
        <div className="grid gap-14 py-20 md:py-24 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="white" />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/55">
              Daily commodity prices collected in real markets, and the
              equipment to work your land — rented from owners near you.
            </p>
            <div className="mt-8 flex gap-3">
              <SocialLink
                href="https://www.facebook.com/profile.php?id=61591512838816"
                label="Facebook"
              >
                <LuFacebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink href="https://x.com/usefarmgreene" label="X">
                <FaXTwitter className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <FooterColumn title="Platform" links={platformLinks} />
          <FooterColumn title="Company" links={companyLinks} />

          <div>
            <Eyebrow onDark>Get started</Eyebrow>
            <p className="mt-4 text-[15px] leading-relaxed text-white/55">
              Free while we&rsquo;re in early access. No card, no trial timer.
            </p>
            <Action href="/signup" onDark className="mt-6">
              Create an account
            </Action>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-bush-700 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="font-data text-[12px] text-white/40">
              © {new Date().getFullYear()} Farmgreene
            </p>
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-data text-[12px] text-white/40 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="font-data text-[12px] text-white/40">
            Prices are recorded in real markets and reviewed before publishing.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div>
      <Eyebrow onDark>{title}</Eyebrow>
      <ul className="mt-5 space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[15px] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white focus-visible:underline underline-offset-4"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-bush-700 text-white/60 transition-colors hover:border-harmattan-500 hover:text-harmattan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harmattan-500"
    >
      {children}
      <span className="sr-only">{label}</span>
    </Link>
  );
}
