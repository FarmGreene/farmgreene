"use client";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Tractor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t dark:bg-slate-950">
      <div className="container pt-42 px-14 max-w-[1440px] mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 pb-24">
          <div className="space-y-6">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Empowering Osun State farmers with shared machinery, community
              funding, and real-time market intelligence.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-green-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-green-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-green-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-green-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">
              Platform
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/marketplace"
                  className="hover:text-green-600 transition-colors"
                >
                  Equipment Rentals
                </Link>
              </li>
              <li>
                <Link
                  href="/co-op"
                  className="hover:text-green-600 transition-colors"
                >
                  Co-op Funding
                </Link>
              </li>
              <li>
                <Link
                  href="/market-prices"
                  className="hover:text-green-600 transition-colors"
                >
                  Market Price Index
                </Link>
              </li>
              <li>
                <Link
                  href="/agents"
                  className="hover:text-green-600 transition-colors"
                >
                  Agent Portal
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">
              Company
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-green-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-green-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-green-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-green-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest agricultural trends and
              platform updates.
            </p>
            <form
              className="flex space-x-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-muted-foreground pb-24">
          <p>© {new Date().getFullYear()} Farmgreene. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-foreground transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
