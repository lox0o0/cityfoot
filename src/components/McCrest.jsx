/**
 * Man City crest — bundled PNG first (reliable in dev/deploy), then public fallbacks.
 */
import { useState } from 'react'
import mcfcBadge from '../assets/mcfc-badge.png'

const CREST_SOURCES = [
  mcfcBadge,
  '/assets/shared/logos/Manchester_City_FC_badge.svg.png',
  '/assets/shared/logos/man-city-crest.svg',
]

export default function McCrest({ className = 'w-10 h-10', alt = 'Manchester City' }) {
  const [srcIndex, setSrcIndex] = useState(0)

  if (srcIndex >= CREST_SOURCES.length) {
    return (
      <div
        className={`rounded-lg bg-gradient-to-br from-[#6CABDD]/40 to-[#1C2C5B]/80 border border-[#6CABDD]/50 ${className}`}
        aria-hidden
      />
    )
  }

  return (
    <img
      src={CREST_SOURCES[srcIndex]}
      alt={alt}
      width={256}
      height={256}
      loading="eager"
      decoding="async"
      className={`object-contain object-center select-none drop-shadow-[0_4px_20px_rgba(255,255,255,0.35)] ${className}`}
      draggable={false}
      onError={() => setSrcIndex(i => i + 1)}
    />
  )
}
