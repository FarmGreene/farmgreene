import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { AuthPanel } from "@/components/marketing/shared/AuthPanel";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your Farmgreene password. Enter your email and we'll send you a link to get back into your account.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-64px)] lg:grid-cols-2">
      <AuthPanel />
      <div className="flex items-center justify-center bg-field px-6 py-16">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
