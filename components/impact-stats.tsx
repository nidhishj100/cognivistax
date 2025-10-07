"use client"

import { useEffect, useRef, useState } from "react"

function useCounter(target: number, duration = 1600) {
  const [val, setVal] = useState(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    let raf = 0
    const step = (ts: number) => {
      if (startRef.current == null) startRef.current = ts
      const p = Math.min(1, (ts - startRef.current) / duration)
      setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return val
}

export default function ImpactStats() {
  const timeSaved = useCounter(120)
  const confidence = useCounter(78)
  const skills = useCounter(92)

  return (
    <section aria-label="Impact" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold text-balance">Impact</h2>
      <p className="mt-3 opacity-85 leading-relaxed max-w-2xl">
        Personalized learning converts time into traction. These example metrics illustrate the potential at scale.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card label="Time Saved" value={`${timeSaved} hrs/month`} hue="var(--brand-primary)" />
        <Card label="Confidence Boosted" value={`${confidence}%`} hue="var(--brand-accent-1)" />
        <Card label="Skills Mastered" value={`${skills}%`} hue="var(--brand-accent-2)" />
      </div>

      {/* India network visual */}
      <div
        className="mt-10 relative rounded-xl overflow-hidden border"
        style={{
          background: "color-mix(in oklch, var(--brand-bg) 60%, transparent)",
          borderColor: "color-mix(in oklch, var(--brand-fg) 16%, transparent)",
        }}
      >
        <img
          src="/india-map-with-glowing-network-lines.jpg"
          alt="Students across India connected by AI network"
          className="w-full object-cover opacity-85"
          style={{ maxHeight: 280 }}
        />
      </div>
    </section>
  )
}

function Card({ label, value, hue }: { label: string; value: string; hue: string }) {
  return (
    <div
      className="rounded-xl p-6 border"
      style={{
        background: "color-mix(in oklch, var(--brand-bg) 60%, transparent)",
        borderColor: "color-mix(in oklch, var(--brand-fg) 16%, transparent)",
        boxShadow: `0 0 28px color-mix(in oklch, ${hue} 22%, transparent)`,
      }}
      role="group"
      aria-label={`${label} card`}
    >
      <p className="opacity-80 text-sm">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
    </div>
  )
}
