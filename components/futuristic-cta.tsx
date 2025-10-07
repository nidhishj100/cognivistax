"use client"

import { Button } from "@/components/ui/button"

export default function FuturisticCTA() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-8 md:p-12 border"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklch, var(--brand-accent-2) 10%, transparent), transparent 50%), color-mix(in oklch, var(--brand-bg) 70%, transparent)",
        borderColor: "color-mix(in oklch, var(--brand-fg) 16%, transparent)",
      }}
    >
      <h3 className="text-balance text-2xl md:text-3xl font-semibold">Experience the Future of Learning</h3>
      <p className="mt-3 opacity-85 leading-relaxed max-w-2xl">
        Step through the portal—see how adaptive sequencing, concept mastery, and real-world tasks align with your
        goals.
      </p>

      <div className="mt-6">
        <PortalButton />
      </div>

      {/* Glow accents */}
      <div aria-hidden className="pointer-events-none absolute -z-10 inset-0">
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            background:
              "radial-gradient(40% 40% at 80% 40%, color-mix(in oklch, var(--brand-primary) 20%, transparent), transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            background:
              "radial-gradient(40% 40% at 20% 80%, color-mix(in oklch, var(--brand-accent-1) 18%, transparent), transparent 60%)",
          }}
        />
      </div>
    </div>
  )
}

function PortalButton() {
  return (
    <Button
      className="relative font-medium px-6 py-6"
      style={{
        background: "var(--brand-primary)",
        color: "var(--brand-fg)",
        borderColor: "color-mix(in oklch, var(--brand-fg) 25%, transparent)",
        boxShadow: "0 0 40px color-mix(in oklch, var(--brand-primary) 55%, transparent)",
        overflow: "hidden",
      }}
    >
      <span>Generate Your Own Learning Path</span>
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(160px 160px at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--brand-accent-2) 40%, transparent), transparent 65%)",
          transition: "opacity 200ms",
          opacity: 0.0,
        }}
      />
      <style jsx>{`
        button:hover span[aria-hidden] { opacity: 1; }
        button:hover { transform: translateZ(0) scale(1.02); }
      `}</style>
      <PointerTracker />
    </Button>
  )
}

function PointerTracker() {
  return (
    <span
      aria-hidden
      className="absolute inset-0"
      onMouseMove={(e) => {
        const el = e.currentTarget.parentElement as HTMLElement
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        el.style.setProperty("--x", `${x}%`)
        el.style.setProperty("--y", `${y}%`)
      }}
    />
  )
}
