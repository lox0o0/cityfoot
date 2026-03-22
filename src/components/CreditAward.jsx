import { useEffect } from 'react'

const DISPLAY_MS = 2400

export default function CreditAward({ amount, show, onDone }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDone?.()
      }, DISPLAY_MS)
      return () => clearTimeout(timer)
    }
  }, [show, onDone])

  if (!show) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[120]">
      <div
        className="text-3xl md:text-4xl font-extrabold text-[#e6ff00] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
        style={{ animation: 'float-up 2s ease-out forwards' }}
      >
        +{amount} City Credits
      </div>
    </div>
  )
}
