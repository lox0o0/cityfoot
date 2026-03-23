import { useState } from 'react'
import { Gift, Lock, Check, X, Image, Shirt, Tag, Pen, Ticket, MapPin, Users, Wine, Trophy } from 'lucide-react'
import { REWARDS } from '../data/rewards'
import GlassCard from '../components/GlassCard'
import TierBadge from '../components/TierBadge'
import Confetti from '../components/Confetti'
import { isTierUnlocked } from '../utils/credits'
import { getRewardTierAccentBarClass, getRewardTierCardTintClass } from '../utils/rewardVisuals'

const ICON_MAP = {
  Image, Shirt, Tag, Pen, Ticket, MapPin, Users, Wine, Trophy,
}

const CATEGORIES = ['All', 'Experiences', 'Merch', 'Digital', 'Partner Offers']

export default function RewardsStoreScreen({
  creditBalance,
  setCreditBalance,
  totalCreditsEarned,
  claimedRewards,
  setClaimedRewards,
}) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [confirmReward, setConfirmReward] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const filtered = activeCategory === 'All'
    ? REWARDS
    : REWARDS.filter(r => r.category === activeCategory)

  function handleClaim(reward) {
    setConfirmReward(reward)
  }

  function confirmClaim() {
    if (!confirmReward) return
    setCreditBalance(b => b - confirmReward.cost)
    setClaimedRewards(c => [...c, confirmReward.id])
    setConfirmReward(null)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 4000)
  }

  return (
    <div className="relative min-h-screen" style={{ animation: 'slide-in 0.4s ease-out' }}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/leaderboard/backgrounds/crowd.jpeg')" }} />
      <div className="absolute inset-0 bg-[#0A0E17]/85" />
      <div className="relative z-10 p-6 space-y-6">
      <Confetti show={showConfetti} onDone={() => setShowConfetti(false)} />

      {/* Confirmation Modal */}
      {confirmReward && (
        <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0A0E17] border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 text-center relative">
            <button
              onClick={() => setConfirmReward(null)}
              className="absolute top-4 right-4 text-[#8899AA] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            {(() => {
              const ConfirmIcon = ICON_MAP[confirmReward.iconName] || Gift
              return <ConfirmIcon className="w-12 h-12 text-[#6CABDD] mx-auto mb-4" />
            })()}
            <h3 className="text-xl font-bold text-white mb-2">Claim Reward?</h3>
            <p className="text-[#8899AA] text-sm mb-2">{confirmReward.name}</p>
            <p className="text-[#D4A843] font-bold text-lg mb-6">{confirmReward.cost} City Credits</p>
            <div className="flex gap-3">
              <button
                onClick={confirmClaim}
                className="flex-1 bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-3 px-6 rounded-xl transition-all hover:scale-[1.02]"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmReward(null)}
                className="flex-1 border border-white/20 text-white hover:bg-white/10 py-3 px-6 rounded-xl font-bold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Gift className="w-6 h-6 text-[#D4A843]" />
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white">REWARDS STORE</h1>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-xl px-5 py-2">
          <span className="text-[#8899AA] text-xs">Balance</span>
          <p className="text-xl font-bold bg-gradient-to-r from-[#6CABDD] to-[#D4A843] bg-clip-text text-transparent">
            {creditBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-[#6CABDD] text-white'
                : 'bg-white/5 text-[#8899AA] hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(reward => {
          const unlocked = isTierUnlocked(reward, totalCreditsEarned)
          const claimed = claimedRewards.includes(reward.id)
          const affordable = creditBalance >= reward.cost
          const RewardIcon = ICON_MAP[reward.iconName] || Gift

          return (
            <GlassCard
              key={reward.id}
              className={`flex flex-col transition-all duration-300 !p-0 overflow-hidden ${!unlocked ? 'opacity-60' : 'hover:bg-white/10 hover:translate-y-[-2px]'}`}
            >
              <div className={`h-1.5 w-full shrink-0 ${getRewardTierAccentBarClass(reward.tierRequired)}`} />
              <div className={`p-6 flex flex-col flex-1 ${getRewardTierCardTintClass(reward.tierRequired)}`}>
              <RewardIcon className="w-8 h-8 text-[#6CABDD] mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">{reward.name}</h3>
              <p className="text-sm text-[#8899AA] mb-3 flex-1">{reward.description}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-[#D4A843] font-bold">{reward.cost.toLocaleString()} credits</span>
                <TierBadge tierName={reward.tierRequired} />
              </div>

              {claimed ? (
                <div className="flex items-center justify-center gap-2 bg-[#22C55E]/10 text-[#22C55E] font-bold py-3 px-6 rounded-xl">
                  <Check className="w-5 h-5" /> Claimed
                </div>
              ) : !unlocked ? (
                <div className="flex items-center justify-center gap-2 bg-white/5 text-[#8899AA] font-bold py-3 px-6 rounded-xl cursor-not-allowed">
                  <Lock className="w-4 h-4" /> Reach {reward.tierRequired} to unlock
                </div>
              ) : (
                <button
                  onClick={() => handleClaim(reward)}
                  disabled={!affordable}
                  className={`font-bold py-3 px-6 rounded-xl transition-all ${
                    affordable
                      ? 'bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] hover:scale-[1.02]'
                      : 'bg-white/5 text-[#8899AA] cursor-not-allowed'
                  }`}
                >
                  {affordable ? 'Redeem' : 'Not enough credits'}
                </button>
              )}
              </div>
            </GlassCard>
          )
        })}
      </div>
      </div>
    </div>
  )
}
