import type { ButtonHTMLAttributes } from "react"
import { cn } from "../lib/utils" // FIX: Using reliable relative path

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost"
}

// FIX: Changed to 'export default function'
export default function GlowButton({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        "relative rounded-md px-4 py-2 text-sm font-medium transition-transform active:scale-95",
        "bg-primary text-primary-foreground shadow-[0_0_24px_theme(colors.primary/60%)] hover:shadow-[0_0_36px_theme(colors.primary/80%)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "ghost" && "bg-transparent text-foreground border border-border hover:bg-accent",
        className,
      )}
    />
  )
}
