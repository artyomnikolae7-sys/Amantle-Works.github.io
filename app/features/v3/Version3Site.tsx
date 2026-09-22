import { useState } from 'react'
import { ArrowUpRight, Sparkles, Layers, Award, Building, Send, ChevronRight, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CASES } from '../cases/data/casesData'
import { OBJECTS } from '../projects/data/projectsData'

interface Version3SiteProps {
  onSwitchToV1: () => void
  onSwitchToV2: () => void
}

export function Version3Site({ onSwitchToV1, onSwitchToV2 }: Version3SiteProps) {
  const [selectedCase, setSelectedCase] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<'cases' | 'objects' | 'stack' | 'about'>('cases')

  const currentCase = CASES.find(c => c.id === selectedCase) || CASES[0]

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#e2e8f0] font-sans antialiased selection:bg-[#e5c158] selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0c]/80 border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#e5c158] to-[#4ecdc4] flex items-center justify-center text-black font-bold text-sm shadow-[0_0_20px_rgba(229,193,88,0.3)]">
              АН
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white font-display">АРТЕМИЙ НИКОЛАЕВ</h1>
              <p className="text-[10px] text-[#e5c158] uppercase font-mono tracking-widest">Executive PTO Engineer // Exon Expert</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full text-xs">
              <button
                onClick={() => setActiveTab('cases')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${activeTab === 'cases' ? 'bg-[#e5c158] text-black font-bold shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Кейсы
              </button>
              <button
                onClick={() => setActiveTab('objects')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${activeTab === 'objects' ? 'bg-[#e5c158] text-black font-bold shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Объекты (17)
              </button>
              <button
                onClick={() => setActiveTab('stack')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${activeTab === 'stack' ? 'bg-[#e5c158] text-black font-bold shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Стек
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${activeTab === 'about' ? 'bg-[#e5c158] text-black font-bold shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Обо мне
              </button>
            </div>

            <button
              onClick={onSwitchToV1}
              className="px-3.5 py-1.5 text-xs font-mono rounded-full bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 transition-all cursor-pointer"
            >
              ← v1 Инженерный
            </button>
          </div>
        </div>
      </header>

      {/* Hero Showcase */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#e5c158]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-10 w-80 h-80 bg-[#4ecdc4]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#e5c158]/30 bg-[#e5c158]/10 text-[#e5c158] text-xs font-mono">
            <Sparkles size={13} />
            <span>Цифровая трансформация исполнительной документации</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight font-display">
            Инженерия ПТО с точностью до бита.
          </h2>

          <p className="text-lg text-slate-400 font-normal leading-relaxed max-w-2xl">
            Сдаю 100% исполнительной документации по слаботочным сетям, исключая ручной хаос через скрипты автоматизации в Exon, алгоритмы сопоставления спецификаций и каскадную проверку.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="https://t.me/Amantle_x"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e5c158] to-[#dfb545] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(229,193,88,0.4)] flex items-center gap-2"
            >
              <Send size={14} /> Написать в Telegram
            </a>
            <a
              href="mailto:artyomnikolae7@gmail.com"
              className="px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              artyomnikolae7@gmail.com
            </a>
          </div>
        </div>

        {/* 4 Pillars Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <div className="text-3xl lg:text-4xl font-bold text-[#e5c158] font-mono">17+</div>
            <div className="text-xs uppercase font-mono text-slate-400 tracking-wider">Объектов в Москве</div>
            <p className="text-[11px] text-slate-500">Жилые комплексы & реновация</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <div className="text-3xl lg:text-4xl font-bold text-[#4ecdc4] font-mono">100%</div>
            <div className="text-xs uppercase font-mono text-slate-400 tracking-wider">Закрытие ИД</div>
            <p className="text-[11px] text-slate-500">Сдача технадзору и МГСН</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <div className="text-3xl lg:text-4xl font-bold text-white font-mono">20K+</div>
            <div className="text-xs uppercase font-mono text-slate-400 tracking-wider">База ETM</div>
            <p className="text-[11px] text-slate-500">Каталог оборудования и материалов</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <div className="text-3xl lg:text-4xl font-bold text-purple-400 font-mono">5×</div>
            <div className="text-xs uppercase font-mono text-slate-400 tracking-wider">Ускорение ИД</div>
            <p className="text-[11px] text-slate-500">За счёт JS/VBA генераторов</p>
          </div>
        </div>
      </section>

      {/* Main Interactive Stage */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'cases' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Case Selector Navigation */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono text-[#e5c158] uppercase tracking-widest mb-4">
                Ключевые Инженерные Кейсы
              </div>
              {CASES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCase(c.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedCase === c.id
                      ? 'bg-white/10 border-[#e5c158] text-white shadow-lg'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#e5c158]/80">Кейс {c.id}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{c.title}</div>
                  </div>
                  <ChevronRight size={16} className={selectedCase === c.id ? 'text-[#e5c158]' : 'text-slate-600'} />
                </button>
              ))}
            </div>

            {/* Case Details Viewer */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCase.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono text-[#e5c158] font-bold">КЕЙС #{String(currentCase.id).padStart(2, '0')}</span>
                    <span className="text-xs font-mono text-slate-400">{currentCase.tools.split(',')[0]}</span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-white font-display leading-snug">
                    {currentCase.title}
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/30 space-y-1">
                      <div className="text-[10px] font-mono font-bold text-red-400 uppercase">Проблема</div>
                      <p className="text-xs text-slate-300 leading-relaxed">{currentCase.problem}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">Реализованный процесс</div>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {currentCase.work.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check size={14} className="text-[#4ecdc4] shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 space-y-1">
                      <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Итоговый результат</div>
                      <p className="text-xs text-emerald-300 leading-relaxed font-semibold">{currentCase.result}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {activeTab === 'objects' && (
          <div className="space-y-6">
            <div className="text-xs font-mono text-[#e5c158] uppercase tracking-widest">
              Сданные Строительные Объекты Москвы (17 Комплексов)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {OBJECTS.map(obj => (
                <div key={obj.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#e5c158]/50 transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#e5c158] font-bold">#0{obj.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">100% СДАНО</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{obj.title}</h4>
                  <p className="text-xs text-slate-400">{obj.address}</p>
                  <div className="pt-2 border-t border-white/5 text-[11px] text-slate-500">
                    Подрядчик: <span className="text-slate-300 font-semibold">{obj.contractor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stack' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="text-[#e5c158] font-bold text-lg flex items-center gap-2">
                <Layers size={18} /> Строительные платформы
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Свободное владение <strong>Exon</strong> (сдача ИД, АОСР, согласование замечаний технадзора), AutoCAD (чертежи СС/НСС, LISP-скрипты, параметрические блоки), Гранд-Смета.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="text-[#4ecdc4] font-bold text-lg flex items-center gap-2">
                <Sparkles size={18} /> Автоматизация и Данные
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Excel Power Query, сложные формулы, VBA-макросы для генерации реестров и автоподсчёта страниц, JavaScript скрипты автоматического заполнения форм Exon, Python FastAPI + SQLModel.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="text-purple-400 font-bold text-lg flex items-center gap-2">
                <Award size={18} /> AI & Vision Pipelines
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                OpenDataLoader PDF Engine (JDK 21) для парсинга однолинейных электрических схем ЭОМ, LLM валидация спецификаций и кросс-проверка кабельных журналов.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
            <h3 className="text-2xl font-bold text-white font-display">Обо мне</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Более 3 лет работаю в строительных организациях Москвы на позиции инженера ПТО и руководителя группы исполнительной документации. Мой подход — алгоритмизировать любую повторяющуюся задачу, создавая инструменты, которые превращают дни рутины в часы автоматической работы.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-white/5 rounded-xl"><span className="text-slate-500">Локация:</span> <span className="text-white font-semibold">Москва, РФ</span></div>
              <div className="p-3 bg-white/5 rounded-xl"><span className="text-slate-500">Образование:</span> <span className="text-white font-semibold">Бакалавр ПГС (МГТУ-МАСИ)</span></div>
              <div className="p-3 bg-white/5 rounded-xl"><span className="text-slate-500">Специализация:</span> <span className="text-white font-semibold">СС, НСС, ИД, Exon</span></div>
              <div className="p-3 bg-white/5 rounded-xl"><span className="text-slate-500">Связь:</span> <span className="text-[#e5c158] font-semibold">@Amantle_x</span></div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
