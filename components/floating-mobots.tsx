// components/floating-mobots.tsx
'use client'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

function Mobot({ pos, scale=1, color='#00f0ff' }: any) {
  const ref = useRef<any>()
  useFrame((state, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.3 * (0.5 + Math.sin(state.clock.elapsedTime + pos[0]) * 0.5)
    ref.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime + pos[0]) * 0.15
  })
  return (
    <group ref={ref} position={pos}>
      <mesh castShadow>
        <sphereGeometry args={[0.25 * scale, 32, 32]} />
        <meshStandardMaterial emissive={color} color="#0d1113" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* little antenna */}
      <mesh position={[0, 0.35 * scale, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3 * scale, 8]} />
        <meshStandardMaterial emissive={color} color="#000" />
      </mesh>
    </group>
  )
}

export default function FloatingMobots() {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Mobot pos={[1.1, 0.4, 0]} scale={1.6} color="#00f0ff" />
        <Mobot pos={[0.2, -0.2, 0.4]} scale={1.1} color="#8a6bff" />
        <Mobot pos={[-1.0, 0.1, -0.2]} scale={0.9} color="#00ffbd" />
      </Suspense>

      {/* allow minimal rotation on small screens */}
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  )
}
