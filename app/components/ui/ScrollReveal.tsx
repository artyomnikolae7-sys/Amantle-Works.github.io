import React, { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  yOffset?: number
}

export function ScrollReveal({ children, className = '', delay = 0, yOffset = 24 }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If IntersectionObserver is not supported, show immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.05,
        rootMargin: '50px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    // Safety fallback: reveal after 300ms regardless to prevent any white screen
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 400)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      {children}
    </div>
  )
}
