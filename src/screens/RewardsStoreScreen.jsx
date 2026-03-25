import { useState, useEffect } from 'react'
import { Gift, Lock, Check, X, Image, Shirt, Tag, Pen, Ticket, MapPin, Users, Wine, Trophy, Clock, Flame, Package, ChevronRight, Sparkles } from 'lucide-react'
import { REWARDS, LIMITED_DROPS, VAULT_ITEMS, MYSTERY_BOX, SPIN_WHEEL_PRIZES } from '../data/rewards'
import GlassCard from '../components/GlassCard'
import TierBadge from '../components/TierBadge'
import Confetti from '../components/Confetti'
import { isTierUnlocked } from '../utils/credits'

const ICON_MAP = {
  Image, Shirt, Tag, Pen, Ticket, MapPin, Users, Wine, Trophy,
}

const CATEGORIES = ['All', 'Experiences', 'Merch', 'Digital', 'Partner Offers']

const RARITY_STYLES = {
  common: {
    border: 'border-white/15',
    glow: '',
    label: '',
    labelBg: '',
  },
  rare: {
    border: 'border-[#6CABDD]/40',
    glow: 'animate-[rare-pulse_3s_ease-in-out_infinite]',
    label: 'RARE',
    labelBg: 'bg-[#6CABDD] text-white',
  },
  legendary: {
    border: 'border-[#D4A843]/50',
    glow: 'animate-[legendary-shimmer_4s_ease-in-out_infinite]',
    label: 'LEGENDARY',
    labelBg: 'bg-[#D4A843] text-black',
  },
}

const ACTIVITY_TICKER = [
  'BlueMoonRising just claimed Signed Jersey',
  'CityTilIDie redeemed Matchday Tickets',
  'HaalandFan9 opened a Mystery Kit Bag',
  'SkyBlue_MCR won 100 Credits on the wheel',
  'FodenIsKing claimed Stadium Tour',
  'MancMessi just claimed Emote Pack',
]

function CountdownTimer({ hoursLeft }) {
  const [timeLeft, setTimeLeft] = useState(hoursLeft * 3600)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(timer)
  }, [])

  const h = Math.floor(timeLeft / 3600)
  const m = Math.floor((timeLeft % 3600) / 60)
  const s = timeLeft % 60

  return (
    <div className="flex items-center gap-1.5 text-[#e6ff00]">
      <Clock className="w-3.5 h-3.5" />
      <span className="text-xs font-bold font-mono">
        {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
      </span>
    </div>
  )
}

function ActivityTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % ACTIVITY_TICKER.length), 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 overflow-hidden">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
        <p
          key={index}
          className="text-sm text-[#8899AA] truncate"
          style={{ animation: 'slide-in 0.4s ease-out' }}
        >
          {ACTIVITY_TICKER[index]}
        </p>
      </div>
    </div>
  )
}

