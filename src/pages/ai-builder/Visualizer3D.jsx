import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stats, Grid } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import { roomPlan } from './aiHomeBuilderData'
import CameraManager from '../../components/visualizer/cameras/CameraManager'
import LightingSystem from '../../components/visualizer/lighting/LightingSystem'
import HouseScene from '../../components/visualizer/scene/HouseScene'
import ExteriorScene from '../../components/visualizer/scene/ExteriorScene'
import ViewModeToolbar from '../../components/visualizer/ui/ViewModeToolbar'
import { AnalysisScene, AnalysisPanelHUD } from '../../components/visualizer/ui/AnalysisOverlay'
import { useVisualizerStore } from '../../store/visualizerStore'

function SceneContent({ rooms, designPreset }) {
  return (
    <>
      <CameraManager />
      <LightingSystem />
      <fog attach="fog" args={['#e8edf5', 40, 120]} />
      <HouseScene rooms={rooms} designPreset={designPreset} />
      <ExteriorScene designPreset={designPreset} />
      <AnalysisScene rooms={rooms} />
      <Grid
        position={[0, -0.02, 0]}
        args={[60, 60]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#c8cfe0"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#a0aec0"
        fadeDistance={40}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid
      />
    </>
  )
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white font-semibold text-lg">Building your 3D home...</p>
        <p className="text-slate-400 text-sm mt-2">Rendering materials & lighting</p>
      </div>
    </div>
  )
}

export default function Visualizer3D() {
  const navigate = useNavigate()
  const designPreset = useVisualizerStore((s) => s.designPreset)
  const viewMode = useVisualizerStore((s) => s.viewMode)
  const hoveredRoom = useVisualizerStore((s) => s.hoveredRoom)
  const rooms = roomPlan

  return (
    <div className="h-screen w-full bg-slate-900 relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 h-14 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/ai-builder/canvas')}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <span className="material-symbols-outlined text-indigo-400">view_in_ar</span>
          <div>
            <p className="text-white font-bold text-sm leading-tight">3D Visualization</p>
            <p className="text-slate-400 text-xs capitalize">{viewMode} view · {designPreset} preset</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Hovered room indicator */}
          {hoveredRoom && (
            <div className="bg-indigo-600/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {rooms.find(r => r.id === hoveredRoom)?.name || hoveredRoom}
            </div>
          )}
          <button
            onClick={() => navigate('/ai-builder/summary')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">calculate</span>
            Cost Estimate
          </button>
          <button
            onClick={() => navigate('/ai-builder/canvas')}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            Edit 2D Plan
          </button>
        </div>
      </header>

      {/* 3D Canvas */}
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneContent rooms={rooms} designPreset={designPreset} />
        </Suspense>
      </Canvas>

      {/* Loading overlay */}
      <Suspense fallback={<LoadingFallback />} />

      {/* UI Overlays */}
      <ViewModeToolbar />
      <AnalysisPanelHUD />

      {/* Room count info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 backdrop-blur text-white/70 text-xs px-4 py-2 rounded-full flex items-center gap-3">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm text-indigo-400">meeting_room</span>
          {rooms.length} Rooms
        </span>
        <span className="w-px h-3 bg-white/20" />
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm text-emerald-400">straighten</span>
          {rooms.reduce((s, r) => s + r.area, 0).toLocaleString('en-IN')} sq.ft
        </span>
        <span className="w-px h-3 bg-white/20" />
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm text-amber-400">door_front</span>
          Click doors to open
        </span>
      </div>
    </div>
  )
}
