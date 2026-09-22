import { useState } from 'react'
import { FileSpreadsheet, Download, FileText, CheckCircle2, Sparkles } from 'lucide-react'
import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'
import { Button } from '../../../components/elevenlabs/Button'
import * as XLSX from 'xlsx'

const templates = [
  {
    id: 'vor-calc',
    title: 'Калькулятор ВОР и Шахматки (Excel)',
    desc: 'Готовый шаблон с формулами автоматического подсчета объемов, кабельных запасов (6%), сопоставления факт/проект и сводными таблицами.',
    format: 'XLSX / Google Sheets',
    tags: ['ВОР', 'Формулы', 'Кабель'],
  },
  {
    id: 'aosr-generator',
    title: 'Генератор реестров АОСР на VBA',
    desc: 'Файл с макросом пакетного формирования комплекта актов освидетельствования скрытых работ и привязки исполнительных схем.',
    format: 'XLSM (VBA)',
    tags: ['АОСР', 'VBA', 'Пакетная печать'],
  },
  {
    id: 'material-inflow',
    title: 'Журнал входного контроля материалов',
    desc: 'Реестр сертификатов соответствия, паспортов и пожарных заключений с автоматической проверкой срока действия.',
    format: 'XLSX',
    tags: ['Сертификаты', 'Входной контроль'],
  },
  {
    id: 'ppr-template',
    title: 'Шаблон ППР на слаботочные сети',
    desc: 'Структура проекта производства работ по разделам СС/НСС с готовыми разделами по охране труда, технологии монтажа и ТК.',
    format: 'DOCX / PDF',
    tags: ['ППР', 'Техкарты', 'МГСН'],
  },
]

export function ToolkitSection() {
  const [downloaded, setDownloaded] = useState<string | null>(null)

  const downloadDemoXlsx = (templateId: string, title: string) => {
    const wb = XLSX.utils.book_new()
    const wsData = [
      ['АРТЕМИЙ НИКОЛАЕВ — ИНЖЕНЕР ПТО / EXON'],
      ['Шаблон:', title],
      ['Дата экспорта:', new Date().toLocaleDateString('ru-RU')],
      [''],
      ['№ п/п', 'Наименование работ и материалов', 'Ед. изм.', 'Проект', 'Факт', 'Отклонение', 'Статус'],
      [1, 'Прокладка кабеля UTP 4x2x0.52 кат. 5e в гофротрубе', 'м', 4500, 4420, -80, 'ИД Сдана'],
      [2, 'Монтаж оптического кабеля 8 волокон в кабельной канализации', 'м', 1200, 1200, 0, 'ИД Сдана'],
      [3, 'Установка шкафа телекоммуникационного 19" 42U', 'шт', 6, 6, 0, 'Акт АОСР подписан'],
      [4, 'Монтаж IP-видеокамер купольных 4MP (СВН)', 'шт', 48, 48, 0, 'В работе Exon'],
      [5, 'Монтаж считывателей СКУД и электромагнитных замков', 'компл', 14, 14, 0, 'В работе Exon'],
    ]
    const ws = XLSX.utils.aoa_to_sheet(wsData)
    XLSX.utils.book_append_sheet(wb, ws, 'Шаблон_ПТО')
    XLSX.writeFile(wb, `${templateId}_nikolaev_pto.xlsx`)
    setDownloaded(templateId)
    setTimeout(() => setDownloaded(null), 3500)
  }

  return (
    <section id="toolkit" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">Инженерные Артефакты</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Шаблоны и наработки для скачивания
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Проверенные в боевых условиях Excel-калькуляторы, скрипты и чек-листы, которые можно скачать и протестировать
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tpl) => (
          <Card key={tpl.id} className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{tpl.format}</Badge>
                <div className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-foreground">
                  <FileSpreadsheet size={16} strokeWidth={1.5} />
                </div>
              </div>

              <h4 className="text-base font-normal text-foreground font-display leading-snug">
                {tpl.title}
              </h4>

              <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                {tpl.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {tpl.tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button
                variant={downloaded === tpl.id ? "secondary" : "outline"}
                size="sm"
                className="w-full"
                onClick={() => downloadDemoXlsx(tpl.id, tpl.title)}
              >
                {downloaded === tpl.id ? (
                  <>
                    <CheckCircle2 size={13} className="text-foreground" />
                    <span>Файл сформирован и скачан</span>
                  </>
                ) : (
                  <>
                    <Download size={13} />
                    <span>Скачать демонстрационный шаблон</span>
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
