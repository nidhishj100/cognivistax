// components/chatbot-widget.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import GlowButton from './glow-button'

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ from: 'user'|'bot'; text: string }[]>([])
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement|null>(null)

  useEffect(()=> bottomRef.current?.scrollIntoView({ behavior:'smooth' }), [messages, open])

  async function send() {
    if(!value.trim()) return
    const userMsg = value.trim()
    setMessages(m=>[...m, {from:'user', text: userMsg}])
    setValue('')
    setLoading(true)

    // ---------- Fake AI Response (replace with your API)
    await new Promise(res => setTimeout(res, 800))
    const reply = `Nice question! Here's a short tip: try breaking the problem into smaller steps. (This bot is a demo — plug your AI API here.)`
    setMessages(m=>[...m, {from:'bot', text: reply}])
    setLoading(false)
  }

  return (
    <>
      {open && (
        <motion.div initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} style={{
          position:'fixed', right:22, bottom:86, width:340, maxWidth:'90vw', zIndex:200
        }}>
          <div className="card" style={{display:'flex', flexDirection:'column', gap:8, height:420}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:36,height:36, borderRadius:10, background:'linear-gradient(90deg,#00f0ff,#8a6bff)'}} />
                <div>
                  <div style={{fontWeight:700}}>Cognibot</div>
                  <div className="text-muted" style={{fontSize:12}}>Ask me about your learning path</div>
                </div>
              </div>
              <button onClick={()=>setOpen(false)}>✕</button>
            </div>

            <div style={{flex:1, overflowY:'auto', padding:6, display:'flex', flexDirection:'column', gap:8}}>
              {messages.map((m,i)=>(
                <div key={i} style={{alignSelf:m.from==='user' ? 'flex-end' : 'flex-start', maxWidth:'85%'}}>
                  <div style={{
                    background: m.from==='user' ? 'linear-gradient(90deg,#00f0ff,#8a6bff)' : 'linear-gradient(180deg,#0f1114,#0b0d10)',
                    color: m.from==='user' ? '#000' : '#e6eef6',
                    padding:'8px 12px', borderRadius:10
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && <div className="text-muted">Typing…</div>}
              <div ref={bottomRef} />
            </div>

            <div style={{display:'flex', gap:8}}>
              <input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Ask about Math, progress, or resources" className="input-glow" style={{flex:1}} />
              <GlowButton onClick={send} disabled={loading}>Send</GlowButton>
            </div>
          </div>
        </motion.div>
      )}

      {/* floating toggle button */}
      <button onClick={()=>setOpen(o=>!o)} style={{
        position:'fixed', right:22, bottom:22, zIndex:200, width:56, height:56, borderRadius:14,
        background:'linear-gradient(90deg,#00f0ff,#8a6bff)', boxShadow:'0 14px 40px rgba(138,107,255,0.12)', border:'none'
      }}>
        🤖
      </button>
    </>
  )
}
