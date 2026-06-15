import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const team = [
  {
    name: "Emmanuel Owolabi",
    role: "Founder & CEO",
    bio: "Agriculture enthusiast with 10+ years of experience in ag-tech and supply chain optimization.",
    image: "/avatars/emmanuel.jpg", // Placeholder
    initials: "EO",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Amina Yusuf",
    role: "Chief Operations Officer",
    bio: "Expert in logistics and rural community engagement, ensuring our operations reach the last mile.",
    image: "/avatars/amina.jpg", // Placeholder
    initials: "AY",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "David Chen",
    role: "Head of Engineering",
    bio: "Building scalable platforms that connect disjointed markets with seamless technology.",
    image: "/avatars/david.jpg", // Placeholder
    initials: "DC",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Sarah Okeke",
    role: "Product Design Lead",
    bio: "Crafting intuitive experiences that make complex agricultural data accessible to everyone.",
    image: "/avatars/sarah.jpg", // Placeholder
    initials: "SO",
    linkedin: "#",
    twitter: "#",
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="w-[1440px] max-w-full mx-auto px-6 lg:px-14">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Meet the Team
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We are a group of farmers, engineers, and problem-solvers passionate
            about the future of agriculture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group text-center space-y-4">
              <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden ring-4 ring-slate-100 dark:ring-slate-800 transition-transform group-hover:scale-105">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={member.image}
                    alt={member.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl bg-slate-200 dark:bg-slate-800 text-slate-500">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-emerald-600 font-medium text-sm tracking-wide uppercase">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed px-4">
                  {member.bio}
                </p>
              </div>

              <div className="flex justify-center gap-4 pt-2">
                <Link
                  href={member.linkedin}
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href={member.twitter}
                  className="text-slate-400 hover:text-sky-500 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
