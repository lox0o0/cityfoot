import { useState, useEffect, useRef } from 'react'
import {
  Gift, Lock, Check, X, Image, Shirt, Tag, Pen, Ticket, MapPin,
  Users, Wine, Trophy, Clock, Flame, Package, ChevronRight, Sparkles,
  Star, Zap, ShieldOff, RotateCw, Filter,
} from 'lucide-react'
import { REWARDS, LIMITED_DROPS, VAULT_ITEMS, MYSTERY_BOX, SPIN_WHEEL_PRIZES } from '../data/rewards'
import GlassCard from '../components/GlassCard'
import TierBadge from '../components/TierBadge'
import Confetti from '../components/Confetti'
import { getTierForCredits, isTierUnlocked } from '../utils/credits'
import { TIERS } from '../data/tiers'

const ICON_MAP = {
  Image, Shirt, Tag, Pen, Ticket, MapPin, Users, Wine, Trophy,
}

const FILTER_TABS = ['All', 'Trending', 'Digital', 'Experiences', 'Merch', 'Partner Offers']

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

const ACTIVITY_MESSAGES = [
  { user: 'CityzenJohn92', action: 'just claimed', item: 'Signed Jersey' },
  { user: 'BlueMoonRising', action: 'redeemed', item: 'Matchday Tickets' },
  { user: 'HaalandFan9', action: 'opened a', item: 'Mystery Kit Bag' },
  { user: 'SkyBlue_MCR', action: 'won 100 Credits on', item: 'the Daily Wheel' },
  { user: 'FodenIsKing', action: 'just claimed', item: 'Stadium Tour' },
  { user: 'MancMessi10', action: 'just claimed', item: 'Emote Pack' },
  { user: 'TheKDBFan', action: 'spun the wheel and won', item: '200 Credits' },
  { user: 'MCFCTilIDie', action: 'opened a', item: 'Mystery Kit Bag' },
]

// ─── Live Activity Ticker ────────────────────────────────────────────
function LiveTicker() {
  const tickerText = ACTIVITY_MESSAGES.map(
    (m) => `${m.user} ${m.action} ${m.item}`
  ).join('   \u2022   ')

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2.5">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#22C55E]">Live</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div
            className="whitespace-nowrap text-sm text-[#8899AA]"
            style={{ animation: 'ticker-scroll 30s linear infinite' }}
          >
            {tickerText}   &bull;   {tickerText}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Countdown Timer ─────────────────────────────────────────────────
function CountdownTimer({ hoursLeft }) {
  const [timeLeft, setTimeLeft] = useState(hoursLeft * 3600)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000)
    return () => clearInterval(timer)
  }, [])

  const h = Math.floor(timeLeft / 3600)
  const m = Math.floor((timeLeft % 3600) / 60)

  return (
    <div className="flex items-center gap-1.5 text-[#e6ff00]">
      <Clock className="w-3.5 h-3.5" />
      <span className="text-xs font-bold font-mono">
        {h}h {String(m).padStart(2, '0')}m left
      </span>
    </div>
  )
}

