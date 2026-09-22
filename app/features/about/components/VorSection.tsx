import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { Search, Plus, Upload, Download, LayoutGrid, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'
import { Button } from '../../../components/elevenlabs/Button'
import defaultVorData from '../../../data/vor-default.json'

export interface VorItem {
  id: any
  num: any
  type: any
  code: any
  system: any
  name: any
  model: any
  factory: any
  supplier: any
  exonName: any
  unit: any
  qty: any
  customerSupply: any
  contract: any
  addendum: any
  specification: any
  submittedLk: any
  exonQty: any
  note: any
  status: any
}

interface VorSectionProps {
  setActiveTab?: (tab: any) => void
}

export function VorSection({ setActiveTab }: VorSectionProps) {
  // VOR Data State
  const [vorData, setVorData] = useState<VorItem[]>(defaultVorData as VorItem[])
  const [vorSearchQuery, setVorSearchQuery] = useState<string>('')
  const [vorSystemFilter, setVorSystemFilter] = useState<string>('Все')
  const [vorStatusFilter, setVorStatusFilter] = useState<string>('Все')
  const [vorSupplierFilter, setVorSupplierFilter] = useState<string>('Все')

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  // Column Visibility State
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    code: true,
    system: true,
    name: true,
    model: true,
    supplier: true,
    qty: true,
    unit: true,
    status: true,
    actions: true
  })
  const [showColumnDropdown, setShowColumnDropdown] = useState<boolean>(false)

  // Inline editing cell tracker
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; fieldName: keyof VorItem } | null>(null)
  const [editValue, setEditValue] = useState<string>('')

  // Filter distinct values for VOR Table
  const uniqueSystems = ['Все', ...Array.from(new Set(vorData.map(item => item.system).filter(Boolean)))]
  const uniqueStatuses = ['Все', ...Array.from(new Set(vorData.map(item => item.status).filter(Boolean)))]
  const uniqueSuppliers = ['Все', ...Array.from(new Set(vorData.map(item => item.supplier).filter(Boolean)))]

  // Filter VOR Data
  const filteredVorData = vorData.filter(item => {
    const matchesSearch = 
      (item.name?.toString() || '').toLowerCase().includes(vorSearchQuery.toLowerCase()) ||
      (item.model?.toString() || '').toLowerCase().includes(vorSearchQuery.toLowerCase()) ||
      (item.code?.toString() || '').toLowerCase().includes(vorSearchQuery.toLowerCase()) ||
      (item.id?.toString() || '').toLowerCase().includes(vorSearchQuery.toLowerCase())
    
    const matchesSystem = vorSystemFilter === 'Все' || item.system === vorSystemFilter
    const matchesStatus = vorStatusFilter === 'Все' || item.status === vorStatusFilter
    const matchesSupplier = vorSupplierFilter === 'Все' || item.supplier === vorSupplierFilter

    return matchesSearch && matchesSystem && matchesStatus && matchesSupplier
  })

  // Pagination slices
  const totalPages = Math.ceil(filteredVorData.length / rowsPerPage)
  const paginatedVorData = filteredVorData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  // Reset page on filter/search change
  useEffect(() => {
    setCurrentPage(1)
  }, [vorSearchQuery, vorSystemFilter, vorStatusFilter, vorSupplierFilter, rowsPerPage])

  // Excel Import Handler
  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result
        const wb = XLSX.read(bstr, { type: 'binary' })
        const wsName = wb.SheetNames[0]
        const ws = wb.Sheets[wsName]
        const data = XLSX.utils.sheet_to_json(ws) as any[]

        if (data && data.length > 0) {
          const importedItems: VorItem[] = data.map((row, idx) => ({
            id: row['ID'] || row['id'] || row['№'] || `${idx + 1}`,
            num: idx + 1,
            type: row['Тип'] || row['type'] || 'О',
            code: row['Шифр'] || row['code'] || '',
            system: row['Система'] || row['system'] || 'Связь',
            name: row['Наименование'] || row['name'] || 'Без названия',
            model: row['Марка/тип'] || row['model'] || '',
            factory: row['Завод'] || '',
            supplier: row['Поставщик'] || row['supplier'] || '',
            exonName: row['Наименование в Exon'] || '',
            unit: row['Ед. изм.'] || row['unit'] || 'шт.',
            qty: Number(row['Кол-во'] || row['qty'] || 0),
            customerSupply: false,
            contract: '',
            addendum: '',
            specification: '',
            submittedLk: false,
            exonQty: 0,
            note: '',
            status: row['Состояние'] || row['status'] || 'В работе'
          }))
          setVorData(importedItems)
          setCurrentPage(1)
        }
      } catch (err) {
        console.error('Error parsing excel:', err)
      }
    }
    reader.readAsBinaryString(file)
  }

  // Excel Export Handler
  const handleExportExcel = () => {
    const exportRows = filteredVorData.map(item => ({
      'ID': item.id,
      'Шифр': item.code,
      'Система': item.system,
      'Наименование': item.name,
      'Марка/тип': item.model,
      'Поставщик': item.supplier,
      'Кол-во': item.qty,
      'Ед. изм.': item.unit,
      'Состояние': item.status
    }))

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(exportRows)
    XLSX.utils.book_append_sheet(wb, ws, 'ВОР_Выгрузка')
    XLSX.writeFile(wb, `VOR_Export_${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  // Inline Cell Click
  const handleCellClick = (rowIndex: number, fieldName: keyof VorItem, currentValue: any) => {
    setEditingCell({ rowIndex, fieldName })
    setEditValue(currentValue !== undefined && currentValue !== null ? String(currentValue) : '')
  }

  // Inline Cell Save
  const handleCellSave = (rowIndex: number) => {
    if (!editingCell) return
    const updated = [...vorData]
    const targetItem = updated[rowIndex]
    if (targetItem) {
      if (editingCell.fieldName === 'qty' || editingCell.fieldName === 'exonQty') {
        (targetItem as any)[editingCell.fieldName] = Number(editValue) || 0
      } else {
        (targetItem as any)[editingCell.fieldName] = editValue
      }
      setVorData(updated)
    }
    setEditingCell(null)
    setEditValue('')
  }

  // Add new row to VOR
  const handleAddRow = () => {
    const newItem: VorItem = {
      id: `NEW.${Date.now().toString().slice(-4)}`,
      num: vorData.length + 1,
      type: 'О',
      code: '',
      system: uniqueSystems[1] || 'Связь',
      name: 'Новый элемент ВОР',
      model: '',
      factory: '',
      supplier: '',
      exonName: '',
      unit: 'шт.',
      qty: 0,
      customerSupply: false,
      contract: '',
      addendum: '',
      specification: '',
      submittedLk: false,
      exonQty: 0,
      note: '',
      status: 'В работе'
    }
    setVorData([newItem, ...vorData])
    setCurrentPage(1)
  }

  // Delete row from VOR
  const handleDeleteRow = (id: any) => {
    if (window.confirm('Вы действительно хотите удалить эту строку ВОР?')) {
      setVorData(vorData.filter(item => item.id !== id))
    }
  }

  return (
    <section id="vor" className="space-y-10 animate-fade-slide-in relative">
      {/* Header info */}
      <div className="text-center space-y-2">
        <Badge variant="outline">Исполнительная Ведомость Объемов</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          Интерактивная ведомость ВОР (Шахматка)
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Интерактивная ведомость со всеми объемами работ по проекту из листа <strong>ВОР</strong>. 
          Вы можете редактировать ячейки на лету (двойной клик), фильтровать, а также загружать и выгружать файлы в Excel.
        </p>
      </div>

      {/* Table Control Panel */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
            <input
              type="text"
              placeholder="Поиск по наименованию, шифру, ID..."
              value={vorSearchQuery}
              onChange={(e) => setVorSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground text-xs transition-colors"
            />
          </div>

          {/* Import / Export & Add Buttons */}
          <div className="flex flex-wrap gap-2 items-center">
            
            {/* Add row */}
            <Button 
              variant="filled"
              size="sm"
              onClick={handleAddRow}
            >
              <Plus size={13} /> <span>Добавить строку</span>
            </Button>

            {/* Import Excel */}
            <label className="btn-pill-outlined text-xs py-1.5 px-3.5 cursor-pointer">
              <Upload size={13} />
              <span>Импорт XLSX</span>
              <input 
                type="file" 
                accept=".xlsx, .xls"
                onChange={handleImportExcel}
                className="hidden" 
              />
            </label>

            {/* Export Excel */}
            <Button 
              variant="outline"
              size="sm"
              onClick={handleExportExcel}
            >
              <Download size={13} /> <span>Экспорт XLSX</span>
            </Button>

            {/* Column Visibility Trigger */}
            <div className="relative">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
              >
                <LayoutGrid size={13} /> <span>Колонки</span>
              </Button>
              
              {showColumnDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-[16px] bg-card border border-border p-3 shadow-xl z-50 text-xs text-foreground space-y-1">
                  {Object.keys(visibleColumns).map((col) => (
                    <label key={col} className="flex items-center gap-2 p-1.5 hover:bg-background rounded-lg cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={(visibleColumns as any)[col]}
                        onChange={(e) => setVisibleColumns({
                          ...visibleColumns,
                          [col]: e.target.checked
                        })}
                        className="rounded border-border text-foreground focus:ring-ring bg-background"
                      />
                      <span className="capitalize">{col === 'qty' ? 'Кол-во' : col === 'unit' ? 'Ед.изм.' : col === 'model' ? 'Марка/тип' : col === 'name' ? 'Наименование' : col === 'code' ? 'Шифр' : col === 'status' ? 'Состояние' : col === 'actions' ? 'Действия' : col}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Faceted Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
          
          {/* System Filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-muted-foreground uppercase">Фильтр по системе</label>
            <select
              value={vorSystemFilter}
              onChange={(e) => setVorSystemFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-full bg-background border border-border text-foreground text-xs focus:outline-none focus:border-foreground"
            >
              {uniqueSystems.map(sys => (
                <option key={sys} value={sys} className="bg-card text-foreground">{sys}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-muted-foreground uppercase">Фильтр по состоянию</label>
            <select
              value={vorStatusFilter}
              onChange={(e) => setVorStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-full bg-background border border-border text-foreground text-xs focus:outline-none focus:border-foreground"
            >
              {uniqueStatuses.map(st => (
                <option key={st} value={st} className="bg-card text-foreground">{st || 'Не указано'}</option>
              ))}
            </select>
          </div>

          {/* Supplier Filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-muted-foreground uppercase">Фильтр по поставщику</label>
            <select
              value={vorSupplierFilter}
              onChange={(e) => setVorSupplierFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-full bg-background border border-border text-foreground text-xs focus:outline-none focus:border-foreground"
            >
              {uniqueSuppliers.map(sup => (
                <option key={sup} value={sup} className="bg-card text-foreground">{sup || 'Не указано'}</option>
              ))}
            </select>
          </div>

        </div>
      </Card>

      {/* Excel Data Table Canvas */}
      <Card className="p-0 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-card border-b border-border text-muted-foreground font-mono uppercase text-[10px]">
                {visibleColumns.id && <th className="p-4 w-16 text-center font-medium">ID</th>}
                {visibleColumns.code && <th className="p-4 font-medium">Шифр</th>}
                {visibleColumns.system && <th className="p-4 font-medium">Система</th>}
                {visibleColumns.name && <th className="p-4 w-[30%] font-medium">Наименование <span className="text-muted-foreground/60 ml-1 text-[8px]">(Дабл-клик)</span></th>}
                {visibleColumns.model && <th className="p-4 w-[20%] font-medium">Марка, тип</th>}
                {visibleColumns.supplier && <th className="p-4 font-medium">Поставщик</th>}
                {visibleColumns.qty && <th className="p-4 text-right font-medium">Кол-во</th>}
                {visibleColumns.unit && <th className="p-4 font-medium">Ед. изм.</th>}
                {visibleColumns.status && <th className="p-4 text-center font-medium">Состояние</th>}
                {visibleColumns.actions && <th className="p-4 text-center font-medium">Удалить</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedVorData.length > 0 ? (
                paginatedVorData.map((item, localIndex) => {
                  const globalIndex = (currentPage - 1) * rowsPerPage + localIndex
                  return (
                    <tr key={item.id} className="hover:bg-secondary/40 transition-colors">
                      
                      {/* ID */}
                      {visibleColumns.id && (
                        <td className="p-3 font-mono text-center text-muted-foreground border-r border-border/40">
                          {item.id}
                        </td>
                      )}

                      {/* Шифр */}
                      {visibleColumns.code && (
                        <td className="p-3 font-mono font-medium max-w-[120px] truncate">
                          {editingCell?.rowIndex === globalIndex && editingCell?.fieldName === 'code' ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => handleCellSave(globalIndex)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCellSave(globalIndex)}
                              className="w-full bg-background border border-foreground rounded p-1 text-xs"
                              autoFocus
                            />
                          ) : (
                            <span onDoubleClick={() => handleCellClick(globalIndex, 'code', item.code)} className="cursor-pointer hover:underline block">
                              {item.code || '-'}
                            </span>
                          )}
                        </td>
                      )}

                      {/* Система */}
                      {visibleColumns.system && (
                        <td className="p-3">
                          {editingCell?.rowIndex === globalIndex && editingCell?.fieldName === 'system' ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => handleCellSave(globalIndex)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCellSave(globalIndex)}
                              className="w-full bg-background border border-foreground rounded p-1 text-xs"
                              autoFocus
                            />
                          ) : (
                            <Badge variant="secondary">
                              {item.system}
                            </Badge>
                          )}
                        </td>
                      )}

                      {/* Наименование */}
                      {visibleColumns.name && (
                        <td className="p-3 max-w-[300px]">
                          {editingCell?.rowIndex === globalIndex && editingCell?.fieldName === 'name' ? (
                            <textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => handleCellSave(globalIndex)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCellSave(globalIndex)}
                              className="w-full bg-background border border-foreground rounded p-1 text-xs resize-none"
                              rows={2}
                              autoFocus
                            />
                          ) : (
                            <span onDoubleClick={() => handleCellClick(globalIndex, 'name', item.name)} className="cursor-pointer hover:underline font-normal block leading-normal line-clamp-2">
                              {item.name}
                            </span>
                          )}
                        </td>
                      )}

                      {/* Марка, тип */}
                      {visibleColumns.model && (
                        <td className="p-3 max-w-[200px] text-muted-foreground truncate">
                          {editingCell?.rowIndex === globalIndex && editingCell?.fieldName === 'model' ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => handleCellSave(globalIndex)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCellSave(globalIndex)}
                              className="w-full bg-background border border-foreground rounded p-1 text-xs"
                              autoFocus
                            />
                          ) : (
                            <span onDoubleClick={() => handleCellClick(globalIndex, 'model', item.model)} className="cursor-pointer hover:underline block">
                              {item.model || '-'}
                            </span>
                          )}
                        </td>
                      )}

                      {/* Поставщик */}
                      {visibleColumns.supplier && (
                        <td className="p-3 truncate">
                          {editingCell?.rowIndex === globalIndex && editingCell?.fieldName === 'supplier' ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => handleCellSave(globalIndex)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCellSave(globalIndex)}
                              className="w-full bg-background border border-foreground rounded p-1 text-xs"
                              autoFocus
                            />
                          ) : (
                            <span onDoubleClick={() => handleCellClick(globalIndex, 'supplier', item.supplier)} className="cursor-pointer hover:underline block">
                              {item.supplier || '-'}
                            </span>
                          )}
                        </td>
                      )}

                      {/* Кол-во */}
                      {visibleColumns.qty && (
                        <td className="p-3 text-right font-mono font-medium text-foreground">
                          {editingCell?.rowIndex === globalIndex && editingCell?.fieldName === 'qty' ? (
                            <input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => handleCellSave(globalIndex)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCellSave(globalIndex)}
                              className="w-20 bg-background border border-foreground rounded p-1 text-xs text-right"
                              autoFocus
                            />
                          ) : (
                            <span onDoubleClick={() => handleCellClick(globalIndex, 'qty', item.qty)} className="cursor-pointer hover:underline block">
                              {item.qty}
                            </span>
                          )}
                        </td>
                      )}

                      {/* Ед. изм. */}
                      {visibleColumns.unit && (
                        <td className="p-3 text-muted-foreground">
                          {editingCell?.rowIndex === globalIndex && editingCell?.fieldName === 'unit' ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => handleCellSave(globalIndex)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCellSave(globalIndex)}
                              className="w-12 bg-background border border-foreground rounded p-1 text-xs"
                              autoFocus
                            />
                          ) : (
                            <span onDoubleClick={() => handleCellClick(globalIndex, 'unit', item.unit)} className="cursor-pointer hover:underline block">
                              {item.unit}
                            </span>
                          )}
                        </td>
                      )}

                      {/* Состояние */}
                      {visibleColumns.status && (
                        <td className="p-3 text-center">
                          {editingCell?.rowIndex === globalIndex && editingCell?.fieldName === 'status' ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => handleCellSave(globalIndex)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCellSave(globalIndex)}
                              className="w-24 bg-background border border-foreground rounded p-1 text-xs"
                              autoFocus
                            />
                          ) : (
                            <Badge variant={item.status === 'Согласовано' ? 'default' : 'outline'}>
                              {item.status || 'В работе'}
                            </Badge>
                          )}
                        </td>
                      )}

                      {/* Действия */}
                      {visibleColumns.actions && (
                        <td className="p-3 text-center border-l border-border/40">
                          <button 
                            onClick={() => handleDeleteRow(item.id)}
                            className="text-muted-foreground hover:text-red-500 p-1 rounded cursor-pointer transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      )}

                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-muted-foreground text-sm">Таблица ВОР пуста</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="p-4 border-t border-border bg-card flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          
          {/* Showing indicator */}
          <div className="text-muted-foreground font-mono">
            Показано с <strong className="text-foreground">{(currentPage - 1) * rowsPerPage + 1}</strong> по <strong className="text-foreground">{Math.min(currentPage * rowsPerPage, filteredVorData.length)}</strong> из <strong className="text-foreground">{filteredVorData.length}</strong> строк
          </div>

          <div className="flex items-center gap-6">
            {/* Rows per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Строк на странице:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="px-2 py-1 rounded-full bg-background border border-border text-foreground text-xs"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            {/* Navigation controls */}
            <div className="flex gap-1 items-center">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-full border border-border bg-background text-foreground hover:bg-secondary disabled:opacity-40 cursor-pointer"
              >
                &laquo;
              </button>
              <button
                onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-full border border-border bg-background text-foreground hover:bg-secondary disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="px-3 font-mono text-muted-foreground">Страница <strong className="text-foreground">{currentPage}</strong> из {totalPages || 1}</span>
              <button
                onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded-full border border-border bg-background text-foreground hover:bg-secondary disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded-full border border-border bg-background text-foreground hover:bg-secondary disabled:opacity-40 cursor-pointer"
              >
                &raquo;
              </button>
            </div>

          </div>
        </div>

      </Card>
    </section>
  )
}
