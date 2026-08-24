import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { AuthPanel } from "@/components/marketing/shared/AuthPanel";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to Farmgreene to access your watchlist, price alerts and equipment rentals.",
};

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-64px)] lg:grid-cols-2">
      <AuthPanel />
      <div className="flex items-center justify-center bg-field px-6 py-16">
        <LoginForm />
      </div>
    </div>
  );
}
