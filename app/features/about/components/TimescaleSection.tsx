import { Calendar, ChevronRight } from "lucide-react"

export interface Milestone {
  year: number
  content?: string
  title?: string
  role?: string
}

export const BIRTH_YEAR = 2020 // Начало профессиональной деятельности в строительстве ПТО

export const CONSTRUCTION_MILESTONES: Milestone[] = [
  {
    year: 2020,
    title: "Старт карьеры в ПТО",
    role: "Помощник инженера ПТО",
    content: "Начало работы в строительной отрасли Москвы. Разработка исполнительных схем в AutoCAD.",
  },
  {
    year: 2021,
    title: "Первый крупный проект по СС",
    role: "Инженер ПТО",
    content: "Полное сопровождение исполнительной документации по объекту жилого дома на Гарибальди.",
  },
  {
    year: 2022,
    title: "Внедрение автоматизации Excel + VBA",
    role: "Инженер ПТО / Автоматизатор",
    content: "Создан «Генератор ИД по ОЗДС», сокративший время сборки актов с 4 дней до 6 часов.",
  },
  {
    year: 2023,
    title: "Переход на систему Exon",
    role: "Старший инженер ПТО",
    content: "Разработан JS-скрипт автозаполнения объемов в Exon (450 позиций за 3 минуты).",
  },
  {
    year: 2024,
    title: "Руководитель группы ИД",
    role: "Руководитель группы ПТО",
    content: "Параллельное ведение 12+ объектов строительства в Москве без единого замечания технадзора.",
  },
  {
    year: 2025,
    title: "Оптимизация ВОР и Шахматок",
    role: "Ведущий эксперт ПТО",
    content: "Создан единый комплекс сводного учета объемов ВОР с автоматическим сопоставлением факт/проект.",
  },
  {
    year: 2026,
    title: "Диплом ПГС и Запуск OSINT Портфолио",
    role: "Бакалавр ПГС / Разработчик",
    content: "Успешная защита диплома в МГТУ-МАСИ. Выпуск интерактивного OSINT-портфолио v3.0.",
  },
]

export function TimescaleSection() {
  return (
    <section id="timeline" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-3">
        <span className="text-ring font-mono text-xs tracking-widest uppercase font-semibold">Timescale Хронология</span>
        <h2 className="text-4xl font-bold text-foreground tracking-tight font-display">
          Профессиональный <span className="font-instrument italic font-normal text-gradient-red-orange">путь развития</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
          Интерактивная шкала времени с отсчетом стажа (Опыт / Годы) и ключевыми вехами автоматизации ПТО.
        </p>
      </div>

      <div className="max-w-4xl mx-auto themed-card p-6 md:p-8 rounded-3xl space-y-8 border border-border shadow-xl">
        {/* Timescale Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
          <div className="flex items-center gap-2 text-ring">
            <Calendar size={14} />
            <span>Стаж работы</span>
          </div>
          <div>Календарный год</div>
          <div>Достижение / Веха</div>
        </div>

        {/* Timescale Track Rail */}
        <div className="relative pl-6 md:pl-8 border-l-2 border-primary/30 space-y-8">
          {CONSTRUCTION_MILESTONES.map((item) => {
            const expYears = item.year - BIRTH_YEAR
            return (
              <div key={item.year} className="relative group transition-all duration-300">
                {/* Tick Circle Marker */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary group-hover:scale-125 transition-all shadow-md flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-background" />
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-6">
                  {/* Years / Experience Pill */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-bold">
                      +{expYears} {expYears === 1 ? 'год' : expYears < 5 ? 'года' : 'лет'} стажа
                    </span>
                    <span className="text-lg font-bold font-mono text-foreground">{item.year}</span>
                  </div>

                  {/* Milestone Content Card */}
                  <div className="flex-1 bg-muted/30 p-4 rounded-2xl border border-border space-y-1.5 hover:border-primary/40 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
                      <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                        {item.title} <ChevronRight size={14} className="text-ring opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <span className="text-xs font-mono text-ring uppercase font-semibold shrink-0">{item.role}</span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-1">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
