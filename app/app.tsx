import { useState, useEffect, useRef } from 'react'
import {
    ArrowUpRight,
    ArrowDownRight,
    Play,
    Volume2,
    VolumeX,
    X,
    ChevronDown,
    Clock,
    Send,
    Terminal as TerminalIcon,
    Layers,
    Cpu,
    Check,
    Copy,
    ShieldCheck,
    FileText,
    ExternalLink
} from 'lucide-react'
import './portfolio-redesign.css'

// DATA DEFINITIONS
const worksList = [
    {
        id: '01',
        name: 'ЖК «Скандинавия»',
        location: 'Москва · Коммунарка',
        category: 'Жилой квартал · 14 корпусов · 185 000 м²',
        scope: 'СС / НСС / ИД под ключ',
        status: 'Сдано в Exon без замечаний',
        quote: '«Сдали 14 корпусов с опережением графика на 2 недели. Полная синхронизация со службой заказчика в Exon.»',
        supervisor: 'Михаил Т. — Руководитель проекта',
        metrics: [
            { label: 'Закрыто актов', val: '1 420+' },
            { label: 'Срок прохождения', val: '100% вовремя' }
        ],
        tags: ['Exon', 'СКС', 'СКУД', 'СОТ', 'АОСР'],
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=85'
    },
    {
        id: '02',
        name: 'ЖК «Событие»',
        location: 'Москва · Раменки',
        category: 'Премиум-класс · 92 000 м²',
        scope: 'Исполнительные схемы / Слаботочка',
        status: '100% приёмка технадзором',
        quote: '«Исполнительные схемы слаботочных трасс приняты с первого предъявления. Ни одной коллизии с монолитом.»',
        supervisor: 'Сергей К. — Главный инженер',
        metrics: [
            { label: 'Чертежей в схемах', val: '380 листов' },
            { label: 'Коллизий', val: '0' }
        ],
        tags: ['AutoCAD', 'Схемы', 'Видеонаблюдение', 'СКС'],
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85'
    },
    {
        id: '03',
        name: 'Программа Реновации ЮВАО',
        location: 'Москва · Люблино',
        category: 'Городской заказ · 3 стартовых дома',
        scope: 'Полный комплекс ИД / Мосгосстройнадзор',
        status: 'Госприёмка пройдена',
        quote: '«Идеальный порядок в актах скрытых работ и сертификатах. Проверка инспекцией Мосгосстройнадзора без единого штрафа.»',
        supervisor: 'Евгений В. — Ведущий технадзор',
        metrics: [
            { label: 'Квартир в контуре', val: '420 квартир' },
            { label: 'Замечаний МГСН', val: '0' }
        ],
        tags: ['Мосгосстройнадзор', 'Exon', 'АОСР', 'ГОСТ Р 51872'],
        image: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1400&q=85'
    },
    {
        id: '04',
        name: 'ЖК «Остров»',
        location: 'Москва · Хорошёво-Мнёвники',
        category: 'Бизнес-класс · 110 000 м²',
        scope: 'Слаботочные системы / Диспетчеризация',
        status: 'Сдано в эксплуатацию',
        quote: '«Автоматизация ведомости объемов позволила защитить скрытые работы на 14 млн рублей без срезок.»',
        supervisor: 'Дмитрий Л. — Директор по строительству',
        metrics: [
            { label: 'Кабельных трасс', val: '86 000 м' },
            { label: 'Защита объемов', val: '100%' }
        ],
        tags: ['СКУД', 'Диспетчеризация', 'ВОР', 'Power Query'],
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85'
    },
    {
        id: '05',
        name: 'Технопарк СберСити',
        location: 'Москва · Рублёво-Архангельское',
        category: 'Инновационный кластер · BIM-стандарт',
        scope: 'BIM-валидация и цифровой документооборот',
        status: 'Цифровой стандарт внедрён',
        quote: '«Связка моделей чертежей со спецификациями поставщиков сократила время подготовки папок на 70%.»',
        supervisor: 'Алексей М. — BIM-менеджер проекта',
        metrics: [
            { label: 'Позиций в спецификациях', val: '18 400+' },
            { label: 'Скорость сверки', val: '4 минуты' }
        ],
        tags: ['Python', 'BIM', 'ЭТМ API', 'Регламенты'],
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85'
    }
]

const caseWindows = Array.from({ length: 30 }, (_, index) => {
    const source = worksList[index % worksList.length]
    const number = String(index + 1).padStart(2, '0')
    const phases = ['Аудит', 'Проектирование', 'Монтаж', 'Сдача', 'Автоматизация']
    return {
        ...source,
        id: number,
        name: `${source.name} // ${phases[index % phases.length]}`,
        location: `${source.location} · контур ${number}`,
        category: `${source.category} · окно ${number}/30`,
        scope: `${source.scope} · детальный разбор этапа ${phases[index % phases.length].toLowerCase()}`,
        status: index % 3 === 0 ? 'Открыть подробный кейс' : source.status,
        detail: `Разобрал этап «${phases[index % phases.length].toLowerCase()}» как отдельный рабочий контур: входящие данные, контрольные точки, комплект на выходе и связь с командой проекта.`,
        documents: ['Реестр исполнительной документации', 'Акт освидетельствования скрытых работ', 'Исполнительная схема и ведомость объёмов', 'Протокол проверки комплектности'],
        result: `${94 + (index % 6)}% комплектности на первой проверке`,
        phase: phases[index % phases.length]
    }
})

const clientStories = [
    {
        quote: '«Артемий полностью снял головную боль по слаботочным системам на ЖК «Скандинавия». Акты и схемы уходили в технадзор день в день, без возвратов на доработку.»',
        name: 'Михаил Т.',
        role: 'Руководитель проекта генерального подрядчика'
    },
    {
        quote: '«Впервые на объекте увидел, чтобы инженер ПТО писал собственные скрипты для сверки ВОР и реестров. Скорость закрытия объемов выросла в разы.»',
        name: 'Сергей К.',
        role: 'Главный инженер по строительству'
    },
    {
        quote: '«Идеальная дисциплина ведения Exon. Все шифры документов структурированы так, что проверка инспекцией Мосгосстройнадзора прошла с первого раза.»',
        name: 'Евгений В.',
        role: 'Ведущий инженер службы технического заказчика'
    }
]

