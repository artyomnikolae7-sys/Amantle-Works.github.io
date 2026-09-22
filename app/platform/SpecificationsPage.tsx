import { useState } from 'react'
import { FileText, CheckCircle2, XCircle, AlertCircle, Maximize2, Search } from 'lucide-react'

export function SpecificationsPage() {
  const [selectedSpec, setSelectedSpec] = useState(0)

  const specifications = [
    { id: 'ЭОМ-1.1', name: 'ЖК Гарибальди - Спецификация ЭОМ', progress: 84 },
    { id: 'ВК-2.0', name: 'БЦ "Высота" - Водоснабжение', progress: 45 },
    { id: 'СС-1.4', name: 'ЖК Гарибальди - Слаботочные сети', progress: 12 },
  ]

  const items = [
    { article: 'ВВГнг(А)-LS 3х1.5', name: 'Кабель силовой медный не распространяющий горение', unit: 'м', qty: 1500, status: 'matched', docId: 'ПС-8812', matchScore: 1.0 },
    { article: 'ВВГнг(А)-LS 5х16', name: 'Кабель силовой', unit: 'м', qty: 200, status: 'partial', docId: 'ЕАЭС RU C-RU...', matchScore: 0.82 },
    { article: 'ABB 1SDA066776R1', name: 'Автоматический выключатель Tmax XT1B 160 TMD 63-630 3p', unit: 'шт', qty: 12, status: 'missing', docId: null, matchScore: 0 },
    { article: 'IEK MVA20-1-016-C', name: 'Выключатель автоматический ВА47-29 1Р 16А 4,5кА С IEK', unit: 'шт', qty: 140, status: 'matched', docId: 'ЕАЭС N RU Д-RU.РА01.В.12345/21', matchScore: 0.98 },
    { article: 'DKC 41604', name: 'Труба гофрированная ПВХ d20', unit: 'м', qty: 3000, status: 'missing', docId: null, matchScore: 0 },
  ]

  return (
    <div className="h-full flex flex-col -m-6">
      {/* Top Header for Spec Selection */}
      <div className="bg-white border-b border-gray-200 p-4 shrink-0 flex items-center justify-between">
        <div className="flex gap-4 overflow-x-auto pb-1">
          {specifications.map((spec, i) => (
            <button 
              key={spec.id}
              onClick={() => setSelectedSpec(i)}
              className={`flex flex-col text-left min-w-[240px] px-4 py-2 border rounded-md transition-colors ${selectedSpec === i ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono font-semibold text-gray-500">{spec.id}</span>
                <span className="text-xs font-bold text-gray-900">{spec.progress}%</span>
              </div>
              <div className="text-sm font-medium truncate mb-2">{spec.name}</div>
              <div className="w-full bg-gray-100 rounded-full h-1">
                <div className={`h-1 rounded-full ${spec.progress > 80 ? 'bg-emerald-500' : spec.progress > 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${spec.progress}%` }}></div>
              </div>
            </button>
          ))}
        </div>
        <button className="shrink-0 p-2 border border-gray-200 rounded text-gray-500 hover:bg-gray-50">
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Specification Items */}
        <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center shrink-0">
            <h3 className="font-semibold text-sm">Позиции из РД (142 шт)</h3>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input type="text" placeholder="Поиск по артикулу..." className="pl-7 pr-2 py-1 text-xs border border-gray-200 rounded w-48 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-0">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white sticky top-0 border-b border-gray-200 shadow-sm z-10 text-[10px] uppercase font-semibold text-gray-500 tracking-wider">
                <tr>
                  <th className="px-3 py-2 w-8">St</th>
                  <th className="px-3 py-2">Артикул / Наименование</th>
                  <th className="px-3 py-2 text-right">Кол-во</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {items.map((item, i) => (
                  <tr key={i} className={`hover:bg-blue-50 cursor-pointer ${i === 1 ? 'bg-blue-50/50 relative' : ''}`}>
                    {i === 1 && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500"></div>}
                    <td className="px-3 py-2">
                      {item.status === 'matched' && <CheckCircle2 size={16} className="text-emerald-500" />}
                      {item.status === 'partial' && <AlertCircle size={16} className="text-amber-500" />}
                      {item.status === 'missing' && <XCircle size={16} className="text-red-400" />}
                    </td>
                    <td className="px-3 py-2">
                      <div className="font-mono text-xs font-semibold">{item.article}</div>
                      <div className="text-xs text-gray-600 truncate max-w-[280px] mt-0.5">{item.name}</div>
                    </td>
                    <td className="px-3 py-2 text-right whitespace-nowrap">
                      <span className="font-mono">{item.qty}</span> <span className="text-xs text-gray-400">{item.unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Matching Documents */}
        <div className="w-1/2 flex flex-col bg-[#FAFAFA]">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center shrink-0">
            <h3 className="font-semibold text-sm">Привязка документов</h3>
            <button className="text-xs font-medium text-blue-600 hover:underline">Добавить вручную</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded text-sm text-amber-800 flex gap-2 items-start">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div>
                <strong>Требуется подтверждение:</strong> Система нашла сертификат для артикула "ВВГнг(А)-LS 5х16", но совпадение не полное (82%). Проверьте правильность документа.
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-gray-400" />
                  <span className="font-medium text-sm">Сертификат Соответствия ЕАЭС</span>
                </div>
                <div className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold tracking-wider uppercase">Match: 82%</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-mono text-xs text-gray-500 mb-1">Номер документа</div>
                    <div className="font-medium text-sm">ЕАЭС RU C-RU.АЯ46.B.12345/21</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-gray-500 mb-1">Действует до</div>
                    <div className="font-medium text-sm">15.08.2026</div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded bg-gray-50 p-3 mt-2 text-xs font-mono text-gray-700">
                  ...кабели силовые огнестойкие, не распространяющие горение, с изоляцией и оболочкой из полимерных композиций, не содержащих галогенов, марок: ВВГнг(А)-FRLS, <span className="bg-yellow-200 text-black px-1 font-bold">ВВГнг(А)-LS</span>, с числом жил от 1 до 5, сечением от 1,5 до <span className="bg-yellow-200 text-black px-1 font-bold">240</span> мм2...
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white font-medium py-1.5 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <CheckCircle2 size={16} /> Подтвердить связь
                  </button>
                  <button className="px-4 py-1.5 border border-gray-200 bg-white font-medium rounded text-sm hover:bg-gray-50 transition-colors">
                    Отклонить
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-[#FAFAFA] text-xs text-gray-500">Альтернативные варианты</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer flex justify-between items-center">
              <div>
                <div className="font-medium text-sm">Паспорт качества № 1542 (Камкабель)</div>
                <div className="font-mono text-xs text-gray-500 mt-1">Отгрузка от 12.04.2023</div>
              </div>
              <div className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold tracking-wider uppercase">Match: 45%</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
