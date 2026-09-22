import { Rocket, Target, Lightbulb, TrendingUp } from 'lucide-react'

const goals = [
  { icon: Rocket, title: 'Полная цифровизация ИД', desc: 'Переход к 100% электронному документообороту на всех объектах', status: 'В процессе', progress: 65 },
  { icon: Target, title: 'Нулевые замечания', desc: 'Достижение 0% замечаний от технадзора на всех объектах одновременно', status: 'Близко', progress: 85 },
  { icon: Lightbulb, title: 'Открытые шаблоны', desc: 'Публикация библиотеки шаблонов АОСР и ВОР в открытый доступ', status: 'Планируется', progress: 30 },
  { icon: TrendingUp, title: '25 объектов', desc: 'Расширение портфолио до 25 сданных объектов в Москве', status: 'В процессе', progress: 68 },
]

export function GoalsSection() {
  return (
    <section id="goals" className="space-y-8 animate-fade-slide-in">
      <div className="text-center space-y-3">
        <span className="text-ring font-mono text-xs tracking-widest uppercase font-semibold">Планы</span>
        <h2 className="text-4xl font-bold text-foreground tracking-tight font-display">
          Цели <span className="font-instrument italic font-normal text-gradient-red-orange">&amp; амбиции</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {goals.map(g => (
          <div key={g.title} className="themed-card p-6 rounded-2xl space-y-4 card-lift">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/20 to-ring/20 flex items-center justify-center">
                <g.icon size={18} className="text-primary" />
              </div>
              <span className={`px-2 py-1 text-[9px] font-mono font-bold uppercase rounded ${
                g.status === 'Близко' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                g.status === 'В процессе' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                'bg-blue-500/10 text-blue-500 border border-blue-500/20'
              }`}>
                {g.status}
              </span>
            </div>
            <h4 className="text-base font-bold text-foreground">{g.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-muted-foreground">Прогресс</span>
                <span className="text-foreground font-bold">{g.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-ring transition-all duration-700" style={{ width: `${g.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
