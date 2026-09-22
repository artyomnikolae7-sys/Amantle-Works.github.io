import { Award, MapPin, Calendar, Building, FileStack, FileCheck2, Wrench } from 'lucide-react'
import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'
import content from '../../../data/content.json'

export function AboutSection() {
  const facts = content.about.facts.map(f => {
    let Icon = Building
    if (f.icon === 'FileStack') Icon = FileStack
    if (f.icon === 'FileCheck2') Icon = FileCheck2
    if (f.icon === 'Wrench') Icon = Wrench
    
    return { ...f, icon: Icon }
  })

  return (
    <section id="about" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">{content.about.sectionTag}</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          {content.about.title.part1} {content.about.title.part2} {content.about.title.part3}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bio Card (ElevenLabs Card Primitive) */}
        <Card className="lg:col-span-7 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm font-mono">
                АН
              </div>
              <div>
                <h3 className="text-lg font-normal text-foreground font-display">{content.about.profile.name}</h3>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{content.about.profile.role}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed font-normal">
              {content.about.profile.bio}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-foreground/70" />
              <span>{content.about.profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-foreground/70" />
              <span>{content.about.profile.experience}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={14} className="text-foreground/70" />
              <span>{content.about.profile.education}</span>
            </div>
          </div>
        </Card>

        {/* Stats Grid (5 cols, 2x2 cards) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {facts.map((f) => (
            <Card key={f.label} className="p-6 text-center space-y-2 flex flex-col justify-center items-center gap-2">
              <f.icon size={20} strokeWidth={1.5} className="text-foreground/70 mx-auto" />
              <span className="text-2xl sm:text-3xl font-light font-display text-foreground block tracking-tight">{f.value}</span>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono font-medium leading-tight">{f.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
