import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'

const milestones = [
  {
    year: '2021',
    title: 'Старт карьеры в линейном ПТО',
    desc: 'Ведение входного контроля материалов и чертежей на объектах кабельной канализации связи Москвы. Первые 45 согласованных трасс в Ростелеком.',
    badge: 'Начало пути',
  },
  {
    year: '2022',
    title: 'Внедрение Excel/VBA автоматизации',
    desc: 'Разработка первых макросов для генерации АОСР и кабельных журналов. Сокращение времени на рутинное заполнение актов с 3 дней до 2 часов.',
    badge: 'Оптимизация',
  },
  {
    year: '2023',
    title: 'Переход на цифровые ИС (Exon)',
    desc: 'Сертификация и полный перевод процессов согласования исполнительной документации в цифровую среду Exon на масштабных жилых комплексах.',
    badge: 'Цифровизация',
  },
  {
    year: '2024 — н. в.',
    title: 'Ведущий инженер ПТО и масштабные объекты',
    desc: 'Курирование сдачи слаботочного комплекса ИД на 12 объектах одновременно. Создание сквозных Power Query дашбордов и веб-инструментов.',
    badge: 'Лидерство',
  },
]

export function TimelineSection() {
  return (
    <section id="timeline" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">Этапы Развития</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Профессиональная хронология
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Эволюция от инженера на площадке до ведущего специалиста по цифровой исполнительной документации
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {milestones.map((m, idx) => (
          <Card key={idx} className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-light font-display text-foreground">{m.year}</span>
                <Badge variant="secondary">{m.badge}</Badge>
              </div>

              <h4 className="text-base font-normal text-foreground font-display leading-snug">
                {m.title}
              </h4>

              <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                {m.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-border flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
              <span>Этап {idx + 1}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