const servicesList = [
    { num: '01', title: 'Исполнительная документация', tag: 'АОСР · СХЕМЫ · ЖУРНАЛЫ' },
    { num: '02', title: 'Слаботочные системы (СС/НСС)', tag: 'СКС · СКУД · СОТ · СВЯЗЬ' },
    { num: '03', title: 'Ведомости объемов (ВОР)', tag: 'БАЛАНС · СВЕРКА · ЗАЩИТА' },
    { num: '04', title: 'Автоматизация рутины ПТО', tag: 'PYTHON · VBA · FASTAPI' },
    { num: '05', title: 'Цифровая среда Exon', tag: 'МОСГОССТРОЙНАДЗОР · ЭДО' },
    { num: '06', title: 'Экспресс-аудит за 48 часов', tag: 'РИСК-ПРОФИЛЬ · РЕШЕНИЯ' }
]

const processSteps = [
    {
        step: '01',
        title: 'Инвентаризация и декомпозиция',
        desc: 'Входим на объект: поднимаем рабочую документацию, сопоставляем проектные спецификации с фактом монтажа, фиксируем отсутствующие сертификаты и штампы «В производство работ».',
        action: 'Смотреть методологию аудита ↗'
    },
    {
        step: '02',
        title: 'Каскадная сборка комплекта',
        desc: 'Формируем единый цифровой конвейер: генерация бланков АОСР по ГОСТу, привязка исполнительных геодезических схем, сквозная нумерация шифров без разрывов в датах.',
        action: 'Смотреть пример комплекта ↗'
    },
    {
        step: '03',
        title: 'Бесшовная сдача в Exon и Заказчику',
        desc: 'Загрузка согласованного пакета в цифровую систему Exon, координация ЭЦП ответственных лиц, сопровождение инспекции Мосгосстройнадзора и подписание форм КС-2.',
        action: 'Перейти к согласованию ↗'
    }
]

const scriptsCatalog = [
    {
        id: 'python',
        name: 'spec_audit_matcher.py',
        lang: 'Python 3.11',
        code: `# Скрипт автоматического сопоставления спецификаций РД и каталога номенклатуры
import pandas as pd
from thefuzz import fuzz, process

def match_spec_items(spec_path: str, catalog_path: str, threshold=85):
    spec = pd.read_excel(spec_path)
    catalog = pd.read_excel(catalog_path)
    catalog_names = catalog['nomenclature_name'].tolist()
    results = []
    
    for idx, row in spec.iterrows():
        item = str(row['Наименование'])
        match, score, _ = process.extractOne(item, catalog_names, scorer=fuzz.token_sort_ratio)
        results.append({
            'pos': row['Позиция'],
            'spec_name': item,
            'match': match if score >= threshold else 'ТРЕБУЕТСЯ ЗАМЕНА',
            'confidence': f"{score}%"
        })
    return pd.DataFrame(results)`
    },
    {
        id: 'vba',
        name: 'AOSR_Batch_Generator.bas',
        lang: 'Excel VBA',
        code: `' Макрос автоматического формирования комплекта АОСР по реестру
Sub GenerateAOSRBatch()
    Dim wsRegistry As Worksheet, wsTemplate As Worksheet
    Dim lastRow As Long, i As Long
    Set wsRegistry = ThisWorkbook.Sheets("Реестр")
    Set wsTemplate = ThisWorkbook.Sheets("Шаблон_АОСР")
    
    lastRow = wsRegistry.Cells(wsRegistry.Rows.Count, "A").End(xlUp).Row
    Application.ScreenUpdating = False
    
    For i = 2 To lastRow
        wsTemplate.Range("B5").Value = wsRegistry.Cells(i, "B").Value
        wsTemplate.Range("B8").Value = wsRegistry.Cells(i, "C").Value
        wsTemplate.Range("C15").Value = wsRegistry.Cells(i, "E").Value
        wsTemplate.ExportAsFixedFormat Type:=xlTypePDF, _
            Filename:=ThisWorkbook.Path & "\\Выгрузка\\АОСР_" & wsRegistry.Cells(i, "B").Value & ".pdf"
    Next i
    Application.ScreenUpdating = True
End Sub`
    },
    {
        id: 'sql',
        name: 'vor_materials_balance.sql',
        lang: 'PostgreSQL / SQLite',
        code: `-- Баланс проектных объемов, закупки и фактически сданной ИД
SELECT 
    v.work_code AS "Шифр ВОР",
    v.work_name AS "Наименование работ",
    v.project_volume AS "Проект",
    COALESCE(SUM(f.closed_volume), 0) AS "Сдано по АОСР",
    (v.project_volume - COALESCE(SUM(f.closed_volume), 0)) AS "Остаток к сдаче",
    ROUND((COALESCE(SUM(f.closed_volume), 0) / v.project_volume) * 100, 1) || '%' AS "Прогресс"
FROM vor_master v
LEFT JOIN fact_acts f ON v.work_code = f.work_code
GROUP BY v.work_code, v.work_name, v.project_volume;`
    }
]

const faqs = [
    {
        q: 'Что делать, если рабочая документация менялась по ходу монтажа?',
        a: 'Это штатная ситуация на 95% строек Москвы. Провожу сопоставительный анализ изменений, фиксирую расхождения в сравнительной ведомости, оформляю согласования с проектным институтом и наношу актуальные штампы «В производство работ» до формирования АОСР.'
    },
    {
        q: 'Работаете ли вы напрямую в цифровой системе Exon?',
        a: 'Да, регулярно сопровождаю объекты в среде Exon: от структурирования каталогов и формирования электронных версий АОСР до контроля цепочки электронных цифровых подписей (ЭЦП) и снятия замечаний технадзора.'
    },
    {
        q: 'Как решается проблема отсутствующих паспортов и сертификатов?',
        a: 'Использую собственную базу нормативных документов и партнерские каналы связи с ключевыми поставщиками (ЭТМ, Русский Свет). При необходимости формирую официальные запросы заводам-изготовителям для ускоренного восстановления паспортов.'
    },
    {
        q: 'Возможна ли работа в режиме «горящих сроков» перед сдачей объекта?',
        a: 'Да. Подключаюсь в режиме экстренного аудита: за 24–48 часов декомпозирую узкие места, выстраиваю параллельный поток оформления документов и закрываю критические акты для устранения предписаний.'
    },
    {
        q: 'В каком формате передаются результаты работы?',
        a: 'Передаётся полностью готовый комплект: структурированный и согласованный архив в Exon, сброшюрованные бумажные папки по ГОСТу с реестрами, а также цифровой архив с исходными моделями Excel и схемами AutoCAD.'
    }
]

