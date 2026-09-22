import { ArrowUpRight } from 'lucide-react'

export function ProjectsSection() {
  return (
    <section className="space-y-8 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-ring font-mono text-xs tracking-widest uppercase font-semibold">Мое Портфолио Разработчика</span>
        <h2 className="text-4xl font-light text-foreground tracking-tight font-display">Репозитории & Разработки</h2>
        <p className="text-muted-foreground text-lg">
          Ссылки и описание моих проектов, интегрированных в данное портфолио.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Project 1 */}
        <div className="bg-card/40 border border-border rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm hover:border-ring/50 transition-all duration-300 shadow-sm">
          <div className="space-y-3">
            <div className="text-xs font-mono text-ring font-bold">REACT / GLSL / WORKER</div>
            <h3 className="text-xl font-bold text-foreground font-display">nothing-to-watch</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Веб-приложение симуляции фильмов с рендерингом эффектов через Voroforce Shader Engine (WebGL) и оптимизированной работой с потоками.
            </p>
          </div>
          <div className="pt-6 border-t border-border mt-6 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Портфолио-симуляция</span>
            <a href="#" className="text-xs text-ring flex items-center gap-1 hover:underline font-mono">
              github.com <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Project 2 */}
        <div className="bg-card/40 border border-border rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm hover:border-ring/50 transition-all duration-300 shadow-sm">
          <div className="space-y-3">
            <div className="text-xs font-mono text-ring font-bold">RAILS / LEAFLET / POSTGRES</div>
            <h3 className="text-xl font-bold text-foreground font-display">openstreetmap-website</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Локальный клон картографического сервиса OpenStreetMap с кастомными тайлами, структурированной базой данных и API управления объектами.
            </p>
          </div>
          <div className="pt-6 border-t border-border mt-6 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Картография</span>
            <a href="#" className="text-xs text-ring flex items-center gap-1 hover:underline font-mono">
              github.com <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Project 3 */}
        <div className="bg-card/40 border border-border rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm hover:border-ring/50 transition-all duration-300 shadow-sm">
          <div className="space-y-3">
            <div className="text-xs font-mono text-ring font-bold">TYPESCRIPT / VECTOR TILES</div>
            <h3 className="text-xl font-bold text-foreground font-display">vectortile-website</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Инструмент для сборки стилей векторных карт и работы с тайловыми серверами на основе MapLibre / Versatiles стилей.
            </p>
          </div>
          <div className="pt-6 border-t border-border mt-6 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Векторные карты</span>
            <a href="#" className="text-xs text-ring flex items-center gap-1 hover:underline font-mono">
              github.com <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
