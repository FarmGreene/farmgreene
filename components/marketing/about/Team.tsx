import { Mail } from "lucide-react";
import { Wrap, Display, Warm, Lede, Kicker } from "@/components/marketing/ui";

/**
 * Honest about the size of the team, because being a one-person operation is
 * not something to hide behind a stock photo of a "team".
 *
 * The founder's avatar is a monogram by design — the original pointed at
 * /avatars/emmanuel.jpg, which has never existed in the repo, so it silently
 * fell back to initials anyway.
 */
const founder = {
  name: "Emmanuel Owolabi",
  role: "Founder",
  initials: "EO",
  bio: "Solo founder building Farmgreene from the ground up. Software engineer by trade, working on the price transparency problem because the people closest to the food are usually the furthest from the numbers.",
};

const CONTACT_EMAIL = "emmycookcodes@gmail.com";
const JOIN_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "I'd like to join Farmgreene",
)}&body=${encodeURIComponent(
  "Hello,\n\nI came across Farmgreene and I'm interested in what you're building. Here's a bit about me:\n\n",
)}`;

export function Team() {
  return (
    <section className="bg-field py-20 md:py-28">
      <Wrap>
        <div className="max-w-2xl">
          <Kicker>Who&rsquo;s building this</Kicker>
          <Display className="mt-5">
            Right now, <Warm>mostly one person</Warm>
          </Display>
          <Lede className="mt-6">
            Farmgreene is early. Worth saying plainly rather than implying a
            company that isn&rsquo;t there yet.
          </Lede>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-[22px] border border-bark/10 bg-white p-7">
            <div className="flex items-center gap-5">
              <span
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-leaf-soft font-data text-[16px] font-semibold tracking-[0.06em] text-leaf-deep"
              >
                {founder.initials}
              </span>
              <div>
                <h3 className="font-display text-[1.4rem] font-semibold leading-tight tracking-[-0.02em] text-bark">
                  {founder.name}
                </h3>
                <p className="mt-1 font-data text-[11px] uppercase tracking-[0.16em] text-leaf">
                  {founder.role}
                </p>
              </div>
            </div>
            <p className="mt-6 text-[15px] leading-[1.65] text-bark-soft">
              {founder.bio}
            </p>
          </div>

          <div className="rounded-[22px] border border-dashed border-bark/25 p-7">
            <span className="font-data text-[11px] uppercase tracking-[0.16em] text-bark-soft">
              Open seat
            </span>
            <h3 className="mt-3 font-display text-[1.4rem] font-semibold leading-snug tracking-[-0.02em] text-bark">
              There&rsquo;s room here
            </h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-bark-soft">
              If the problem interests you more than the job title does, get in
              touch. Tell me what you&rsquo;d want to work on.
            </p>
            <a
              href={JOIN_MAILTO}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-bark/15 px-5 text-[15px] font-semibold text-bark transition-colors hover:bg-bark/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-field"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get in touch
            </a>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
