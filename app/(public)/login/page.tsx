import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to Farmgreene to access your dashboard and manage equipment or rentals.",
};
import { Logo } from "@/components/layout/Logo";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-64px)] lg:grid-cols-2 xl:min-h-[calc(100vh-64px)]">
      <div className="hidden bg-green-900 lg:flex lg:flex-col lg:justify-between lg:p-14 lg:text-white">
        <div className="text-white">
          <Logo textSize="text-3xl" variant="white" />
        </div>
        <div className="space-y-4">
          <blockquote className="space-y-2">
            <p className="text-2xl font-medium leading-relaxed">
              "Farmgreene has transformed how we access equipment. It's not just
              a marketplace; it's a community that understands agriculture."
            </p>
            <footer className="text-sm text-green-200">
              — Adebayo O., Osun State Farmer Cooperative
            </footer>
          </blockquote>
        </div>
        <div className="text-green-200 text-sm">
          Empowering smarter access to agriculture <br /> and market
          intelligence.
        </div>
      </div>
      <div className="flex items-center justify-center py-12 px-6">
        <LoginForm />
      </div>
    </div>
  );
}
