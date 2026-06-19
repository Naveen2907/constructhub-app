import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  PointerLockControls,
} from '@react-three/drei'
import * as THREE from 'three'
import { useVisualizerStore } from '../../../store/visualizerStore'

const CAMERA_CONFIGS = {
  orbit:       { position: [8, 7, 10],  fov: 45, target: [0, 1, 0] },
  fpv:         { position: [0, 1.68, 4], fov: 75, target: [0, 1.68, 0] },
  child:       { position: [0, 1.07, 4], fov: 80, target: [0, 1.07, 0] },
  wheelchair:  { position: [0, 1.22, 4], fov: 70, target: [0, 1.22, 0] },
  drone:       { position: [0, 18, 18],  fov: 60, target: [0, 0, 0] },
}

// WASD first-person controller (fpv / child / wheelchair / drone)
function useWASDControls(cameraRef, speed = 5) {
  const keys = useRef({})
  const viewMode = useVisualizerStore((s) => s.viewMode)

  useEffect(() => {
    const onKey = (e, val) => { keys.current[e.code] = val }
    window.addEventListener('keydown', (e) => onKey(e, true))
    window.addEventListener('keyup',   (e) => onKey(e, false))
    return () => {
      window.removeEventListener('keydown', (e) => onKey(e, true))
      window.removeEventListener('keyup',   (e) => onKey(e, false))
    }
  }, [])

  useFrame((_, delta) => {
    const cam = cameraRef.current
    if (!cam || viewMode === 'orbit') return

    const modeSpeed = viewMode === 'wheelchair' ? speed * 0.5
      : viewMode === 'child' ? speed * 0.6
      : viewMode === 'drone' ? speed * 2.5
      : speed

    const dir = new THREE.Vector3()
    const right = new THREE.Vector3()
    cam.getWorldDirection(dir)
    right.crossVectors(dir, cam.up).normalize()

    if (viewMode !== 'drone') dir.y = 0
    dir.normalize()

    const velocity = new THREE.Vector3()
    if (keys.current['KeyW'] || keys.current['ArrowUp'])    velocity.addScaledVector(dir, modeSpeed * delta)
    if (keys.current['KeyS'] || keys.current['ArrowDown'])   velocity.addScaledVector(dir, -modeSpeed * delta)
    if (keys.current['KeyA'] || keys.current['ArrowLeft'])   velocity.addScaledVector(right, -modeSpeed * delta)
    if (keys.current['KeyD'] || keys.current['ArrowRight'])  velocity.addScaledVector(right, modeSpeed * delta)
    if (viewMode === 'drone') {
      if (keys.current['Space'])   velocity.y += modeSpeed * delta
      if (keys.current['ShiftLeft']) velocity.y -= modeSpeed * delta
    }

    cam.position.add(velocity)

    // Lock height for non-drone modes
    if (viewMode !== 'drone') {
      const heights = { fpv: 1.68, child: 1.07, wheelchair: 1.22 }
      cam.position.y = heights[viewMode] ?? 1.68
    }
  })
}

export default function CameraManager() {
  const viewMode = useVisualizerStore((s) => s.viewMode)
  const cameraRef = useRef()
  const orbitRef  = useRef()
  const { camera } = useThree()

  useWASDControls(cameraRef)

  // Transition camera when mode changes
  useEffect(() => {
    const cfg = CAMERA_CONFIGS[viewMode]
    if (!cfg) return
    const target = new THREE.Vector3(...cfg.position)
    const current = camera.position.clone()

    let t = 0
    const animate = () => {
      t = Math.min(t + 0.04, 1)
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      camera.position.lerpVectors(current, target, ease)
      camera.fov += (cfg.fov - camera.fov) * 0.1
      camera.updateProjectionMatrix()
      if (t < 1) requestAnimationFrame(animate)
    }
    animate()
  }, [viewMode])

  const cfg = CAMERA_CONFIGS[viewMode] || CAMERA_CONFIGS.orbit

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={cfg.position}
        fov={cfg.fov}
        near={0.05}
        far={1000}
      />
      {viewMode === 'orbit' && (
        <OrbitControls
          ref={orbitRef}
          target={cfg.target}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={60}
        />
      )}
      {viewMode === 'drone' && (
        <OrbitControls
          target={[0, 0, 0]}
          enableDamping
          dampingFactor={0.05}
          minDistance={8}
          maxDistance={80}
        />
      )}
    </>
  )
}
