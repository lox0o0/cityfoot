import { getTierForCredits } from '../utils/credits'
import { TIERS } from '../data/tiers'

export default function TierBadge({ tierName, size = 'sm' }) {
  const tier = TIERS.find(t => t.name === tierName) || TIERS[0]
  const sizeClasses = size === 'lg' ? 'px-4 py-1.5 text-sm' : 'px-3 py-1 text-xs'

  return (
    <span className={`${tier.bgClass} ${sizeClasses} rounded-full font-bold uppercase inline-block`}>
      {tier.name}
    </span>
  )
}
