import { useEffect, useState } from 'react'
import { Filter, Upload, Download, MoreHorizontal, FileText } from 'lucide-react'

interface Document {
  id: number
  title: string
  status: string
  confidence: number | null
}

export function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8000/api/documents')
      .then(res => res.json())
      .then(data => {
        setDocuments(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Библиотека документов</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50">
            <Filter size={14} /> Фильтры
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] text-white rounded-md text-sm font-medium hover:bg-[#222222]">
            <Upload size={14} /> Загрузить
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        {['Все', 'Паспорта', 'Сертификаты', 'Декларации', 'Паспорта качества'].map(filter => (
          <button key={filter} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 font-medium">
            {filter}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                <th className="px-4 py-3">Тип / Имя</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Статус Парсинга</th>
                <th className="px-4 py-3">Уверенность (OCR)</th>
                <th className="px-4 py-3 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Загрузка документов из базы...</td></tr>
              ) : documents.map((doc, i) => (
                <tr key={i} className="hover:bg-gray-50 group">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <FileText size={14} className="text-gray-400" />
                    <span className="font-medium truncate max-w-[300px]" title={doc.title}>{doc.title}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{doc.id}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
                        doc.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {doc.confidence != null ? (
                      <div className="flex items-center gap-2">
                        <div className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${
                          doc.confidence >= 0.95 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {Math.round(doc.confidence * 100)}%
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">MinerU</span>
                      </div>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download size={14} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span>Показано {documents.length} документов</span>
        </div>
      </div>
    </div>
  )
}
