import { useVisualizerStore } from '../../../store/visualizerStore'
import { useMaterial } from './MaterialLibrary'

function Tree({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 1.2, 8]} />
        <meshStandardMaterial color="#6b4226" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.9, 0]} castShadow>
        <coneGeometry args={[0.9, 2.2, 8]} />
        <meshStandardMaterial color="#2d6a2d" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[0.6, 1.6, 8]} />
        <meshStandardMaterial color="#3a7a3a" roughness={0.8} />
      </mesh>
    </group>
  )
}

function Bush({ position }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.4, 8, 6]} />
      <meshStandardMaterial color="#4a8a3a" roughness={0.9} />
    </mesh>
  )
}

export default function ExteriorScene({ designPreset }) {
  const showExterior = useVisualizerStore((s) => s.showExterior)
  const groundMat = useMaterial(designPreset, 'ground')
  const concreteMat = useMaterial(designPreset, 'concrete')
  const exteriorMat = useMaterial(designPreset, 'exterior')

  if (!showExterior) return null

  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial {...groundMat} />
      </mesh>

      {/* Lawn area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[22, 18]} />
        <meshStandardMaterial color="#5a8f3a" roughness={0.95} />
      </mesh>

      {/* Driveway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 10]} receiveShadow>
        <planeGeometry args={[4, 8]} />
        <meshStandardMaterial {...concreteMat} />
      </mesh>
      {/* Driveway stripes */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, 10]}>
          <planeGeometry args={[0.08, 7.5]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
      ))}

      {/* Compound wall — 4 sides */}
      {[
        { pos: [0, 0.8, -11],  args: [22, 1.6, 0.3] },
        { pos: [0, 0.8, 11],   args: [22, 1.6, 0.3] },
        { pos: [-11, 0.8, 0],  args: [0.3, 1.6, 22] },
        { pos: [11, 0.8, 0],   args: [0.3, 1.6, 22] },
      ].map(({ pos, args }, i) => (
        <mesh key={i} position={pos} castShadow receiveShadow>
          <boxGeometry args={args} />
          <meshStandardMaterial {...exteriorMat} />
        </mesh>
      ))}

      {/* Gate */}
      <mesh position={[-1.1, 0.7, 11]} castShadow>
        <boxGeometry args={[1.8, 1.4, 0.08]} />
        <meshStandardMaterial color="#8b6914" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[1.1, 0.7, 11]} castShadow>
        <boxGeometry args={[1.8, 1.4, 0.08]} />
        <meshStandardMaterial color="#8b6914" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Gate posts */}
      {[-2.2, 2.2].map((x, i) => (
        <mesh key={i} position={[x, 0.9, 11]} castShadow>
          <boxGeometry args={[0.25, 1.8, 0.25]} />
          <meshStandardMaterial color="#6b5010" roughness={0.6} metalness={0.3} />
        </mesh>
      ))}

      {/* Swimming pool */}
      <mesh position={[7, -0.15, -6]} receiveShadow>
        <boxGeometry args={[4.5, 0.3, 3]} />
        <meshStandardMaterial color="#1a6b8a" roughness={0.05} metalness={0.1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[7, 0.01, -6]}>
        <planeGeometry args={[4.3, 2.8]} />
        <meshStandardMaterial color="#40aad4" roughness={0.0} metalness={0.1} transparent opacity={0.8} />
      </mesh>
      {/* Pool edge */}
      {[
        { pos: [7, 0.05, -4.65], args: [4.7, 0.12, 0.2] },
        { pos: [7, 0.05, -7.35], args: [4.7, 0.12, 0.2] },
        { pos: [4.65, 0.05, -6], args: [0.2, 0.12, 3.2] },
        { pos: [9.35, 0.05, -6], args: [0.2, 0.12, 3.2] },
      ].map(({ pos, args }, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={args} />
          <meshStandardMaterial color="#e8e0d0" roughness={0.2} metalness={0.1} />
        </mesh>
      ))}

      {/* Trees */}
      <Tree position={[-8, 0, -5]} />
      <Tree position={[-8, 0, 2]} />
      <Tree position={[8, 0, 2]} />
      <Tree position={[-6, 0, -8]} />

      {/* Bushes */}
      <Bush position={[-9, 0.4, -2]} />
      <Bush position={[-9, 0.4, 4]} />
      <Bush position={[4, 0.4, -8]} />
      <Bush position={[6, 0.4, -8]} />

      {/* Garden path stones */}
      {[[-3, 0], [-1.5, 0.3], [0, 0], [1.5, -0.3], [3, 0]].map(([x, z], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, z + 6]}>
          <circleGeometry args={[0.3, 8]} />
          <meshStandardMaterial color="#c8b89a" roughness={0.9} />
        </mesh>
      ))}

      {/* Parking area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 8.5]} receiveShadow>
        <planeGeometry args={[5.5, 4]} />
        <meshStandardMaterial color="#808080" roughness={0.9} />
      </mesh>
      {/* Parking lines */}
      {[-1.3, 1.3].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, 8.5]}>
          <planeGeometry args={[0.06, 3.8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}
