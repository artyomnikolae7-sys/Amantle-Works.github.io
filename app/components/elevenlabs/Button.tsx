import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline" | "ghost" | "secondary"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "filled", size = "md", children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-full transition-all cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
    
    const sizeClasses = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5 font-mono",
      md: "text-sm px-5 py-2 gap-2",
      lg: "text-base px-7 py-3 gap-2.5",
    }[size]

    const variantClasses = {
      filled: "bg-primary text-primary-foreground hover:opacity-90 border border-transparent shadow-sm",
      outline: "bg-background text-foreground border border-border hover:bg-secondary",
      ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
    }[variant]

    return (
      <button
        ref={ref}
        className={cn(baseClasses, sizeClasses, variantClasses, className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
