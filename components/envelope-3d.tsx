// components/envelope-3d.tsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function Envelope3D({ trigger=false }: { trigger?: boolean }) {
  const variants = {
    closed: { rotateX: 0, y: 0 },
    open: { rotateX: -65, y: -12 }
  }

  return (
    <div style={{ display:'flex', justifyContent:'center', marginTop:22 }}>
      <motion.div
        initial="closed"
        animate={trigger ? 'open' : 'closed'}
        variants={variants}
        transition={{ type:'spring', stiffness:80, damping:12 }}
        style={{ width:160, height:110, perspective:400 }}
      >
        {/* base envelope */}
        <div style={{ position:'relative', width:'100%', height:'100%' }}>
          <div style={{ position:'absolute', inset:0, background:'#0f1114', border:'1px solid rgba(255,255,255,0.05)', borderRadius:8 }} />
          {/* flap */}
          <motion.div style={{
            position:'absolute', width:'100%', height:'60%', top:0, left:0, transformOrigin:'center bottom', borderRadius:8, background: 'linear-gradient(180deg,#1b1d21,#0f1114)'
          }} />
          {/* letter peek */}
          <div style={{ position:'absolute', left:10, right:10, bottom:10, height:60, borderRadius:6, background:'linear-gradient(180deg,#fff,#f3f6ff)' }} />
        </div>
      </motion.div>
    </div>
  )
}
