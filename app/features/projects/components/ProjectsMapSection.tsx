import { useState, useEffect, useRef } from 'react'
import { MapPin, Search } from 'lucide-react'
import L from 'leaflet'
import { OBJECTS } from '../data/projectsData'
import { Card } from '../../../components/elevenlabs/Card'
import { Badge } from '../../../components/elevenlabs/Badge'
import { Button } from '../../../components/elevenlabs/Button'

interface ProjectsMapSectionProps {
  theme: string
}

// Function to generate stats based on object ID
const getObjectStats = (id: number) => {
  const progressList = [100, 95, 100, 90, 85, 100, 95, 100, 90, 100, 95, 100, 90, 100, 95, 100, 95]
  const aosrList = [45, 24, 60, 32, 18, 55, 30, 48, 22, 50, 28, 65, 36, 70, 40, 52, 34]
  const systemsList = [
    ['ВТСС', 'СВН', 'СКД', 'ОСО', 'СКТВ', 'ШПД'],
    ['АОСР', 'ОЖР'],
    ['ВТСС', 'НСС'],
    ['ОЗДС', 'СС'],
    ['АК', 'ВОР'],
    ['СС'],
    ['ИД', 'АОСР'],
    ['ВТСС', 'СВН', 'СКТВ', 'АК', 'СС'],
    ['ИД', 'Exon'],
    ['СС', 'АК'],
    ['ИД'],
    ['НСС', 'СС'],
    ['ИД', 'АОСР'],
    ['Exon', 'JS'],
    ['ВОР', 'АОСР'],
    ['СС'],
    ['СС', 'НСС']
  ]
  
  const index = (id - 1) % progressList.length
  return {
    progress: progressList[index],
    aosrCount: aosrList[index],
    systems: systemsList[index]
  }
}

