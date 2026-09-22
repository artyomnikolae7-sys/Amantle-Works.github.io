import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const standards = [
  { code: 'СП 76.13330.2016', title: 'Электротехнические устройства', category: 'СП', status: 'Применяется' },
  { code: 'СП 77.13330.2016', title: 'Системы автоматизации', category: 'СП', status: 'Применяется' },
  { code: 'ГОСТ 21.613-2014', title: 'Силовое электрооборудование', category: 'ГОСТ', status: 'Применяется' },
  { code: 'ГОСТ 34.201-89', title: 'Виды и комплектность документов', category: 'ГОСТ', status: 'Применяется' },
  { code: 'СП 48.13330.2019', title: 'Организация строительства', category: 'СП', status: 'Применяется' },
  { code: 'РД 45.120-2000', title: 'Нормы технологического проектирования', category: 'РД', status: 'Применяется' },
  { code: 'ГОСТ Р 21.1101-2013', title: 'Основные требования к ПД и РД', category: 'ГОСТ', status: 'Применяется' },
  { code: 'СП 134.13330.2022', title: 'Системы электросвязи зданий', category: 'СП', status: 'Применяется' },
]

export function StandardsSection() {
  const [filter, setFilter] = useState<string>('Все')
  const categories = ['Все', 'СП', 'ГОСТ', 'РД']
  const filtered = filter === 'Все' ? standards : standards.filter(s => s.category === filter)

  return (
    <section id="standards" className="space-y-8 animate-fade-slide-in">
      <div className="text-center space-y-3">
        <span className="text-ring font-mono text-xs tracking-widest uppercase font-semibold">Нормативная база</span>
        <h2 className="text-4xl font-bold text-foreground tracking-tight font-display">
          Стандарты <span className="font-instrument italic font-normal text-gradient-red-orange">&amp; ГОСТ</span>
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Полный перечень нормативных документов, которыми руководствуюсь при подготовке ИД
        </p>
      </div>

      <div className="flex justify-center gap-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === c 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'themed-card text-muted-foreground hover:text-foreground'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(s => (
          <div key={s.code} className="themed-card p-5 rounded-xl space-y-3 card-lift group">
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 text-[9px] font-mono font-bold uppercase rounded bg-primary/10 text-primary border border-primary/20">
                {s.category}
              </span>
              <CheckCircle2 size={14} className="text-emerald-500" />
            </div>
            <h4 className="text-sm font-bold text-foreground leading-tight">{s.code}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
