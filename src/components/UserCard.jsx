import TierBadge from './TierBadge'
import { getTierForCredits, getNextTier } from '../utils/credits'
import { TIERS } from '../data/tiers'

function getInitials(name) {
  const t = (name || '').trim()
  if (!t) return 'CF'
  const parts = t.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const HARDCODED_ACTIVITY = [
  'Played EA Sports FC 26',
  'Connected Instagram',
  'Claimed Digital Wallpaper',
  'Played Roblox — Blue Moon',
]

export default function UserCard({ userName, creditBalance, totalCreditsEarned }) {
  const tier = getTierForCredits(totalCreditsEarned)
  const tierMeta = TIERS.find(x => x.name === tier.name) || TIERS[0]
  const nextTier = getNextTier(totalCreditsEarned)

  return (
    <div className="fixed right-0 top-0 h-full w-[280px] bg-[#0A0E17]/60 backdrop-blur-xl border-l border-white/15 p-6 z-20 overflow-y-auto">
      <div className="flex flex-col items-center text-center mb-6 pt-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-3 text-lg font-extrabold text-white bg-gradient-to-br from-[#6CABDD]/35 to-[#1C2C5B]/90"
          style={{
            boxShadow: `0 0 0 3px ${tierMeta.color}, 0 0 24px ${tierMeta.color}40`,
          }}
        >
          {getInitials(userName || 'City Fan')}
        </div>
        <h3 className="text-lg font-bold text-white">{userName || 'City Fan'}</h3>
        <div className="mt-2">
          <TierBadge tierName={tier.name} />
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 mb-6">
        <p className="text-[#8899AA] text-xs uppercase tracking-wider mb-1">City Credits</p>
        <p className="text-2xl font-bold bg-gradient-to-r from-[#6CABDD] to-[#D4A843] bg-clip-text text-transparent">
          {creditBalance.toLocaleString()}
        </p>
      </div>

      {/* Tier Rewards Summary */}
      {nextTier && (
        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <p className="text-[#8899AA] text-xs uppercase tracking-wider mb-2">Next Tier</p>
          <p className="text-sm font-bold text-white mb-1">{nextTier.name}</p>
          <p className="text-xs text-[#8899AA] mb-2">{nextTier.threshold - totalCreditsEarned} credits to go</p>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (totalCreditsEarned / nextTier.threshold) * 100)}%`,
                backgroundColor: nextTier.color,
              }}
            />
          </div>
        </div>
      )}

      <div>
        <p className="text-[#8899AA] text-xs uppercase tracking-wider mb-3">Recent Activity</p>
        <div className="space-y-2">
          {HARDCODED_ACTIVITY.map((item, i) => (
            <div key={i} className="text-sm text-white/70 bg-white/5 rounded-lg px-3 py-2">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
