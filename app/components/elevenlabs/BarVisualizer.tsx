import React, { useEffect, useState } from "react"
import { cn } from "../../lib/utils"

export interface BarVisualizerProps {
  barCount?: number
  className?: string
  active?: boolean
}

export function BarVisualizer({ barCount = 18, className, active = true }: BarVisualizerProps) {
  const [heights, setHeights] = useState<number[]>(() =>
    new Array(barCount).fill(25)
  )

  useEffect(() => {
    if (!active) {
      setHeights(new Array(barCount).fill(15))
      return
    }

    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: barCount }, (_, i) => {
          const wave = Math.sin(Date.now() / 300 + i * 0.4) * 35 + 50
          const noise = Math.random() * 20
          return Math.min(100, Math.max(12, wave + noise))
        })
      )
    }, 80)

    return () => clearInterval(interval)
  }, [active, barCount])

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1 h-12 w-full px-4 py-2 rounded-full bg-secondary/80 border border-border overflow-hidden",
        className
      )}
    >
      {heights.map((h, idx) => (
        <div
          key={idx}
          className="w-1 rounded-full bg-foreground transition-all duration-100 ease-out"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}
