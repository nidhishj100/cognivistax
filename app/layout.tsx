// app/layout.tsx
import './globals.css'
import { AuthProvider } from './providers' // your existing provider
import ParallaxBackground from '@/components/parallax-background'
import { AnimatePresence, motion } from 'framer-motion'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ParallaxBackground />
          <AnimatePresence mode="wait">
            <motion.div
              key="app"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </AuthProvider>
      </body>
    </html>
  )
}
