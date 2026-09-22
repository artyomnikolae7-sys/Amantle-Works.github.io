import { useState } from 'react'
import { CheckCircle2, ArrowRight, X, Sparkles } from 'lucide-react'
import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'
import { Button } from '../../../components/elevenlabs/Button'
import { CASES } from '../data/casesData'

export function CasesSection() {
  const [activeCaseId, setActiveCaseId] = useState<number | null>(null)

  const activeCase = CASES.find(c => c.id === activeCaseId)

  return (
    <section id="cases" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">Оптимизация и Автоматизация</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Прикладные инженерные кейсы
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          7 практических примеров того, как рутинные задачи ПТО переводятся в алгоритмы и цифровые конвейеры данных
        </p>
      </div>

      {/* Grid of Cases (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CASES.map((c) => (
          <Card
            key={c.id}
            onClick={() => setActiveCaseId(c.id)}
            className="p-8 flex flex-col justify-between space-y-6 cursor-pointer group hover:border-foreground/30 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline">Кейс {String(c.id).padStart(2, '0')}</Badge>
                <span className="w-7 h-7 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:bg-secondary transition-all">
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              <h3 className="text-base font-normal text-foreground group-hover:underline font-display leading-snug">
                {c.title}
              </h3>

              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {c.problem}
              </p>
            </div>

            <div className="pt-4 border-t border-border space-y-1.5">
              <div className="text-[11px] font-mono text-foreground font-medium truncate">
                🛠️ {c.tools}
              </div>
              <div className="text-[11px] text-muted-foreground line-clamp-2">
                ✅ {c.result}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Dialog for Active Case */}
      {activeCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="card-whisper max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 rounded-[24px] shadow-2xl space-y-6 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveCaseId(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Закрыть"
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <Badge variant="outline">Кейс {String(activeCase.id).padStart(2, '0')}</Badge>
              <h3 className="text-2xl font-light text-foreground headline-whisper">
                {activeCase.title}
              </h3>
            </div>

            {/* Problem */}
            <div className="p-5 rounded-[16px] bg-card border border-border space-y-1.5">
              <h4 className="text-xs font-mono font-semibold text-foreground uppercase">Проблема и исходная ситуация:</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{activeCase.problem}</p>
            </div>

            {/* Tools */}
            <div className="p-5 rounded-[16px] bg-card border border-border space-y-1.5">
              <h4 className="text-xs font-mono font-semibold text-foreground uppercase">Использованный стек:</h4>
              <p className="text-xs text-foreground font-mono">{activeCase.tools}</p>
            </div>

            {/* Work Completed */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold text-foreground uppercase">Что было сделано:</h4>
              <ul className="space-y-2">
                {activeCase.work.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <CheckCircle2 size={15} className="text-foreground shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Result */}
            <div className="p-5 rounded-[16px] bg-card border border-border space-y-1.5">
              <h4 className="text-xs font-mono font-semibold text-foreground uppercase flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#ff4704]" /> Результат и экономический эффект:
              </h4>
              <p className="text-xs text-foreground font-medium leading-relaxed">{activeCase.result}</p>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}