// ─── Spin Wheel ──────────────────────────────────────────────────────
function SpinWheel({ setCreditBalance }) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [hasSpun, setHasSpun] = useState(false)
  const wheelRef = useRef(null)

  function handleSpin() {
    if (spinning || hasSpun) return
    setSpinning(true)
    setResult(null)

    const prizeIndex = Math.floor(Math.random() * SPIN_WHEEL_PRIZES.length)
    const segmentAngle = 360 / SPIN_WHEEL_PRIZES.length
    const degrees = 360 * 5 + (360 - prizeIndex * segmentAngle - segmentAngle / 2)

    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--spin-degrees', `${degrees}deg`)
      wheelRef.current.style.animation = 'none'
      // force reflow
      void wheelRef.current.offsetHeight
      wheelRef.current.style.animation = 'spin-wheel 4s cubic-bezier(0.17, 0.67, 0.12, 0.99) forwards'
    }

    setTimeout(() => {
      setSpinning(false)
      setResult(SPIN_WHEEL_PRIZES[prizeIndex])
      setHasSpun(true)
      const creditsMatch = SPIN_WHEEL_PRIZES[prizeIndex].name.match(/(\d+) Credits/)
      if (creditsMatch) {
        setCreditBalance((b) => b + parseInt(creditsMatch[1]))
      }
    }, 4000)
  }

  const segCount = SPIN_WHEEL_PRIZES.length
  const segAngle = 360 / segCount

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-[#D4A843]/30 rounded-2xl p-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-1">
        <Sparkles className="w-5 h-5 text-[#D4A843]" />
        <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">
          Daily Cityzens Wheel
        </h3>
        <Sparkles className="w-5 h-5 text-[#D4A843]" />
      </div>
      <p className="text-[#8899AA] text-xs mb-5">One free spin per day — every Cityzen wins</p>

      {/* Wheel */}
      <div className="relative w-56 h-56 mx-auto mb-5">
        {/* Pointer at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-[#e6ff00] z-20 drop-shadow-lg" />

        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-4 border-[#D4A843]/60 overflow-hidden relative"
        >
          {SPIN_WHEEL_PRIZES.map((prize, i) => {
            const rotation = segAngle * i
            const textRotation = rotation + segAngle / 2
            return (
              <div key={i}>
                {/* Segment */}
                <div
                  className="absolute w-full h-full origin-center"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.tan((Math.PI / segCount))}% 0%)`,
                  }}
                >
                  <div className="w-full h-full" style={{ backgroundColor: prize.color }} />
                </div>
                {/* Label */}
                <div
                  className="absolute w-full h-full"
                  style={{ transform: `rotate(${textRotation}deg)` }}
                >
                  <span
                    className="absolute left-1/2 top-[14%] -translate-x-1/2 text-[8px] font-bold text-white drop-shadow-md whitespace-nowrap"
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    {prize.name}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0A0E17] border-2 border-[#D4A843] z-10 flex items-center justify-center">
          <Star className="w-4 h-4 text-[#D4A843]" />
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="mb-4" style={{ animation: 'count-pop 0.5s ease-out' }}>
          <p className="text-[#e6ff00] font-bold text-xl">{result.name}</p>
          <p className="text-[#8899AA] text-xs mt-1">Added to your account</p>
        </div>
      )}

      <button
        onClick={handleSpin}
        disabled={spinning || hasSpun}
        className={`font-bold py-3.5 px-10 rounded-xl text-sm transition-all w-full uppercase tracking-wider ${
          hasSpun
            ? 'bg-white/5 text-[#8899AA] cursor-not-allowed'
            : spinning
            ? 'bg-[#e6ff00]/60 text-[#001838] cursor-wait'
            : 'bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] hover:scale-[1.02] shadow-[0_0_24px_rgba(230,255,0,0.3)]'
        }`}
      >
        {spinning ? 'Spinning...' : hasSpun ? 'Come Back Tomorrow' : 'Spin Now (Free)'}
      </button>
    </div>
  )
}

// ─── Mystery Kit Bag ─────────────────────────────────────────────────
function MysteryBox({ creditBalance, setCreditBalance }) {
  const [opening, setOpening] = useState(false)
  const [revealed, setRevealed] = useState(null)
  const [flipped, setFlipped] = useState(false)

  function handleOpen() {
    if (opening || creditBalance < MYSTERY_BOX.cost) return
    setOpening(true)
    setCreditBalance((b) => b - MYSTERY_BOX.cost)

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
      setFlipped(true)
      setOpening(false)
    }, 1800)
  }

  function handleReset() {
    setFlipped(false)
    setRevealed(null)
  }

  const rarityColors = {
    common: 'text-white/70',
    rare: 'text-[#6CABDD]',
    legendary: 'text-[#D4A843]',
  }

  const rarityBorder = {
    common: 'border-white/30',
    rare: 'border-[#6CABDD]',
    legendary: 'border-[#D4A843]',
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-[#6CABDD]/30 rounded-2xl p-6 text-center">
      <Package className="w-10 h-10 text-[#6CABDD] mx-auto mb-3" />
      <h3 className="text-xl font-extrabold text-white uppercase tracking-wider mb-1">Mystery Kit Bag</h3>
      <p className="text-[#8899AA] text-xs mb-5">Open for a random reward — Common, Rare, or Legendary</p>

      {/* Card flip area */}
      <div className="relative mx-auto mb-5" style={{ perspective: '600px', minHeight: '180px' }}>
        <div
          className="w-full transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front — mystery */}
          <div
            className="absolute inset-0 rounded-xl border-2 border-[#6CABDD]/40 bg-gradient-to-b from-[#6CABDD]/10 to-transparent flex flex-col items-center justify-center p-4"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-6xl font-extrabold text-[#6CABDD]/60 mb-3">?</div>
            <div className="space-y-1.5 w-full">
              {MYSTERY_BOX.possibleRewards.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-xs px-3">
                  <span className="text-white/60">{r.name}</span>
                  <span className={`font-bold ${rarityColors[r.rarity]}`}>{r.chance}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Back — revealed prize */}
          <div
            className={`absolute inset-0 rounded-xl border-2 ${
              revealed ? rarityBorder[revealed.rarity] : 'border-white/20'
            } bg-gradient-to-b from-white/10 to-transparent flex flex-col items-center justify-center p-4`}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {revealed && (
              <div style={{ animation: 'count-pop 0.5s ease-out 0.6s both' }}>
                <Gift className={`w-10 h-10 mx-auto mb-2 ${rarityColors[revealed.rarity]}`} />
                <p className={`font-bold text-xl ${rarityColors[revealed.rarity]}`}>{revealed.name}</p>
                <p className="text-xs uppercase tracking-widest text-white/40 mt-1">{revealed.rarity}</p>
                <button
                  onClick={handleReset}
                  className="mt-3 text-xs text-[#8899AA] hover:text-white flex items-center gap-1 mx-auto"
                >
                  <RotateCw className="w-3 h-3" /> Open another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleOpen}
        disabled={opening || creditBalance < MYSTERY_BOX.cost}
        className={`font-bold py-3.5 px-10 rounded-xl text-sm transition-all w-full uppercase tracking-wider ${
          creditBalance < MYSTERY_BOX.cost
            ? 'bg-white/5 text-[#8899AA] cursor-not-allowed'
            : opening
            ? 'bg-[#e6ff00]/60 text-[#001838] cursor-wait'
            : 'bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] hover:scale-[1.02] shadow-[0_0_24px_rgba(230,255,0,0.3)]'
        }`}
      >
        {opening ? 'Opening...' : `Open Mystery Kit Bag (${MYSTERY_BOX.cost} credits)`}
      </button>
    </div>
  )
}

// ─── Main Screen ─────────────────────────────────────────────────────
export default function RewardsStoreScreen({
  creditBalance,
  setCreditBalance,
  totalCreditsEarned,
  claimedRewards,
  setClaimedRewards,
}) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [confirmReward, setConfirmReward] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const userTier = getTierForCredits(totalCreditsEarned)

  const filtered =
    activeFilter === 'All'
      ? REWARDS
      : activeFilter === 'Trending'
      ? [...REWARDS].sort((a, b) => b.claimedCount - a.claimedCount).slice(0, 6)
      : REWARDS.filter((r) => r.category === activeFilter)

  function handleClaim(reward) {
    setConfirmReward(reward)
  }

  function confirmClaim() {
    if (!confirmReward) return
    setCreditBalance((b) => b - confirmReward.cost)
    setClaimedRewards((c) => [...c, confirmReward.id])
    setConfirmReward(null)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 4000)
  }

  return (
    <div className="relative min-h-screen" style={{ animation: 'slide-in 0.4s ease-out' }}>
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/leaderboard/backgrounds/crowd.jpeg')" }}
      />
      <div className="absolute inset-0 bg-[#0A0E17]/85" />

      <div className="relative z-10 p-6 space-y-8">
        <Confetti show={showConfetti} onDone={() => setShowConfetti(false)} />

        {/* ── Confirmation Modal ────────────────────────────────── */}
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

        {/* ── Header ───────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gift className="w-7 h-7 text-[#D4A843]" />
            <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white">
              Rewards Store
            </h1>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-xl px-5 py-2">
            <span className="text-[#8899AA] text-[10px] uppercase tracking-wider">Balance</span>
            <p className="text-xl font-bold bg-gradient-to-r from-[#6CABDD] to-[#D4A843] bg-clip-text text-transparent">
              {creditBalance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* ── 1. Live Activity Ticker ──────────────────────────── */}
        <LiveTicker />

        {/* ── 2. Daily Cityzens Wheel + Mystery Kit Bag ────────── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-[#e6ff00]" />
            <h2 className="text-2xl font-extrabold text-white uppercase tracking-wider">
              Daily Rewards
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpinWheel setCreditBalance={setCreditBalance} />
            <MysteryBox creditBalance={creditBalance} setCreditBalance={setCreditBalance} />
          </div>
        </section>

        {/* ── 3. Kit Room Drops (Limited) ──────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-[#D4A843]" />
            <h2 className="text-2xl font-extrabold text-white uppercase tracking-wider">
              Kit Room Drops
            </h2>
          </div>
          <p className="text-[#8899AA] text-sm mb-5">
            One-time items tied to real match moments. Once they are gone, they are gone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LIMITED_DROPS.map((drop) => {
              const unlocked = isTierUnlocked(drop, totalCreditsEarned)
              const remaining = drop.totalStock - drop.claimed
              const pctClaimed = (drop.claimed / drop.totalStock) * 100
              const DropIcon = ICON_MAP[drop.iconName] || Gift
              const rarity = RARITY_STYLES[drop.rarity] || RARITY_STYLES.common

              return (
                <div
                  key={drop.id}
                  className={`bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${rarity.border} ${rarity.glow} ${
                    !unlocked ? 'opacity-50 grayscale-[30%]' : 'hover:scale-[1.02]'
                  }`}
                >
                  {/* Top badges row */}
                  <div className="flex items-center justify-between px-5 pt-4">
                    <CountdownTimer hoursLeft={drop.endsInHours} />
                    <div className="flex items-center gap-2">
                      {drop.rarity === 'legendary' && (
                        <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                          Never Restocked
                        </span>
                      )}
                      {rarity.label && (
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${rarity.labelBg}`}>
                          {rarity.label}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-3 flex flex-col flex-1">
                    <DropIcon className="w-8 h-8 text-[#D4A843] mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-1">{drop.name}</h3>
                    <p className="text-sm text-[#8899AA] mb-4 flex-1">{drop.description}</p>

                    {/* Stock progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[#e6ff00] font-bold">
                          {drop.claimed}/{drop.totalStock} claimed
                        </span>
                        <span className="text-[#8899AA]">{remaining} left</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pctClaimed}%`,
                            background:
                              pctClaimed > 80
                                ? 'linear-gradient(90deg, #e6ff00, #ef4444)'
                                : 'linear-gradient(90deg, #e6ff00, #6CABDD)',
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#D4A843] font-bold">{drop.cost.toLocaleString()} credits</span>
                      <TierBadge tierName={drop.tierRequired} />
                    </div>

                    {!unlocked ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#0A0E17]/60 backdrop-blur-sm rounded-xl flex items-center justify-center gap-2 z-10">
                          <Lock className="w-4 h-4 text-[#8899AA]" />
                          <span className="text-sm font-bold text-[#8899AA]">
                            Reach {drop.tierRequired} to unlock
                          </span>
                        </div>
                        <button disabled className="w-full font-bold py-3 px-6 rounded-xl bg-white/5 text-[#8899AA] cursor-not-allowed opacity-0">
                          _
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClaim(drop)}
                        disabled={creditBalance < drop.cost}
                        className={`font-bold py-3 px-6 rounded-xl transition-all w-full uppercase tracking-wider text-sm ${
                          creditBalance >= drop.cost
                            ? 'bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] hover:scale-[1.02] shadow-[0_0_16px_rgba(230,255,0,0.25)]'
                            : 'bg-white/5 text-[#8899AA] cursor-not-allowed'
                        }`}
                      >
                        {creditBalance >= drop.cost ? 'Claim Now' : 'Not enough credits'}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── 4. Main Rewards Grid ─────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-[#6CABDD]" />
            <h2 className="text-2xl font-extrabold text-white uppercase tracking-wider">
              Rewards
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 flex-wrap mb-6">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                  activeFilter === tab
                    ? 'bg-[#6CABDD] text-white shadow-[0_0_12px_rgba(108,171,221,0.3)]'
                    : 'bg-white/5 text-[#8899AA] hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((reward) => {
              const unlocked = isTierUnlocked(reward, totalCreditsEarned)
              const claimed = claimedRewards.includes(reward.id)
              const affordable = creditBalance >= reward.cost
              const RewardIcon = ICON_MAP[reward.iconName] || Gift
              const rarity = RARITY_STYLES[reward.rarity] || RARITY_STYLES.common

              return (
                <div
                  key={reward.id}
                  className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
                    rarity.border
                  } ${rarity.glow} ${
                    !unlocked
                      ? ''
                      : 'hover:bg-white/10 hover:scale-[1.02]'
                  }`}
                >
                  {/* Tier lock overlay */}
                  {!unlocked && (
                    <div className="absolute inset-0 z-10 bg-[#0A0E17]/70 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-2">
                      <Lock className="w-6 h-6 text-[#8899AA]" />
                      <span className="text-sm font-bold text-[#8899AA]">
                        Reach {reward.tierRequired} to unlock
                      </span>
                      <TierBadge tierName={reward.tierRequired} />
                    </div>
                  )}

                  {/* Rarity Label */}
                  {rarity.label && (
                    <div className="flex justify-end px-4 pt-3">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${rarity.labelBg}`}
                      >
                        {rarity.label}
                      </span>
                    </div>
                  )}

                  <div className={`p-6 ${rarity.label ? 'pt-2' : 'pt-6'} flex flex-col flex-1`}>
                    <RewardIcon className="w-8 h-8 text-[#6CABDD] mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-1">{reward.name}</h3>
                    <p className="text-sm text-[#8899AA] mb-3 flex-1">{reward.description}</p>

                    {/* Social proof */}
                    <div className="flex items-center gap-1.5 mb-3 text-xs text-[#8899AA]">
                      <Users className="w-3 h-3" />
                      <span>{reward.claimedCount.toLocaleString()} fans claimed this</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#D4A843] font-bold">{reward.cost.toLocaleString()} credits</span>
                      <TierBadge tierName={reward.tierRequired} />
                    </div>

                    {claimed ? (
                      <div className="flex items-center justify-center gap-2 bg-[#22C55E]/10 text-[#22C55E] font-bold py-3 px-6 rounded-xl">
                        <Check className="w-5 h-5" /> Claimed
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClaim(reward)}
                        disabled={!unlocked || !affordable}
                        className={`font-bold py-3 px-6 rounded-xl transition-all w-full uppercase tracking-wider text-sm ${
                          unlocked && affordable
                            ? 'bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] hover:scale-[1.02] shadow-[0_0_16px_rgba(230,255,0,0.25)]'
                            : 'bg-white/5 text-[#8899AA] cursor-not-allowed'
                        }`}
                      >
                        {!unlocked
                          ? `Reach ${reward.tierRequired}`
                          : affordable
                          ? 'Redeem'
                          : 'Not enough credits'}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── 6. The Vault ─────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <ShieldOff className="w-5 h-5 text-[#8899AA]" />
            <h2 className="text-2xl font-extrabold text-white/40 uppercase tracking-wider">
              The Vault
            </h2>
          </div>
          <p className="text-[#8899AA] text-sm mb-5">
            Past drops that are no longer available. Don't miss the next one.
          </p>

          <div className="space-y-3">
            {VAULT_ITEMS.map((item, i) => (
              <div
                key={i}
                className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-xl px-5 py-4 flex items-center gap-4 opacity-50 grayscale-[40%]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-[#8899AA]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{item.name}</p>
                  <p className="text-xs text-[#8899AA]">
                    {item.date} — {item.claimed}/{item.total} claimed
                  </p>
                </div>
                <span className="text-[10px] font-bold text-red-400/80 uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full shrink-0">
                  Sold Out
                </span>
              </div>
            ))}
          </div>

          <div className="text-center py-8">
            <p className="text-[#8899AA] text-sm mb-4">Want to never miss a drop?</p>
            <button className="bg-[#6CABDD] hover:bg-[#5B9ACC] text-white font-bold py-3 px-8 rounded-xl text-sm transition-all hover:scale-[1.02] uppercase tracking-wider">
              Enable Drop Notifications
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
