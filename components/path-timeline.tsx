"use client"

import { useState } from "react"

type Pref = "videos" | "quiz" | "notes" | "live"
type Gap = "none" | "algebra" | "geometry"

type DayItem = { day: string; title: string; detail: string; href?: string }

const PATHS: Record<string, DayItem[]> = {
  // general
  "none:videos": [
    { day: "Day 1", title: "Concept Overview (Videos)", detail: "Short intros to core ideas." },
    { day: "Day 2", title: "Guided Examples", detail: "Walkthrough clips with captions." },
    { day: "Day 3", title: "Practice Quiz", detail: "Adaptive quiz to reinforce learning." },
    { day: "Day 4", title: "Project Snippets", detail: "Applying concepts to mini projects." },
    { day: "Day 5", title: "Review & Next Steps", detail: "Personalized recap and recommendations." },
  ],
  "none:quiz": [
    { day: "Day 1", title: "Diagnostic Quiz", detail: "Find your baseline and gaps." },
    { day: "Day 2", title: "Targeted Practice", detail: "Drills matched to your profile." },
    { day: "Day 3", title: "Video Reinforcement", detail: "Clarify weak spots with clips." },
    { day: "Day 4", title: "Challenge Quiz", detail: "Scaled difficulty for mastery." },
    { day: "Day 5", title: "Reflect & Plan", detail: "Next steps tailored to your results." },
  ],
  "none:notes": [
    { day: "Day 1", title: "Concept Notes", detail: "Concise summaries and key formulas." },
    { day: "Day 2", title: "Worked Examples", detail: "Step by step with annotations." },
    { day: "Day 3", title: "Recall Drills", detail: "Spaced repetition flash notes." },
    { day: "Day 4", title: "Quick Quiz", detail: "Check understanding quickly." },
    { day: "Day 5", title: "Cheat Sheet", detail: "Personalized summary sheet." },
  ],
  "none:live": [
    { day: "Day 1", title: "Live Practice", detail: "Interactive problem-solving session." },
    { day: "Day 2", title: "Guided Hints", detail: "Reduce frustration, build confidence." },
    { day: "Day 3", title: "Concept Debrief", detail: "Note highlights from practice." },
    { day: "Day 4", title: "Challenge Set", detail: "Timed problems with feedback." },
    { day: "Day 5", title: "Plan Next Week", detail: "Book your next live slot." },
  ],
  // algebra
  "algebra:videos": [
    { day: "Day 1", title: "Algebra Videos", detail: "Linear equations and functions." },
    { day: "Day 2", title: "Worked Examples", detail: "Step-by-step solving strategies." },
    { day: "Day 3", title: "Targeted Practice", detail: "Problem sets aligned to gaps." },
    { day: "Day 4", title: "Adaptive Quiz", detail: "Difficulty adjusts as you improve." },
    { day: "Day 5", title: "Reflect & Plan", detail: "Next modules and goals." },
  ],
  "algebra:quiz": [
    { day: "Day 1", title: "Algebra Diagnostic", detail: "Pinpoint misconceptions." },
    { day: "Day 2", title: "Linear Drills", detail: "Practice with guided hints." },
    { day: "Day 3", title: "Video Reinforcement", detail: "Revisit confusing topics." },
    { day: "Day 4", title: "Challenge Quiz", detail: "Ratcheted difficulty for mastery." },
    { day: "Day 5", title: "Plan Ahead", detail: "Personalized goals." },
  ],
  "algebra:notes": [
    { day: "Day 1", title: "Core Identities", detail: "Key forms and when to use them." },
    { day: "Day 2", title: "Worked Problems", detail: "Annotated steps you can follow." },
    { day: "Day 3", title: "Recall & Spacing", detail: "Short spaced-rep sessions." },
    { day: "Day 4", title: "Quick Quiz", detail: "Confirm what stuck." },
    { day: "Day 5", title: "Cheat Sheet", detail: "Your algebra quick ref." },
  ],
  "algebra:live": [
    { day: "Day 1", title: "Live Algebra Session", detail: "Focus on linear systems." },
    { day: "Day 2", title: "Guided Hints", detail: "Break down tough problems." },
    { day: "Day 3", title: "Note Highlights", detail: "Capture what you learned." },
    { day: "Day 4", title: "Challenge Set", detail: "Push beyond comfort zone." },
    { day: "Day 5", title: "Next Steps", detail: "Plan future modules." },
  ],
  // geometry
  "geometry:videos": [
    { day: "Day 1", title: "Geometry Videos", detail: "Angles, triangles, and proofs." },
    { day: "Day 2", title: "Visual Proofs", detail: "See the logic step by step." },
    { day: "Day 3", title: "Apply Concepts", detail: "Relate shapes to real designs." },
    { day: "Day 4", title: "Adaptive Quiz", detail: "Targets misconceptions quickly." },
    { day: "Day 5", title: "Reflect & Plan", detail: "Next modules and goals." },
  ],
  "geometry:quiz": [
    { day: "Day 1", title: "Geometry Diagnostic", detail: "Where are the gaps?" },
    { day: "Day 2", title: "Angles & Proofs", detail: "Practice with scaffolds." },
    { day: "Day 3", title: "Visual Reinforcement", detail: "See it, then prove it." },
    { day: "Day 4", title: "Challenge Quiz", detail: "Proof fluency and speed." },
    { day: "Day 5", title: "Plan Ahead", detail: "Next topics for you." },
  ],
  "geometry:notes": [
    { day: "Day 1", title: "Shape Library", detail: "Theorems + when to apply." },
    { day: "Day 2", title: "Proof Patterns", detail: "Common forms to reuse." },
    { day: "Day 3", title: "Recall & Spacing", detail: "Short, daily refreshers." },
    { day: "Day 4", title: "Quick Quiz", detail: "Check what stuck." },
    { day: "Day 5", title: "Cheat Sheet", detail: "Your geometry quick ref." },
  ],
  "geometry:live": [
    { day: "Day 1", title: "Live Geometry Session", detail: "Angles + triangle congruence." },
    { day: "Day 2", title: "Guided Hints", detail: "Proof strategy practice." },
    { day: "Day 3", title: "Note Highlights", detail: "Capture key proofs." },
    { day: "Day 4", title: "Challenge Set", detail: "Apply in new contexts." },
    { day: "Day 5", title: "Next Steps", detail: "Plan future modules." },
  ],
}

