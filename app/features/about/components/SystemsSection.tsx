import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'
import { BarVisualizer } from '../../../components/elevenlabs/BarVisualizer'

const systems = [
  { code: 'ВТСС', name: 'Внутренние телефонные сети связи', description: 'Структурированные кабельные системы (СКС), кроссовое оборудование, этажные распределительные шкафы, кабель-каналы и лотки внутри здания.', progress: 100 },
  { code: 'СВН', name: 'Система видеонаблюдения', description: 'IP-камеры, регистраторы (NVR), коммутаторы PoE, кабельная инфраструктура видеонаблюдения и интеграция с городской системой ЕЦХД.', progress: 100 },
  { code: 'СКД', name: 'Система контроля доступа', description: 'Домофония, считыватели бесконтактных карт, электромагнитные замки, турникеты и контроллеры доступа.', progress: 100 },
  { code: 'ОСО', name: 'Охранно-сигнализационное оборудование', description: 'Охранные извещатели, приёмно-контрольные приборы, тревожные кнопки, защита входных групп и технических помещений.', progress: 95 },
  { code: 'СКТВ', name: 'Система кабельного телевидения', description: 'Коаксиальная и оптическая разводка, домовые усилители, оптические приёмники, абонентские разветвители.', progress: 100 },
  { code: 'ШПД', name: 'Широкополосный доступ в интернет', description: 'Оптоволоконные магистрали FTTH, распределительные муфты, шкафы провайдеров (Ростелеком, МТС, МГТС).', progress: 90 },
  { code: 'АК', name: 'Автоматика и диспетчеризация', description: 'Диспетчеризация инженерных систем, сбор показаний приборов учёта, передача аварийных сигналов в ЕДС.', progress: 85 },
  { code: 'ОЗДС', name: 'Охранно-защитные дератизационные системы', description: 'Электрические барьеры, блоки питания, паспорта, протоколы испытаний и документация по защитным сооружениям ГО.', progress: 100 },
]

export function SystemsSection() {
  const [selected, setSelected] = useState<number>(0)

  return (
    <section id="systems" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">Слаботочный комплекс</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Системы связи и автоматизации
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Полный перечень слаботочных и инженерных систем, по которым ведётся и сдаётся исполнительная документация
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Systems List (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          {systems.map((sys, i) => (
            <button
              key={sys.code}
              onClick={() => setSelected(i)}
              className={`w-full flex items-center gap-3.5 p-4 rounded-[16px] text-left cursor-pointer transition-all ${
                selected === i
                  ? 'bg-card border border-foreground/30 shadow-sm'
                  : 'bg-card/40 border border-border hover:bg-card hover:border-border'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-medium shrink-0 ${
                selected === i ? 'bg-foreground text-background' : 'bg-background border border-border text-foreground'
              }`}>
                {sys.code.slice(0, 3)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-normal text-foreground truncate font-display">{sys.code}</h4>
                <p className="text-xs text-muted-foreground truncate font-normal">{sys.name}</p>
              </div>
              <ArrowRight size={14} className={`shrink-0 transition-transform ${selected === i ? 'text-foreground translate-x-0.5' : 'text-muted-foreground/40'}`} />
            </button>
          ))}
        </div>

        {/* Detailed System Card (7 cols) */}
        <Card className="lg:col-span-7 p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-mono font-medium">
                {systems[selected].code}
              </div>
              <div>
                <h3 className="text-xl font-light text-foreground headline-whisper">{systems[selected].code}</h3>
                <p className="text-xs text-muted-foreground font-normal">{systems[selected].name}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed font-normal">
              {systems[selected].description}
            </p>
            
            {/* Progress Bar & Audio Visualizer Integration */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">Процент сдачи ИД</span>
                <span className="font-semibold text-foreground">{systems[selected].progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                <div 
                  className="h-full rounded-full bg-foreground transition-all duration-500"
                  style={{ width: `${systems[selected].progress}%` }}
                />
              </div>

              {/* ElevenLabs Bar Visualizer Active Stream */}
              <div className="pt-2">
                <BarVisualizer barCount={16} />
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
            <div className="text-center p-3 rounded-[14px] bg-background border border-border">
              <span className="text-xl font-light font-display text-foreground block">17</span>
              <span className="text-[10px] text-muted-foreground uppercase font-mono">Объектов</span>
            </div>
            <div className="text-center p-3 rounded-[14px] bg-background border border-border">
              <span className="text-xl font-light font-display text-foreground block">500+</span>
              <span className="text-[10px] text-muted-foreground uppercase font-mono">Актов АОСР</span>
            </div>
            <div className="text-center p-3 rounded-[14px] bg-background border border-border">
              <span className="text-xl font-light font-display text-foreground block">100%</span>
              <span className="text-[10px] text-muted-foreground uppercase font-mono">Exon сдача</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
