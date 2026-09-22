import React from "react"
import { cn } from "../../lib/utils"

export interface OrbProps {
  className?: string
  size?: number
}

export function Orb({ className, size = 300 }: OrbProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center pointer-events-none select-none", className)}
      style={{ width: size, height: size }}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-60 animate-pulse"
        style={{
          background: "radial-gradient(circle at 35% 35%, #0447ff 0%, #ff4704 60%, rgba(255, 71, 4, 0.2) 100%)",
          animationDuration: "8s",
        }}
      />

      {/* Main Organic Orb Sphere */}
      <div
        className="relative w-4/5 h-4/5 rounded-full shadow-2xl overflow-hidden backdrop-blur-sm transition-transform duration-700"
        style={{
          background: "radial-gradient(circle at 30% 30%, #CADCFC 0%, #0447ff 35%, #ff4704 70%, #171615 100%)",
          boxShadow: "inset -10px -10px 30px rgba(0,0,0,0.5), 0 20px 40px rgba(4, 71, 255, 0.25)",
        }}
      >
        {/* Internal Light Shimmer */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            background: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.9) 0%, transparent 60%)",
          }}
        />
      </div>
    </div>
  )
}
