import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'

const faqs = [
  {
    q: 'С какими разделами слаботочных систем вы работаете?',
    a: 'Полный комплекс слаботочных сетей и автоматизации: СС (Сети связи), НСС (Наружные сети связи), ВТСС (Внутренняя телефония и СКС), СВН (Видеонаблюдение), СКД / СКУД (Контроль доступа), ОСО / ОС (Охранная сигнализация), СКТВ (Телевидение), ШПД (Интернет), ОЗДС и диспетчеризация.',
  },
  {
    q: 'Как вы работаете с замечаниями технического надзора в Exon?',
    a: 'Замечания классифицируются по типам (оформление, нехватка сертификатов, несоответствие объемов). Благодаря параметрическим шаблонам правки вносятся пакетом во весь комплект за 10–15 минут без перепечатки и задержек.',
  },
  {
    q: 'Возможен ли выезд на строительные площадки Москвы и МО?',
    a: 'Да, регулярно провожу сопоставление проектных трасс с физическим монтажом на площадке, участвую в комиссионных освидетельствованиях скрытых работ и совещаниях с Заказчиком.',
  },
  {
    q: 'Каковы средние сроки формирования полного комплекта ИД на объект?',
    a: 'Благодаря автоматизированным генераторам АОСР и шаблонам ведомостей ВОР, типовой том исполнительной документации по одной слаботочной системе собирается за 1–2 рабочих дня вместо 2 недель ручной верстки.',
  },
]

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">Вопросы и Ответы</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Часто задаваемые вопросы
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Ответы на популярные вопросы о процессе сдачи исполнительной документации и ведении проектов
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <Card
            key={i}
            className="p-6 cursor-pointer gap-2 transition-all hover:border-foreground/30"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-sm sm:text-base font-normal text-foreground font-display leading-snug">
                {faq.q}
              </h4>
              <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center shrink-0 text-muted-foreground">
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${openIdx === i ? 'rotate-180 text-foreground' : ''}`}
                />
              </div>
            </div>

            {openIdx === i && (
              <p className="text-xs text-muted-foreground leading-relaxed pt-3 border-t border-border font-normal">
                {faq.a}
              </p>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
