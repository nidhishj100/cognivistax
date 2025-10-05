"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../lib/utils" // Fixed path

const links = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login/Signup" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/core", label: "Core Identities" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
]

// FIX: Changed to 'export default function'
export default function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 bg-background/70 backdrop-blur border-b">
      <nav className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div aria-hidden className="size-8 rounded-md bg-primary shadow-[0_0_20px_theme(colors.primary/60%)]" />
            <span className="font-semibold tracking-wide">CognivistaX</span>
          </Link>
          <ul className="flex items-center gap-4 md:gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn("text-sm hover:text-primary transition-colors", pathname === l.href && "text-primary")}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