export function ProjectsMapSection({ theme }: ProjectsMapSectionProps) {
  const [selectedObjectId, setSelectedObjectId] = useState<number>(1)
  const [contractorFilter, setContractorFilter] = useState<string>('Все')
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  // Custom cursor & tooltip states
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHoveringMap, setIsHoveringMap] = useState(false)
  const [hoveredObject, setHoveredObject] = useState<any | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const mapRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const leafletMap = useRef<L.Map | null>(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)
  const markersRef = useRef<{ [key: number]: L.Marker }>({})

  // Distinct contractors list with counts
  const contractorCounts = OBJECTS.reduce((acc, obj) => {
    acc[obj.contractor] = (acc[obj.contractor] || 0) + 1
    return acc
  }, {} as { [key: string]: number })

  // Filtered objects
  const filteredObjects = OBJECTS.filter(o => {
    const matchesContractor = contractorFilter === 'Все' || o.contractor === contractorFilter
    const matchesSearch = o.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.contractor.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesContractor && matchesSearch
  })
  
  const selectedObject = OBJECTS.find(o => o.id === selectedObjectId)

  // Initialize Map safely once
  useEffect(() => {
    if (!mapRef.current) return
    if (leafletMap.current) return

    try {
      // Clean up previous leaflet instance on DOM if any
      const container = mapRef.current as any
      if (container._leaflet_id) {
        container._leaflet_id = null
      }

      const moscowCenter: [number, number] = [55.7512, 37.6184]
      const map = L.map(mapRef.current, {
        center: moscowCenter,
        zoom: 10,
        zoomControl: false,
        attributionControl: false
      })

      leafletMap.current = map

      L.control.zoom({
        position: 'topright'
      }).addTo(map)

      const tileUrl = theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'

      const tiles = L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map)

      tileLayerRef.current = tiles
    } catch (err) {
      console.error("Leaflet init error:", err)
    }

    return () => {
      try {
        if (leafletMap.current) {
          leafletMap.current.remove()
          leafletMap.current = null
        }
      } catch (err) {
        console.error("Leaflet cleanup error:", err)
      }
    }
  }, [])

  // Update TileLayer when theme changes without destroying the map
  useEffect(() => {
    if (!leafletMap.current || !tileLayerRef.current) return
    try {
      const tileUrl = theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      tileLayerRef.current.setUrl(tileUrl)
    } catch (err) {
      console.error("Error updating tile URL:", err)
    }
  }, [theme])

  // Update Markers
  useEffect(() => {
    if (!leafletMap.current) return

    try {
      // Clear old markers
      Object.values(markersRef.current).forEach(marker => marker.remove())
      markersRef.current = {}

      // Add markers
      OBJECTS.forEach(obj => {
        const isSelected = obj.id === selectedObjectId

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div class="relative flex items-center justify-center group cursor-pointer">
              <div class="w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shadow-md transition-all duration-200 ${
                isSelected 
                  ? 'bg-foreground text-background scale-125 border-2 border-foreground' 
                  : 'bg-card border border-border text-foreground hover:bg-foreground hover:text-background'
              }">
                ${obj.id}
              </div>
              ${isSelected ? '<div class="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-foreground"></div>' : ''}
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        })

        const marker = L.marker(obj.coordinates, { icon: customIcon })
          .addTo(leafletMap.current!)
          .on('click', () => {
            setSelectedObjectId(obj.id)
            leafletMap.current?.flyTo(obj.coordinates, 13, { duration: 1 })
          })
          .on('mouseover', (e) => {
            setHoveredObject(obj)
            if (mapContainerRef.current) {
              const rect = mapContainerRef.current.getBoundingClientRect()
              setTooltipPos({
                x: e.originalEvent.clientX - rect.left,
                y: e.originalEvent.clientY - rect.top
              })
            }
          })
          .on('mouseout', () => {
            setHoveredObject(null)
          })

        markersRef.current[obj.id] = marker
      })
    } catch (err) {
      console.error("Error updating markers:", err)
    }
  }, [selectedObjectId])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return
    const rect = mapContainerRef.current.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <section id="map" className="space-y-10 animate-fade-slide-in">
      <div className="text-center space-y-2">
        <Badge variant="outline">География Реализованных Проектов</Badge>
        <h2 className="text-3xl sm:text-4xl headline-whisper text-foreground">
          17 строительных объектов Москвы
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-normal">
          Интерактивная карта жилых комплексов, программ реновации и коммерческих зданий, где велась исполнительная документация
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Filter & Object Selector List (4 cols) */}
        <Card className="lg:col-span-4 p-6 flex flex-col justify-between space-y-4 max-h-[650px]">
          
          {/* Search Box */}
          <div className="space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск по адресу, названию, генподрядчику..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-background border border-border text-xs text-foreground focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            {/* Contractor Filter Pills */}
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setContractorFilter('Все')}
                className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all border cursor-pointer ${
                  contractorFilter === 'Все'
                    ? 'bg-foreground text-background border-foreground font-medium'
                    : 'bg-background hover:bg-secondary text-muted-foreground border-border'
                }`}
              >
                Все ({OBJECTS.length})
              </button>
              {Object.entries(contractorCounts).map(([name, count]) => (
                <button
                  key={name}
                  onClick={() => setContractorFilter(name)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all border cursor-pointer flex items-center gap-1.5 ${
                    contractorFilter === name
                      ? 'bg-foreground text-background border-foreground font-medium'
                      : 'bg-background hover:bg-secondary text-muted-foreground border-border'
                  }`}
                >
                  <span>{name.replace('ООО ', '').replace('АО ', '')}</span>
                  <span className="opacity-70 font-mono text-[9px]">{count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Objects List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredObjects.map((obj) => {
              const stats = getObjectStats(obj.id)
              const isSelected = selectedObjectId === obj.id

              return (
                <div
                  key={obj.id}
                  onClick={() => {
                    setSelectedObjectId(obj.id)
                    leafletMap.current?.flyTo(obj.coordinates, 13, { duration: 1 })
                  }}
                  className={`p-3.5 rounded-[16px] border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-card border-foreground/30 shadow-sm'
                      : 'bg-background/80 border-border hover:bg-card hover:border-border'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">{obj.contractor}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{obj.district.split(' ')[0]}</span>
                  </div>
                  <h4 className="text-xs font-normal text-foreground line-clamp-1 font-display">{obj.title}</h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-1 flex items-center gap-1 mt-0.5">
                    <MapPin size={11} className="text-muted-foreground/60 shrink-0" />
                    <span>{obj.address}</span>
                  </p>

                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                    <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-foreground rounded-full"
                        style={{ width: `${stats.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-foreground font-semibold">{stats.progress}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Map Canvas (8 cols) */}
        <div
          ref={mapContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringMap(true)}
          onMouseLeave={() => {
            setIsHoveringMap(false)
            setHoveredObject(null)
          }}
          className="lg:col-span-8 h-[650px] rounded-[24px] overflow-hidden relative border border-border shadow-sm select-none"
        >
          <div ref={mapRef} className="w-full h-full z-10" />

          {/* Hover Card Popup */}
          {hoveredObject && (
            <div
              className="absolute card-whisper p-4 rounded-[16px] z-30 pointer-events-none transform -translate-x-1/2 max-w-xs space-y-2 bg-background/95 backdrop-blur-md"
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y - 140}px`,
                transition: 'left 0.15s ease-out, top 0.15s ease-out',
              }}
            >
              <span className="text-[9px] font-mono uppercase text-muted-foreground">{hoveredObject.contractor}</span>
              <h4 className="text-xs font-normal text-foreground font-display leading-snug">{hoveredObject.title}</h4>
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-1 border-t border-border">
                <span>Прогресс ИД: {getObjectStats(hoveredObject.id).progress}%</span>
                <span>{getObjectStats(hoveredObject.id).aosrCount} АОСР</span>
              </div>
            </div>
          )}

          {/* Map Overlay for Selected Object */}
          {selectedObject && (
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md card-whisper p-6 rounded-[20px] shadow-xl z-20 space-y-3 bg-background/95 backdrop-blur-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge variant="outline">{selectedObject.contractor}</Badge>
                  <h3 className="text-base font-normal text-foreground mt-2 font-display leading-snug">{selectedObject.title}</h3>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">{selectedObject.district.split(' ')[0]}</span>
              </div>

              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="flex gap-2 items-start">
                  <MapPin size={14} className="text-foreground shrink-0 mt-0.5" />
                  <span className="text-foreground">{selectedObject.address}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-card p-3 rounded-[12px] border border-border text-center">
                  <div>
                    <span className="text-[9px] uppercase font-mono block text-muted-foreground">Прогресс</span>
                    <span className="text-xs font-bold font-mono text-foreground">{getObjectStats(selectedObject.id).progress}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono block text-muted-foreground">АОСР</span>
                    <span className="text-xs font-bold font-mono text-foreground">{getObjectStats(selectedObject.id).aosrCount} шт.</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono block text-muted-foreground">Системы</span>
                    <span className="text-xs font-bold font-mono text-foreground truncate block">{getObjectStats(selectedObject.id).systems[0]}</span>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
                  {selectedObject.details}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
