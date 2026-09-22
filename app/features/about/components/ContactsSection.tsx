import { useState } from 'react'
import { MapPin, Mail, Send, Check } from 'lucide-react'

export function ContactsSection() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)

  return (
    <section id="contacts" className="space-y-10 animate-fade-slide-in relative">
      <div className="text-center space-y-2">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest font-semibold">Связаться со мной</span>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Начать сотрудничество
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Если у вас есть вопросы по сдаче ИД, ведению ВОР на ваших объектах или вы хотите обсудить проект автоматизации ПТО — заполните форму ниже или свяжитесь напрямую.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
          <div className="themed-card p-6 rounded-[20px] space-y-1.5">
            <span className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Локация</span>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <MapPin size={16} className="text-foreground/70 shrink-0" />
              <span>Москва, Российская Федерация</span>
            </div>
          </div>

          <div className="themed-card p-6 rounded-[20px] space-y-1.5">
            <span className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Электронная почта</span>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <Mail size={16} className="text-foreground/70 shrink-0" />
              <a href="mailto:artyomnikolae7@gmail.com" className="hover:underline">artyomnikolae7@gmail.com</a>
            </div>
          </div>

          <div className="themed-card p-6 rounded-[20px] space-y-1.5">
            <span className="text-[10px] font-mono text-muted-foreground uppercase font-semibold">Telegram</span>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <Send size={16} className="text-foreground/70 shrink-0" />
              <a href="https://t.me/Amantle_x" target="_blank" rel="noreferrer" className="hover:underline">@Amantle_x</a>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="lg:col-span-7 themed-card p-8 rounded-[20px]">
          <h4 className="text-base font-normal text-foreground mb-4 font-display">Отправить сообщение</h4>
          
          {formSubmitted ? (
            <div className="bg-background border border-border p-6 rounded-[16px] text-center space-y-3">
              <Check className="w-8 h-8 text-foreground mx-auto" />
              <h4 className="font-medium text-foreground text-sm">Сообщение отправлено</h4>
              <p className="text-xs text-muted-foreground font-normal">Спасибо за обращение. Я свяжусь с вами в течение рабочего дня.</p>
              <button 
                onClick={() => setFormSubmitted(false)}
                className="text-xs text-foreground underline mt-2 cursor-pointer font-medium"
              >
                Отправить ещё одно
              </button>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                setFormSubmitted(true)
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-muted-foreground mb-1 font-mono uppercase">Ваше Имя *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Артемий" 
                    className="w-full px-4 py-2.5 rounded-[10px] bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-all text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-muted-foreground mb-1 font-mono uppercase">Email *</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="you@example.com" 
                    className="w-full px-4 py-2.5 rounded-[10px] bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-all text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-muted-foreground mb-1 font-mono uppercase">Сообщение *</label>
                <textarea 
                  required 
                  rows={3}
                  placeholder="Здравствуйте, Артемий! Требуется сдать ИД по объекту..." 
                  className="w-full px-4 py-2.5 rounded-[10px] bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-all text-xs resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn-pill-filled w-full cursor-pointer"
              >
                <Send size={13} />
                <span>Отправить сообщение</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
