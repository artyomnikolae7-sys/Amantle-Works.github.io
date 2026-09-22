import { useState } from 'react'
import { Send, CheckCircle2, User, Bot, Clock } from 'lucide-react'
import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'
import { Button } from '../../../components/elevenlabs/Button'
import { BarVisualizer } from '../../../components/elevenlabs/BarVisualizer'

interface Message {
  id: number
  sender: 'engineer' | 'supervision'
  text: string
  time: string
  status?: 'delivered' | 'read'
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'supervision',
    text: 'Артемий, добрый день. По корпусу 2 (раздел СВН) в Exon отклонили том ИД. В акте №44 не прикреплен паспорт на уличные камеры Dahua и нет отметки геодезиста на схеме.',
    time: '11:42',
  },
  {
    id: 2,
    sender: 'engineer',
    text: 'Добрый день, Игорь Михайлович. Принято. Паспорт с сертификатом соответствия уже подгрузил в модуль Сертификаты (ID 8841). Исполнительную схему с штампом геодезической службы перезалил в изм. 1.',
    time: '11:48',
    status: 'read',
  },
  {
    id: 3,
    sender: 'supervision',
    text: 'Отлично, вижу обновление в системе. Замечание снял, акт подписан ЭЦП.',
    time: '11:55',
  },
]

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputText, setInputText] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newMsg: Message = {
      id: Date.now(),
      sender: 'engineer',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
    }
    setMessages((prev) => [...prev, newMsg])
    setInputText('')

    // Simulated response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'supervision',
          text: 'Спасибо за оперативность! Проверил статус в Exon — всё согласовано.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    }, 1200)
  }

  return (
    <section id="chat" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">Рабочая Коммуникация</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Симулятор взаимодействия в Exon
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Интерактивный пример реального диалога с технадзором и заказчиком по снятию замечаний
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar Info (4 cols) */}
        <Card className="lg:col-span-4 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs font-mono">
                ТН
              </div>
              <div>
                <h4 className="text-sm font-normal text-foreground font-display">Технадзор / Заказчик</h4>
                <p className="text-xs font-mono text-muted-foreground">ГКУ «Управление дорожно-мостового строительства»</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="p-3 rounded-[12px] bg-background border border-border space-y-1">
                <span className="text-[10px] font-mono uppercase text-muted-foreground">Текущий статус объекта</span>
                <p className="font-medium text-foreground">ЖК «Большая Академическая», Корп. 2</p>
              </div>
              <div className="p-3 rounded-[12px] bg-background border border-border space-y-1">
                <span className="text-[10px] font-mono uppercase text-muted-foreground">Раздел документации</span>
                <p className="font-medium text-foreground">СВН (Видеонаблюдение) • АОСР-44</p>
              </div>
            </div>
          </div>

          {/* Audio Visualizer Indicator */}
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span>Канал связи</span>
              <span className="text-foreground">Online</span>
            </div>
            <BarVisualizer barCount={14} />
          </div>
        </Card>

        {/* Chat Feed (8 cols) */}
        <Card className="lg:col-span-8 p-6 flex flex-col justify-between space-y-4 min-h-[420px]">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
              <span className="text-xs font-mono font-medium text-foreground">Чат согласования замечаний</span>
            </div>
            <Badge variant="outline">Exon.Direct</Badge>
          </div>

          {/* Message List */}
          <div className="flex-1 space-y-4 overflow-y-auto py-2 pr-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] ${
                  msg.sender === 'engineer' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${
                    msg.sender === 'engineer'
                      ? 'bg-foreground text-background'
                      : 'bg-card border border-border text-foreground'
                  }`}
                >
                  {msg.sender === 'engineer' ? 'АН' : 'ТН'}
                </div>

                <div
                  className={`p-4 rounded-[18px] text-xs leading-relaxed space-y-1 ${
                    msg.sender === 'engineer'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-background border border-border text-foreground rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 text-[10px] ${
                      msg.sender === 'engineer' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}
                  >
                    <span>{msg.time}</span>
                    {msg.sender === 'engineer' && (
                      <CheckCircle2 size={11} className="shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="pt-3 border-t border-border flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Напишите ответ или уточнение по замечанию..."
              className="flex-1 px-4 py-2.5 rounded-full bg-background border border-border text-foreground text-xs focus:outline-none focus:border-foreground transition-colors"
            />
            <Button type="submit" variant="filled" size="sm" className="shrink-0">
              <Send size={13} />
              <span className="hidden sm:inline">Отправить</span>
            </Button>
          </form>

        </Card>
      </div>
    </section>
  )
}
