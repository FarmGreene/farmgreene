import Link from "next/link";
import { Tractor } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

interface LogoProps {
  iconSize?: number;
  textSize?: string;
  variant?: "default" | "white";
}

export function Logo({
  iconSize = 50,
  textSize = "text-xl",
  variant = "default",
}: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <div className="relative flex items-center justify-center">
        <Image
          src={logo}
          alt="logo"
          width={iconSize}
          height={iconSize}
          className="rounded-lg"
        />
      </div>
      <span
        className={cn(
          "font-heading font-bold tracking-tight",
          textSize,
          variant === "white" ? "text-white" : "text-foreground",
        )}
      >
        Farm<span className="text-[#049878]">greene</span>
      </span>
    </Link>
  );
}
