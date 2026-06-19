import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sky, Environment } from '@react-three/drei'
import { useVisualizerStore } from '../../../store/visualizerStore'

const PRESETS = {
  day:     { ambientInt: 1.2, dirInt: 2.2,  dirColor: '#fff9f0', dirPos: [8, 12, 6],   sky: { turbidity: 2,  rayleigh: 0.5, azimuth: 180, inclination: 0.49 } },
  night:   { ambientInt: 0.15,dirInt: 0.3,  dirColor: '#b0c4de', dirPos: [-5, 8, -4],  sky: null },
  sunrise: { ambientInt: 0.8, dirInt: 1.6,  dirColor: '#ff8c42', dirPos: [14, 3, 4],   sky: { turbidity: 6,  rayleigh: 2.0, azimuth: 90,  inclination: 0.52 } },
  sunset:  { ambientInt: 0.7, dirInt: 1.4,  dirColor: '#ff5e3a', dirPos: [-14, 2, 4],  sky: { turbidity: 8,  rayleigh: 3.0, azimuth: 270, inclination: 0.51 } },
  rain:    { ambientInt: 0.5, dirInt: 0.6,  dirColor: '#c8d8e8', dirPos: [0, 10, 0],   sky: { turbidity: 20, rayleigh: 1.0, azimuth: 180, inclination: 0.48 } },
  cloudy:  { ambientInt: 0.9, dirInt: 0.9,  dirColor: '#d8e4ee', dirPos: [4, 10, 4],   sky: { turbidity: 14, rayleigh: 0.8, azimuth: 180, inclination: 0.49 } },
}

export default function LightingSystem() {
  const lightingPreset = useVisualizerStore((s) => s.lightingPreset)
  const cfg = PRESETS[lightingPreset] || PRESETS.day
  const dirRef = useRef()

  return (
    <>
      <ambientLight intensity={cfg.ambientInt} color={cfg.dirColor} />
      <directionalLight
        ref={dirRef}
        position={cfg.dirPos}
        intensity={cfg.dirInt}
        color={cfg.dirColor}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={200}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.001}
      />
      {lightingPreset === 'night' && (
        <>
          <pointLight position={[0, 2.8, 0]}  intensity={1.2} color="#ffd27f" distance={12} />
          <pointLight position={[-3, 2.8, 2]} intensity={0.8} color="#ffeaa0" distance={8} />
          <pointLight position={[3, 2.8, -2]} intensity={0.8} color="#ffeaa0" distance={8} />
          <Environment preset="night" />
        </>
      )}
      {cfg.sky && (
        <Sky
          distance={45000}
          sunPosition={cfg.dirPos}
          turbidity={cfg.sky.turbidity}
          rayleigh={cfg.sky.rayleigh}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
          azimuth={cfg.sky.azimuth}
          inclination={cfg.sky.inclination}
        />
      )}
      {lightingPreset !== 'night' && (
        <Environment preset="city" />
      )}
    </>
  )
}