const defaultPath: DayItem[] = [
  { day: "Day 1", title: "Algebra Practice", detail: "Foundational problem sets for linear equations." },
  { day: "Day 2", title: "Geometry Videos", detail: "Visual proofs and angle relationships." },
  { day: "Day 3", title: "Adaptive Quiz", detail: "Difficulty adjusts based on your responses." },
  { day: "Day 4", title: "Real-World Project", detail: "Apply math to a design-and-build challenge." },
  { day: "Day 5", title: "Review & Reflect", detail: "Targeted recap generated from your attempts." },
]

export default function PathTimeline({ multi = true }: { multi?: boolean }) {
  const [gap, setGap] = useState<Gap>("algebra")
  const [pref, setPref] = useState<Pref>("videos")

  // build up to 3 variations by shifting the array
  function makeVariants(items: DayItem[]): DayItem[][] {
    if (!multi) return [items]
    const v1 = items
    const v2 = [...items.slice(1), items[0]]
    const v3 = [...items.slice(2), ...items.slice(0, 2)]
    return [v1, v2, v3]
  }

  function generate(): DayItem[][] {
    const key = `${gap}:${pref}`
    const items = PATHS[key] ?? defaultPath
    return makeVariants(items)
  }

  const variants = generate()

  return (
    <section aria-label="Personalized Path" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-semibold text-balance">Personalized Path Generator</h2>
      <p className="mt-3 opacity-85 leading-relaxed max-w-2xl">
        Pick weak points and a learning style; explore multiple glowing path options. Click a step to see details.
      </p>

      {/* Controls */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <label className="flex flex-col text-sm">
          <span className="mb-1 opacity-85">Weak point</span>
          <select
            value={gap}
            onChange={(e) => setGap(e.target.value as Gap)}
            className="rounded-md bg-transparent border px-3 py-2"
            style={{ borderColor: "color-mix(in oklch, var(--brand-fg) 18%, transparent)" }}
            aria-label="Select your weak point"
          >
            <option value="none">General</option>
            <option value="algebra">Maths: Algebra</option>
            <option value="geometry">Maths: Geometry</option>
          </select>
        </label>

        <label className="flex flex-col text-sm md:col-span-2">
          <span className="mb-1 opacity-85">Learning preference</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { key: "videos", label: "Videos 🎥" },
              { key: "quiz", label: "Interactive Quizzes 🧩" },
              { key: "notes", label: "Notes 📖" },
              { key: "live", label: "Live Practice 🖥️" },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setPref(p.key as Pref)}
                className="rounded-md px-3 py-2 border text-sm transition-transform active:translate-y-[1px]"
                style={{
                  background: pref === p.key ? "color-mix(in oklch, var(--brand-fg) 6%, transparent)" : "transparent",
                  color: "var(--brand-fg)",
                  borderColor:
                    pref === p.key
                      ? "color-mix(in oklch, var(--brand-primary) 45%, transparent)"
                      : "color-mix(in oklch, var(--brand-fg) 18%, transparent)",
                  boxShadow:
                    pref === p.key ? "0 0 18px color-mix(in oklch, var(--brand-primary) 35%, transparent)" : "none",
                }}
                aria-pressed={pref === p.key}
              >
                {p.label}
              </button>
            ))}
          </div>
        </label>

        <div className="flex items-end">
          <button
            onClick={() => window.scrollBy({ top: 1, behavior: "smooth" })}
            className="w-full rounded-md px-4 py-2 font-medium border active:translate-y-[1px]"
            style={{
              background: "var(--brand-primary)",
              color: "var(--brand-fg)",
              borderColor: "color-mix(in oklch, var(--brand-fg) 22%, transparent)",
              boxShadow: "0 0 22px color-mix(in oklch, var(--brand-primary) 45%, transparent)",
            }}
            aria-label="Generate multiple path options"
            title="Generate multiple path options"
          >
            Generate Paths
          </button>
        </div>
      </div>

      {/* Multi-path grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {variants.map((items, colIdx) => (
          <ol
            key={colIdx}
            className="relative border-l pl-6 rounded-xl p-4"
            style={{
              borderColor: "color-mix(in oklch, var(--brand-fg) 20%, transparent)",
              background: "color-mix(in oklch, var(--brand-bg) 60%, transparent)",
              boxShadow: "0 0 26px color-mix(in oklch, var(--brand-accent-2) 16%, transparent)",
            }}
            aria-label={`Path option ${colIdx + 1}`}
          >
            {items.map((d, idx) => (
              <li key={`${d.day}-${idx}`} className="mb-6 group">
                <div
                  className="absolute -left-[7px] mt-1 size-3 rounded-full"
                  style={{
                    background: "var(--brand-primary)",
                    boxShadow: "0 0 14px color-mix(in oklch, var(--brand-primary) 50%, transparent)",
                  }}
                />
                <button
                  className="w-full text-left rounded-lg p-4 transition-transform duration-300 active:translate-y-[1px] border"
                  style={{
                    background: "color-mix(in oklch, var(--brand-bg) 60%, transparent)",
                    borderColor: "color-mix(in oklch, var(--brand-fg) 18%, transparent)",
                  }}
                  onClick={() => alert(`${d.title}\n\n${d.detail}`)}
                  aria-label={`${d.day} - ${d.title}`}
                >
                  <p className="text-xs opacity-85">{d.day}</p>
                  <h3 className="mt-1 text-lg font-medium">{d.title}</h3>
                  <p className="mt-1 text-sm opacity-85">{d.detail}</p>
                </button>
              </li>
            ))}
          </ol>
        ))}
      </div>
    </section>
  )
}
