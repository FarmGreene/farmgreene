import Link from "next/link";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";

/**
 * Shell for the policy pages.
 *
 * Deliberately quieter than the rest of the site: no photography, no motion,
 * a narrow measure. These are documents to be read and referred back to, and
 * the marketing register would get in the way of that.
 */
export function LegalLayout({
  kicker,
  title,
  accent,
  lede,
  updated,
  sections,
  children,
}: {
  kicker: string;
  title: string;
  accent: string;
  lede: string;
  updated: string;
  /** Anchor list for the sidebar. Ids must match the <LegalSection> ids. */
  sections: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="bg-field">
      <section className="morning-light relative overflow-hidden bg-field pt-14 pb-12 md:pt-20 md:pb-16">
        <Wrap>
          <div className="max-w-3xl">
            <Kicker>{kicker}</Kicker>
            <Display as="h1" className="mt-5">
              {title} <Warm>{accent}</Warm>
            </Display>
            <Lede className="mt-7 max-w-xl">{lede}</Lede>
            <p className="mt-6 font-data text-[12px] uppercase tracking-[0.16em] text-bark-soft">
              Last updated {updated}
            </p>
          </div>
        </Wrap>
      </section>

      <section className="pb-24">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
            <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
              <p className="font-data text-[11px] uppercase tracking-[0.18em] text-bark-soft">
                On this page
              </p>
              <ul className="mt-4 space-y-2.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-[14px] leading-snug text-bark-soft transition-colors hover:text-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="max-w-[68ch]">{children}</div>
          </div>
        </Wrap>
      </section>
    </div>
  );
}

export function LegalSection({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-bark/10 py-9 first:pt-0 last:border-0">
      <h2 className="font-display text-[1.5rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-[1.7] text-bark-soft">
        {children}
      </div>
    </section>
  );
}

/** Bulleted list with the same green tick used across the marketing pages. */
export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-leaf"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Inline link in body copy. */
export function LegalLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "font-medium text-leaf-deep underline decoration-1 decoration-leaf/40 underline-offset-4 transition-colors hover:decoration-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Callout for the things a reader most needs to notice. */
export function LegalNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border border-leaf/20 bg-leaf-tint p-5 text-[15px] leading-[1.7] text-bark">
      {children}
    </div>
  );
}
