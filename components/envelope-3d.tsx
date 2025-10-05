"use client"

import { useEffect, useState } from "react"

// Simple CSS envelope animation shown after success submit
export function Envelope3D({ trigger }: { trigger: boolean }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (trigger) {
      setShow(true)
      const t = setTimeout(() => setShow(false), 2600)
      return () => clearTimeout(t)
    }
  }, [trigger])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-56 h-40 [perspective:800px]">
        <div className="absolute inset-0 bg-white rounded shadow-2xl" />
        {/* Flap */}
        <div
          className="absolute inset-0 origin-top bg-[oklch(0.97_0_0)] rounded"
          style={{ transform: "rotateX(0deg)", animation: "openFlap 2.2s ease forwards" }}
        />
        {/* Letter */}
        <div
          className="absolute inset-3 bg-[oklch(0.98_0_0)] rounded shadow"
          style={{ transform: "translateY(50%)", animation: "raiseLetter 2s 0.4s ease forwards" }}
        >
          <p className="p-4 text-center text-sm">Message sent! We&apos;ll get back soon.</p>
        </div>
      </div>
      <style jsx>{`
        @keyframes openFlap {
          0% { transform: rotateX(0); }
          60% { transform: rotateX(-160deg); }
          100% { transform: rotateX(-160deg); }
        }
        @keyframes raiseLetter {
          0% { transform: translateY(50%); opacity: 0; }
          100% { transform: translateY(-30%); opacity: 1; }
        }
      `}</style>
    </div>
  )
}