import { useState, useEffect } from 'react'

interface SectionItem {
  id: string
  label: string
}

interface LineNavProps {
  sections: SectionItem[]
}

export function LineNav({ sections }: LineNavProps) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300 // Offset for active trigger

      // Find the current active section
      for (const section of sections) {
        const el = document.getElementById(section.id || 'hero')
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
      // Default to first section if at very top
      if (window.scrollY < 100) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Initial call
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const el = id === '' ? document.documentElement : document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-4">
      {/* Scroll indicator line */}
      <div className="relative w-[2px] h-[320px] bg-border rounded-full flex flex-col justify-between items-center py-2">
        {/* Dynamic active line progress overlay */}
        <div 
          className="absolute top-0 w-full bg-gradient-to-b from-primary to-accent rounded-full transition-all duration-300"
          style={{
            height: `${
              (sections.findIndex(s => s.id === activeSection) + 1) * 
              (100 / (sections.length + 1))
            }%`
          }}
        />

        {/* Section dots */}
        {sections.map((sec) => {
          const isActive = activeSection === sec.id
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative flex items-center justify-center w-6 h-6 focus:outline-none cursor-pointer z-10"
              aria-label={`Перейти к разделу ${sec.label}`}
            >
              {/* Dot indicator */}
              <div 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary scale-125 shadow-[0_0_10px_rgba(255,0,34,0.6)]' 
                    : 'bg-muted-foreground/45 group-hover:bg-foreground group-hover:scale-110'
                }`}
              />

              {/* Tooltip Label on Hover */}
              <div className="absolute right-8 px-2.5 py-1 rounded bg-black/90 text-white font-mono text-[9px] uppercase tracking-wider whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md border border-white/10">
                {sec.label}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
