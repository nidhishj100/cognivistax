"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Hero from "@/components/hero"
import InteractiveJourney from "@/components/interactive-journey"
import PathTimeline from "@/components/path-timeline"
import ImpactStats from "@/components/impact-stats"
import FuturisticCTA from "@/components/futuristic-cta"
import AIChatWidget from "@/components/ai-chat-widget"
import ContactCard from "@/components/contact-card"

export default function Page() {
  // Brand tokens (exactly 5 colors): primary, 2 accents, 2 neutrals
  const themeVars = useMemo(
    () => ({
      ["--brand-primary" as any]: "oklch(0.72 0.20 245)", // electric blue
      ["--brand-accent-1" as any]: "oklch(0.70 0.12 190)", // teal
      ["--brand-accent-2" as any]: "oklch(0.65 0.20 305)", // violet
      ["--brand-bg" as any]: "oklch(0.15 0.02 260)", // deep near-black
      ["--brand-fg" as any]: "oklch(0.98 0.00 0)", // off-white
    }),
    [],
  )

  const [active, setActive] = useState<string>("home")

  useEffect(() => {
    // Observe sections for active state
    const ids = ["home", "concept", "task", "learning-path", "demo", "impact", "contact"]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.25, 0.5, 0.75] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  function scrollToId(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    // Spotlight glow
    el.setAttribute("data-spotlight", "true")
    setTimeout(() => el.removeAttribute("data-spotlight"), 900)
  }

  const NavLink = ({ id, label }: { id: string; label: string }) => {
    const isActive = active === id
    return (
      <button
        onClick={() => scrollToId(id)}
        className={cn(
          "px-3 py-2 text-sm rounded-md transition-colors active:translate-y-[1px]",
          "hover:opacity-100 focus:outline-none focus-visible:ring-2",
        )}
        style={{
          opacity: isActive ? 1 : 0.8,
          color: "var(--brand-fg)",
          boxShadow: isActive ? "0 0 18px color-mix(in oklch, var(--brand-primary) 45%, transparent)" : "none",
          border: isActive
            ? "1px solid color-mix(in oklch, var(--brand-fg) 20%, transparent)"
            : "1px solid transparent",
          background: isActive ? "color-mix(in oklch, var(--brand-fg) 6%, transparent)" : "transparent",
        }}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </button>
    )
  }

  return (
    <main
      className={cn("min-h-svh w-full dark scroll-smooth")}
      style={
        {
          ...themeVars,
          background: "var(--brand-bg)",
          color: "var(--brand-fg)",
        } as React.CSSProperties
      }
    >
      {/* Sticky, translucent navbar */}
      <header
        className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-black/30"
        style={{ borderBottom: "1px solid color-mix(in oklch, var(--brand-fg) 14%, transparent)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <button onClick={() => scrollToId("home")} className="flex items-center gap-3" aria-label="cognivista - Home">
            <div
              aria-hidden
              className="size-7 rounded-md"
              style={{ background: "var(--brand-primary)", boxShadow: "0 0 16px var(--brand-primary)" }}
            />
            <p className="text-sm md:text-base font-medium tracking-wide">cognivista</p>
          </button>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            <NavLink id="home" label="Home" />
            <NavLink id="concept" label="Concept" />
            <NavLink id="task" label="Task" />
            <NavLink id="learning-path" label="Learning Path" />
            <NavLink id="demo" label="Demo" />
            <NavLink id="impact" label="Impact" />
            <NavLink id="contact" label="Contact" />
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="font-medium"
              style={{
                background: "color-mix(in oklch, var(--brand-fg) 8%, transparent)",
                color: "var(--brand-fg)",
                borderColor: "color-mix(in oklch, var(--brand-fg) 20%, transparent)",
              }}
            >
              Smart India Hackathon 2025
            </Button>
          </div>
        </div>
      </header>

      {/* Spotlight style for sections when navigated */}
      <style jsx global>{`
        [data-spotlight="true"] {
          outline: 2px solid color-mix(in oklch, var(--brand-primary) 55%, transparent);
          box-shadow: 0 0 28px color-mix(in oklch, var(--brand-primary) 45%, transparent);
          transition: box-shadow 900ms, outline 900ms;
        }
        [data-stage-rail]::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: color-mix(in oklch, var(--brand-fg) 12%, transparent);
        }
      `}</style>

      {/* Home */}
      <section id="home" className="scroll-mt-24" aria-label="Home">
        <Hero />
      </section>

      {/* Concept */}
      <section id="concept" className="scroll-mt-24" aria-label="Concept" data-stage-rail>
        <InteractiveJourney title="Concept" />
      </section>

      {/* Task */}
      <section id="task" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-16 md:py-20" aria-label="Task">
        <h2 className="text-2xl md:text-3xl font-semibold">Task</h2>
        <p className="mt-3 opacity-85 leading-relaxed max-w-3xl">
          Identify weak points and preferred learning style; generate multiple personalized paths with clickable steps,
          and simulate progress toward mastery.
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div
            className="rounded-md border p-3"
            style={{ borderColor: "color-mix(in oklch, var(--brand-fg) 18%, transparent)" }}
          >
            Maths
          </div>
          <div
            className="rounded-md border p-3"
            style={{ borderColor: "color-mix(in oklch, var(--brand-fg) 18%, transparent)" }}
          >
            Science
          </div>
          <div
            className="rounded-md border p-3"
            style={{ borderColor: "color-mix(in oklch, var(--brand-fg) 18%, transparent)" }}
          >
            Coding
          </div>
          <div
            className="rounded-md border p-3"
            style={{ borderColor: "color-mix(in oklch, var(--brand-fg) 18%, transparent)" }}
          >
            Languages
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section id="learning-path" className="scroll-mt-24" aria-label="Learning Path">
        <PathTimeline multi />
      </section>

      {/* Demo */}
      <section id="demo" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-16 md:py-20" aria-label="Demo">
        <h2 className="text-2xl md:text-3xl font-semibold">Demo</h2>
        <p className="mt-3 opacity-85 leading-relaxed max-w-2xl">
          Explore the generated paths above, then adjust your preferences to see how the plan adapts.
        </p>
        <div className="mt-6">
          <Button
            onClick={() =>
              document.getElementById("learning-path")?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="font-medium active:translate-y-[1px]"
            style={{
              background: "var(--brand-accent-1)",
              color: "var(--brand-fg)",
              boxShadow: "0 0 30px color-mix(in oklch, var(--brand-accent-1) 45%, transparent)",
            }}
          >
            Open Path Generator
          </Button>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="scroll-mt-24" aria-label="Impact">
        <ImpactStats />
      </section>

      {/* CTA */}
      <section aria-label="Call to Action" className="mx-auto max-w-6xl px-4 py-20">
        <FuturisticCTA />
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 mx-auto max-w-6xl px-4 pb-20" aria-label="Contact">
        <h2 className="text-2xl md:text-3xl font-semibold">Let’s Connect</h2>
        <ContactCard />
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-10 opacity-80 text-sm">
        <p className="text-pretty">
          Built to envision the future of equitable, adaptive education—personalized, accessible, and impactful.
        </p>
      </footer>

      <AIChatWidget />
    </main>
  )
}
