import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "spark" | "secondary"
}

export function Badge({ className, variant = "outline", children, ...props }: BadgeProps) {
  const variantClasses = {
    default: "bg-primary text-primary-foreground border-transparent",
    outline: "bg-background text-foreground border-border",
    secondary: "bg-secondary text-secondary-foreground border-border",
    spark: "bg-card text-foreground border-border relative overflow-hidden",
  }[variant]

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono font-medium uppercase tracking-wider",
        variantClasses,
        className
      )}
      {...props}
    >
      {variant === "spark" && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff4704] animate-pulse shrink-0" />
      )}
      {children}
    </div>
  )
}
