import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useVisualizerStore } from '../../../store/visualizerStore'
import { useMaterial } from './MaterialLibrary'

const ROOM_FURNITURE = {
  living:  [
    { label: 'Sofa',      pos: [0, 0.22, 0.6],  args: [1.8, 0.44, 0.7],  mat: 'sofa' },
    { label: 'Table',     pos: [0, 0.15, -0.1], args: [0.9, 0.3, 0.5],   mat: 'wood' },
    { label: 'TV',        pos: [0, 0.5, -1.1],  args: [1.2, 0.7, 0.08],  mat: 'concrete' },
    { label: 'TvStand',   pos: [0, 0.18, -1.0], args: [1.4, 0.36, 0.4],  mat: 'wood' },
  ],
  bed1:    [
    { label: 'Bed',       pos: [0.2, 0.22, 0.1], args: [1.6, 0.44, 2.0], mat: 'bed' },
    { label: 'Wardrobe',  pos: [0.9, 0.6, -0.9], args: [0.5, 1.2, 1.8],  mat: 'wood' },
    { label: 'Nightstand',pos: [-0.8, 0.18, 0.1],args: [0.4, 0.36, 0.4], mat: 'wood' },
  ],
  bed2:    [
    { label: 'Bed',       pos: [0.2, 0.22, 0.1], args: [1.4, 0.44, 1.8], mat: 'bed' },
    { label: 'Wardrobe',  pos: [0.9, 0.6, -0.9], args: [0.5, 1.2, 1.8],  mat: 'wood' },
  ],
  bed3:    [
    { label: 'Bed',       pos: [0, 0.22, 0.2],   args: [1.4, 0.44, 1.8], mat: 'bed' },
  ],
  kitchen: [
    { label: 'Counter',   pos: [0, 0.42, -0.9],  args: [2.2, 0.84, 0.5], mat: 'concrete' },
    { label: 'Island',    pos: [0, 0.35, 0.2],   args: [1.0, 0.7, 0.5],  mat: 'wood' },
  ],
  bath1:   [
    { label: 'Bathtub',   pos: [-0.4, 0.18, 0.4], args: [0.8, 0.36, 1.4],mat: 'floor' },
    { label: 'Basin',     pos: [0.5, 0.5, -0.5],  args: [0.5, 0.1, 0.4], mat: 'floor' },
  ],
  bath2:   [
    { label: 'Basin',     pos: [0, 0.5, -0.6],    args: [0.5, 0.1, 0.4], mat: 'floor' },
  ],
  office:  [
    { label: 'Desk',      pos: [0, 0.35, -0.5],   args: [1.4, 0.7, 0.6], mat: 'wood' },
    { label: 'Chair',     pos: [0, 0.3, 0.2],     args: [0.5, 0.6, 0.5], mat: 'sofa' },
  ],
  pooja:   [
    { label: 'Mandir',    pos: [0, 0.6, -0.6],    args: [0.8, 1.2, 0.4], mat: 'wood' },
  ],
}

function Door({ position, rotation = [0, 0, 0], doorId, designPreset }) {
  const openDoors = useVisualizerStore((s) => s.openDoors)
  const toggleDoor = useVisualizerStore((s) => s.toggleDoor)
  const isOpen = openDoors.includes(doorId)
  const groupRef = useRef()
  const matProps = useMaterial(designPreset, 'wood')

  useFrame(() => {
    if (!groupRef.current) return
    const target = isOpen ? -Math.PI / 2 : 0
    groupRef.current.rotation.y += (target - groupRef.current.rotation.y) * 0.1
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Hinge pivot at edge */}
      <group ref={groupRef} position={[-0.45, 0, 0]}>
        <mesh position={[0.45, 1.05, 0]} castShadow onClick={() => toggleDoor(doorId)} >
          <boxGeometry args={[0.9, 2.1, 0.06]} />
          <meshStandardMaterial {...matProps} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.78, 1.05, 0.06]} castShadow>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#c8a850" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
      {/* Frame */}
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[0.96, 2.16, 0.04]} />
        <meshStandardMaterial color="#7a6040" roughness={0.7} />
      </mesh>
    </group>
  )
}

function Window({ position, rotation = [0, 0, 0], designPreset }) {
  const glassMat = useMaterial(designPreset, 'glass')
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 1.1, 0.08]} />
        <meshStandardMaterial color="#c8d0d8" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Glass panes */}
      {[[-0.28, 0.12], [0.28, 0.12], [-0.28, -0.28], [0.28, -0.28]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.02]}>
          <planeGeometry args={[0.5, 0.48]} />
          <meshStandardMaterial {...glassMat} />
        </mesh>
      ))}
    </group>
  )
}

