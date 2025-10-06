// components/glow-button.tsx
import React from 'react'
import cn from '@/lib/utils' // your cn function

export default function GlowButton({ children, variant='primary', className='', ...props }: any) {
  const base = 'rounded-lg px-4 py-2 font-semibold transition-transform active:scale-[0.99] shadow-sm'
  const primary = 'bg-gradient-to-r from-[#00f0ff] to-[#8a6bff] text-black shadow-[0_6px_30px_rgba(0,240,255,0.08)]'
  const ghost = 'bg-transparent border border-[rgba(255,255,255,0.06)] text-inherit'

  return (
    <button {...props} className={cn(base, variant === 'primary' ? primary : ghost, className)}>
      {children}
    </button>
  )
}
