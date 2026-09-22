import React from "react"
import { cn } from "../../lib/utils"

export interface ShimmeringTextProps {
  text: string
  className?: string
}

export function ShimmeringText({ text, className }: ShimmeringTextProps) {
  return (
    <span
      className={cn(
        "relative inline-block bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer",
        className
      )}
    >
      {text}
    </span>
  )
}
