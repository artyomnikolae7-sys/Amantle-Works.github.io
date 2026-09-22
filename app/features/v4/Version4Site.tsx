import { useState } from 'react'
import { BookOpen, FileText, CheckCircle2, ArrowRight, Download, Send, Globe } from 'lucide-react'
import { CASES } from '../cases/data/casesData'
import { OBJECTS } from '../projects/data/projectsData'

interface Version4SiteProps {
  onSwitchToV1: () => void
  onSwitchToV2: () => void
  onSwitchToV3: () => void
}

export function Version4Site({ onSwitchToV1, onSwitchToV2, onSwitchToV3 }: Version4SiteProps) {
  const [activeSection, setActiveSection] = useState<'monograph' | 'cases' | 'objects' | 'colophon'>('monograph')

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c1917] font-serif antialiased selection:bg-[#d97757]/20 selection:text-[#8c3b1e]">
      {/* Editorial Header */}
      <header className="border-b border-[#e5decb] bg-[#faf7f2]/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-serif font-bold tracking-tight text-lg text-[#1c1917]">Артемий Николаев</span>
            <span className="block font-sans text-[11px] text-[#78716c] uppercase tracking-widest font-semibold">
              Инженерная монография & Исследования ПТО
            </span>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden sm:flex items-center gap-4 font-sans text-xs text-[#57534e]">
              <button
                onClick={() => setActiveSection('monograph')}
                className={`hover:text-[#1c1917] transition-colors cursor-pointer ${activeSection === 'monograph' ? 'text-[#c25e3d] font-bold underline' : ''}`}
              >
                Монография
              </button>
              <button
                onClick={() => setActiveSection('cases')}
                className={`hover:text-[#1c1917] transition-colors cursor-pointer ${activeSection === 'cases' ? 'text-[#c25e3d] font-bold underline' : ''}`}
              >
                Кейсы
              </button>
              <button
                onClick={() => setActiveSection('objects')}
                className={`hover:text-[#1c1917] transition-colors cursor-pointer ${activeSection === 'objects' ? 'text-[#c25e3d] font-bold underline' : ''}`}
              >
                Объекты
              </button>
            </nav>

            <button
              onClick={onSwitchToV1}
              className="font-sans text-xs px-3 py-1.5 rounded bg-[#1c1917] text-[#faf7f2] hover:bg-[#c25e3d] transition-all cursor-pointer font-medium"
            >
              ← v1 Инженерный
            </button>
          </div>
        </div>
      </header>

      {/* Main Editorial Container */}
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {/* Title & Introduction */}
        <section className="space-y-6 border-b border-[#e5decb] pb-12">
          <div className="font-sans text-[11px] uppercase tracking-widest text-[#c25e3d] font-bold">
            Том I. Автоматизация строительного документооборота
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-[#1c1917]">
            От чертежа к верифицированным данным: алгоритмизация производственно-технического отдела.
          </h1>

          <div className="font-sans text-xs text-[#78716c] flex flex-wrap gap-4 py-2 border-y border-[#e5decb]/60">
            <span>Автор: Артемий Николаев</span>
            <span>•</span>
            <span>Локация: Москва</span>
            <span>•</span>
            <span>Специализация: Сети связи (СС, НСС), Exon, ИД</span>
          </div>

          <p className="text-lg leading-relaxed text-[#44403c] font-serif italic">
            «Главная уязвимость классического строительного производства — не отсутствие регламентов, а колоссальный объем ручного копирования данных между чертежами, спецификациями, ВОР и электронными актами освидетельствования скрытых работ (АОСР).»
          </p>
        </section>

        {/* Monograph Core Content */}
        {activeSection === 'monograph' && (
          <article className="space-y-10 text-base leading-relaxed text-[#292524]">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1c1917]">§ 1. Проблема дискретности данных в ПТО</h2>
              <p>
                В ходе реализации 17+ строительных проектов в Москве (включая объекты крупных девелоперов и генподрядчиков ООО "МОНАРХ", АО "МСУ-1", ГК "ЕКС") традиционный цикл формирования исполнительной документации неизбежно сталкивался с фрагментацией информации.
              </p>
              <p>
                Данные спецификации оборудования (СО) хранятся в AutoCAD/PDF, коммерческие предложения — в Excel-прайсах поставщиков (база ЭТМ на 20 000+ позиций), а акты закрытия формируются в цифровой системе <strong>Exon</strong>. Ручной перенос между этими звеньями порождал до 90% всех замечаний технического надзора.
              </p>
            </div>

            <div className="p-6 bg-[#f3eee5] border-l-2 border-[#c25e3d] rounded-r-lg space-y-2 font-sans text-xs text-[#57534e]">
              <div className="font-bold text-[#1c1917] uppercase tracking-wider">Ключевая инженерная гипотеза</div>
              <p>
                Любой процесс подготовки ИД может быть сведен к единой модели канонических сущностей (Проект → Система → Спецификация → Позиция → Паспорт качества), что позволяет осуществлять 100% проверку и автоматическую генерацию пакетов документов.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1c1917]">§ 2. Методология решения: 3 уровня автоматизации</h2>
              
              <div className="space-y-3 font-sans text-sm">
                <div className="p-4 bg-white border border-[#e5decb] rounded-lg shadow-sm space-y-1">
                  <div className="font-bold text-[#c25e3d]">Уровень 1. Параметризация и формульная логика (Excel + Power Query)</div>
                  <p className="text-xs text-[#57534e]">
                    Создание динамических расчетных таблиц для земляных работ, учета выработки бригад и автоматического расчета телефонной канализации НСС со сквозным обновлением в AutoCAD.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#e5decb] rounded-lg shadow-sm space-y-1">
                  <div className="font-bold text-[#c25e3d]">Уровень 2. Скриптовая генерация пакетов ИД (VBA + JavaScript)</div>
                  <p className="text-xs text-[#57534e]">
                    Генератор комплекта документов по ОЗДС: сокращение срока подготовки с 3–4 дней до 6–8 часов с автоматическим пересчетом страниц и инъекцией объемов в Exon через JS-автоматизацию.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#e5decb] rounded-lg shadow-sm space-y-1">
                  <div className="font-bold text-[#c25e3d]">Уровень 3. AI-пайплайн оцифровки схем (AXIS AI + OpenDataLoader)</div>
                  <p className="text-xs text-[#57534e]">
                    Автоматическое извлечение топологии из сложных однолинейных схем ЭОМ, сверка токов и мощностей с кабельными журналами и валидация спецификаций без ручных ошибок.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#e5decb] pt-8 space-y-4">
              <h2 className="text-2xl font-bold text-[#1c1917]">§ 3. Подтвержденные результаты на объектах</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-sans text-center">
                <div className="p-4 bg-white border border-[#e5decb] rounded">
                  <div className="text-2xl font-bold text-[#1c1917]">17</div>
                  <div className="text-[10px] text-[#78716c] uppercase">Сданных объектов</div>
                </div>
                <div className="p-4 bg-white border border-[#e5decb] rounded">
                  <div className="text-2xl font-bold text-[#c25e3d]">100%</div>
                  <div className="text-[10px] text-[#78716c] uppercase">Принятая ИД</div>
                </div>
                <div className="p-4 bg-white border border-[#e5decb] rounded">
                  <div className="text-2xl font-bold text-[#1c1917]">0</div>
                  <div className="text-[10px] text-[#78716c] uppercase">Срывов сроков</div>
                </div>
                <div className="p-4 bg-white border border-[#e5decb] rounded">
                  <div className="text-2xl font-bold text-[#2d5a27]">5×</div>
                  <div className="text-[10px] text-[#78716c] uppercase">Ускорение циклов</div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Case Studies Section */}
        {activeSection === 'cases' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-[#1c1917]">Каталог инженерных кейсов</h2>
            <div className="space-y-6">
              {CASES.map(c => (
                <div key={c.id} className="p-6 bg-white border border-[#e5decb] rounded-lg shadow-sm space-y-3">
                  <div className="flex items-center justify-between font-sans text-xs">
                    <span className="text-[#c25e3d] font-bold">КЕЙС #{c.id}</span>
                    <span className="text-[#78716c]">{c.tools.split(',')[0]}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1c1917]">{c.title}</h3>
                  <p className="text-sm text-[#57534e] leading-relaxed"><strong>Проблема:</strong> {c.problem}</p>
                  <div className="font-sans text-xs text-[#2d5a27] bg-[#2d5a27]/5 p-3 rounded border border-[#2d5a27]/20">
                    <strong>Результат:</strong> {c.result}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Objects Section */}
        {activeSection === 'objects' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1c1917]">Реестр строительных комплексов Москвы (17)</h2>
            <div className="divide-y divide-[#e5decb] border-y border-[#e5decb]">
              {OBJECTS.map(obj => (
                <div key={obj.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="font-sans text-xs text-[#c25e3d] font-mono mr-2">#{String(obj.id).padStart(2, '0')}</span>
                    <strong className="text-[#1c1917] text-base">{obj.title}</strong>
                    <div className="text-xs text-[#78716c] font-sans">{obj.address}</div>
                  </div>
                  <div className="font-sans text-xs text-[#57534e] text-right">
                    <span>{obj.contractor}</span>
                    <span className="ml-2 text-[#2d5a27] font-semibold">● Сдано</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Contact Colophon */}
        <footer className="border-t border-[#e5decb] pt-12 space-y-4 font-sans text-xs text-[#78716c]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="font-bold text-[#1c1917]">Артемий Николаев — Инженер ПТО</p>
              <p>Москва, Российская Федерация • МГТУ-МАСИ (ПГС)</p>
            </div>
            <div className="flex gap-4">
              <a href="https://t.me/Amantle_x" target="_blank" rel="noreferrer" className="text-[#c25e3d] font-bold hover:underline">
                Telegram: @Amantle_x
              </a>
              <a href="mailto:artyomnikolae7@gmail.com" className="text-[#1c1917] font-bold hover:underline">
                Email
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
