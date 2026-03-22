import { ArrowRight, Trophy, X } from 'lucide-react'
import TierBadge from './TierBadge'
import Confetti from './Confetti'

export default function TierUpModal({ show, oldTier, newTier, onClose, onViewRewards }) {
  if (!show) return null

  const unlocks = newTier?.unlocks || []

  return (
    <>
      <Confetti show={true} />
      <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div
          className="bg-[#0A0E17] border border-[#D4A843]/40 rounded-2xl p-8 max-w-md w-full mx-4 text-center"
          style={{ animation: 'slide-in 0.5s ease-out' }}
        >
          <div className="flex justify-end">
            <button onClick={onClose} className="text-[#8899AA] hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <Trophy className="w-16 h-16 text-[#D4A843] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-6">Tier Upgrade!</h2>

          <div className="flex items-center justify-center gap-4 mb-6">
            <TierBadge tierName={oldTier} size="lg" />
            <ArrowRight className="w-6 h-6 text-[#D4A843]" />
            <TierBadge tierName={newTier?.name || ''} size="lg" />
          </div>

          <p className="text-[#8899AA] mb-4">You've unlocked new rewards!</p>

          <div className="space-y-2 mb-8">
            {unlocks.map((u, i) => (
              <div key={i} className="text-sm text-white bg-white/5 rounded-lg px-4 py-2">
                {u}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onViewRewards}
              className="flex-1 bg-[#D4A843] hover:bg-[#C49A3A] text-black font-bold py-3 px-6 rounded-xl"
            >
              View Rewards
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-white/20 text-white hover:bg-white/10 py-3 px-6 rounded-xl font-bold"
            >
              Keep Playing
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
