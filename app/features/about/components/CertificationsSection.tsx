import { Award, ShieldCheck, GraduationCap, CheckCircle } from 'lucide-react'
import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'

const certs = [
  {
    title: 'Высшее техническое образование',
    issuer: 'Государственный строительный университет',
    year: 'Инженер',
    desc: 'Специализация: Инженерные системы, слаботочные сети и автоматизация зданий.',
    icon: GraduationCap,
  },
  {
    title: 'Сертифицированный специалист Exon',
    issuer: 'Цифровые платформы в строительстве',
    year: '2023',
    desc: 'Модули: Exon.ИД (Исполнительная документация), Exon.Акты, согласование с Заказчиком.',
    icon: ShieldCheck,
  },
  {
    title: 'Охрана труда и электробезопасность',
    issuer: 'Ростехнадзор / Учебный центр',
    year: 'III группа',
    desc: 'Допуск к работам в электроустановках до 1000В, правила работы на высоте и пожарно-технический минимум.',
    icon: Award,
  },
]

export function CertificationsSection() {
  return (
    <section id="certifications" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">Подтверждение Квалификации</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Квалификация и допуски
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Официальные подтверждения профильной квалификации, сертификаты цифровых платформ и допуски
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certs.map((cert, i) => (
          <Card key={i} className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground">
                  <cert.icon size={18} strokeWidth={1.5} />
                </div>
                <Badge variant="outline">{cert.year}</Badge>
              </div>

              <h4 className="text-base font-normal text-foreground font-display leading-snug">
                {cert.title}
              </h4>

              <p className="text-xs font-mono text-muted-foreground">
                {cert.issuer}
              </p>

              <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                {cert.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-border flex items-center gap-2 text-xs font-mono text-foreground">
              <CheckCircle size={13} className="text-foreground/70" />
              <span>Действующий статус</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
