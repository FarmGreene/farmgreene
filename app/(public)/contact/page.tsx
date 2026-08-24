import { Metadata } from "next";
import {
  ContactHero,
  ContactBody,
  ContactFAQ,
} from "@/components/marketing/contact/ContactSections";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Farmgreene — questions about market prices, listing equipment, collecting prices with us, or partnerships.",
};

/**
 * No closing band here, deliberately. Every other page ends by asking for a
 * sign-up; on this one the form is the call to action, and a second one
 * underneath it would only compete.
 */
export default function ContactPage() {
  return (
    <div className="bg-field">
      <ContactHero />
      <ContactBody />
      <ContactFAQ />
    </div>
  );
}
