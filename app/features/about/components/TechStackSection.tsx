import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'

const stack = [
  {
    category: 'САПР и Черчение',
    tools: ['AutoCAD', 'AutoLISP скрипты', 'dwg трассировка', 'nanoCAD', 'Компас-3D'],
    description: 'Анализ планов расположения кабельных трасс, разрезов этажей, кабельных колодцев и формирование исполнительных схем.',
  },
  {
    category: 'Информационные Системы (ИС)',
    tools: ['Exon (ИД / Акты)', 'Sarex', 'Москапстрой ИС', 'ЕЦХД', 'ПИК.Стандарт'],
    description: 'Ведение цифрового архива ИД, электронное подписание актов АОСР, отработка замечаний технадзора.',
  },
  {
    category: 'Аналитика и Автоматизация',
    tools: ['VBA макросы', 'Power Query', 'Excel Шахматки', 'Google Sheets API', 'Python (pandas)'],
    description: 'Пакетная генерация сотен актов за секунды, расчет объемов материалов и парсинг спецификаций.',
  },
  {
    category: 'ИИ & Нейросети',
    tools: ['Claude 3.5 Sonnet', 'GPT-4o', 'DeepSeek-V3', 'Custom Prompts', 'OCR сканов'],
    description: 'Распознавание сканов сертификатов, ускоренное составление пояснительных записок к ППР и регламентов.',
  },
  {
    category: 'Нормативная База',
    tools: ['ГОСТ Р 21.101', 'СНиП / СП 133/134', 'МГСН 1.01-99', 'РД 78.36.003', 'ПТЭЭП'],
    description: 'Строгое соблюдение нормативных требований к оформлению исполнительной и разрешительной документации.',
  },
  {
    category: 'Веб-разработка & Дашборды',
    tools: ['TypeScript', 'React / Next.js', 'Tailwind CSS', 'Vite', 'Recharts'],
    description: 'Создание собственных интерактивных панелей мониторинга сдачи ИД по всем объектам в реальном времени.',
  },
]

export function TechStackSection() {
  return (
    <section id="techstack" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">Инструменты и Технологии</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Инженерный стек
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Сочетание классического строительного софта и современных инструментов автоматизации и веб-технологий
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stack.map((item, idx) => (
          <Card key={idx} className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase text-muted-foreground font-semibold">Категория {String(idx + 1).padStart(2, '0')}</span>
              <h3 className="text-base font-normal text-foreground font-display leading-snug">
                {item.category}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
              {item.tools.map((tool) => (
                <Badge key={tool} variant="secondary">
                  {tool}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