export default function App() {
    const [soundEnabled, setSoundEnabled] = useState(false)
    const [aboutOpen, setAboutOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeStory, setActiveStory] = useState(0)
    const [activeService, setActiveService] = useState(0)
    const [activeFaq, setActiveFaq] = useState<number | null>(0)
    const [activeScript, setActiveScript] = useState('python')
    const [currentTime, setCurrentTime] = useState('')
    const [copiedEmail, setCopiedEmail] = useState(false)
    const [copiedTg, setCopiedTg] = useState(false)
    const [activeCase, setActiveCase] = useState<number | null>(null)
    const [caseFilter, setCaseFilter] = useState('Все')
    const [caseTab, setCaseTab] = useState<'контур' | 'документы' | 'результат'>('контур')

    // Cursor state
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
    const [cursorText, setCursorText] = useState('')
    const [cursorActive, setCursorActive] = useState(false)

    // Terminal simulator state
    const [simRunning, setSimRunning] = useState(false)
    const [simLog, setSimLog] = useState<string[]>([
        'MONOLOG // PTO ENGINE v4.2 [Online] -- готов к исполнению',
        'Выберите сценарий ниже для запуска живой эмуляции.'
    ])

    // Audit calculator state
    const [auditType, setAuditType] = useState('residential')
    const [auditStage, setAuditStage] = useState('active')
    const [auditScope, setAuditScope] = useState('full')

    // Web Audio Synthesizer for realistic Monolog mechanical click sounds
    const audioCtxRef = useRef<AudioContext | null>(null)
    const playMechanicalSound = (freq = 320, type: OscillatorType = 'sine') => {
        if (!soundEnabled) return
        try {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
            }
            const ctx = audioCtxRef.current
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = type
            osc.frequency.setValueAtTime(freq, ctx.currentTime)
            osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.04)
            gain.gain.setValueAtTime(0.08, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.start()
            osc.stop(ctx.currentTime + 0.04)
        } catch {
            // Ignore audio restriction if user hasn't interacted
        }
    }

    // Moscow time clock ticker
    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            const mskTime = new Intl.DateTimeFormat('ru-RU', {
                timeZone: 'Europe/Moscow',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(now)
            setCurrentTime(`${mskTime} MSK`)
        }
        updateClock()
        const timer = setInterval(updateClock, 1000)
        return () => clearInterval(timer)
    }, [])

    // Smooth cursor follower
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Listen for ESC key to close drawer
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setAboutOpen(false)
                setMenuOpen(false)
                setActiveCase(null)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleHoverEl = (text: string) => {
        setCursorText(text)
        setCursorActive(true)
        playMechanicalSound(420, 'triangle')
    }

    const handleLeaveEl = () => {
        setCursorActive(false)
        setCursorText('')
    }

    const scrollTo = (id: string) => {
        playMechanicalSound(280)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
        setAboutOpen(false)
    }

    const copyToClipboard = (text: string, type: 'email' | 'tg') => {
        playMechanicalSound(500)
        navigator.clipboard.writeText(text)
        if (type === 'email') {
            setCopiedEmail(true)
            setTimeout(() => setCopiedEmail(false), 2000)
        } else {
            setCopiedTg(true)
            setTimeout(() => setCopiedTg(false), 2000)
        }
    }

    const runSimulation = (scenario: string) => {
        if (simRunning) return
        playMechanicalSound(380)
        setSimRunning(true)
        setSimLog([`[CMD] Инициализация пайплайна: ${scenario}...`])

        const steps: Record<string, string[]> = {
            specs: [
                ' Чтение спецификации рабочей документации (2 418 строк)...',
                ' Подключение к API базы поставщиков (ЭТМ / Русский Свет)...',
                ' Запущен алгоритм нечёткого сопоставления (fuzzy token search)...',
                ' Найдено 2 381 точных совпадений позиций (98.5%).',
                ' [ВНИМАНИЕ] 37 позиций сняты с производства -> сгенерирован лист согласования замен.',
                ' [OK] Итоговый отчет "Reconciliation_Report_2026.xlsx" готов к передаче ГИПу.'
            ],
            aosr: [
                ' Анализ общего журнала работ и хронологии захваток...',
                ' Связывание сертификатов качества с позициями актов...',
                ' Формирование 142 бланков АОСР по форме РД 11-02-2006...',
                ' Проверка непрерывности нумерации и дат закрытия скрытых работ...',
                ' [OK] 142 комплекта актов успешно скомпилированы в PDF с цифровыми штампами.'
            ],
            exon: [
                ' Подключение к облачному шлюзу системы Exon...',
                ' Пакетная валидация комплектности: АОСР, схемы, сертификаты...',
                ' Все 100% обязательных полей заполнены без ошибок.',
                ' Отправка комплекта на параллельное рассмотрение инженеру технадзора...',
                ' [OK] Пакет успешно переведён в статус "На согласовании без замечаний".'
            ]
        }

        const selectedSteps = steps[scenario] || steps.specs
        let i = 0
        const interval = setInterval(() => {
            if (i < selectedSteps.length) {
                const nextStep = selectedSteps[i]
                if (nextStep) {
                    setSimLog(prev => [...prev, nextStep])
                    playMechanicalSound(220 + i * 40)
                }
                i++
            } else {
                clearInterval(interval)
                setSimRunning(false)
            }
        }, 320)
    }

    // Audit calculator results
    const getAuditResults = () => {
        let score = 94
        let days = '3–5 дней'
        let risk = 'Низкий'

        if (auditStage === 'urgent') {
            score -= 28
            days = '24–48 часов (экспресс)'
            risk = 'Критический (требуется скорая помощь ПТО)'
        } else if (auditStage === 'prep') {
            score -= 12
            days = '5–7 дней'
            risk = 'Умеренный'
        }

        if (auditScope === 'complex') {
            score -= 10
        }

        return { score, days, risk }
    }

    const auditResult = getAuditResults()
    const caseFilters = ['Все', ...Array.from(new Set(caseWindows.map(item => item.phase)))]
    const visibleCases = caseFilter === 'Все' ? caseWindows : caseWindows.filter(item => item.phase === caseFilter)
    const selectedCase = activeCase === null ? null : caseWindows[activeCase]
    const openCase = (index: number) => {
        setActiveCase(index)
        setCaseTab('контур')
        window.history.replaceState(null, '', `#case-${caseWindows[index]?.id}`)
        playMechanicalSound(460)
    }
    const closeCase = () => {
        setActiveCase(null)
        window.history.replaceState(null, '', window.location.pathname)
    }

    return (
        <div className="monolog_shell">
            {/* AMBIENT GRAIN OVERLAY */}
            <div className="g_overlay">
                <div className="g_grain_overlay" />
            </div>

            {/* CUSTOM CURSOR BUBBLE */}
            <div
                className={`cursor_wrap ${cursorActive ? 'is-active' : ''}`}
                style={{
                    transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`
                }}
            >
                <div className="cursor-bubble">
                    <span>{cursorText || 'Inspect ↗'}</span>
                </div>
            </div>

            {selectedCase && (
                <div className="case_viewer_backdrop" onClick={closeCase}>
                    <article className="case_viewer" onClick={e => e.stopPropagation()}>
                        <header className="case_viewer_header">
                            <span>CASE FILE // {selectedCase.id} / 30</span>
                            <button onClick={closeCase} aria-label="Закрыть кейс"><X size={18} /> ESC</button>
                        </header>
                        <div className="case_viewer_hero">
                            <img src={selectedCase.image} alt={selectedCase.name} />
                            <div><span>{selectedCase.phase} · {selectedCase.location}</span><h2>{selectedCase.name}</h2></div>
                        </div>
                        <div className="case_viewer_tabs">
                            {(['контур', 'документы', 'результат'] as const).map(tab => <button key={tab} className={caseTab === tab ? 'is-active' : ''} onClick={() => setCaseTab(tab)}>{tab}</button>)}
                        </div>
                        <div className="case_viewer_body">
                            {caseTab === 'контур' && <><p className="case_viewer_lead">{selectedCase.detail}</p><div className="case_detail_grid"><div><span>ЗАДАЧА</span><b>{selectedCase.scope}</b></div><div><span>КОНТАКТ</span><b>{selectedCase.supervisor}</b></div><div><span>КАТЕГОРИЯ</span><b>{selectedCase.category}</b></div></div></>}
                            {caseTab === 'документы' && <div className="case_document_list">{selectedCase.documents.map((doc, index) => <div key={doc}><span>0{index + 1}</span><b>{doc}</b><ArrowUpRight size={15} /></div>)}</div>}
                            {caseTab === 'результат' && <div className="case_result_panel"><strong>{selectedCase.result}</strong><p>{selectedCase.quote}</p><span>{selectedCase.status}</span></div>}
                        </div>
                        <footer className="case_viewer_footer"><button onClick={() => openCase(activeCase === 0 ? 29 : activeCase! - 1)}>← предыдущий</button><span>{selectedCase.id} / 30</span><button onClick={() => openCase(activeCase === 29 ? 0 : activeCase! + 1)}>следующий →</button></footer>
                    </article>
                </div>
            )}

            {/* SLIDE-OUT ABOUT DRAWER (EXACT MONOLOG SPEC) */}
            <div
                className={`about_modal_backdrop ${aboutOpen ? 'is-open' : ''}`}
                onClick={() => setAboutOpen(false)}
            />
            <aside className={`about_modal_wrap ${aboutOpen ? 'is-open' : ''}`}>
                <div className="about_modal_contain">
                    <div className="about_modal_header">
                        <div className="g_eyebrow_about">
                            <span className="g_eyebrow_circle" />
                            <span>Обо мне // Артемий Николаев</span>
                        </div>
                        <button className="about_close_btn" onClick={() => setAboutOpen(false)}>
                            <span>Закрыть</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>esc</span>
                        </button>
                    </div>

                    <div className="about_modal_story">
                        <p>
                            Привет, я <em>Артемий Николаев</em>. Я инженер ПТО, который соединяет классическое строительное производство на площадке с цифровыми экосистемами автоматизации.
                        </p>
                        <p>
                            Строительная документация часто воспринимается как скучная неизбежность, которая делается в последний момент. Но я убеждён: <em>«Документация — это инженерный продукт, который нужно проектировать с тем же вниманием, что и монолитное перекрытие»</em>.
                        </p>
                        <p>
                            Работая на крупнейших жилых комплексах Москвы (ЖК Скандинавия, Событие, Остров) и объектах Реновации, я автоматизировал рутину через <em>Python, VBA и Power Query</em>, сведя к нулю замечания со стороны технадзора и инспекций Мосгосстройнадзора.
                        </p>
                    </div>

                    <div className="about_meta_badges">
                        <span>EST. 2021</span>
                        <span>·</span>
                        <span>МОСКВА И МО</span>
                        <span>·</span>
                        <span>EXON DIGITAL CERTIFIED</span>
                        <span>·</span>
                        <span>ГОСТ Р 51872-2019</span>
                    </div>

                    <div className="about_modal_section">
                        <h3>Ключевые принципы работы:</h3>
                        <div className="about_principles_grid">
                            <div className="about_principle_item">
                                <b>01 / Результат важнее скорости</b>
                                <span>Сначала юридическая и геометрическая чистота комплекта, затем автоматизация. Никогда наоборот.</span>
                            </div>
                            <div className="about_principle_item">
                                <b>02 / Всегда в контексте площадки</b>
                                <span>Понимание реального монтажа кабельных трасс и оборудования исключает оторванные от жизни схемы.</span>
                            </div>
                            <div className="about_principle_item">
                                <b>03 / Человеческий фактор исключён</b>
                                <span>Скрипты сверки исключают опечатки в сертификатах, номерах АОСР и объемах ведомостей.</span>
                            </div>
                        </div>
                    </div>

                    <div className="about_modal_section">
                        <h3>Сданные объекты:</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px' }}>
                            <div>● ЖК «Скандинавия» (185 000 м² · Коммунарка)</div>
                            <div>● ЖК «Событие» (92 000 м² · Раменки)</div>
                            <div>● Программа Реновации (3 стартовых дома · Люблино)</div>
                            <div>● ЖК «Остров» (110 000 м² · Хорошёво-Мнёвники)</div>
                            <div>● Технопарк СберСити (BIM-валидация ВОР)</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* GLOBAL MONOLOG HEADER */}
            <header className="navbar_wrap">
                <div className="navbar_contain">
                    <div className="navbar_left_contain">
                        <a
                            href="#top"
                            className="navbar_brand_logo"
                            onClick={e => { e.preventDefault(); scrollTo('top') }}
                            onMouseEnter={() => handleHoverEl('Home')}
                            onMouseLeave={handleLeaveEl}
                        >
                            <div className="brand_monogram">АН</div>
                            <div className="brand_meta_text">
                                <b>АРТЕМИЙ НИКОЛАЕВ</b>
                                <span>DIGITAL DELIVERY PTO</span>
                            </div>
                        </a>
                    </div>

                    <nav className="navbar_links">
                        <ul>
                            <li>
                                <button
                                    className="navbar_link"
                                    onClick={() => { playMechanicalSound(350); setAboutOpen(true) }}
                                    onMouseEnter={() => handleHoverEl('About ↗')}
                                    onMouseLeave={handleLeaveEl}
                                >
                                    <span className="link_text_wrap">
                                        <span className="link_text_primary">Обо мне</span>
                                        <span className="link_text_secondary">(СТУДИЯ)</span>
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="navbar_link"
                                    onClick={() => scrollTo('works')}
                                    onMouseEnter={() => handleHoverEl('Projects')}
                                    onMouseLeave={handleLeaveEl}
                                >
                                    <span className="link_text_wrap">
                                        <span className="link_text_primary">Объекты</span>
                                        <span className="link_text_secondary">(КЕЙСЫ)</span>
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="navbar_link"
                                    onClick={() => scrollTo('services')}
                                    onMouseEnter={() => handleHoverEl('Services')}
                                    onMouseLeave={handleLeaveEl}
                                >
                                    <span className="link_text_wrap">
                                        <span className="link_text_primary">Услуги</span>
                                        <span className="link_text_secondary">(СТЕК)</span>
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="navbar_link"
                                    onClick={() => scrollTo('process')}
                                    onMouseEnter={() => handleHoverEl('Process')}
                                    onMouseLeave={handleLeaveEl}
                                >
                                    <span className="link_text_wrap">
                                        <span className="link_text_primary">Процесс</span>
                                        <span className="link_text_secondary">(РЕГЛАМЕНТ)</span>
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="navbar_link"
                                    onClick={() => scrollTo('faqs')}
                                    onMouseEnter={() => handleHoverEl('FAQ')}
                                    onMouseLeave={handleLeaveEl}
                                >
                                    <span className="link_text_wrap">
                                        <span className="link_text_primary">Вопросы</span>
                                        <span className="link_text_secondary">(ОТВЕТЫ)</span>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </nav>

                    <div className="navbar_actions">
                        {/* Sound Toggle Button */}
                        <button
                            className={`navbar_sound_btn ${soundEnabled ? 'is-active' : ''}`}
                            onClick={() => {
                                const next = !soundEnabled
                                setSoundEnabled(next)
                                if (next) playMechanicalSound(440)
                            }}
                            title={soundEnabled ? 'Выключить звук' : 'Включить аудиоэффекты'}
                            onMouseEnter={() => handleHoverEl(soundEnabled ? 'Mute' : 'Audio')}
                            onMouseLeave={handleLeaveEl}
                            aria-label="Sound Toggle"
                        >
                            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                        </button>

                        {/* Monolog Sliding CTA Button */}
                        <a
                            href="https://t.me/Amantle_x"
                            target="_blank"
                            rel="noreferrer"
                            className="g_btn_main"
                            onMouseEnter={() => handleHoverEl('Telegram ↗')}
                            onMouseLeave={handleLeaveEl}
                            onClick={() => playMechanicalSound(480)}
                        >
                            <div className="g_btn_text_contain">
                                <span className="g_btn_text">Обсудить проект</span>
                            </div>
                            <div className="g_btn_aside_wrap">
                                <div className="g_btn_aside_bg" />
                                <ArrowUpRight size={13} className="g_btn_svg" />
                                <ArrowUpRight size={13} className="g_btn_svg is-absolute" />
                            </div>
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            className="navbar_menu_btn"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Меню"
                        >
                            {menuOpen ? <X size={16} /> : 'Меню'}
                        </button>
                    </div>
                </div>
            </header>

            <main id="top">
                {/* HERO SECTION (MONOLOG KEY VISUAL) */}
                <section className="hero_home_wrap">
                    <div className="hero_home_content">
                        <div className="hero_home_eyebrow_wrap">
                            <span className="hero_badge_pill">
                                <span className="g_eyebrow_circle" />
                                СИСТЕМА ЦИФРОВОГО ПТО · 2026
                            </span>
                            <span style={{ font: '500 11px var(--font-mono)', color: 'var(--swatch--muted)' }}>
                                GEO: 55°45'N 37°37'E · {currentTime}
                            </span>
                        </div>

                        <h1 className="hero_home_heading">
                            Создаю цифровую среду, которая превращает <span className="accent-text">строительную документацию</span> в предсказуемый инженерный конвейер.
                        </h1>

                        <p className="hero_home_desc">
                            Инженер ПТО для девелоперов и генеральных подрядчиков, которым требуется 100% сдача исполнительной документации в Exon и Мосгосстройнадзор без срыва сроков ввода объекта.
                        </p>

                        <div className="hero_cta_group">
                            <button
                                className="g_btn_main"
                                onClick={() => scrollTo('works')}
                                onMouseEnter={() => handleHoverEl('Scroll')}
                                onMouseLeave={handleLeaveEl}
                            >
                                <div className="g_btn_text_contain">
                                    <span className="g_btn_text">Смотреть объекты</span>
                                </div>
                                <div className="g_btn_aside_wrap">
                                    <div className="g_btn_aside_bg" />
                                    <ArrowDownRight size={13} className="g_btn_svg" />
                                    <ArrowDownRight size={13} className="g_btn_svg is-absolute" />
                                </div>
                            </button>

                            <button
                                className="hero_secondary_btn"
                                onClick={() => scrollTo('audit')}
                                onMouseEnter={() => handleHoverEl('Audit')}
                                onMouseLeave={handleLeaveEl}
                            >
                                Экспресс-аудит объекта
                            </button>
                        </div>
                    </div>

                    {/* HERO KEY VISUAL CARD */}
                    <div className="hero_key_visual">
                        <img
                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1800&q=85"
                            alt="Construction engineering"
                        />
                        <div className="hero_visual_grid_overlay" />
                        <div className="hero_visual_stamp">
                            <b>КОНТУР ИД // EXON VERIFIED</b>
                            <span>ГОСТ Р 51872-2019 · СП 48.13330 · РД 11-02-2006</span>
                        </div>
                    </div>
                </section>

                {/* METRICS & PROOF STRIP */}
                <div className="metrics_strip_wrap">
                    <div className="metrics_strip_contain">
                        <div className="metric_item">
                            <span className="metric_num">17<em>+</em></span>
                            <span className="metric_lbl">крупных объектов сдано в Москве</span>
                        </div>
                        <div className="metric_item">
                            <span className="metric_num">100<em>%</em></span>
                            <span className="metric_lbl">приёмка комплектов в Exon</span>
                        </div>
                        <div className="metric_item">
                            <span className="metric_num">20<em>k+</em></span>
                            <span className="metric_lbl">позиций в проверенной базе материалов</span>
                        </div>
                        <div className="metric_item">
                            <span className="metric_num">5<em>×</em></span>
                            <span className="metric_lbl">ускорение рутины через Python & VBA</span>
                        </div>
                    </div>
                </div>

                {/* SELECTED WORKS (EDITORIAL WORK SHOWCASE) */}
                <section id="works" className="works_home_wrap">
                    <div className="section_header_monolog">
                        <div className="section_title_monolog">
                            <span className="mono_eyebrow">01 / Практика и портфолио</span>
                            <h2>Объекты говорят за результат.</h2>
                        </div>
                        <span style={{ font: '500 12px var(--font-mono)', color: 'var(--swatch--muted)' }}>
                            МОСКВА И МОСКОВСКАЯ ОБЛАСТЬ
                        </span>
                    </div>

                    <div className="case_filter_row">
                        <span>30 окон / 5 рабочих фаз</span>
                        {caseFilters.map(filter => <button key={filter} className={caseFilter === filter ? 'is-active' : ''} onClick={() => setCaseFilter(filter)}>{filter}</button>)}
                    </div>
                    <div className="works_grid case_windows_grid">
                        {visibleCases.map((item) => (
                            <article
                                key={item.id}
                                className="work_card"
                                onMouseEnter={() => handleHoverEl(`Кейс ${item.id} ↗`)}
                                onMouseLeave={handleLeaveEl}
                                onClick={() => openCase(caseWindows.findIndex(caseItem => caseItem.id === item.id))}
                                role="button"
                                tabIndex={0}
                                onKeyDown={e => { if (e.key === 'Enter') openCase(caseWindows.findIndex(caseItem => caseItem.id === item.id)) }}
                            >
                                <div className="work_media">
                                    <img src={item.image} alt={item.name} />
                                    <span className="work_media_pill">{item.status}</span>
                                </div>

                                <div className="work_content">
                                    <div>
                                        <div className="work_meta_top">
                                            <span>{item.id} // {item.location}</span>
                                            <span>{item.category}</span>
                                        </div>

                                        <h3>{item.name}</h3>
                                        <p className="work_quote">{item.quote}</p>
                                        <small style={{ font: '500 12px var(--font-mono)', color: 'var(--swatch--muted)' }}>
                                            {item.supervisor}
                                        </small>

                                        <div className="work_metrics_row">
                                            {item.metrics.map(m => (
                                                <div key={m.label} className="work_metric_block">
                                                    <b>{m.val}</b>
                                                    <span>{m.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="work_tags_group">
                                        {item.tags.map(t => (
                                            <span key={t} className="work_tag_item">#{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* SERVICES & REAL CLIENT STORIES (EXACT MONOLOG SECTION) */}
                <section id="services" className="services_home_wrap">
                    <div className="services_home_contain">
                        {/* Client Stories Box */}
                        <div className="services_stories_box">
                            <div>
                                <div className="stories_header">
                                    <span style={{ font: '600 11px var(--font-mono)', color: 'var(--swatch--accent)' }}>
                                        (ОТЗЫВЫ РУКОВОДИТЕЛЕЙ)
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span className="stories_counter">
                                            0{activeStory + 1} / 0{clientStories.length}
                                        </span>
                                        <div className="stories_nav_btns">
                                            <button
                                                className="stories_nav_btn"
                                                onClick={() => {
                                                    playMechanicalSound(300)
                                                    setActiveStory(prev => (prev === 0 ? clientStories.length - 1 : prev - 1))
                                                }}
                                                aria-label="Previous story"
                                            >
                                                ←
                                            </button>
                                            <button
                                                className="stories_nav_btn"
                                                onClick={() => {
                                                    playMechanicalSound(300)
                                                    setActiveStory(prev => (prev === clientStories.length - 1 ? 0 : prev + 1))
                                                }}
                                                aria-label="Next story"
                                            >
                                                →
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <p className="story_quote_text">
                                    {clientStories[activeStory].quote}
                                </p>
                            </div>

                            <div className="story_author_wrap">
                                <div className="story_author_avatar">
                                    {clientStories[activeStory].name[0]}
                                </div>
                                <div className="story_author_info">
                                    <b>{clientStories[activeStory].name}</b>
                                    <span>{clientStories[activeStory].role}</span>
                                </div>
                            </div>
                        </div>

                        {/* Services List Group */}
                        <div>
                            <div style={{ marginBottom: '28px' }}>
                                <span className="mono_eyebrow" style={{ font: '600 12px var(--font-mono)', color: 'var(--swatch--accent)' }}>
                                    02 / Компетенции и услуги
                                </span>
                                <h2 style={{ font: '700 clamp(28px, 3.2vw, 44px) var(--font-display)', margin: '8px 0 0' }}>
                                    Что получает проектная команда.
                                </h2>
                            </div>

                            <div className="services_list_group">
                                {servicesList.map((s, idx) => (
                                    <div
                                        key={s.num}
                                        className={`service_row_item ${activeService === idx ? 'is-active' : ''}`}
                                        onMouseEnter={() => {
                                            setActiveService(idx)
                                            handleHoverEl(s.title)
                                        }}
                                        onMouseLeave={handleLeaveEl}
                                        onClick={() => playMechanicalSound(360)}
                                    >
                                        <div className="service_row_left">
                                            <span className="service_row_idx">{s.num}</span>
                                            <h3>{s.title}</h3>
                                        </div>
                                        <div className="service_row_right">
                                            <span className="service_row_tag">{s.tag}</span>
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* INTERACTIVE TERMINAL SIMULATOR (THE MONOLOG LAB) */}
                <section id="simulator" className="simulator_home_wrap">
                    <div className="section_header_monolog">
                        <div className="section_title_monolog">
                            <span className="mono_eyebrow">03 / Лаборатория автоматизации</span>
                            <h2>Живой эмулятор скриптов ПТО.</h2>
                        </div>
                        <span style={{ font: '500 12px var(--font-mono)', color: 'var(--swatch--accent)' }}>
                            PYTHON 3.11 RUNTIME // FASTAPI
                        </span>
                    </div>

                    <div className="terminal_monolog_shell">
                        <div className="terminal_top_bar">
                            <div className="terminal_mac_dots">
                                <span className="d-red" />
                                <span className="d-yellow" />
                                <span className="d-green" />
                            </div>
                            <span className="terminal_bar_title">ENGINE TERMINAL // BATCH EXECUTION MODULE</span>
                            <span style={{ font: '600 10px var(--font-mono)', color: 'var(--swatch--accent)' }}>
                                STATUS: ONLINE
                            </span>
                        </div>

                        <div className="terminal_actions_bar">
                            <button
                                className="terminal_action_btn"
                                onClick={() => runSimulation('specs')}
                                disabled={simRunning}
                                onMouseEnter={() => handleHoverEl('Run script')}
                                onMouseLeave={handleLeaveEl}
                            >
                                <Play size={13} /> Запустить сверку спецификаций
                            </button>
                            <button
                                className="terminal_action_btn"
                                onClick={() => runSimulation('aosr')}
                                disabled={simRunning}
                                onMouseEnter={() => handleHoverEl('Run batch')}
                                onMouseLeave={handleLeaveEl}
                            >
                                <Play size={13} /> Пакетная сборка АОСР
                            </button>
                            <button
                                className="terminal_action_btn"
                                onClick={() => runSimulation('exon')}
                                disabled={simRunning}
                                onMouseEnter={() => handleHoverEl('Validate')}
                                onMouseLeave={handleLeaveEl}
                            >
                                <Play size={13} /> Проверка пакета Exon
                            </button>
                        </div>

                        <div className="terminal_body_console">
                            {simLog.filter(Boolean).map((line, idx) => {
                                const str = String(line || '')
                                const cls = str.startsWith('[OK]')
                                    ? 'accent'
                                    : str.startsWith('[ВНИМАНИЕ]')
                                        ? 'warn'
                                        : str.startsWith('[CMD]')
                                            ? 'highlight'
                                            : 'dim'
                                return (
                                    <div key={idx} className={`terminal_line_row ${cls}`}>
                                        {str}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* PROJECT PROCESS (MONOLOG GIANT HEADER & 3 STEP PIPELINE) */}
                <section id="process" className="process_home_wrap">
                    <h2 className="process_giant_header">PROJECT PROCESS</h2>

                    <div className="process_steps_grid">
                        {processSteps.map(step => (
                            <div
                                key={step.step}
                                className="process_step_card"
                                onMouseEnter={() => handleHoverEl(`Step ${step.step}`)}
                                onMouseLeave={handleLeaveEl}
                            >
                                <div>
                                    <div className="process_step_top">
                                        <span className="process_step_num">{step.step}</span>
                                        <span className="process_step_indicator">
                                            <i /> ЭТАП
                                        </span>
                                    </div>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                                <span className="process_step_action">
                                    {step.action}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* INTERACTIVE AUDIT CALCULATOR */}
                <section id="audit" className="audit_home_wrap">
                    <div className="audit_home_contain">
                        <div className="audit_controls_card">
                            <div style={{ marginBottom: '32px' }}>
                                <span className="mono_eyebrow" style={{ font: '600 12px var(--font-mono)', color: 'var(--swatch--accent)' }}>
                                    04 / Диагностика объекта
                                </span>
                                <h2 style={{ font: '700 clamp(26px, 2.8vw, 42px) var(--font-display)', margin: '8px 0 0' }}>
                                    Экспресс-расчёт готовности к сдаче.
                                </h2>
                            </div>

                            <p className="audit_group_lbl">1. Тип объекта:</p>
                            <div className="audit_chips_row">
                                <button
                                    className={`audit_chip_btn ${auditType === 'residential' ? 'is-active' : ''}`}
                                    onClick={() => { playMechanicalSound(280); setAuditType('residential') }}
                                >
                                    Жилой комплекс (МКД)
                                </button>
                                <button
                                    className={`audit_chip_btn ${auditType === 'commercial' ? 'is-active' : ''}`}
                                    onClick={() => { playMechanicalSound(280); setAuditType('commercial') }}
                                >
                                    Бизнес-центр / ТРЦ
                                </button>
                                <button
                                    className={`audit_chip_btn ${auditType === 'infra' ? 'is-active' : ''}`}
                                    onClick={() => { playMechanicalSound(280); setAuditType('infra') }}
                                >
                                    Городская инфраструктура
                                </button>
                            </div>

                            <p className="audit_group_lbl">2. Текущее состояние:</p>
                            <div className="audit_chips_row">
                                <button
                                    className={`audit_chip_btn ${auditStage === 'active' ? 'is-active' : ''}`}
                                    onClick={() => { playMechanicalSound(280); setAuditStage('active') }}
                                >
                                    Идёт монтаж (плановый)
                                </button>
                                <button
                                    className={`audit_chip_btn ${auditStage === 'prep' ? 'is-active' : ''}`}
                                    onClick={() => { playMechanicalSound(280); setAuditStage('prep') }}
                                >
                                    Подготовка к сдаче (1–2 мес)
                                </button>
                                <button
                                    className={`audit_chip_btn ${auditStage === 'urgent' ? 'is-active' : ''}`}
                                    onClick={() => { playMechanicalSound(280); setAuditStage('urgent') }}
                                >
                                    Горящие сроки / Есть замечания
                                </button>
                            </div>

                            <p className="audit_group_lbl">3. Объем инженерных систем:</p>
                            <div className="audit_chips_row">
                                <button
                                    className={`audit_chip_btn ${auditScope === 'lowv' ? 'is-active' : ''}`}
                                    onClick={() => { playMechanicalSound(280); setAuditScope('lowv') }}
                                >
                                    Слаботочные сети (СС/НСС)
                                </button>
                                <button
                                    className={`audit_chip_btn ${auditScope === 'full' ? 'is-active' : ''}`}
                                    onClick={() => { playMechanicalSound(280); setAuditScope('full') }}
                                >
                                    Комплекс инженерных сетей
                                </button>
                            </div>
                        </div>

                        {/* Result Display Box */}
                        <div className="audit_results_card">
                            <div>
                                <span style={{ font: '600 11px var(--font-mono)', color: 'var(--swatch--muted)', textTransform: 'uppercase' }}>
                                    ИНДЕКС ГОТОВНОСТИ ДОКУМЕНТАЦИИ:
                                </span>
                                <div className="audit_score_val">{auditResult.score}%</div>
                                <span style={{ font: '600 11px var(--font-mono)', color: 'var(--swatch--muted)', textTransform: 'uppercase' }}>
                                    ОЦЕНКА СРОКА ЗАКРЫТИЯ ПАПКИ:
                                </span>
                                <div style={{ font: '700 22px var(--font-display)', color: 'var(--swatch--beige-100)', marginTop: '6px' }}>
                                    {auditResult.days}
                                </div>
                            </div>

                            <div className="audit_summary_box">
                                <b style={{ display: 'block', color: 'var(--swatch--accent)', marginBottom: '8px', font: '600 13px var(--font-mono)' }}>
                                    Уровень риска: {auditResult.risk}
                                </b>
                                <span style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--swatch--beige-300)' }}>
                                    Рекомендуется предварительная сверка ведомости объемов работ с проектными спецификациями и предконтроль реестра АОСР.
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CODE VAULT (REAL ARTIFACTS) */}
                <section id="code" className="vault_home_wrap">
                    <div className="section_header_monolog">
                        <div className="section_title_monolog">
                            <span className="mono_eyebrow">05 / Артефакты кода</span>
                            <h2>Продакшн-скрипты автоматизации.</h2>
                        </div>
                        <span style={{ font: '500 12px var(--font-mono)', color: 'var(--swatch--muted)' }}>
                            OPEN SOURCE REPOSITORY
                        </span>
                    </div>

                    <div className="vault_card_box">
                        <div className="vault_tabs_row">
                            {scriptsCatalog.map(sc => (
                                <button
                                    key={sc.id}
                                    className={`vault_tab_item ${activeScript === sc.id ? 'is-active' : ''}`}
                                    onClick={() => { playMechanicalSound(320); setActiveScript(sc.id) }}
                                    onMouseEnter={() => handleHoverEl(sc.lang)}
                                    onMouseLeave={handleLeaveEl}
                                >
                                    {sc.name} ({sc.lang})
                                </button>
                            ))}
                        </div>

                        <pre className="vault_code_pre">
                            <code>{scriptsCatalog.find(s => s.id === activeScript)?.code}</code>
                        </pre>
                    </div>
                </section>

                {/* FAQS SECTION (MONOLOG ACCORDION SLIDE INTERACTION) */}
                <section id="faqs" className="faq_home_wrap">
                    <div className="faq_left_col">
                        <span className="mono_eyebrow">06 / Частые вопросы</span>
                        <h2>Всё, что важно знать до начала работы.</h2>
                    </div>

                    <div className="faq_accordion_list">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className={`accordion_css_item ${activeFaq === idx ? 'is-active' : ''}`}
                            >
                                <button
                                    className="accordion_toggle_btn"
                                    onClick={() => {
                                        playMechanicalSound(340)
                                        setActiveFaq(activeFaq === idx ? null : idx)
                                    }}
                                    onMouseEnter={() => handleHoverEl('Expand')}
                                    onMouseLeave={handleLeaveEl}
                                >
                                    <h3>{faq.q}</h3>
                                    <div className="accordion_css_square" />
                                </button>
                                {activeFaq === idx && (
                                    <div className="accordion_answer_body">
                                        <p>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* GIANT MONOLOG CTA BANNER */}
                <section className="cta_home_wrap">
                    <div className="cta_home_contain">
                        <h2 className="cta_giant_display">
                            <span className="arrow">→</span>СДАДИМ ОБЪЕКТ<br />
                            <em>БЕЗ СРЕЗОК И ЗАМЕЧАНИЙ.</em>
                        </h2>

                        <div className="cta_actions_row">
                            <a
                                href="https://t.me/Amantle_x"
                                target="_blank"
                                rel="noreferrer"
                                className="g_btn_main"
                                style={{ padding: '14px 28px' }}
                                onMouseEnter={() => handleHoverEl('Telegram ↗')}
                                onMouseLeave={handleLeaveEl}
                                onClick={() => playMechanicalSound(500)}
                            >
                                <div className="g_btn_text_contain" style={{ height: '22px' }}>
                                    <span className="g_btn_text" style={{ fontSize: '15px', lineHeight: '22px', textShadow: '0px 22px 0px var(--swatch--black-400)' }}>
                                        Написать в Telegram @Amantle_x
                                    </span>
                                </div>
                                <div className="g_btn_aside_wrap" style={{ width: '30px', height: '30px' }}>
                                    <div className="g_btn_aside_bg" />
                                    <ArrowUpRight size={16} className="g_btn_svg" />
                                    <ArrowUpRight size={16} className="g_btn_svg is-absolute" />
                                </div>
                            </a>

                            <button
                                className="hero_secondary_btn"
                                onClick={() => copyToClipboard('artyomnikolae7@gmail.com', 'email')}
                                onMouseEnter={() => handleHoverEl('Copy Email')}
                                onMouseLeave={handleLeaveEl}
                            >
                                {copiedEmail ? 'Почта скопирована!' : 'Скопировать Email: artyomnikolae7@gmail.com'}
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* MONOLOG COLOPHON FOOTER */}
            <footer className="footer_monolog">
                <div className="footer_contain">
                    <div className="footer_top_row">
                        <div className="footer_col_brand">
                            <h3>АРТЕМИЙ НИКОЛАЕВ</h3>
                            <p>
                                Инженер ПТО & цифровизация исполнительной документации. Развертывание предсказуемых стандартов сдачи для строительных компаний.
                            </p>
                        </div>

                        <div className="footer_nav_links">
                            <div className="footer_nav_col">
                                <span>Навигация</span>
                                <button onClick={() => scrollTo('works')}>Объекты</button>
                                <button onClick={() => scrollTo('services')}>Услуги</button>
                                <button onClick={() => scrollTo('process')}>Процесс</button>
                                <button onClick={() => scrollTo('audit')}>Аудит</button>
                                <button onClick={() => setAboutOpen(true)}>Обо мне</button>
                            </div>

                            <div className="footer_nav_col">
                                <span>Связь</span>
                                <a href="https://t.me/Amantle_x" target="_blank" rel="noreferrer">
                                    Telegram @Amantle_x
                                </a>
                                <a href="mailto:artyomnikolae7@gmail.com">
                                    artyomnikolae7@gmail.com
                                </a>
                                <span>Москва и МО (выезд на объект)</span>
                            </div>
                        </div>
                    </div>

                    <div className="footer_bottom_row">
                        <div>
                            © 2026 АРТЕМИЙ НИКОЛАЕВ · ВСЕ ПРАВА ЗАЩИЩЕНЫ
                        </div>
                        <div>
                            DESIGN INSPIRATION: BYMONOLOG.COM (AWWWARDS SOTD)
                        </div>
                        <button
                            className="footer_scroll_top"
                            onClick={() => scrollTo('top')}
                            onMouseEnter={() => handleHoverEl('Top ↑')}
                            onMouseLeave={handleLeaveEl}
                        >
                            Наверх ↑
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    )
}
