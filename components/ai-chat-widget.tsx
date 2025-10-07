"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Msg = { role: "user" | "assistant"; text: string }

const FAQ = ["What is Cognivista?", "How does AI decide paths?", "Can this work for all subjects?"]

export default function AIChatWidget() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "Hi! I’m your AI guide. Ask me about your learning path." },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function send(message: string) {
    if (!message.trim() || loading) return
    const next = [...msgs, { role: "user", text: message }]
    setMsgs(next)
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })
      const data = await res.json()
      setMsgs((m) => [...m, { role: "assistant", text: data.text || "…" }])
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: "Sorry, I couldn’t process that." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        aria-label="Open AI Assistant"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 size-12 rounded-full border active:translate-y-[1px]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, var(--brand-primary), color-mix(in oklch, var(--brand-primary) 30%, transparent))",
          borderColor: "color-mix(in oklch, var(--brand-fg) 20%, transparent)",
          boxShadow: "0 0 30px color-mix(in oklch, var(--brand-primary) 50%, transparent)",
        }}
      >
        <span className="sr-only">AI Assistant</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="AI Assistant"
          className="fixed bottom-24 right-6 w-[min(92vw,380px)] rounded-xl border overflow-hidden"
          style={{
            background: "color-mix(in oklch, var(--brand-bg) 65%, transparent)",
            borderColor: "color-mix(in oklch, var(--brand-fg) 16%, transparent)",
            boxShadow: "0 0 34px color-mix(in oklch, var(--brand-accent-2) 20%, transparent)",
          }}
        >
          <div
            className="p-3 border-b"
            style={{ borderColor: "color-mix(in oklch, var(--brand-fg) 14%, transparent)" }}
          >
            <p className="text-sm font-medium">AI Assistant</p>
            <p className="text-xs opacity-80">Ask about Cognivista</p>
          </div>
          <div className="p-3 h-56 overflow-auto space-y-2">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className="inline-block rounded-md px-3 py-2 text-sm"
                  style={{
                    background:
                      m.role === "user"
                        ? "color-mix(in oklch, var(--brand-accent-1) 25%, transparent)"
                        : "color-mix(in oklch, var(--brand-fg) 6%, transparent)",
                  }}
                >
                  {m.text}
                </span>
              </div>
            ))}
            {loading && <div className="text-xs opacity-70">Thinking…</div>}
          </div>

          <div className="px-3 pb-2 flex flex-wrap gap-2">
            {FAQ.map((q) => (
              <Button
                key={q}
                size="sm"
                variant="secondary"
                onClick={() => send(q)}
                style={{ background: "color-mix(in oklch, var(--brand-fg) 8%, transparent)", color: "var(--brand-fg)" }}
              >
                {q}
              </Button>
            ))}
          </div>

          <form
            className="p-3 border-t flex items-center gap-2"
            style={{ borderColor: "color-mix(in oklch, var(--brand-fg) 14%, transparent)" }}
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <input
              aria-label="Your message"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-md px-3 py-2 bg-transparent border text-sm"
              style={{ borderColor: "color-mix(in oklch, var(--brand-fg) 18%, transparent)", color: "var(--brand-fg)" }}
            />
            <Button
              type="submit"
              size="sm"
              disabled={loading}
              style={{ background: "var(--brand-accent-1)", color: "var(--brand-fg)" }}
            >
              Send
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
