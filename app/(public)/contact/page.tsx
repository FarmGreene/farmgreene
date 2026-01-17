import { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactOptions from "@/components/contact/ContactOptions";
import ContactForm from "@/components/contact/ContactForm";
import ContactPresence from "@/components/contact/ContactPresence";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactCTA from "@/components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Farmgreene. Whether you're a farmer, agent, or agribusiness, we're here to help with support, partnerships, and market intelligence.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ContactHero />
      <ContactOptions />
      <ContactForm />
      <ContactPresence />
      <ContactFAQ />
      <ContactCTA />
    </div>
  );
}
