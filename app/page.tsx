"use client"

import Link from "next/link"
// FIX: Using default imports (NO curly braces) for all custom components
import SiteHeader from "@/components/site-header"
import GlowButton from "@/components/glow-button"
import FloatingMobots from "@/components/floating-mobots" 
import ParallaxBackground from "@/components/parallax-background" 


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      
      {/* Visual Effects Layer (Parallax and Floating Mobots) */}
      <ParallaxBackground /> 
      <FloatingMobots /> 
      
      {/* Main Content Container */}
      <section className="relative z-10 flex h-[calc(100vh-56px)] flex-col items-center justify-center text-center px-4 md:px-6">
        
        {/* Catchy Quote */}
        <p className="text-sm md:text-xl text-primary font-light mb-4">
          — SIH 2025 —
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Every learner is unique. 
          <br className="hidden sm:inline" />
          Every path is different.
        </h1>
        
        {/* Project Description */}
        <p className="max-w-3xl text-lg text-muted-foreground mb-10">
          CognivistaX is your **AI-powered personalized learning path generator**. Explore strengths, address weaknesses, and progress confidently with a tailor-made roadmap.
        </p>
        
        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link href="/login">
            <GlowButton variant="primary" className="!bg-primary/90 text-white shadow-lg">
              Get Started
            </GlowButton>
          </Link>
          <Link href="/resources">
            <GlowButton variant="ghost" className="border border-border/50 hover:bg-accent">
              Browse Resources
            </GlowButton>
          </Link>
        </div>
        
        {/* Floating AI Graphic Placeholder */}
        <div className="absolute right-10 top-1/4 hidden lg:block opacity-60">
            <div className="w-64 h-64 bg-cyan-500/10 rounded-full animate-pulse blur-3xl" />
        </div>

      </section>
      
      {/* Dummy Styles (Needed until full Tailwind config is pasted) */}
      <style jsx global>{`
        /* Minimal styles for placeholder elements to avoid render errors */
        .bg-card { background-color: oklch(0.15 0 0); }
        .bg-background { background-color: #0d0d10; }
        .text-foreground { color: #f0f0f0; }
        .text-primary { color: #00ffff; }
        .text-muted-foreground { color: #888899; }
        .border { border-color: #222; }
      `}</style>
    </main>
  )
}
