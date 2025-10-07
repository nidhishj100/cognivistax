"use client"

import { useEffect, useRef } from "react"

export default function ParticlesCanvas({ kind = "brain" }: { kind?: "brain" | "grid" }) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let raf = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const w = parent.clientWidth
      const h = Math.max(280, Math.min(560, Math.floor(window.innerHeight * 0.6)))
      canvas.width = Math.floor(w * DPR)
      canvas.height = Math.floor(h * DPR)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    // Simple palette for the canvas (RGBA only)
    const COLORS = {
      primary: "rgba(59, 130, 246, 1)", // blue
      primaryGlow: "rgba(59, 130, 246, 0.12)",
      accent1: "rgba(13, 148, 136, 1)", // teal
      accent2: "rgba(147, 51, 234, 1)", // violet
      accent2Glow: "rgba(147, 51, 234, 0.7)",
      transparent: "rgba(0, 0, 0, 0)",
    }

    // Node layout for a "brain-like" cluster
    const N = 80
    const nodes = Array.from({ length: N }, (_, i) => {
      const angle = (i / N) * Math.PI * 2
      return {
        x: Math.cos(angle) * (120 + 60 * Math.random()),
        y: Math.sin(angle) * (80 + 40 * Math.random()),
        z: Math.sin(angle * 2) * 40,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }
    })

    const draw = (t: number) => {
      if (!ctx) return
      const w = canvas.width / DPR
      const h = canvas.height / DPR
      ctx.clearRect(0, 0, w, h)

      // Center
      ctx.save()
      ctx.translate(w * 0.65, h * 0.46)

      // Soft glow background with safe RGBA
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.min(w, h) * 0.5)
      glow.addColorStop(0, COLORS.primaryGlow)
      glow.addColorStop(1, COLORS.transparent)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(0, 0, Math.min(w, h) * 0.48, 0, Math.PI * 2)
      ctx.fill()

      // Update nodes
      nodes.forEach((n, i) => {
        n.x += Math.sin(t * 0.001 + i) * 0.05 + n.vx
        n.y += Math.cos(t * 0.0015 + i * 0.5) * 0.04 + n.vy
      })

      // Connections (use RGBA with computed alpha)
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 160 * 160) {
            const alpha = 1 - d2 / (160 * 160) // 0..1
            const lineAlpha = Math.max(0.12, alpha * 0.35)
            ctx.strokeStyle = `rgba(13, 148, 136, ${lineAlpha})` // teal with varying alpha
            ctx.lineWidth = Math.max(0.5, 2 * alpha)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Nodes (violet with pulse-based alpha)
      nodes.forEach((n, i) => {
        const pulse = 0.6 + Math.sin(t * 0.004 + i) * 0.4 // 0.2..1.0
        const fillAlpha = Math.min(1, 0.3 + pulse * 0.4)
        ctx.fillStyle = `rgba(147, 51, 234, ${fillAlpha})`
        ctx.shadowBlur = 16
        ctx.shadowColor = COLORS.accent2Glow
        ctx.beginPath()
        ctx.arc(n.x, n.y, 3 + pulse * 1.4, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [kind])

  return (
    <div className="relative w-full">
      <canvas ref={ref} aria-hidden className="block w-full select-none" />
    </div>
  )
}
