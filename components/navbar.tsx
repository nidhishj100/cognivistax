"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "how", label: "How It Works" },
  { id: "demo", label: "Demo" },
  { id: "impact", label: "Impact" },
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact" },
]

export default function Navbar() {
  const [active, setActive] = useState("home")

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id)
          }
        }
      },
      { root: null, rootMargin: "0px 0px -70% 0px", threshold: 0.1 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--brand-bg)]/70 backdrop-blur">
      <nav className="container mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
        <button
          onClick={() => handleScroll("home")}
          className="flex items-center gap-2 group"
          aria-label="cognivista - Home"
        >
          <Image
            src="/images/cognivista-logo.jpg"
            alt="cognivista logo"
            width={28}
            height={28}
            className="rounded-sm"
          />
          <span className="font-semibold tracking-wide">cognivista</span>
        </button>

        <ul className="hidden md:flex items-center gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleScroll(item.id)}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  active === item.id
                    ? "text-[var(--brand-fg)] bg-[var(--brand-primary)]/20"
                    : "text-[var(--brand-fg)]/80 hover:text-[var(--brand-fg)]"
                }`}
                aria-current={active === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
