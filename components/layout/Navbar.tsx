"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Action } from "@/components/marketing/ui";

/**
 * Pricing is deliberately absent: there is no payment flow yet, so the page
 * exists but stays unlinked until it's real. Agents is linked because the
 * field-agent signup flow genuinely works.
 */
const navLinks = [
  { name: "About", href: "/about" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Intelligence", href: "/intelligence" },
  // { name: "Agents", href: "/agents" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  return (
    <header
      className={cn(
        "sticky top-[46px] z-50 w-full backdrop-blur-md",
        "border-bark/10 bg-field/90",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-10 lg:gap-14">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-[14px] font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:rounded-sm",
                    active ? "text-bark" : "text-bark-soft hover:text-bark",
                  )}
                >
                  {link.name}
                  {active && (
                    <span className="absolute -bottom-px left-0 h-0.5 w-full bg-leaf" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Action href="/dashboard" className="h-10 py-1.5 pl-5 text-[14px]">
              Go to dashboard
            </Action>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  "rounded-sm px-3 py-2 text-[14px] font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf",
                  "text-bark-soft hover:text-bark",
                )}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-10 items-center justify-center rounded-full bg-leaf px-5 text-[14px] font-semibold text-white transition-colors hover:bg-leaf-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2"
              >
                Start free
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-sm text-bark",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf",
                )}
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] bg-field border-bark/10 font-body"
            >
              <div className="mt-10 flex flex-col gap-10">
                <div className="px-4">
                  <Logo textSize="text-2xl" />
                </div>

                <nav className="flex flex-col px-4">
                  {navLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "border-b border-bark/10 py-4 text-[17px] font-medium transition-colors",
                          active ? "text-leaf" : "text-bark",
                        )}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex flex-col gap-3 px-4">
                  {isAuthenticated ? (
                    <Action
                      href="/dashboard"
                      className="w-full justify-between"
                    >
                      Go to dashboard
                    </Action>
                  ) : (
                    <>
                      <Action href="/signup" className="w-full justify-between">
                        Start free
                      </Action>
                      <Action
                        href="/login"
                        variant="outline"
                        className="w-full justify-between"
                      >
                        Log in
                      </Action>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
