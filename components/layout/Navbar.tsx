"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Intelligence", href: "/intelligence" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-[1440px] mx-auto px-6 lg:px-14">
        <div className="flex items-center gap-12">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80 py-1 border-b-2",
                  pathname === link.href
                    ? "text-green-600 border-green-600"
                    : "text-foreground/60 border-transparent"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-10">
                {/* Mobile Logo */}
                <div className="px-4">
                  <Logo textSize="text-2xl" />
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-4 px-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-2 py-2 text-lg font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md",
                        pathname === link.href
                          ? "text-green-600 bg-green-50 dark:bg-green-900/10"
                          : "text-foreground/80"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Buttons */}
                <div className="flex flex-col gap-4 mt-4 px-4">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full h-11 text-base">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-11 text-base bg-green-600 hover:bg-green-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
