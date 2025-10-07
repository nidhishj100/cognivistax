"use client"

import { useEffect, useRef } from "react"

function Icon({ name }: { name: "input" | "thinking" | "path" | "impact" }) {
  const common = { width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 2 } as any
  switch (name) {
    case "input":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M7 8h10M7 12h6" />
        </svg>
      )
    case "thinking":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 3a7 7 0 0 1 7 7c0 3.5-2.5 6-6 6H9l-3 3v-4a7 7 0 0 1 6-12z" />
        </svg>
      )
    case "path":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden>
          <path d="M4 18h6a4 4 0 0 0 0-8H4" />
          <circle cx="4" cy="10" r="2" />
          <circle cx="20" cy="14" r="2" />
        </svg>
      )
    case "impact":
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden>
          <path d="M5 13l4 4L19 7" />
        </svg>
      )
  }
}

const steps = [
  {
    title: "Input",
    desc: "Students share goals, strengths, and constraints.",
    icon: "input" as const,
  },
  {
    title: "AI Thinking",
    desc: "The system reasons over concepts and optimal sequencing.",
    icon: "thinking" as const,
  },
  {
    title: "Personalized Path",
    desc: "A step-by-step plan tailored to learning preferences.",
    icon: "path" as const,
  },
  {
    title: "Impact on Students",
    desc: "Higher engagement and faster skill mastery.",
    icon: "impact" as const,
  },
]

export default function InteractiveJourney({ title = "How it Works" }: { title?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = Array.from(el.querySelectorAll("[data-journey-step]"))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0")
          }
        })
      },
      { threshold: 0.25 },
    )
    items.forEach((i) => io.observe(i))
    return () => io.disconnect()
  }, [])

  return (
    <section aria-label={title} className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold text-balance">{title}</h2>
      <p className="mt-3 opacity-85 leading-relaxed max-w-2xl">
        Follow the journey—like circuits lighting up—as inputs become a personalized plan and real-world impact.
      </p>

      <div ref={ref} className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((s, idx) => (
          <article
            key={s.title}
            data-journey-step
            className="opacity-0 translate-y-4 transition-all duration-700 rounded-xl border p-5"
            style={{
              background: "color-mix(in oklch, var(--brand-bg) 60%, transparent)",
              borderColor: "color-mix(in oklch, var(--brand-fg) 16%, transparent)",
              boxShadow: "0 0 24px color-mix(in oklch, var(--brand-primary) 14%, transparent)",
            }}
          >
            <header className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-flex items-center justify-center size-7 rounded-md"
                style={{
                  color: "var(--brand-fg)",
                  background: "color-mix(in oklch, var(--brand-fg) 6%, transparent)",
                  boxShadow: "0 0 10px color-mix(in oklch, var(--brand-primary) 40%, transparent)",
                }}
              >
                <Icon name={s.icon} />
              </span>
              <h3 className="text-lg font-medium">{s.title}</h3>
            </header>

            <p className="mt-3 opacity-85 leading-relaxed">{s.desc}</p>

            {/* Decorative mini-circuit */}
            <svg className="mt-5 w-full" viewBox="0 0 300 60" role="img" aria-label={`${s.title} circuit`}>
              <defs>
                <linearGradient id={`g-${idx}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="var(--brand-accent-1)" stopOpacity="0.0" />
                  <stop offset="50%" stopColor="var(--brand-primary)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--brand-accent-2)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M10 30 H110 Q130 30 150 10 T290 30" stroke={`url(#g-${idx})`} strokeWidth="3" fill="none" />
              <g>
                <circle cx="110" cy="30" r="4" fill="var(--brand-primary)" />
                <circle cx="150" cy="10" r="4" fill="var(--brand-accent-1)" />
                <circle cx="190" cy="20" r="4" fill="var(--brand-accent-2)" />
              </g>
            </svg>
          </article>
        ))}
      </div>
    </section>
  )
}
