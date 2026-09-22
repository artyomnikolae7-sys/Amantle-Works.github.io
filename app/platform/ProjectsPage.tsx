
import { Folder, Building2, MapPin, Calendar, HardHat, FileText, CheckCircle } from 'lucide-react'

export function ProjectsPage() {
  const projects = [
    {
      id: 'P-128',
      name: 'ЖК "Гарибальди"',
      address: 'ул. Гарибальди, д. 23',
      contractor: 'ООО "СтройЭнергоМонтаж"',
      deadline: 'Декабрь 2026',
      progress: 68,
      status: 'active',
      stats: { docs: 124, missing: 18, errors: 4 }
    },
    {
      id: 'P-132',
      name: 'БЦ "Высота"',
      address: 'пр-т Мира, 102',
      contractor: 'ЗАО "ТехИнж"',
      deadline: 'Сентябрь 2027',
      progress: 24,
      status: 'active',
      stats: { docs: 45, missing: 112, errors: 0 }
    },
    {
      id: 'P-094',
      name: 'Школа №1250 (Реконструкция)',
      address: 'ул. Введенского, 27',
      contractor: 'ООО "РемСтрой"',
      deadline: 'Август 2026',
      progress: 94,
      status: 'review',
      stats: { docs: 340, missing: 2, errors: 1 }
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Управление объектами</h2>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] text-white rounded-md text-sm font-medium hover:bg-[#222222]">
          <Folder size={14} /> Новый объект
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className="border-b border-gray-100 p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${project.status === 'review' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{project.name}</h3>
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">{project.id}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                  project.status === 'review' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {project.status === 'review' ? 'Сдача ИД' : 'В работе'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gray-400" /> <span className="truncate">{project.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardHat size={14} className="text-gray-400" /> <span className="truncate">{project.contractor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" /> <span>{project.deadline}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-5">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium">Готовность документации</span>
                <span className="text-2xl font-bold font-mono">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className={`h-2 rounded-full ${project.progress > 80 ? 'bg-emerald-500' : project.progress > 40 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${project.progress}%` }}></div>
              </div>
              
              <div className="flex gap-4 border-t border-gray-200 pt-4">
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold"><CheckCircle size={12}/> Загружено</div>
                  <div className="font-mono font-medium">{project.stats.docs}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold"><FileText size={12}/> Ожидается</div>
                  <div className="font-mono font-medium">{project.stats.missing}</div>
                </div>
                <div className="flex-1 text-red-600">
                  <div className="flex items-center gap-1 text-red-400 text-xs mb-1 uppercase tracking-wider font-semibold">Ошибки</div>
                  <div className="font-mono font-medium">{project.stats.errors}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
