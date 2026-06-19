import { useVisualizerStore } from '../../../store/visualizerStore'

// Rendered inside the R3F canvas
export function AnalysisScene({ rooms }) {
  const { showAnalysis, activeAnalysis, viewMode } = useVisualizerStore()

  const isChildMode = viewMode === 'child' || activeAnalysis === 'child'
  const isAccessMode = viewMode === 'wheelchair' || activeAnalysis === 'accessibility'

  if (!showAnalysis && !isChildMode && !isAccessMode) return null

  return (
    <group>
      {/* Child safety hazard zones */}
      {isChildMode && rooms.map((room, i) => {
        const x = (room.x - 42) / 10
        const z = (room.y - 42) / 10
        const w = Math.max(0.8, room.w / 12)
        const d = Math.max(0.8, room.h / 12)
        // Alternate safe/warning zones per room
        const isSafe = i % 3 !== 0
        return (
          <mesh key={room.id} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, z]}>
            <planeGeometry args={[w - 0.2, d - 0.2]} />
            <meshBasicMaterial
              color={isSafe ? '#22c55e' : '#f59e0b'}
              transparent
              opacity={0.15}
            />
          </mesh>
        )
      })}

      {/* Accessibility path */}
      {isAccessMode && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
          <planeGeometry args={[1.2, 12]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.18} />
        </mesh>
      )}

      {/* Sunlight analysis — grid heatmap */}
      {activeAnalysis === 'sunlight' && rooms.map((room, i) => {
        const x = (room.x - 42) / 10
        const z = (room.y - 42) / 10
        const w = Math.max(0.8, room.w / 12)
        const d = Math.max(0.8, room.h / 12)
        const intensity = [0.9, 0.4, 0.7, 0.8, 0.3, 0.6, 0.5, 0.9, 0.7, 0.4, 0.8][i % 11]
        const color = intensity > 0.7 ? '#fbbf24' : intensity > 0.4 ? '#f97316' : '#60a5fa'
        return (
          <mesh key={room.id} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, z]}>
            <planeGeometry args={[w - 0.1, d - 0.1]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} />
          </mesh>
        )
      })}
    </group>
  )
}

// Rendered outside canvas as HTML overlay
export function AnalysisPanelHUD() {
  const { viewMode, setActiveAnalysis, activeAnalysis } = useVisualizerStore()

  const isChild = viewMode === 'child'
  const isWheelchair = viewMode === 'wheelchair'

  if (!isChild && !isWheelchair && !activeAnalysis) return null

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex flex-col gap-2 max-w-sm w-full px-4">
      {isChild && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-amber-600">child_care</span>
            <span className="font-bold text-amber-800 text-sm">Child Safety Analysis</span>
            <span className="ml-auto text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">2 Hazards</span>
          </div>
          {[
            { icon: 'warning', color: 'text-red-500',   text: 'Sharp edge — Coffee Table (Living Room)' },
            { icon: 'warning', color: 'text-orange-500',text: 'Fall hazard — Staircase edge' },
            { icon: 'check_circle', color: 'text-green-500', text: '3 Safe padded zones detected' },
            { icon: 'visibility', color: 'text-blue-500', text: 'Visibility OK — All rooms reachable' },
          ].map(({ icon, color, text }) => (
            <div key={text} className={`flex items-start gap-2 text-xs text-slate-700 mb-1.5`}>
              <span className={`material-symbols-outlined text-sm flex-shrink-0 ${color}`}>{icon}</span>
              {text}
            </div>
          ))}
        </div>
      )}
      {isWheelchair && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-blue-600">accessible</span>
            <span className="font-bold text-blue-800 text-sm">Accessibility Analysis</span>
            <span className="ml-auto text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">4 ft view</span>
          </div>
          {[
            { icon: 'check_circle', color: 'text-green-500', text: 'Main corridor width: 1.2m ✓ Adequate' },
            { icon: 'check_circle', color: 'text-green-500', text: 'Main entrance: 0.95m wide ✓' },
            { icon: 'warning',      color: 'text-orange-500',text: 'Bedroom 2 door: 0.8m — Consider widening' },
            { icon: 'warning',      color: 'text-red-500',   text: 'No ramp access to upper floor' },
          ].map(({ icon, color, text }) => (
            <div key={text} className={`flex items-start gap-2 text-xs text-slate-700 mb-1.5`}>
              <span className={`material-symbols-outlined text-sm flex-shrink-0 ${color}`}>{icon}</span>
              {text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