function Room({ room, designPreset, index }) {
  const showFurniture = useVisualizerStore((s) => s.showFurniture)
  const setHoveredRoom = useVisualizerStore((s) => s.setHoveredRoom)
  const hoveredRoom = useVisualizerStore((s) => s.hoveredRoom)

  const x = (room.x - 42) / 10
  const z = (room.y - 42) / 10
  const w = Math.max(0.8, room.w / 12)
  const d = Math.max(0.8, room.h / 12)
  const wallH = 2.8
  const wallT = 0.15

  const floorMat = useMaterial(designPreset, 'floor')
  const wallMat  = useMaterial(designPreset, 'wall')
  const ceilMat  = useMaterial(designPreset, 'ceiling')
  const furniture = ROOM_FURNITURE[room.id] || []

  const isHovered = hoveredRoom === room.id
  const roomColor = isHovered
    ? { ...wallMat, color: '#dde8ff', emissive: '#3355aa', emissiveIntensity: 0.05 }
    : wallMat

  return (
    <group position={[x, 0, z]}
      onPointerOver={() => setHoveredRoom(room.id)}
      onPointerOut={() => setHoveredRoom(null)}
    >
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial {...floorMat} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, wallH, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial {...ceilMat} />
      </mesh>

      {/* Walls — 4 sides */}
      {/* Back */}
      <mesh position={[0, wallH / 2, -d / 2]} receiveShadow castShadow>
        <boxGeometry args={[w, wallH, wallT]} />
        <meshStandardMaterial {...roomColor} />
      </mesh>
      {/* Front */}
      <mesh position={[0, wallH / 2, d / 2]} receiveShadow castShadow>
        <boxGeometry args={[w, wallH, wallT]} />
        <meshStandardMaterial {...roomColor} />
      </mesh>
      {/* Left */}
      <mesh position={[-w / 2, wallH / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[wallT, wallH, d]} />
        <meshStandardMaterial {...roomColor} />
      </mesh>
      {/* Right */}
      <mesh position={[w / 2, wallH / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[wallT, wallH, d]} />
        <meshStandardMaterial {...roomColor} />
      </mesh>

      {/* Room label (invisible collision plane for hover) */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
        <planeGeometry args={[w, d]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Doors */}
      {index % 3 === 0 && <Door position={[0, 0, d / 2 - 0.01]} doorId={`door-${room.id}-front`} designPreset={designPreset} />}
      {index % 3 === 1 && <Door position={[-w / 2 + 0.01, 0, 0]} rotation={[0, Math.PI / 2, 0]} doorId={`door-${room.id}-left`} designPreset={designPreset} />}

      {/* Windows */}
      <Window position={[0, 1.4, -d / 2 - 0.02]} designPreset={designPreset} />
      {w > 2 && <Window position={[w * 0.3, 1.4, d / 2 + 0.02]} rotation={[0, Math.PI, 0]} designPreset={designPreset} />}

      {/* Furniture */}
      {showFurniture && furniture.map((item, i) => (
        <mesh key={i} position={item.pos} castShadow receiveShadow>
          <boxGeometry args={item.args} />
          <meshStandardMaterial {...useMaterial(designPreset, item.mat)} />
        </mesh>
      ))}

      {/* Room label plane */}
      {isHovered && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w - 0.1, d - 0.1]} />
          <meshBasicMaterial color="#4f46e5" transparent opacity={0.08} />
        </mesh>
      )}
    </group>
  )
}

function Roof({ rooms, designPreset }) {
  const showRoof = useVisualizerStore((s) => s.showRoof)
  const roofMat  = useMaterial(designPreset, 'roof')
  if (!showRoof) return null

  const xs = rooms.map(r => (r.x - 42) / 10)
  const zs = rooms.map(r => (r.y - 42) / 10)
  const minX = Math.min(...xs) - 0.5
  const maxX = Math.max(...xs.map((x, i) => x + rooms[i].w / 12)) + 0.5
  const minZ = Math.min(...zs) - 0.5
  const maxZ = Math.max(...zs.map((z, i) => z + rooms[i].h / 12)) + 0.5
  const cx = (minX + maxX) / 2
  const cz = (minZ + maxZ) / 2
  const rw = maxX - minX
  const rd = maxZ - minZ

  return (
    <group position={[cx, 2.8, cz]}>
      {/* Flat roof slab */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[rw + 0.4, 0.2, rd + 0.4]} />
        <meshStandardMaterial {...roofMat} />
      </mesh>
      {/* Parapet walls */}
      {[
        { pos: [0, 0.3, -(rd + 0.4) / 2],         args: [rw + 0.4, 0.6, 0.2] },
        { pos: [0, 0.3,  (rd + 0.4) / 2],         args: [rw + 0.4, 0.6, 0.2] },
        { pos: [-(rw + 0.4) / 2, 0.3, 0],         args: [0.2, 0.6, rd + 0.4] },
        { pos: [ (rw + 0.4) / 2, 0.3, 0],         args: [0.2, 0.6, rd + 0.4] },
      ].map(({ pos, args }, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={args} />
          <meshStandardMaterial {...roofMat} />
        </mesh>
      ))}
      {/* Solar panels */}
      {[[-1, 0, -0.5], [0.5, 0, -0.5], [-1, 0, 0.8], [0.5, 0, 0.8]].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 0.04, 0.8]} />
          <meshStandardMaterial color="#1a2a4a" roughness={0.1} metalness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

export default function HouseScene({ rooms, designPreset }) {
  return (
    <group>
      {rooms.map((room, index) => (
        <Room key={room.id} room={room} designPreset={designPreset} index={index} />
      ))}
      <Roof rooms={rooms} designPreset={designPreset} />
    </group>
  )
}
