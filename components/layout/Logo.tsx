import Link from "next/link";
import { Tractor } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  iconSize?: number;
  textSize?: string;
  variant?: "default" | "white";
}

export function Logo({
  iconSize = 32,
  textSize = "text-xl",
  variant = "default",
}: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <div className="relative flex items-center justify-center">
        {/* Abstract Leaf/Field Icon - Using Tractor as a placeholder since Leaf is not imported */}
        <Tractor
          size={iconSize}
          className={cn(
            variant === "white"
              ? "text-green-400 fill-green-400/20"
              : "text-green-600 fill-green-100"
          )}
          strokeWidth={2.5}
        />
      </div>
      <span
        className={cn(
          "font-heading font-bold tracking-tight",
          textSize,
          variant === "white" ? "text-white" : "text-foreground"
        )}
      >
        Farmgreene
      </span>
    </Link>
  );
}
