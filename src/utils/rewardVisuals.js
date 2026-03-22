import { TIERS } from '../data/tiers'

/** Tailwind classes for reward card top accent (tier differentiation). */
export function getRewardTierAccentBarClass(tierName) {
  const tier = TIERS.find(t => t.name === tierName) || TIERS[0]
  switch (tier.name) {
    case 'Fan':
      return 'bg-gradient-to-r from-white/40 via-white/15 to-transparent'
    case 'Matchday':
      return 'bg-gradient-to-r from-[#6CABDD] via-[#6CABDD]/50 to-[#1C2C5B]/40'
    case 'Blue Moon':
      return 'bg-gradient-to-r from-[#2B5BA0] via-[#6CABDD]/40 to-[#1C2C5B]/60'
    case 'Centurion':
      return 'bg-gradient-to-r from-[#D4A843] via-[#e6ff00]/40 to-[#D4A843]/30'
    case 'Treble':
      return 'bg-gradient-to-r from-[#D4A843] via-[#6CABDD]/50 to-[#D4A843]/40'
    case 'Legend':
      return 'bg-gradient-to-r from-[#D4A843] via-[#6CABDD] to-[#1C2C5B]'
    default:
      return 'bg-gradient-to-r from-white/20 to-transparent'
  }
}

/** Subtle card background tint per tier. */
export function getRewardTierCardTintClass(tierName) {
  const tier = TIERS.find(t => t.name === tierName) || TIERS[0]
  switch (tier.name) {
    case 'Fan':
      return 'bg-gradient-to-br from-white/[0.07] to-transparent'
    case 'Matchday':
      return 'bg-gradient-to-br from-[#6CABDD]/10 via-transparent to-[#1C2C5B]/20'
    case 'Blue Moon':
      return 'bg-gradient-to-br from-[#2B5BA0]/15 to-[#0A0E17]/80'
    case 'Centurion':
      return 'bg-gradient-to-br from-[#D4A843]/12 to-[#1C2C5B]/30'
    case 'Treble':
      return 'bg-gradient-to-br from-[#D4A843]/15 to-[#6CABDD]/10'
    case 'Legend':
      return 'bg-gradient-to-br from-[#D4A843]/12 via-[#6CABDD]/8 to-[#1C2C5B]/40'
    default:
      return ''
  }
}
