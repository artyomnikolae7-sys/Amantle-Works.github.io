import { useState, useEffect, useRef } from 'react'
import { Terminal, Shield, Cpu, Activity, Database, CheckCircle2, ChevronRight, CornerDownLeft, ExternalLink } from 'lucide-react'
import { CASES } from '../cases/data/casesData'
import { OBJECTS } from '../projects/data/projectsData'

interface Version2SiteProps {
  onSwitchToV1: () => void
}

export function Version2Site({ onSwitchToV1 }: Version2SiteProps) {
  const [activeTab, setActiveTab] = useState<'console' | 'objects' | 'pipeline' | 'telemetry'>('console')
  const [commandInput, setCommandInput] = useState('')
  const [logs, setLogs] = useState<Array<{ text: string; type: 'info' | 'success' | 'warn' | 'cmd' }>>([
    { text: 'SYSTEM INITIALIZED: PTO_INTELLIGENCE_KERNEL v2.4.0', type: 'info' },
    { text: 'AUTHENTICATED: Nikolaev Artemiy [Lead PTO Engineer / Exon Digital Specialist]', type: 'success' },
    { text: 'NODE: Moscow Construction Cluster // 17 Active/Closed Projects Online', type: 'info' },
    { text: 'TYPE "help" OR "cases" FOR TELEMETRY COMMANDS', type: 'warn' },
  ])
  const terminalEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = commandInput.trim().toLowerCase()
    if (!cmd) return

    setLogs(prev => [...prev, { text: `> ${commandInput}`, type: 'cmd' }])
    setCommandInput('')

    if (cmd === 'help') {
      setLogs(prev => [
        ...prev,
        { text: 'AVAILABLE COMMANDS:', type: 'info' },
        { text: '  cases      - List all 7 engineering automation cases', type: 'info' },
        { text: '  objects    - Dump list of 17 completed construction sites', type: 'info' },
        { text: '  stack      - Display engineering tech stack & libraries', type: 'info' },
        { text: '  contact    - Print verified Telegram & Email endpoints', type: 'info' },
        { text: '  clear      - Clear terminal logs', type: 'info' },
        { text: '  v1         - Switch to Classic Engineering Workspace', type: 'info' },
      ])
    } else if (cmd === 'clear') {
      setLogs([])
    } else if (cmd === 'cases') {
      CASES.forEach(c => {
        setLogs(prev => [...prev, { text: `[CASE #${c.id}] ${c.title} -> RESULT: ${c.result}`, type: 'success' }])
      })
    } else if (cmd === 'objects') {
      OBJECTS.forEach(o => {
        setLogs(prev => [...prev, { text: `[SITE #${o.id}] ${o.title} | ${o.contractor} | Status: 100% Closed`, type: 'info' }])
      })
    } else if (cmd === 'stack') {
      setLogs(prev => [
        ...prev,
        { text: 'ENGINEERING STACK: Exon, AutoCAD (LISP/Scripts), Excel (Power Query/VBA), Python FastAPI, SQLModel, React 19, GIS/MapLibre, OCR JDK21', type: 'success' },
      ])
    } else if (cmd === 'contact') {
      setLogs(prev => [
        ...prev,
        { text: 'TELEGRAM: @Amantle_x | EMAIL: artyomnikolae7@gmail.com | LOCATION: Moscow, RU', type: 'success' },
      ])
    } else if (cmd === 'v1') {
      onSwitchToV1()
    } else {
      setLogs(prev => [...prev, { text: `Command not recognized: "${cmd}". Type "help" for manual.`, type: 'warn' }])
    }
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-[#94a3b8] font-mono text-xs selection:bg-cyan-500 selection:text-black">
      {/* Top HUD Bar */}
      <header className="border-b border-cyan-950/60 bg-[#090d16]/90 backdrop-blur px-4 py-3 sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-sm bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <div>
            <span className="text-cyan-400 font-bold tracking-wider uppercase text-sm">PTO_TERMINAL // v2</span>
            <span className="text-slate-500 ml-2 text-[10px]">AUTH: NIKOLAEV_A</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-[#04060a] border border-cyan-950 p-1 rounded">
          <button
            onClick={() => setActiveTab('console')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'console' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'hover:text-slate-200'}`}
          >
            01.CONSOLE
          </button>
          <button
            onClick={() => setActiveTab('objects')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'objects' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'hover:text-slate-200'}`}
          >
            02.SITES_17
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'pipeline' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'hover:text-slate-200'}`}
          >
            03.CASES_LOG
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'telemetry' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'hover:text-slate-200'}`}
          >
            04.TELEMETRY
          </button>
        </div>

        {/* Return to V1 */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchToV1}
            className="px-3 py-1.5 rounded bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            ← v1 Инженерный
          </button>
        </div>
      </header>

      {/* Main Screen Grid */}
      <main className="p-4 max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Telemetry Panel */}
        <div className="lg:col-span-3 space-y-4">
          <div className="border border-cyan-950/80 bg-[#090d16]/70 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-cyan-950 pb-2">
              <span className="flex items-center gap-1.5"><Shield size={14} /> PROFILE_DATA</span>
              <span className="text-[10px] text-emerald-400">READY</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div><span className="text-slate-500">NAME:</span> <span className="text-slate-200 font-semibold">Артемий Николаев</span></div>
              <div><span className="text-slate-500">ROLE:</span> <span className="text-cyan-300">Инженер ПТО / Сдача ИД</span></div>
              <div><span className="text-slate-500">SYSTEMS:</span> <span className="text-slate-300">СС, НСС, ВТСС, СВН, ОЗДС, СКД</span></div>
              <div><span className="text-slate-500">SOFTWARE:</span> <span className="text-slate-300">Exon, AutoCAD, Excel VBA, Python</span></div>
              <div><span className="text-slate-500">STATUS:</span> <span className="text-emerald-400">Available for Enterprise/Projects</span></div>
            </div>
          </div>

          <div className="border border-cyan-950/80 bg-[#090d16]/70 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-cyan-950 pb-2">
              <span className="flex items-center gap-1.5"><Activity size={14} /> STATS_SUMMARY</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-[#05070d] p-2.5 rounded border border-cyan-950">
                <div className="text-xl font-bold text-cyan-400">17</div>
                <div className="text-[9px] text-slate-500 uppercase">Объектов МСК</div>
              </div>
              <div className="bg-[#05070d] p-2.5 rounded border border-cyan-950">
                <div className="text-xl font-bold text-emerald-400">100%</div>
                <div className="text-[9px] text-slate-500 uppercase">Сдача ИД</div>
              </div>
              <div className="bg-[#05070d] p-2.5 rounded border border-cyan-950">
                <div className="text-xl font-bold text-amber-400">20K+</div>
                <div className="text-[9px] text-slate-500 uppercase">Позиций ETM</div>
              </div>
              <div className="bg-[#05070d] p-2.5 rounded border border-cyan-950">
                <div className="text-xl font-bold text-purple-400">6-8h</div>
                <div className="text-[9px] text-slate-500 uppercase">Пакет ОЗДС</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Main Stage */}
        <div className="lg:col-span-9 space-y-4">
          {activeTab === 'console' && (
            <div className="border border-cyan-950/80 bg-[#060810] rounded-lg overflow-hidden flex flex-col h-[650px] shadow-2xl">
              <div className="bg-[#0b101c] px-4 py-2 border-b border-cyan-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-cyan-400" />
                  <span className="text-cyan-300 font-bold">INTERACTIVE_ENGINEERING_SHELL</span>
                </div>
                <span className="text-[10px] text-slate-500">TTY: /dev/pto0</span>
              </div>

              {/* Log Feed */}
              <div className="flex-1 p-4 overflow-y-auto space-y-1.5 custom-scrollbar font-mono text-[11px]">
                {logs.map((log, i) => (
                  <div
                    key={i}
                    className={`leading-relaxed ${
                      log.type === 'success'
                        ? 'text-emerald-400'
                        : log.type === 'warn'
                        ? 'text-amber-400'
                        : log.type === 'cmd'
                        ? 'text-cyan-300 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    {log.text}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Prompt Input */}
              <form onSubmit={handleCommand} className="bg-[#090d18] p-3 border-t border-cyan-950 flex items-center gap-2">
                <ChevronRight size={16} className="text-cyan-400 shrink-0" />
                <input
                  type="text"
                  value={commandInput}
                  onChange={e => setCommandInput(e.target.value)}
                  placeholder="Enter command (try 'help', 'cases', 'objects', 'stack')..."
                  className="flex-1 bg-transparent text-cyan-200 placeholder-slate-600 focus:outline-none text-xs font-mono"
                  autoFocus
                />
                <button type="submit" className="text-cyan-400 hover:text-cyan-200 px-2 py-1 bg-cyan-950/50 rounded">
                  <CornerDownLeft size={14} />
                </button>
              </form>
            </div>
          )}

          {activeTab === 'objects' && (
            <div className="border border-cyan-950/80 bg-[#060810] rounded-lg p-4 space-y-3 h-[650px] overflow-y-auto custom-scrollbar">
              <div className="text-cyan-400 font-bold text-sm mb-2 flex items-center justify-between border-b border-cyan-950 pb-2">
                <span>DATABASE DUMP: 17 МОСКОВСКИХ СТРОИТЕЛЬНЫХ ОБЪЕКТОВ</span>
                <span className="text-[10px] text-slate-500">GEO_INDEX: MOSCOW_CENTRAL</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {OBJECTS.map(obj => (
                  <div key={obj.id} className="p-3 border border-cyan-950 bg-[#090d18] rounded hover:border-cyan-500/50 transition-colors space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-300 font-bold">{obj.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">100% ИД</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">{obj.address}</div>
                    <div className="text-slate-500 text-[10px]">Генподрядчик: <span className="text-slate-300">{obj.contractor}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pipeline' && (
            <div className="border border-cyan-950/80 bg-[#060810] rounded-lg p-4 space-y-4 h-[650px] overflow-y-auto custom-scrollbar">
              <div className="text-cyan-400 font-bold text-sm border-b border-cyan-950 pb-2">
                AUTOMATION PIPELINE & ALGORITHMIC CASE STUDIES
              </div>
              <div className="space-y-3">
                {CASES.map(c => (
                  <div key={c.id} className="p-4 border border-cyan-950 bg-[#090d18] rounded space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-300 font-bold text-sm">CASE 0{c.id} // {c.title}</span>
                      <span className="text-[10px] text-amber-400 font-mono">{c.tools.split(',')[0]}</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed"><span className="text-rose-400 font-semibold">PROBLEM:</span> {c.problem}</p>
                    <p className="text-emerald-400 text-xs leading-relaxed"><span className="font-semibold">RESULT:</span> {c.result}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className="border border-cyan-950/80 bg-[#060810] rounded-lg p-6 space-y-6 h-[650px] overflow-y-auto custom-scrollbar">
              <div className="text-cyan-400 font-bold text-sm border-b border-cyan-950 pb-2">
                SYSTEM ARCHITECTURE & INTEGRATIONS TELEMETRY
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#090d18] border border-cyan-950 rounded space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold">
                    <Database size={16} /> EXON API / SCRIPTING
                  </div>
                  <p className="text-slate-400 text-xs">
                    Автоматическая инъекция объемов работ в формы Exon через JavaScript DOM automation. Сокращение ручного ввода на 95%.
                  </p>
                </div>
                <div className="p-4 bg-[#090d18] border border-cyan-950 rounded space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <Cpu size={16} /> ETM & OCR PARSING
                  </div>
                  <p className="text-slate-400 text-xs">
                    Обработка каталога ETM (20K+ позиций) с каноническим сопоставлением артикулов, кабелей и паспортов качества.
                  </p>
                </div>
                <div className="p-4 bg-[#090d18] border border-cyan-950 rounded space-y-2">
                  <div className="flex items-center gap-2 text-purple-300 font-bold">
                    <CheckCircle2 size={16} /> AUTOCAD + EXCEL
                  </div>
                  <p className="text-slate-400 text-xs">
                    Двусторонняя параметрическая связь таблиц объемов с чертежами слаботочных сетей и кабельных трасс.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
