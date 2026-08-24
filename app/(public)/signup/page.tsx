import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthPanel } from "@/components/marketing/shared/AuthPanel";

export const metadata: Metadata = {
  title: "Create an Account",
  description:
    "Join Farmgreene as a farmer or an equipment owner — free while we're in early access.",
};

export default function RegisterPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-64px)] lg:grid-cols-2">
      <AuthPanel />
      <div className="flex items-center justify-center bg-field px-6 py-16">
        <RegisterForm />
      </div>
    </div>
  );
}
