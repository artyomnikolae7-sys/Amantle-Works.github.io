
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Search, LayoutDashboard, FileText, Package, CheckSquare, GitPullRequest, BookOpen, Layers } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function PlatformLayout() {
  const location = useLocation()
  
  const navItems = [
    { label: 'Проекты', path: '/platform/projects', icon: Layers },
    { label: 'Документы', path: '/platform/documents', icon: FileText },
    { label: 'Спецификации', path: '/platform/specifications', icon: CheckSquare },
    { label: 'Материалы', path: '/platform/materials', icon: Package },
    { label: 'Проверки', path: '/platform/checks', icon: GitPullRequest },
    { label: 'База знаний', path: '/platform/wiki', icon: BookOpen },
  ]

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-64 bg-[#111111] text-white flex flex-col border-r border-[#222222] shrink-0 z-20 shadow-2xl"
      >
        <div className="p-4 border-b border-[#222222]">
          <h1 className="font-display font-bold text-lg tracking-tight">PTO Intelligence</h1>
          <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-widest">Workspace</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li className="mb-4">
              <Link to="/platform" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm ${location.pathname === '/platform' ? 'bg-[#222222] text-white font-medium shadow-sm' : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'}`}>
                <LayoutDashboard size={16} /> Дашборд
              </Link>
            </li>
            
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-3 mb-2 font-semibold">Модули</div>
            {navItems.map((item, idx) => (
              <motion.li 
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + (idx * 0.05) }}
              >
                <Link to={item.path} className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm ${location.pathname.startsWith(item.path) ? 'bg-[#222222] text-white font-medium shadow-sm translate-x-1' : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'}`}>
                  <item.icon size={16} /> {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-[#222222] text-[10px] text-gray-500 font-mono">
          System v1.0.0
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10 bg-[#F8F9FA]">
        {/* Header / Search */}
        <header className="h-14 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-30">
          <div className="flex-1 flex items-center max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Что вы ищете? (Например: ВВГнг LS 5x16)" 
                className="w-full bg-white border border-gray-200 shadow-sm rounded-md py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono transition-all placeholder:font-sans"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs text-blue-600 font-medium hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 flex items-center gap-2">
              ← Назад к Портфолио
            </Link>
          </div>
        </header>

        {/* Workspace - Page Transitions */}
        <div className="flex-1 overflow-auto p-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
