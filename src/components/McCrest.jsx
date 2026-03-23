/**
 * Man City crest — prefers the badge PNG in public; falls back to SVG.
 */
import { useState } from 'react'

const CREST_SOURCES = [
  '/assets/shared/logos/Manchester_City_FC_badge.svg.png',
  '/assets/shared/logos/man-city-crest.svg',
]

export default function McCrest({ className = 'w-10 h-10', alt = 'Manchester City' }) {
  const [srcIndex, setSrcIndex] = useState(0)

  if (srcIndex >= CREST_SOURCES.length) {
    return (
      <div
        className={`rounded-full bg-gradient-to-br from-[#6CABDD]/40 to-[#1C2C5B]/80 border border-[#6CABDD]/50 ${className}`}
        aria-hidden
      />
    )
  }

  return (
    <img
      src={CREST_SOURCES[srcIndex]}
      alt={alt}
      className={`object-contain select-none drop-shadow-[0_4px_20px_rgba(255,255,255,0.35)] ${className}`}
      draggable={false}
      onError={() => setSrcIndex(i => i + 1)}
    />
  )
}
