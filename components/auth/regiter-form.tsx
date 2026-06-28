"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, Tractor, Users, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRegisterStore } from "@/store/useRegisterStore";
import Role from "./select-role";

const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(["FARMER", "OWNER", "AGENT"], {
    message: "Please select a role",
  }),
});

type RegisterValues = z.infer<typeof registerSchema>;

const roles = [
  {
    id: "FARMER",
    title: "Farmer / User",
    description: "Access equipment, explore market prices, and gain insights.",
    icon: Users,
  },
  {
    id: "OWNER",
    title: "Equipment Owner",
    description: "List equipment, manage rentals, and track earnings.",
    icon: Tractor,
  },
  {
    id: "AGENT",
    title: "Market Agent",
    description: "Submit market price data and contribute to transparency.",
    icon: ShoppingBag,
  },
];

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { step, role, setStep, setRole } = useRegisterStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: role,
    },
    shouldUnregister: false, // Keep values when unmounting Step 2 inputs
  });

  // Sync role from store to form when it changes
  // This ensures the form submission has the correct role
  // We can also set it when advancing step, but this is safer
  if (role) {
    setValue("role", role);
  }

  async function onSubmit(data: RegisterValues) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo, route to role-specific dashboard (mocked)
      console.log("Registered with:", data);
      router.push("/dashboard");
    }, 1000);
  }

  const handleRoleSelect = (selectedRole: "FARMER" | "OWNER" | "AGENT") => {
    setRole(selectedRole);
    setValue("role", selectedRole);
    setStep(2);
  };

  return (
    <div className="mx-auto w-full max-w-[500px] space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {step === 1 ? "Choose Your Path" : "Create Your Account"}
        </h1>
        <p className="text-muted-foreground">
          {step === 1
            ? "Select how you want to use Farmgreene to get started."
            : "Enter your details to complete your registration."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && <Role />}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  autoCapitalize="words"
                  autoComplete="name"
                  disabled={isLoading}
                  {...register("fullName")}
                  className="h-11"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("email")}
                  className="h-11"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  {...register("password")}
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  Use a valid email address. You’ll need it to sign in.
                </p>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                className="w-full h-11 bg-[#049878] hover:bg-green-700 text-white font-semibold text-base"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep(1)}
                disabled={isLoading}
              >
                Back to Role Selection
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              By creating an account, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        )}
      </form>

      <div className="text-center text-sm text-muted-foreground pt-4 border-t">
        Already have an account?{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary font-medium text-foreground"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
