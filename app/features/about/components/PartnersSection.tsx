import { Building2 } from 'lucide-react'

const partners = [
  { name: 'ООО "МОНАРХ"', type: 'Генподрядчик', projects: 4 },
  { name: 'АО ГК "ЕКС"', type: 'Генподрядчик', projects: 2 },
  { name: 'ООО "ГСТ"', type: 'Субподрядчик', projects: 3 },
  { name: 'ООО "МОСРЕНСТРОЙ-6"', type: 'Субподрядчик', projects: 2 },
  { name: 'СК КРОНОС', type: 'Субподрядчик', projects: 2 },
  { name: 'ДАРС-РЕНОВАЦИЯ', type: 'Субподрядчик', projects: 3 },
  { name: 'АО "МОСКАПСТРОЙ"', type: 'Заказчик', projects: 1 },
  { name: 'Мосинжпроект', type: 'Заказчик', projects: 5 },
  { name: 'ПАО "Ростелеком"', type: 'Провайдер', projects: 8 },
  { name: 'ПАО "МТС"', type: 'Провайдер', projects: 3 },
  { name: 'Деп. строительства Москвы', type: 'Гос. орган', projects: 12 },
  { name: 'ФЛЭТ И КО', type: 'Субподрядчик', projects: 1 },
]

export function PartnersSection() {
  return (
    <section id="partners" className="space-y-8 animate-fade-slide-in">
      <div className="text-center space-y-3">
        <span className="text-ring font-mono text-xs tracking-widest uppercase font-semibold">Партнёры</span>
        <h2 className="text-4xl font-bold text-foreground tracking-tight font-display">
          Компании <span className="font-instrument italic font-normal text-gradient-red-orange">&amp; заказчики</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {partners.map(p => (
          <div key={p.name} className="themed-card p-5 rounded-xl text-center space-y-2 card-lift">
            <Building2 size={20} className="text-ring mx-auto" />
            <h4 className="text-xs font-bold text-foreground leading-tight">{p.name}</h4>
            <span className="text-[9px] font-mono text-muted-foreground uppercase">{p.type}</span>
            <div className="text-xs font-mono text-ring font-bold">{p.projects} проектов</div>
          </div>
        ))}
      </div>
    </section>
  )
}
