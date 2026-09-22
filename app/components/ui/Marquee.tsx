import { Children } from 'react'

export interface MarqueeProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  speed?: number
  pauseOnHover?: boolean
  gap?: string
  className?: string
  fade?: boolean
}

export function Marquee({
  children,
  direction = 'left',
  speed = 30,
  pauseOnHover = true,
  gap = '1rem',
  className = '',
  fade = true,
}: MarqueeProps) {
  const vertical = direction === 'up' || direction === 'down'
  const reverse = direction === 'right' || direction === 'down'
  const items = Children.toArray(children)

  return (
    <div
      className={`group relative flex overflow-hidden ${vertical ? 'flex-col' : 'flex-row'} ${fade && !vertical ? '[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]' : ''} ${fade && vertical ? '[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]' : ''} ${className}`}
      style={{ gap } as any}
    >
      {[0, 1].map((dup) => (
        <div
          key={dup}
          style={{
            animationDuration: `${speed}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
            gap,
            display: 'flex',
            flexShrink: 0,
            alignItems: 'center',
            flexDirection: vertical ? 'column' : 'row',
          } as React.CSSProperties}
          className={`${vertical ? 'animate-marquee-vertical' : 'animate-marquee'} ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        >
          {items.map((child: any, i: number) => (
            <div key={i} className="shrink-0">
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
