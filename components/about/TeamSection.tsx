import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, UserPlus, Mail } from "lucide-react";
import Link from "next/link";

// TODO: confirm your real name / title / photo / socials — bio is a draft, tweak freely.
const founder = {
  name: "Emmanuel Owolabi",
  role: "Founder",
  bio: "Solo founder building Farmgreene from the ground up — a market-intelligence and equipment-rental platform for Nigerian agriculture. Software engineer by trade, obsessed with giving farmers and traders the price transparency the market has always lacked.",
  image: "/avatars/emmanuel.jpg",
  initials: "EO",
  linkedin: "#",
  twitter: "#",
};

// Opens the visitor's mail client with a pre-filled message addressed to you.
const CONTACT_EMAIL = "emmycookcodes@gmail.com";
const JOIN_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "I'd like to join Farmgreene"
)}&body=${encodeURIComponent(
  "Hello,\n\nI came across Farmgreene and I'm interested in what you're building. Here's a bit about me:\n\n"
)}`;

const OPEN_SLOTS = 2;

export default function TeamSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Meet the Team
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Right now it&apos;s mostly just me — building Farmgreene one market at
            a time. But there&apos;s room for the right people. If the mission
            resonates, the next seat could be yours.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Founder */}
          <div className="group text-center space-y-4">
            <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden ring-4 ring-slate-100 dark:ring-slate-800 transition-transform group-hover:scale-105">
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={founder.image}
                  alt={founder.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl bg-slate-200 dark:bg-slate-800 text-slate-500">
                  {founder.initials}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">{founder.name}</h3>
              <p className="text-emerald-600 font-medium text-sm tracking-wide uppercase">
                {founder.role}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed px-4">
                {founder.bio}
              </p>
            </div>

            {(founder.linkedin !== "#" || founder.twitter !== "#") && (
              <div className="flex justify-center gap-4 pt-2">
                {founder.linkedin !== "#" && (
                  <Link
                    href={founder.linkedin}
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                )}
                {founder.twitter !== "#" && (
                  <Link
                    href={founder.twitter}
                    className="text-slate-400 hover:text-sky-500 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Open slots — "you could be here" */}
          {Array.from({ length: OPEN_SLOTS }).map((_, index) => (
            <div
              key={index}
              className="group text-center space-y-4 flex flex-col items-center"
            >
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700 transition-colors group-hover:border-emerald-400">
                <UserPlus className="h-12 w-12 text-slate-300 dark:text-slate-600 transition-colors group-hover:text-emerald-500" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold">You could be here</h3>
                <p className="text-emerald-600 font-medium text-sm tracking-wide uppercase">
                  Open seat
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed px-4">
                  We&apos;re tiny and just getting started. If building the future
                  of African agriculture excites you, let&apos;s talk.
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-900 dark:text-emerald-400 dark:hover:bg-emerald-950"
              >
                <a href={JOIN_MAILTO}>
                  <Mail className="h-4 w-4 mr-2" />
                  Get in touch
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
