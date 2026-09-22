import { Quote, Star } from 'lucide-react'
import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'

const testimonials = [
  {
    author: 'Михаил Смирнов',
    role: 'Главный инженер проекта (ГИП)',
    company: 'Генподрядная организация',
    text: 'Артемий перевел сдачу слаботочки в Exon на принципиально новый уровень. То, что раньше висело месяцами из-за мелких замечаний технадзора, стало закрываться с первого захода. Отдельная благодарность за порядок в ведомостях ВОР.',
    rating: 5,
  },
  {
    author: 'Елена Васильева',
    role: 'Руководитель группы строительного контроля',
    company: 'Технический заказчик',
    text: 'Очень высокая культура оформления исполнительной документации. Все реестры, АОСР и паспорта всегда структурированы, без разночтений с проектом. Приятно работать с инженером, который ценит время коллег.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">Обратная Связь</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Отзывы коллег и заказчиков
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Мнения главных инженеров проектов и специалистов технического надзора о совместной работе
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, idx) => (
          <Card key={idx} className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Quote size={24} className="text-muted-foreground/40" />
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-foreground text-foreground" />
                  ))}
                </div>
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed font-normal italic">
                «{t.text}»
              </p>
            </div>

            <div className="pt-4 border-t border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs font-mono">
                {t.author.slice(0, 2)}
              </div>
              <div>
                <h4 className="text-sm font-normal text-foreground font-display">{t.author}</h4>
                <p className="text-xs text-muted-foreground font-mono">{t.role} • {t.company}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
