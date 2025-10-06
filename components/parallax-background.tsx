// components/parallax-background.tsx
import React from 'react'

export default function ParallaxBackground() {
  return (
    <div aria-hidden style={{
      position:'fixed', inset:0, zIndex:-10, pointerEvents:'none',
      background: 'radial-gradient(600px 300px at 5% 15%, rgba(0,240,255,0.03), transparent), radial-gradient(600px 300px at 90% 85%, rgba(138,107,255,0.03), transparent)'
    }} />
  )
}
