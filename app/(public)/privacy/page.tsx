import type { Metadata } from "next";
import {
  LegalLayout,
  LegalSection,
  LegalList,
  LegalLink,
  LegalNote,
} from "@/components/marketing/legal/LegalLayout";
import {
  CONTROLLER,
  LAST_UPDATED,
} from "@/components/marketing/legal/legal-details";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Farmgreene collects, why, who it's shared with, and the rights you have over it under the Nigeria Data Protection Act.",
};

const sections = [
  { id: "who-we-are", label: "Who we are" },
  { id: "what-we-collect", label: "What we collect" },
  { id: "what-we-dont", label: "What we don't do" },
  { id: "location", label: "Your device location" },
  { id: "cookies", label: "Cookies" },
  { id: "why", label: "Why we're allowed to" },
  { id: "sharing", label: "Who else sees it" },
  { id: "transfers", label: "Leaving Nigeria" },
  { id: "retention", label: "How long we keep it" },
  { id: "rights", label: "Your rights" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      kicker="Privacy"
      title="What we hold, and"
      accent="why"
      lede="Written against what the software actually does, not copied from a template. If something here doesn't match what you see in the product, that's a bug — tell us."
      updated={LAST_UPDATED}
      sections={sections}
    >
      <LegalSection id="who-we-are" heading="Who we are">
        <p>
          Farmgreene is not a registered company. It is built and run by{" "}
          {CONTROLLER.name} in {CONTROLLER.country}, and under the Nigeria Data
          Protection Act 2023 he is personally the data controller for
          everything described here. When Farmgreene is incorporated, the
          company will take on that role and this page will say so.
        </p>
        <p>
          You can reach the controller at{" "}
          <LegalLink href={`mailto:${CONTROLLER.email}`} external>
            {CONTROLLER.email}
          </LegalLink>
          . There is no separate privacy team — the same person who wrote the
          code answers the email.
        </p>
      </LegalSection>

      <LegalSection id="what-we-collect" heading="What we collect">
        <p>
          Only what a feature needs in order to work. Grouped by the thing you
          were doing when you gave it to us:
        </p>
        <p className="font-medium text-bark">Making an account</p>
        <LegalList
          items={[
            "Your name and email address.",
            "Your password, stored only as a hash — we cannot read it, and neither can anyone who takes a copy of the database.",
            "The role you chose: farmer, equipment owner or agent.",
            "The date and time you last signed in.",
          ]}
        />
        <p className="font-medium text-bark">Listing equipment</p>
        <LegalList
          items={[
            "Details of the machine: type, make, model, year, condition, service history.",
            "Your rates, deposit, minimum and maximum rental, cancellation terms.",
            "Where the equipment is: state, LGA, city, and any landmark you add. This is the equipment's location, not yours.",
            "Photographs you upload.",
            "Proof of ownership, and an insurance certificate if you add one. These are identity-adjacent documents and are treated as the most sensitive thing on the platform.",
          ]}
        />
        <p className="font-medium text-bark">Renting, watching and reporting</p>
        <LegalList
          items={[
            "Rental requests: the dates you asked for, the cost breakdown at the time, and any note attached.",
            "Your watchlist, your price alert targets, and your quiet hours.",
            "Reports you generate and save, and the settings you built them from.",
          ]}
        />
        <p className="font-medium text-bark">Collecting prices, if you're an agent</p>
        <LegalList
          items={[
            "The assignments given to you, the prices you submit, the market and date you recorded them at, and whether each submission was approved.",
          ]}
        />
        <p className="font-medium text-bark">Writing to us</p>
        <LegalList
          items={[
            "Contact form: your name, email, optional organisation, and your message.",
            "Waitlist: your email, which role you're waiting for, and the area you said you could cover.",
          ]}
        />
      </LegalSection>

      <LegalSection id="what-we-dont" heading="What we don't do">
        <p>
          Worth stating plainly, because most policies leave it ambiguous:
        </p>
        <LegalList
          items={[
            "There is no analytics on this site. No Google Analytics, no tag manager, no product analytics, no session recording, no heatmaps.",
            "There are no advertising or social media tracking pixels.",
            "We do not sell personal data, and we do not share it with data brokers or advertisers.",
            "We do not build behavioural profiles or make automated decisions that have legal effects on you.",
            "We do not track you across other websites.",
          ]}
        />
      </LegalSection>

      <LegalSection id="location" heading="Your device location">
        <LegalNote>
          Your coordinates never reach our servers. They are read in your
          browser, used there, and discarded when you close the page.
        </LegalNote>
        <p>
          One feature uses location: finding equipment near you in the
          marketplace. It works like this — you press a button, your browser
          asks whether you want to share your location, and if you agree the
          coordinates are held in the page's memory just long enough to measure
          which listings fall within about 100km of you.
        </p>
        <p>
          We never ask for it automatically, we ask for coarse rather than
          precise accuracy, and we never write it to a database, a cookie, or a
          log. Refusing costs you nothing but that one filter; you can still
          browse every listing and filter by state instead.
        </p>
        <p>
          Because the coordinates never leave your device, there is nothing for
          us to retain, export or delete. If you want to revoke the permission
          entirely, that's done in your browser's site settings, not here.
        </p>
      </LegalSection>

      <LegalSection id="cookies" heading="Cookies">
        <p>
          Farmgreene sets <strong>one</strong> cookie. It holds your sign-in
          session so you don't have to log in again on every page, it expires
          after seven days, and it is marked <code>SameSite=Lax</code> and{" "}
          <code>Secure</code> in production.
        </p>
        <p>
          That cookie is strictly necessary — the service cannot work without
          it, so it does not require your consent, and there is no way to turn
          it off while staying signed in. We have no analytics, advertising or
          preference cookies to ask you about. If that ever changes, those
          cookies will be off by default and you will be asked first.
        </p>
        <p>
          We also use your browser's local storage to remember that you have
          dismissed the cookie notice. That never leaves your device.
        </p>
      </LegalSection>

      <LegalSection id="why" heading="Why we're allowed to">
        <p>Our lawful bases under the NDPA:</p>
        <LegalList
          items={[
            <>
              <strong>Performance of a contract</strong> — running your account,
              publishing your listings, passing rental requests to owners.
            </>,
            <>
              <strong>Consent</strong> — the waitlist, and your browser
              permission for location. You can withdraw either at any time.
            </>,
            <>
              <strong>Legitimate interests</strong> — reviewing listings and
              price submissions before they publish, and keeping the platform
              secure and free of abuse. We think you'd expect both.
            </>,
            <>
              <strong>Legal obligation</strong> — where we're required to keep
              or produce records.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection id="sharing" heading="Who else sees it">
        <p>
          A small number of processors, each doing one job under our
          instructions:
        </p>
        <LegalList
          items={[
            <>
              <strong>Cloudinary</strong> — stores the photographs and the
              ownership documents you upload.
            </>,
            <>
              <strong>Resend</strong> — delivers our email: sign-up
              confirmations, password resets, price alerts, the daily digest,
              and messages sent through the contact form.
            </>,
            <>
              <strong>Groq</strong> — generates the written market analysis.
              This one only ever receives commodity price data. Your name,
              email and account details are never sent to it.
            </>,
          ]}
        />
        <p>
          Other people using Farmgreene see less than you might assume. On a
          public listing, the owner's first name and profile photo are shown; the
          exact address, phone number and email are stripped server-side and only
          shared once a rental is agreed between you.
        </p>
        <p>
          We would also disclose data if we were legally required to. We have
          never received such a request.
        </p>
      </LegalSection>

      <LegalSection id="transfers" heading="Leaving Nigeria">
        <p>
          The processors above operate outside Nigeria, which means your data is
          transferred abroad. Part IX of the NDPA permits this where there are
          appropriate safeguards, and we rely on the contractual terms each
          provider offers.
        </p>
        <p>
          We keep the list short on purpose. Every additional service is another
          country your data sits in and another company that has to be trusted
          with it.
        </p>
      </LegalSection>

      <LegalSection id="retention" heading="How long we keep it">
        <LegalList
          items={[
            "Account data: while your account exists. Delete your account and we delete it, except where we're required to keep records.",
            "Listings and rental requests: while the listing is live, and afterwards as a record of what was agreed between the parties.",
            "Ownership and insurance documents: while the listing they belong to exists. Ask and we will delete them sooner.",
            "Price submissions: kept indefinitely. They are the historical record the whole platform is built on, and they identify a crop, a market and a date rather than a person.",
            "Waitlist entries: until we launch in your area, or until you ask to come off.",
            "Contact messages: they arrive as email and stay in the mailbox unless you ask us to delete them.",
          ]}
        />
      </LegalSection>

      <LegalSection id="rights" heading="Your rights">
        <p>Under the NDPA you can ask us to:</p>
        <LegalList
          items={[
            "Show you what we hold about you.",
            "Correct anything that's wrong.",
            "Delete it.",
            "Stop or limit what we're doing with it.",
            "Hand it to you in a portable form.",
            "Withdraw consent you previously gave, without affecting what happened before you withdrew it.",
          ]}
        />
        <p>
          Email{" "}
          <LegalLink href={`mailto:${CONTROLLER.email}`} external>
            {CONTROLLER.email}
          </LegalLink>{" "}
          and we'll act within 30 days. It's one person, so it may take a few of
          those days — but it will not take longer.
        </p>
        <p>
          If we handle it badly, you can complain to the Nigeria Data Protection
          Commission. That right exists whether or not you come to us first.
        </p>
      </LegalSection>

      <LegalSection id="children" heading="Children">
        <p>
          Farmgreene is not for anyone under 18. We don't knowingly collect data
          about children, and if we discover we have, we delete it.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="Changes">
        <p>
          The product is early and changing quickly, so this page will change
          with it. The date at the top is the honest record of when it last did.
          If a change materially affects you — a new processor, a new category of
          data, a new purpose — we'll email account holders rather than quietly
          amend the page.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="Contact">
        <p>
          Questions, requests and complaints all go to the same place:{" "}
          <LegalLink href={`mailto:${CONTROLLER.email}`} external>
            {CONTROLLER.email}
          </LegalLink>
          , or through the{" "}
          <LegalLink href="/contact">contact page</LegalLink>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
