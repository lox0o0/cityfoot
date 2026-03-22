import { useEffect, useMemo } from 'react'

const COLORS = ['#6CABDD', '#D4A843', '#FFFFFF', '#2B5BA0', '#22C55E', '#e6ff00']

function ConfettiPiece({ left, delay, duration, size, round, color }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: '-24px',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: round ? '50%' : '3px',
        animation: `confetti-fall ${duration}s linear ${delay}s forwards`,
        opacity: 0.95,
        willChange: 'transform, opacity',
      }}
    />
  )
}

export default function Confetti({ show, onDone }) {
  const pieces = useMemo(() => {
    if (!show) return []
    return Array.from({ length: 72 }, (_, i) => ({
      id: i,
      left: ((i * 37) % 100) + (i % 7) * 0.5,
      delay: (i % 12) * 0.08,
      duration: 2.1 + (i % 5) * 0.35,
      size: 5 + (i % 8),
      round: i % 3 === 0,
      color: COLORS[i % COLORS.length],
    }))
  }, [show])

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDone?.()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [show, onDone])

  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {pieces.map(({ id, ...p }) => (
        <ConfettiPiece key={id} {...p} />
      ))}
    </div>
  )
}
