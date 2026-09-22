
import { FileText, AlertTriangle, CheckCircle, Package } from 'lucide-react'

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Дашборд ПТО</h2>
          <p className="text-sm text-gray-500 mt-1">Сегодняшняя сводка по объектам и документации</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Обработать</span>
            <FileText size={16} className="text-blue-500" />
          </div>
          <div className="text-3xl font-bold font-mono">84</div>
          <p className="text-xs text-gray-500 mt-1">новых документов</p>
        </div>
        
        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">На ручную проверку</span>
            <AlertTriangle size={16} className="text-amber-500" />
          </div>
          <div className="text-3xl font-bold font-mono text-amber-600">17</div>
          <p className="text-xs text-gray-500 mt-1">требуют внимания инженера</p>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Отсутствуют</span>
            <Package size={16} className="text-red-500" />
          </div>
          <div className="text-3xl font-bold font-mono text-red-600">13</div>
          <p className="text-xs text-gray-500 mt-1">9 паспортов, 4 СС</p>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ошибки РД</span>
            <CheckCircle size={16} className="text-emerald-500" />
          </div>
          <div className="text-3xl font-bold font-mono">7</div>
          <p className="text-xs text-gray-500 mt-1">несоответствий в спецификации</p>
        </div>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
            <h3 className="font-semibold text-sm">Мои задачи (Action Items)</h3>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-gray-100">
              {[
                { task: 'Проверить 12 сертификатов после OCR', urgent: true },
                { task: 'Закрыть шахматку ЖК "Гарибальди"', urgent: false },
                { task: 'Проверить 3 несоответствия КЖ', urgent: true },
                { task: 'Сравнить РД R4 → R5 (ЭОМ)', urgent: false },
                { task: 'Сформировать комплект EXON', urgent: false },
              ].map((item, i) => (
                <li key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <input type="checkbox" className="mt-1 border-gray-300 rounded text-blue-600 focus:ring-blue-500" />
                  <div className="flex-1">
                    <span className={`text-sm ${item.urgent ? 'font-medium text-gray-900' : 'text-gray-700'}`}>{item.task}</span>
                  </div>
                  {item.urgent && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">Urgent</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Processing Center */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
            <h3 className="font-semibold text-sm">Центр обработки (Workers)</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-gray-700">Job #1284 (Спецификация ЭОМ)</span>
                <span className="text-blue-600">91%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>

            <div className="text-sm font-mono text-gray-600 space-y-2 mt-4 bg-gray-50 p-3 rounded border border-gray-100">
              <div className="flex justify-between"><span>OpenDataLoader</span><span className="text-emerald-500">✓ Done</span></div>
              <div className="flex justify-between"><span>MinerU</span><span className="text-emerald-500">✓ Done</span></div>
              <div className="flex justify-between"><span>Unlimited-OCR</span><span className="text-emerald-500">✓ Done</span></div>
              <div className="flex justify-between"><span>LLM Extraction</span><span className="text-blue-500 animate-pulse">⟳ Running</span></div>
              <div className="flex justify-between text-gray-400"><span>Validation Engine</span><span>Pending</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
