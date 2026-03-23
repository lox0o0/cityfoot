import TierBadge from './TierBadge'
import { getTierForCredits } from '../utils/credits'
import { TIERS } from '../data/tiers'

function getInitials(name) {
  const t = (name || '').trim()
  if (!t) return 'CF'
  const parts = t.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function UserCard({ userName, creditBalance, totalCreditsEarned, gamesPlayed, streakWeeks }) {
  const tier = getTierForCredits(totalCreditsEarned)
  const tierMeta = TIERS.find(x => x.name === tier.name) || TIERS[0]

  const recentActivity = [
    gamesPlayed.length > 0 ? `Played ${gamesPlayed[gamesPlayed.length - 1]?.name || gamesPlayed[gamesPlayed.length - 1]}` : 'No games yet',
    `${streakWeeks} week streak`,
    `${creditBalance} credits available`,
  ]

  return (
    <div className="fixed right-0 top-0 h-full w-[280px] bg-white/5 backdrop-blur-xl border-l border-white/15 p-6 z-20 overflow-y-auto">
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

      <div>
        <p className="text-[#8899AA] text-xs uppercase tracking-wider mb-3">Recent Activity</p>
        <div className="space-y-2">
          {recentActivity.map((item, i) => (
            <div key={i} className="text-sm text-white/70 bg-white/5 rounded-lg px-3 py-2">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
