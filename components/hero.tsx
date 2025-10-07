"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import ParticlesCanvas from "@/components/particles-canvas"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TAGLINE = "Your Learning. Your Pace. Your Path."
const QUOTES = [
  "Small steps, big mastery.",
  "Practice makes progress.",
  "Learn your way, every day.",
  "Confidence grows with clarity.",
]

export default function Hero() {
  const [typed, setTyped] = useState("")
  const indexRef = useRef(0)
  const [qIdx, setQIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setTyped((prev) => prev + TAGLINE.charAt(indexRef.current))
      indexRef.current += 1
      if (indexRef.current >= TAGLINE.length) clearInterval(id)
    }, 35)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setQIdx((i) => (i + 1) % QUOTES.length)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const gradient = useMemo(
    () =>
      `radial-gradient(60% 80% at 50% 10%, color-mix(in oklch, var(--brand-accent-2) 18%, transparent), transparent 60%),
       radial-gradient(40% 60% at 80% 20%, color-mix(in oklch, var(--brand-primary) 22%, transparent), transparent 60%),
       radial-gradient(40% 60% at 20% 30%, color-mix(in oklch, var(--brand-accent-1) 18%, transparent), transparent 60%)`,
    [],
  )

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden"
      style={{
        paddingBlock: "min(14vh, 8rem)",
        backgroundImage: gradient,
      }}
    >
      <ParticlesCanvas kind="brain" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <img
              src="/cognivista-logo-placeholder.jpg"
              alt="Cognivista logo"
              width={40}
              height={40}
              className="rounded-sm"
            />
            <p className="text-sm opacity-80">cognivista</p>
          </div>

          <h1 className="mt-3 text-balance text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
            AI-Powered Personalized Learning Paths
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-90 leading-relaxed">
            {typed || TAGLINE}
            <span
              aria-hidden
              className="inline-block w-3 h-6 align-bottom ml-1 animate-pulse"
              style={{ background: "var(--brand-fg)" }}
            />
          </p>
          <p className="mt-3 text-sm opacity-85">{QUOTES[qIdx]}</p>

          <div className="mt-8 flex items-center gap-3">
            <Button
              className="font-medium active:translate-y-[1px]"
              onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              style={{
                background: "var(--brand-primary)",
                color: "var(--brand-fg)",
                boxShadow: "0 0 30px color-mix(in oklch, var(--brand-primary) 45%, transparent)",
              }}
            >
              Try a Sample Path
            </Button>
            <Button
              variant="secondary"
              className="font-medium active:translate-y-[1px]"
              onClick={() =>
                document.getElementById("learning-path")?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              style={{
                background: "color-mix(in oklch, var(--brand-accent-1) 25%, transparent)",
                color: "var(--brand-fg)",
                borderColor: "color-mix(in oklch, var(--brand-accent-1) 40%, transparent)",
              }}
            >
              Generate My Path
            </Button>
          </div>
        </div>

        {/* Study visuals: robot + hologram */}
        <div className="relative mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src="/3d-robot-mascot-waving.jpg"
            alt="Friendly robot guide waving"
            className="w-full rounded-xl border"
            style={{ borderColor: "color-mix(in oklch, var(--brand-fg) 16%, transparent)" }}
          />
          <img
            src="/futuristic-hologram-classroom.jpg"
            alt="Futuristic hologram classroom"
            className="w-full rounded-xl border"
            style={{ borderColor: "color-mix(in oklch, var(--brand-fg) 16%, transparent)" }}
          />
        </div>

        {/* Floating “3D” cards */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <FloatingCard style={{ top: "12%", left: "64%" }} label="Neural Links" hue="var(--brand-accent-2)" />
          <FloatingCard style={{ bottom: "12%", left: "8%" }} label="Concept Graphs" hue="var(--brand-primary)" />
          <FloatingCard style={{ bottom: "18%", right: "12%" }} label="Adaptive Tasks" hue="var(--brand-accent-1)" />
        </div>
      </div>
    </section>
  )
}

function FloatingCard({
  label,
  hue,
  style,
}: {
  label: string
  hue: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={cn(
        "hidden md:block absolute will-change-transform rounded-xl p-3 backdrop-blur-sm",
        "shadow-2xl border translate-z-0",
      )}
      style={{
        ...style,
        background: "color-mix(in oklch, var(--brand-bg) 55%, transparent)",
        borderColor: "color-mix(in oklch, var(--brand-fg) 20%, transparent)",
        boxShadow: `0 0 40px color-mix(in oklch, ${hue} 40%, transparent)`,
        animation: "floatY 6s ease-in-out infinite",
      }}
    >
      <p className="text-sm opacity-90">{label}</p>
      <style jsx>{`
        @keyframes floatY {
          0% { transform: translateY(0px) rotate3d(0, 1, 0, 0deg); }
          50% { transform: translateY(-10px) rotate3d(0, 1, 0, 8deg); }
          100% { transform: translateY(0px) rotate3d(0, 1, 0, 0deg); }
        }
      `}</style>
    </div>
  )
}