function SpinWheel({ creditBalance, setCreditBalance, onSpin }) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [hasSpun, setHasSpun] = useState(false)

  function handleSpin() {
    if (spinning || hasSpun) return
    setSpinning(true)
    setResult(null)
    const prizeIndex = Math.floor(Math.random() * SPIN_WHEEL_PRIZES.length)
    const segmentAngle = 360 / SPIN_WHEEL_PRIZES.length
    const targetAngle = 360 * 5 + (360 - prizeIndex * segmentAngle - segmentAngle / 2)
    setRotation(targetAngle)

    setTimeout(() => {
      setSpinning(false)
      setResult(SPIN_WHEEL_PRIZES[prizeIndex])
      setHasSpun(true)
      const creditsMatch = SPIN_WHEEL_PRIZES[prizeIndex].name.match(/(\d+) Credits/)
      if (creditsMatch) {
        setCreditBalance(b => b + parseInt(creditsMatch[1]))
      }
    }, 4000)
  }

  return (
    <GlassCard className="!border-[#D4A843]/30 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#D4A843]" />
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Daily Spin</h3>
      </div>

      {/* Wheel visual */}
      <div className="relative w-48 h-48 mx-auto mb-4">
        <div
          className="w-full h-full rounded-full border-4 border-[#D4A843]/50 overflow-hidden relative"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
          }}
        >
          {SPIN_WHEEL_PRIZES.map((prize, i) => {
            const angle = (360 / SPIN_WHEEL_PRIZES.length) * i
            return (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${angle}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.tan(Math.PI / SPIN_WHEEL_PRIZES.length)}% 0%)`,
                }}
              >
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: prize.color }}
                />
              </div>
            )
          })}
        </div>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[16px] border-t-[#e6ff00] z-10" />
      </div>

      {result && (
        <div className="mb-3" style={{ animation: 'slide-in 0.4s ease-out' }}>
          <p className="text-[#e6ff00] font-bold text-lg">{result.name}</p>
          <p className="text-[#8899AA] text-xs">Added to your account</p>
        </div>
      )}

      <button
        onClick={handleSpin}
        disabled={spinning || hasSpun}
        className={`font-bold py-3 px-8 rounded-xl text-sm transition-all w-full ${
          hasSpun
            ? 'bg-white/5 text-[#8899AA] cursor-not-allowed'
            : 'bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] hover:scale-[1.02]'
        }`}
      >
        {spinning ? 'Spinning...' : hasSpun ? 'Come back tomorrow' : 'Spin Free'}
      </button>
    </GlassCard>
  )
}

function MysteryBox({ creditBalance, setCreditBalance }) {
  const [opening, setOpening] = useState(false)
  const [revealed, setRevealed] = useState(null)

  function handleOpen() {
    if (opening || creditBalance < MYSTERY_BOX.cost) return
    setOpening(true)
    setCreditBalance(b => b - MYSTERY_BOX.cost)

    setTimeout(() => {
      const rand = Math.random() * 100
      let cumulative = 0
      let prize = MYSTERY_BOX.possibleRewards[0]
      for (const r of MYSTERY_BOX.possibleRewards) {
        cumulative += parseFloat(r.chance)
        if (rand <= cumulative) {
          prize = r
          break
        }
      }
      setRevealed(prize)
      setOpening(false)
    }, 2500)
  }

  const rarityColors = {
    common: 'border-white/30 text-white',
    rare: 'border-[#6CABDD] text-[#6CABDD]',
    legendary: 'border-[#D4A843] text-[#D4A843]',
  }

  return (
    <GlassCard className="!border-[#6CABDD]/30 text-center">
      <Package className="w-10 h-10 text-[#6CABDD] mx-auto mb-3" />
      <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">Mystery Kit Bag</h3>
      <p className="text-[#8899AA] text-xs mb-4">Open for a random reward — Common, Rare, or Legendary</p>

      {revealed ? (
        <div
          className={`border-2 rounded-xl p-4 mb-3 ${rarityColors[revealed.rarity]}`}
          style={{ animation: 'count-pop 0.5s ease-out' }}
        >
          <p className="font-bold text-lg">{revealed.name}</p>
          <p className="text-xs uppercase tracking-wider opacity-70">{revealed.rarity}</p>
        </div>
      ) : opening ? (
        <div className="py-6">
          <div className="w-12 h-12 mx-auto border-4 border-[#6CABDD] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#8899AA] text-sm mt-3">Opening...</p>
        </div>
      ) : (
        <div className="space-y-2 mb-4">
          {MYSTERY_BOX.possibleRewards.map((r, i) => (
            <div key={i} className="flex items-center justify-between text-xs px-2">
              <span className="text-white/70">{r.name}</span>
              <span className={`font-bold ${r.rarity === 'legendary' ? 'text-[#D4A843]' : r.rarity === 'rare' ? 'text-[#6CABDD]' : 'text-white/50'}`}>
                {r.chance}
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleOpen}
        disabled={opening || creditBalance < MYSTERY_BOX.cost}
        className={`font-bold py-3 px-8 rounded-xl text-sm transition-all w-full ${
          creditBalance < MYSTERY_BOX.cost
            ? 'bg-white/5 text-[#8899AA] cursor-not-allowed'
            : 'bg-[#6CABDD] hover:bg-[#5B9ACC] text-white hover:scale-[1.02]'
        }`}
      >
        {opening ? 'Opening...' : `Open — ${MYSTERY_BOX.cost} credits`}
      </button>
    </GlassCard>
  )
}

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
  const [activeTab, setActiveTab] = useState('store')

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
      <div className="absolute inset-0 bg-[#0A0E17]/88" />
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

      {/* Live Activity Ticker */}
      <ActivityTicker />

      {/* Store Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-0">
        {[
          { id: 'store', label: 'Store' },
          { id: 'drops', label: 'Kit Room Drops' },
          { id: 'gamify', label: 'Daily Rewards' },
          { id: 'vault', label: 'Vault' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'text-[#e6ff00] border-[#e6ff00]'
                : 'text-[#8899AA] border-transparent hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* === STORE TAB === */}
      {activeTab === 'store' && (
        <>
          {/* Category Filters */}
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

          {/* Rewards Grid with Rarity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(reward => {
              const unlocked = isTierUnlocked(reward, totalCreditsEarned)
              const claimed = claimedRewards.includes(reward.id)
              const affordable = creditBalance >= reward.cost
              const RewardIcon = ICON_MAP[reward.iconName] || Gift
              const rarity = RARITY_STYLES[reward.rarity] || RARITY_STYLES.common

              return (
                <div
                  key={reward.id}
                  className={`bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${rarity.border} ${rarity.glow} ${
                    !unlocked ? 'opacity-50 grayscale-[30%]' : 'hover:bg-white/10 hover:translate-y-[-2px]'
                  }`}
                >
                  {/* Rarity Label */}
                  {rarity.label && (
                    <div className="flex justify-end px-4 pt-3">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${rarity.labelBg}`}>
                        {rarity.label}
                      </span>
                    </div>
                  )}

                  <div className="p-6 pt-3 flex flex-col flex-1">
                    <RewardIcon className="w-8 h-8 text-[#6CABDD] mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-1">{reward.name}</h3>
                    <p className="text-sm text-[#8899AA] mb-3 flex-1">{reward.description}</p>

                    {/* Social proof */}
                    <p className="text-xs text-[#8899AA] mb-2">
                      {reward.claimedCount.toLocaleString()} fans claimed this
                    </p>

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
                        <Lock className="w-4 h-4" /> Reach {reward.tierRequired}
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
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* === KIT ROOM DROPS TAB === */}
      {activeTab === 'drops' && (
        <>
          <div className="bg-gradient-to-r from-[#D4A843]/10 to-[#6CABDD]/10 border border-[#D4A843]/30 rounded-2xl p-6 mb-2">
            <h2 className="text-xl font-bold text-[#D4A843] uppercase tracking-wider mb-2">Limited Edition Drops</h2>
            <p className="text-[#8899AA] text-sm">One-time items tied to real match moments. Once they're gone, they're gone.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LIMITED_DROPS.map(drop => {
              const unlocked = isTierUnlocked(drop, totalCreditsEarned)
              const remaining = drop.totalStock - drop.claimed
              const DropIcon = ICON_MAP[drop.iconName] || Gift
              const rarity = RARITY_STYLES[drop.rarity] || RARITY_STYLES.common

              return (
                <div
                  key={drop.id}
                  className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-6 flex flex-col ${rarity.border} ${rarity.glow} ${
                    !unlocked ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <CountdownTimer hoursLeft={drop.endsInHours} />
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${rarity.labelBg}`}>
                      {rarity.label || 'DROP'}
                    </span>
                  </div>

                  <DropIcon className="w-8 h-8 text-[#D4A843] mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-1">{drop.name}</h3>
                  <p className="text-sm text-[#8899AA] mb-4 flex-1">{drop.description}</p>

                  {/* Stock indicator */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#e6ff00] font-bold">{remaining} / {drop.totalStock} remaining</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#e6ff00] rounded-full"
                        style={{ width: `${(remaining / drop.totalStock) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#D4A843] font-bold">{drop.cost.toLocaleString()} credits</span>
                    <TierBadge tierName={drop.tierRequired} />
                  </div>

                  <button
                    onClick={() => handleClaim(drop)}
                    disabled={!unlocked || creditBalance < drop.cost}
                    className={`font-bold py-3 px-6 rounded-xl transition-all w-full ${
                      unlocked && creditBalance >= drop.cost
                        ? 'bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] hover:scale-[1.02]'
                        : 'bg-white/5 text-[#8899AA] cursor-not-allowed'
                    }`}
                  >
                    {!unlocked ? `Reach ${drop.tierRequired}` : creditBalance < drop.cost ? 'Not enough credits' : 'Claim Now'}
                  </button>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* === DAILY REWARDS TAB (Spin + Mystery Box) === */}
      {activeTab === 'gamify' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpinWheel creditBalance={creditBalance} setCreditBalance={setCreditBalance} />
          <MysteryBox creditBalance={creditBalance} setCreditBalance={setCreditBalance} />
        </div>
      )}

      {/* === VAULT TAB === */}
      {activeTab === 'vault' && (
        <>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-2">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-2">The Vault</h2>
            <p className="text-[#8899AA] text-sm">Past drops that are no longer available. Don't miss the next one.</p>
          </div>

          <div className="space-y-3">
            {VAULT_ITEMS.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-4 flex items-center gap-4 opacity-60"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#8899AA]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{item.name}</p>
                  <p className="text-xs text-[#8899AA]">{item.date} — {item.claimed}/{item.total} claimed</p>
                </div>
                <span className="text-xs font-bold text-[#8899AA] uppercase">Sold Out</span>
              </div>
            ))}
          </div>

          <div className="text-center py-8">
            <p className="text-[#8899AA] text-sm mb-4">Want to never miss a drop?</p>
            <button className="bg-[#6CABDD] hover:bg-[#5B9ACC] text-white font-bold py-3 px-8 rounded-xl text-sm transition-all hover:scale-[1.02]">
              Enable Drop Notifications
            </button>
          </div>
        </>
      )}
      </div>
    </div>
  )
}
