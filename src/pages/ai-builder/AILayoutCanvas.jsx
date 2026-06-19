import { useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import { roomPlan } from './aiHomeBuilderData'

const DEFAULT_FURNITURE = {
  living: [
    { icon: 'weekend', label: 'Sofa', x: 34, y: 58, w: 34, h: 18, tone: 'bg-stone-200 border-stone-400 text-stone-700' },
    { icon: 'table_bar', label: 'Coffee', x: 43, y: 36, w: 18, h: 14, tone: 'bg-amber-200 border-amber-500 text-amber-900' },
    { icon: 'tv', label: 'TV', x: 8, y: 35, w: 12, h: 28, tone: 'bg-slate-800 border-slate-950 text-white' },
    { icon: 'chair', label: 'Chair', x: 72, y: 32, w: 12, h: 16, tone: 'bg-orange-200 border-orange-400 text-orange-800' },
  ],
  kitchen: [
    { icon: 'countertops', label: 'Counter', x: 6, y: 6, w: 88, h: 18, tone: 'bg-slate-300 border-slate-500 text-slate-800' },
    { icon: 'local_fire_department', label: 'Stove', x: 66, y: 48, w: 18, h: 20, tone: 'bg-zinc-800 border-zinc-950 text-white' },
    { icon: 'kitchen', label: 'Fridge', x: 8, y: 48, w: 16, h: 26, tone: 'bg-blue-100 border-blue-400 text-blue-800' },
    { icon: 'water_drop', label: 'Sink', x: 38, y: 8, w: 18, h: 12, tone: 'bg-cyan-100 border-cyan-400 text-cyan-800' },
  ],
  bed1: [
    { icon: 'bed', label: 'Bed', x: 16, y: 20, w: 46, h: 46, tone: 'bg-blue-100 border-blue-300 text-blue-800' },
    { icon: 'dresser', label: 'Wardrobe', x: 73, y: 12, w: 14, h: 70, tone: 'bg-amber-700 border-amber-900 text-white' },
    { icon: 'night_shelter', label: 'Side', x: 8, y: 18, w: 10, h: 12, tone: 'bg-orange-200 border-orange-400 text-orange-800' },
  ],
  bed2: [
    { icon: 'bed', label: 'Bed', x: 30, y: 18, w: 45, h: 48, tone: 'bg-rose-100 border-rose-300 text-rose-800' },
    { icon: 'dresser', label: 'Wardrobe', x: 78, y: 16, w: 13, h: 66, tone: 'bg-amber-700 border-amber-900 text-white' },
  ],
  bed3: [
    { icon: 'bed', label: 'Bed', x: 14, y: 20, w: 48, h: 48, tone: 'bg-pink-100 border-pink-300 text-pink-800' },
    { icon: 'dresser', label: 'Wardrobe', x: 72, y: 14, w: 14, h: 68, tone: 'bg-amber-700 border-amber-900 text-white' },
  ],
  office: [
    { icon: 'desk', label: 'Desk', x: 16, y: 40, w: 42, h: 26, tone: 'bg-amber-200 border-amber-500 text-amber-900' },
    { icon: 'chair', label: 'Chair', x: 58, y: 46, w: 18, h: 18, tone: 'bg-slate-200 border-slate-400 text-slate-700' },
  ],
  bath1: [
    { icon: 'wc', label: 'WC', x: 12, y: 52, w: 24, h: 24, tone: 'bg-white border-slate-300 text-slate-700' },
    { icon: 'shower', label: 'Shower', x: 56, y: 14, w: 30, h: 30, tone: 'bg-cyan-100 border-cyan-300 text-cyan-800' },
    { icon: 'wash', label: 'Basin', x: 12, y: 14, w: 26, h: 20, tone: 'bg-white border-slate-300 text-slate-700' },
  ],
  bath2: [
    { icon: 'wc', label: 'WC', x: 12, y: 52, w: 24, h: 24, tone: 'bg-white border-slate-300 text-slate-700' },
    { icon: 'shower', label: 'Shower', x: 56, y: 14, w: 30, h: 30, tone: 'bg-cyan-100 border-cyan-300 text-cyan-800' },
  ],
  pooja: [
    { icon: 'temple_hindu', label: 'Mandir', x: 30, y: 22, w: 40, h: 42, tone: 'bg-amber-200 border-amber-500 text-amber-900' },
  ],
  parking: [
    { icon: 'directions_car', label: 'Car', x: 16, y: 18, w: 28, h: 64, tone: 'bg-white border-slate-500 text-slate-800' },
    { icon: 'directions_car', label: 'Car', x: 54, y: 18, w: 28, h: 64, tone: 'bg-slate-700 border-slate-950 text-white' },
  ],
  garden: [
    { icon: 'psychiatry', label: 'Tree', x: 16, y: 18, w: 18, h: 24, tone: 'bg-green-200 border-green-500 text-green-800' },
    { icon: 'yard', label: 'Plants', x: 64, y: 42, w: 22, h: 24, tone: 'bg-lime-200 border-lime-500 text-lime-800' },
  ],
}

const FURNITURE_LIBRARY = [
  { icon: 'table_restaurant', label: 'Dining Table', tone: 'bg-amber-200 border-amber-500 text-amber-900' },
  { icon: 'chair', label: 'Chair', tone: 'bg-orange-200 border-orange-400 text-orange-800' },
  { icon: 'weekend', label: 'Sofa', tone: 'bg-stone-200 border-stone-400 text-stone-700' },
  { icon: 'bed', label: 'Bed', tone: 'bg-blue-100 border-blue-300 text-blue-800' },
  { icon: 'dresser', label: 'Wardrobe', tone: 'bg-amber-700 border-amber-900 text-white' },
  { icon: 'kitchen', label: 'Fridge', tone: 'bg-blue-100 border-blue-400 text-blue-800' },
  { icon: 'wc', label: 'Toilet', tone: 'bg-white border-slate-300 text-slate-700' },
  { icon: 'shower', label: 'Shower', tone: 'bg-cyan-100 border-cyan-300 text-cyan-800' },
]

function Furniture2D({ item }) {
  return (
    <div
      className={`absolute rounded-lg border-2 shadow-sm flex flex-col items-center justify-center gap-0.5 pointer-events-none ${item.tone}`}
      style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.w}%`, height: `${item.h}%` }}
    >
      <span className="material-symbols-outlined text-[clamp(14px,1.6vw,24px)]">{item.icon}</span>
      <span className="text-[8px] font-black leading-none truncate max-w-full px-1">{item.label}</span>
    </div>
  )
}

function HouseModel({ mode, rooms, placedFurniture }) {
  const furnitureByRoom = placedFurniture.reduce((map, item) => {
    map[item.roomId] = [...(map[item.roomId] || []), item]
    return map
  }, {})

  return (
    <group rotation={[0, -0.35, 0]}>
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[7.5, 0.16, 5.2]} />
        <meshStandardMaterial color={mode === 'Night' ? '#1f2937' : '#e5e7eb'} />
      </mesh>
      {rooms.slice(0, 11).map((room, index) => {
        const x = (room.x - 42) / 10
        const z = (room.y - 42) / 10
        const width = room.w / 12
        const depth = room.h / 12
        const colors = ['#7dd3fc', '#86efac', '#fcd34d', '#c4b5fd', '#fda4af', '#fdba74', '#f9a8d4', '#67e8f9', '#93c5fd']
        const roomFurniture = [...(DEFAULT_FURNITURE[room.id] || []), ...(furnitureByRoom[room.id] || [])].slice(0, 5)
        return (
          <group key={room.id} position={[x, 0.25, z]}>
            <mesh castShadow>
              <boxGeometry args={[width, 0.5, depth]} />
              <meshStandardMaterial color={colors[index]} roughness={0.65} metalness={0.05} />
            </mesh>
            {roomFurniture.map((item, itemIndex) => (
              <mesh
                key={`${room.id}-${item.label}-${itemIndex}`}
                position={[
                  ((item.x - 50) / 100) * width,
                  0.48 + itemIndex * 0.02,
                  ((item.y - 50) / 100) * depth,
                ]}
                castShadow
              >
                <boxGeometry args={[Math.max(0.16, (item.w / 100) * width), 0.18, Math.max(0.16, (item.h / 100) * depth)]} />
                <meshStandardMaterial color={item.label.includes('Car') ? '#111827' : item.label.includes('Bed') ? '#bfdbfe' : item.label.includes('Table') || item.label.includes('Wardrobe') ? '#92400e' : '#e5e7eb'} roughness={0.55} />
              </mesh>
            ))}
            <mesh position={[0, 0.55, 0]}>
              <boxGeometry args={[width, 0.08, depth]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.36} />
            </mesh>
          </group>
        )
      })}
      <mesh position={[2.4, 0.45, 1.9]} castShadow>
        <boxGeometry args={[1.6, 0.9, 0.9]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh position={[2.9, 0.92, -1.8]} castShadow>
        <boxGeometry args={[1.8, 0.08, 1.1]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
    </group>
  )
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function AILayoutCanvas() {
  const navigate = useNavigate()
  const [view, setView] = useState('2D')
  const mode = 'Day'
  const [cameraMode, setCameraMode] = useState('Orbit')
  const [zoom, setZoom] = useState(100)
  const wallThickness = 9
  const floor = 'Ground'
  const [rooms, setRooms] = useState(roomPlan)
  const [selectedId, setSelectedId] = useState(roomPlan[1].id)
  const [placedFurniture, setPlacedFurniture] = useState([])
  const planRef = useRef(null)
  const dragRef = useRef(null)

  const selected = useMemo(
    () => rooms.find(room => room.id === selectedId) || rooms[0],
    [rooms, selectedId],
  )

  const totalArea = rooms.reduce((sum, room) => sum + room.area, 0)
  const carpetArea = Math.round(totalArea * 0.86)

  const leftTools = [
    ['Blueprint (2D)', 'dashboard_customize', 'active'],
    ['Walls', 'select_all'],
    ['Doors', 'door_front'],
    ['Windows', 'window'],
    ['Rooms', 'crop_square'],
    ['Stairs', 'stairs'],
    ['Furniture', 'chair'],
    ['Electrical', 'bolt'],
    ['Plumbing', 'valve'],
    ['Measure', 'straighten'],
    ['Text', 'title'],
    ['Layers', 'layers'],
  ]

  const bottomTools = [
    ['Select', 'near_me', 'active'],
    ['Draw Wall', 'select_all'],
    ['Add Room', 'add_box'],
    ['Door', 'door_front'],
    ['Window', 'window'],
    ['Stair', 'stairs'],
    ['Delete', 'delete', 'danger'],
    ['Clear All', 'ink_eraser'],
  ]

  const roomDecor = {
    living: ['weekend', 'table_bar', 'tv'],
    kitchen: ['countertops', 'local_fire_department', 'kitchen'],
    bed1: ['bed', 'dresser'],
    bed2: ['bed', 'dresser'],
    bed3: ['bed', 'dresser'],
    office: ['desk', 'chair'],
    parking: ['directions_car', 'directions_car'],
    garden: ['psychiatry', 'yard'],
    pooja: ['temple_hindu'],
    bath1: ['wc', 'shower'],
    bath2: ['wc', 'shower'],
  }

  const addFurnitureToSelectedRoom = item => {
    const existingCount = placedFurniture.filter(placed => placed.roomId === selected.id).length
    setPlacedFurniture(prev => [
      ...prev,
      {
        ...item,
        id: `${selected.id}-${item.label}-${existingCount + 1}`,
        roomId: selected.id,
        x: clamp(18 + existingCount * 12, 10, 70),
        y: clamp(22 + existingCount * 10, 10, 70),
        w: item.label.includes('Table') ? 28 : item.label.includes('Bed') || item.label.includes('Sofa') ? 34 : 18,
        h: item.label.includes('Table') ? 20 : item.label.includes('Bed') || item.label.includes('Sofa') ? 28 : 18,
      },
    ])
  }

  const updateSelectedRoom = updates => {
    setRooms(prev => prev.map(room => {
      if (room.id !== selected.id) return room
      const next = { ...room, ...updates }
      const widthFeet = Math.round(next.w * 0.7)
      const heightFeet = Math.round(next.h * 0.7)
      return {
        ...next,
        size: `${widthFeet} x ${heightFeet} ft`,
        area: Math.max(24, widthFeet * heightFeet),
      }
    }))
  }

  const addRoom = type => {
    const template = {
      bedroom: { name: 'New Bedroom', icon: 'bed', color: 'bg-purple-100 border-purple-500 text-purple-800', w: 20, h: 18 },
      hall: { name: 'New Hall', icon: 'chair', color: 'bg-sky-100 border-sky-500 text-sky-800', w: 26, h: 20 },
      kitchen: { name: 'New Kitchen', icon: 'kitchen', color: 'bg-emerald-100 border-emerald-500 text-emerald-800', w: 18, h: 16 },
      bathroom: { name: 'New Bathroom', icon: 'bathtub', color: 'bg-cyan-100 border-cyan-500 text-cyan-800', w: 12, h: 12 },
      office: { name: 'New Office', icon: 'desk', color: 'bg-violet-100 border-violet-500 text-violet-800', w: 16, h: 14 },
    }[type] || { name: 'New Room', icon: 'meeting_room', color: 'bg-slate-100 border-slate-500 text-slate-800', w: 16, h: 14 }
    let nextIndex = rooms.length + 1
    let id = `${type}-${nextIndex}`
    while (rooms.some(room => room.id === id)) {
      nextIndex += 1
      id = `${type}-${nextIndex}`
    }
    const room = {
      id,
      ...template,
      x: 48,
      y: 38,
      size: `${Math.round(template.w * 0.7)} x ${Math.round(template.h * 0.7)} ft`,
      area: Math.round(template.w * 0.7) * Math.round(template.h * 0.7),
    }
    setRooms(prev => [...prev, room])
    setSelectedId(id)
  }

  const updateRoomById = (id, updates) => {
    setRooms(prev => prev.map(room => {
      if (room.id !== id) return room
      const next = { ...room, ...updates }
      const widthFeet = Math.round(next.w * 0.7)
      const heightFeet = Math.round(next.h * 0.7)
      return {
        ...next,
        size: `${widthFeet} x ${heightFeet} ft`,
        area: Math.max(24, widthFeet * heightFeet),
      }
    }))
  }

  const startDrag = (event, room) => {
    if (view !== '2D') return
    const rect = planRef.current?.getBoundingClientRect()
    if (!rect) return
    event.currentTarget.setPointerCapture(event.pointerId)
    setSelectedId(room.id)
    dragRef.current = {
      id: room.id,
      startX: event.clientX,
      startY: event.clientY,
      roomX: room.x,
      roomY: room.y,
      planW: rect.width,
      planH: rect.height,
    }
  }

  const dragRoom = event => {
    const drag = dragRef.current
    const room = rooms.find(item => item.id === drag?.id)
    if (!drag || !room) return
    const dx = ((event.clientX - drag.startX) / drag.planW) * 100
    const dy = ((event.clientY - drag.startY) / drag.planH) * 100
    updateRoomById(drag.id, {
      x: clamp(Math.round((drag.roomX + dx) / 1) * 1, 2, 96 - room.w),
      y: clamp(Math.round((drag.roomY + dy) / 1) * 1, 2, 96 - room.h),
    })
  }

  const stopDrag = () => {
    dragRef.current = null
  }

  const validation = [
    { icon: 'check_circle', text: 'Refrigerator restricted to kitchen and utility zones.', tone: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
    { icon: 'warning', text: 'Septic tank needs final civil engineer review for setback.', tone: 'text-amber-800 bg-amber-50 border-amber-100' },
    { icon: 'check_circle', text: 'Doors, windows, and parking sweep paths have no collisions.', tone: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
    { icon: 'tips_and_updates', text: 'Move office window east for better morning light.', tone: 'text-indigo-700 bg-indigo-50 border-indigo-100' },
    { icon: 'wb_sunny', text: 'Living room receives 6.5 hours of usable daylight.', tone: 'text-yellow-800 bg-yellow-50 border-yellow-100' },
    { icon: 'accessible', text: 'Main circulation path supports accessibility clearance.', tone: 'text-blue-700 bg-blue-50 border-blue-100' },
  ]

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm z-50 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => navigate('/ai-builder')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors" title="Back">
            <span className="material-symbols-outlined text-gray-500">arrow_back</span>
          </button>
          <div className="min-w-0">
            <p className="text-sm md:text-xl font-black text-gray-950 font-headline truncate">ConstructHub</p>
            <p className="hidden md:block text-[11px] text-slate-600 font-bold tracking-widest truncate">AI Home Builder</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          {['2D', '3D'].map(item => (
            <button key={item} onClick={() => {
              if (item === '3D') navigate('/ai-builder/3d')
              else setView(item)
            }} className={`px-5 py-2.5 rounded-2xl text-sm font-black flex items-center gap-2 shadow-sm ${view === item ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
              <span className="material-symbols-outlined text-base">{item === '2D' ? 'map' : 'view_in_ar'}</span>{item}
            </button>
          ))}
          <button onClick={() => { setCameraMode('Walkthrough'); setView('3D') }} className="px-5 py-2.5 rounded-2xl text-sm font-black flex items-center gap-2 bg-slate-100 text-slate-800">
            <span className="material-symbols-outlined text-base">video_camera_front</span> Walkthrough
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-blue-700 text-sm font-black shadow-sm">
            <span className="material-symbols-outlined text-base">ios_share</span> Save
          </button>
          <button onClick={() => navigate('/ai-builder/summary')} className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-sm font-black hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">download</span> Export
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:flex w-56 border-r border-slate-200 bg-white flex-col flex-shrink-0 overflow-hidden">
          <nav className="flex-1 p-3 space-y-2">
            {leftTools.map(([label, icon, state]) => (
              <button key={label} onClick={() => label === 'Rooms' ? addRoom('bedroom') : null}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black transition-all ${state === 'active' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-700 hover:bg-blue-50'}`}>
                <span className="material-symbols-outlined text-xl">{icon}</span>{label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-slate-100">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black text-slate-700 hover:bg-slate-50">
              <span className="material-symbols-outlined">settings</span> Settings
            </button>
            <div className="mt-3 h-24 rounded-2xl border-2 border-blue-500 bg-slate-100 relative overflow-hidden">
              {rooms.slice(0, 8).map(room => (
                <span key={room.id} className="absolute bg-white border border-slate-400" style={{ left: `${room.x}%`, top: `${room.y}%`, width: `${room.w}%`, height: `${room.h}%` }} />
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 flex flex-col bg-[#f5f8ff]">
          <section className={`flex-1 relative overflow-auto flex items-center justify-center p-8 ${mode === 'Night' ? 'bg-slate-900' : mode === 'Rain' ? 'bg-slate-700' : 'bg-[#f5f8ff]'}`}
            style={{ backgroundImage: view === '2D' ? 'linear-gradient(to right, rgba(79,70,229,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(79,70,229,0.08) 1px, transparent 1px)' : undefined, backgroundSize: '32px 32px' }}>
            {view === '2D' ? (
              <div ref={planRef} className="relative w-[1040px] h-[660px] bg-[#f8f3ea] shadow-ambient-lg rounded-lg border-slate-900 flex-shrink-0 transition-transform"
                style={{ transform: `scale(${zoom / 100})`, borderWidth: `${Math.max(3, wallThickness / 2)}px` }}>
                <div className="absolute -top-9 left-0 right-0 flex items-center gap-3 text-lg text-slate-950 font-black">
                  <div className="flex-1 h-px bg-slate-900" /><span>16.50 m</span><div className="flex-1 h-px bg-slate-900" />
                </div>
                <div className="absolute -left-12 top-0 bottom-0 flex flex-col items-center justify-center text-lg text-slate-950 font-black">
                  <div className="w-px flex-1 bg-slate-900" /><span className="-rotate-90 whitespace-nowrap my-12">12.80 m</span><div className="w-px flex-1 bg-slate-900" />
                </div>
                <div className="absolute top-4 left-4 z-20 text-slate-900">
                  <span className="material-symbols-outlined text-5xl">explore</span>
                </div>
                {rooms.map(room => {
                  const furniture = [...(DEFAULT_FURNITURE[room.id] || []), ...placedFurniture.filter(item => item.roomId === room.id)]
                  return (
                  <button
                    key={room.id}
                    onPointerDown={event => startDrag(event, room)}
                    onPointerMove={dragRoom}
                    onPointerUp={stopDrag}
                    onPointerCancel={stopDrag}
                    className={`absolute border-[6px] border-slate-900 p-2 text-center transition-shadow cursor-grab active:cursor-grabbing bg-[#fff4df] ${selected.id === room.id ? 'ring-4 ring-blue-500 z-10 shadow-2xl' : 'shadow-sm'}`}
                    style={{ left: `${room.x}%`, top: `${room.y}%`, width: `${room.w}%`, height: `${room.h}%` }}
                  >
                    <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(100,80,45,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,80,45,0.12) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
                    {furniture.map((item, index) => (
                      <Furniture2D key={`${room.id}-${item.label}-${index}`} item={item} />
                    ))}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center gap-1">
                      <div className="flex flex-wrap justify-center gap-2 text-slate-700 opacity-0">
                        {(roomDecor[room.id] || [room.icon]).slice(0, 3).map((icon, index) => (
                          <span key={`${room.id}-${icon}-${index}`} className="material-symbols-outlined text-2xl opacity-70">{icon}</span>
                        ))}
                      </div>
                      <p className="text-sm font-black leading-tight text-slate-950 drop-shadow-sm">{room.name}</p>
                      <p className="text-xs font-black text-slate-800">{room.size}</p>
                    </div>
                    {selected.id === room.id && (
                      <span className="absolute -right-3 -bottom-3 w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg" />
                    )}
                  </button>
                )})}
                <div className="absolute left-[39%] top-[34%] w-[6%] h-[13%] border-2 border-dashed border-slate-700 rounded-full bg-transparent" title="Door swing" />
                <div className="absolute left-[61%] top-[27%] w-[6%] h-[13%] border-2 border-dashed border-slate-700 rounded-full bg-transparent" title="Door swing" />
                <div className="absolute left-[5%] top-[18%] w-1.5 h-24 bg-blue-500 rounded-full shadow-[0_0_0_3px_white]" title="Window" />
                <div className="absolute right-[7%] top-[12%] w-1.5 h-24 bg-blue-500 rounded-full shadow-[0_0_0_3px_white]" title="Window" />
                <div className="absolute left-[28%] bottom-[-34px] w-[18%] flex items-center gap-2 text-sm text-slate-950 font-black">
                  <div className="flex-1 h-px bg-slate-900" />4.00 m<div className="flex-1 h-px bg-slate-900" />
                </div>
                <div className="absolute left-[46%] bottom-[-34px] w-[24%] flex items-center gap-2 text-sm text-slate-950 font-black">
                  <div className="flex-1 h-px bg-slate-900" />6.00 m<div className="flex-1 h-px bg-slate-900" />
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-bold text-slate-500">
                  Drag rooms to move - Area: {totalArea.toLocaleString('en-IN')} sq.ft
                </div>
              </div>
            ) : (
              <div className="w-full h-full min-h-[520px]">
                <Canvas shadows>
                  <PerspectiveCamera
                    makeDefault
                    position={cameraMode === 'First Person' ? [0, 1.2, 3.2] : cameraMode === 'Fly' ? [2, 8, 7] : cameraMode === 'Walkthrough' ? [-2.2, 1.4, 4.4] : [5.5, 5, 6.5]}
                    fov={cameraMode === 'First Person' ? 60 : 45}
                  />
                  <ambientLight intensity={mode === 'Night' ? 0.35 : 0.8} />
                  <directionalLight position={[5, 8, 4]} intensity={mode === 'Night' ? 0.55 : 1.4} castShadow />
                  <HouseModel mode={mode} rooms={rooms} placedFurniture={placedFurniture} />
                  <OrbitControls enablePan enableZoom enableRotate />
                </Canvas>
                <div className="absolute top-5 left-5 bg-white/90 border border-white rounded-2xl p-3 shadow-sm">
                  <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">3D Mode</p>
                  <p className="text-sm font-black text-gray-900">{cameraMode} Camera</p>
                </div>
              </div>
            )}

            {mode === 'Rain' && (
              <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(105deg, transparent 0 18px, rgba(255,255,255,0.5) 19px 20px)' }} />
            )}
          </section>
          <div className="h-20 flex items-center justify-center bg-transparent pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 bg-white rounded-3xl shadow-ambient-lg border border-slate-200 p-2">
              {bottomTools.map(([label, icon, state]) => (
                <button key={label}
                  onClick={() => {
                    if (label === 'Add Room') addRoom('bedroom')
                    if (label === 'Delete' && rooms.length > 1) {
                      const nextRooms = rooms.filter(room => room.id !== selected.id)
                      setRooms(nextRooms)
                      setSelectedId(nextRooms[0]?.id)
                    }
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 ${state === 'active' ? 'bg-blue-100 text-blue-700' : state === 'danger' ? 'text-red-600 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <span className="material-symbols-outlined text-lg">{icon}</span>{label}
                </button>
              ))}
              <div className="w-px h-8 bg-slate-200" />
              <button onClick={() => setZoom(prev => clamp(prev - 10, 70, 130))} className="p-2 rounded-xl hover:bg-slate-100"><span className="material-symbols-outlined">remove</span></button>
              <span className="text-sm font-black w-12 text-center">{zoom}%</span>
              <button onClick={() => setZoom(prev => clamp(prev + 10, 70, 130))} className="p-2 rounded-xl hover:bg-slate-100"><span className="material-symbols-outlined">add</span></button>
            </div>
          </div>
        </main>

        <aside className="hidden xl:flex w-80 border-l border-slate-200 bg-white flex-col flex-shrink-0 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-gray-950 text-lg">Floor Details</h3>
              <span className="material-symbols-outlined text-slate-400">close</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-y-3 text-sm">
              <span className="text-blue-950">Plot Size</span><span className="font-black text-right">16.50m x 12.80m</span>
              <span className="text-blue-950">Built-up Area</span><span className="font-black text-right">{totalArea.toLocaleString('en-IN')} sq.ft</span>
              <span className="text-blue-950">Carpet Area</span><span className="font-black text-right">{carpetArea.toLocaleString('en-IN')} sq.ft</span>
              <span className="text-blue-950">Floors</span><span className="font-black text-right">{floor} Floor</span>
            </div>
          </div>
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-black text-gray-950 text-lg mb-3">Room List ({rooms.length})</h3>
            <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar">
              {rooms.map(room => (
                <button key={room.id} onClick={() => setSelectedId(room.id)} className={`w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-left ${selected.id === room.id ? 'bg-blue-50' : 'hover:bg-slate-50'}`}>
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="w-3 h-3 rounded bg-blue-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-700 truncate">{room.name}</span>
                  </span>
                  <span className="text-xs font-black text-slate-950 whitespace-nowrap">{room.size}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-black text-gray-950 text-lg mb-3">Edit Room</h3>
            <div className="space-y-3">
              <input
                value={selected.name}
                onChange={event => updateSelectedRoom({ name: event.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input type="number" value={Math.round(selected.w * 0.7)} onChange={event => updateSelectedRoom({ w: clamp(Number(event.target.value) / 0.7, 8, 92 - selected.x) })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold" />
                <input type="number" value={Math.round(selected.h * 0.7)} onChange={event => updateSelectedRoom({ h: clamp(Number(event.target.value) / 0.7, 8, 92 - selected.y) })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold" />
              </div>
            </div>
          </div>
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-black text-gray-950 text-lg mb-3">Furniture Library</h3>
            <div className="grid grid-cols-2 gap-2">
              {FURNITURE_LIBRARY.map(item => (
                <button
                  key={item.label}
                  onClick={() => addFurnitureToSelectedRoom(item)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 p-3 text-left"
                >
                  <span className="material-symbols-outlined text-blue-600">{item.icon}</span>
                  <p className="text-xs font-black text-slate-800 mt-1">{item.label}</p>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-semibold">Select a room, then tap furniture to place it inside that room.</p>
          </div>
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            <h3 className="font-black text-gray-950 text-lg mb-3">Layers</h3>
            <div className="space-y-2">
              {['Walls', 'Doors & Windows', 'Furniture', 'Dimensions', 'Grid'].map(layer => (
                <div key={layer} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-700"><span className="material-symbols-outlined text-blue-600">check_box</span>{layer}</span>
                  <span className="material-symbols-outlined text-blue-600 text-lg">visibility</span>
                </div>
              ))}
            </div>
            <h3 className="font-black text-gray-950 text-lg mt-5 mb-3">AI Check</h3>
            <div className="space-y-2">
              {validation.slice(0, 3).map(item => (
                <div key={item.text} className={`p-3 rounded-2xl border ${item.tone}`}>
                  <p className="text-xs font-semibold leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 border-t border-gray-100 space-y-2">
            <button onClick={() => navigate('/ai-builder/summary')} className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200">
              View Cost, BOM and Timeline
            </button>
            <button onClick={() => navigate('/marketplace')} className="w-full py-3 border border-indigo-200 text-indigo-600 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-all">
              Purchase Materials
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
