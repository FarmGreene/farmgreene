import React from "react";
import { useRegisterStore } from "@/lib/store/useRegisterStore";
import { cn } from "@/lib/utils";
import { Users, Tractor, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";

export const roles = [
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

export default function SelectRole() {
  const { role, setRole, setStep } = useRegisterStore();

  const handleRoleSelect = (selectedRole: "FARMER" | "OWNER" | "AGENT") => {
    setRole(selectedRole);
  };

  const handleContinue = () => {
    if (!role) return;
    setStep(2);
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 gap-4">
        {roles.map((r) => {
          const Icon = r.icon;
          return (
            <div
              key={r.id}
              onClick={() =>
                handleRoleSelect(r.id as "FARMER" | "OWNER" | "AGENT")
              }
              className={cn(
                "relative flex items-center gap-4 p-6 cursor-pointer rounded-xl border-2 transition-all hover:bg-slate-50 dark:hover:bg-slate-900",
                role === r.id
                  ? "border-green-600 bg-green-50/50 dark:border-green-500 dark:bg-green-900/10 shadow-sm"
                  : "border-muted hover:border-green-200 dark:hover:border-green-800"
              )}
            >
              <div
                className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  role === r.id
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-lg">{r.title}</div>
                <p className="text-sm text-muted-foreground leading-normal">
                  {r.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        className="w-full rounded-full bg-green-600 hover:bg-green-700"
        disabled={!role}
        onClick={handleContinue}
      >
        continue
      </Button>
    </div>
  );
}
