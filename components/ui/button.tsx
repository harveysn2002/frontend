import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-base font-bold transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-brand-primary text-white hover:bg-brand-dark",
        variant === "secondary" &&
          "border border-brand-primary/25 bg-white text-brand-primary hover:bg-brand-soft/40",
        variant === "ghost" && "bg-transparent text-brand-primary hover:bg-brand-soft/40",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
