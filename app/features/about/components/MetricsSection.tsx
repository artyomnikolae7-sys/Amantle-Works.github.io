import { Clock, TrendingUp, ShieldCheck, FileSpreadsheet } from 'lucide-react'
import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'

const metricsData = [
  {
    icon: Clock,
    title: 'Скорость сборки тома ИД',
    before: '4 — 5 рабочих дней',
    after: '3 — 4 часа',
    diff: 'Ускорение в 10 раз',
    desc: 'Благодаря сквозным шаблонам в Excel и макросам автозаполнения шапок и реестров.',
  },
  {
    icon: ShieldCheck,
    title: 'Первичное согласование в Exon',
    before: '45% с первого захода',
    after: '92% без замечаний',
    diff: '+47% к первой сдаче',
    desc: 'Строгий преконтроль комплектности сертификатов и паспортов до отправки в систему.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Сведение ведомости ВОР (шахматки)',
    before: '12 часов ручного ввода',
    after: '15 минут в Power Query',
    diff: 'Экономия 95% времени',
    desc: 'Автоматическая консолидация данных с этажных планов и сводных спецификаций.',
  },
  {
    icon: TrendingUp,
    title: 'Трудозатраты на рутину',
    before: '70% рабочего времени',
    after: '15% рабочего времени',
    diff: '-55% рутинного труда',
    desc: 'Освобождение времени на решение ключевых технических вопросов на стройплощадке.',
  },
]

export function MetricsSection() {
  return (
    <section id="metrics" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">Измеримый Результат</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Ключевые метрики эффективности
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Реальный эффект от внедрения цифровых инструментов и автоматизации на строительных объектах
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((m, idx) => (
          <Card key={idx} className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground">
                <m.icon size={18} strokeWidth={1.5} />
              </div>

              <h4 className="text-sm font-normal text-foreground font-display leading-snug">
                {m.title}
              </h4>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Было:</span>
                  <span className="line-through">{m.before}</span>
                </div>
                <div className="flex justify-between font-semibold text-foreground">
                  <span>Стало:</span>
                  <span>{m.after}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed font-normal pt-1">
                {m.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <Badge variant="spark" className="w-full justify-center">
                {m.diff}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
