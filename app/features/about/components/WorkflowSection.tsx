import { FileSearch, Layers, Cpu, Send, CheckCircle2, Archive } from 'lucide-react'
import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'

const workflowSteps = [
  {
    step: '01',
    title: 'Входной контроль РД и спецификаций',
    desc: 'Сверка чертежей с кабельными журналами и ВОР. Выявление коллизий трасс и разночтений в объемах до начала монтажа.',
    icon: FileSearch,
  },
  {
    step: '02',
    title: 'Формирование реестров и паспортов',
    desc: 'Сбор сертификатов качества, паспортов на оборудование (СКС, оптику, шкафы) и протоколов заводских испытаний.',
    icon: Layers,
  },
  {
    step: '03',
    title: 'Автоматическая генерация АОСР',
    desc: 'Пакетное создание актов скрытых работ по шаблонам с автоподстановкой номеров, дат, объемов и ответственных лиц.',
    icon: Cpu,
  },
  {
    step: '04',
    title: 'Загрузка и согласование в Exon',
    desc: 'Формирование электронного комплекта ИД, привязка исполнительных схем и отправка на согласование технадзору.',
    icon: Send,
  },
  {
    step: '05',
    title: 'Отработка замечаний и снятие правок',
    desc: 'Оперативное устранение предписаний в интерфейсе системы без перепечатки бумажных томов и повторных выездов.',
    icon: CheckCircle2,
  },
  {
    step: '06',
    title: 'Финальное подписание ЭЦП и архив',
    desc: 'Получение электронных подписей всех участников строительства, закрытие объемов и передача в архив заказчика.',
    icon: Archive,
  },
]

export function WorkflowSection() {
  return (
    <section id="workflow" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">Методология и Регламент</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Жизненный цикл подготовки и сдачи ИД
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Пошаговый сквозной процесс: от входного анализа проектных чертежей до подписания актов в системе Exon
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflowSteps.map((step) => (
          <Card key={step.step} className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-light font-display text-muted-foreground/60">{step.step}</span>
                <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground">
                  <step.icon size={18} strokeWidth={1.5} />
                </div>
              </div>

              <h4 className="text-base font-normal text-foreground font-display leading-snug">
                {step.title}
              </h4>

              <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-border flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
              <span className="text-[11px] font-mono text-muted-foreground">Регламент ПТО</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
