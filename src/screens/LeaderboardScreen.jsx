import { useState } from 'react'
import { Trophy, ArrowUp, ArrowDown, Minus, Clock, Crown, Target, Users, Zap, ChevronRight } from 'lucide-react'
import { MOCK_LEADERBOARD, MONTHLY_PRIZES } from '../data/leaderboard'
import GlassCard from '../components/GlassCard'
import TierBadge from '../components/TierBadge'
import { getTierForCredits } from '../utils/credits'

function MovementIndicator({ movement }) {
  if (movement > 0) {
    return (
      <span className="flex items-center gap-0.5 text-[#22C55E] text-xs font-bold">
        <ArrowUp className="w-3 h-3" /> {movement}
      </span>
    )
  }
  if (movement < 0) {
    return (
      <span className="flex items-center gap-0.5 text-[#EF4444] text-xs font-bold">
        <ArrowDown className="w-3 h-3" /> {Math.abs(movement)}
      </span>
    )
  }
  return <Minus className="w-3 h-3 text-[#8899AA]" />
}

function RankBadge({ rank }) {
  if (rank === 1) {
    return (
      <div className="w-8 h-8 rounded-full bg-[#D4A843] flex items-center justify-center text-[#001838] font-bold text-sm">
        1
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-[#001838] font-bold text-sm">
        2
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold text-sm">
        3
      </div>
    )
  }
  return <span className="text-2xl font-bold text-white w-8 text-center">#{rank}</span>
}

function MedalDot({ medalRank }) {
  if (medalRank === 1) {
    return <div className="w-6 h-6 rounded-full bg-[#D4A843] flex items-center justify-center text-[#001838] font-bold text-[10px]">1</div>
  }
  if (medalRank === 2) {
    return <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[#001838] font-bold text-[10px]">2</div>
  }
  if (medalRank === 3) {
    return <div className="w-6 h-6 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold text-[10px]">3</div>
  }
  return <div className="w-6 h-6 rounded-full bg-[#6CABDD]/30 flex items-center justify-center text-[#6CABDD] font-bold text-[10px]">{medalRank}</div>
}

function getRankStyle(rank) {
  if (rank === 1) return 'border-[#D4A843]/40 bg-[#D4A843]/5'
  if (rank === 2) return 'border-[#C0C0C0]/30 bg-[#C0C0C0]/5'
  if (rank === 3) return 'border-[#CD7F32]/30 bg-[#CD7F32]/5'
  return 'border-white/10 bg-white/5'
}

const TIME_FILTERS = ['This Week', 'This Month', 'All Time']

const LEADERBOARD_CHALLENGES = [
  { title: 'Score 10 goals in EA FC', reward: '+150 credits', progress: 7, total: 10, icon: Target },
  { title: 'Play 5 different games', reward: '+200 credits', progress: 3, total: 5, icon: Zap },
  { title: 'Invite 3 friends', reward: '+300 credits', progress: 1, total: 3, icon: Users },
]

const FRIEND_LEADERBOARD = [
  { rank: 1, name: 'Alex M.', credits: 820, movement: 2 },
  { rank: 2, name: 'Jordan K.', credits: 650, movement: 0 },
  { rank: 3, name: 'You', credits: 0, movement: 5, isUser: true },
  { rank: 4, name: 'Sam T.', credits: 410, movement: -1 },
  { rank: 5, name: 'Riley P.', credits: 380, movement: 1 },
]

export default function LeaderboardScreen({ userName, totalCreditsEarned, onNavigate }) {
  const userTier = getTierForCredits(totalCreditsEarned)
  const [activeTime, setActiveTime] = useState('This Month')
  const [boardType, setBoardType] = useState('global')
  const [prediction, setPrediction] = useState(null)

  const friendBoard = FRIEND_LEADERBOARD.map(f =>
    f.isUser ? { ...f, name: userName || 'You', credits: totalCreditsEarned } : f
  ).sort((a, b) => b.credits - a.credits).map((f, i) => ({ ...f, rank: i + 1 }))

  return (
    <div className="relative min-h-screen" style={{ animation: 'slide-in 0.4s ease-out' }}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/leaderboard/backgrounds/images.jpeg')" }} />
      <div className="absolute inset-0 bg-[#0A0E17]/85" />
      <div className="relative z-10 p-6 max-w-3xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Trophy className="w-6 h-6 text-[#D4A843]" />
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white">LEADERBOARD</h1>
      </div>
      <p className="text-[#8899AA] mb-6">Top fans win exclusive monthly rewards</p>

      {/* Time Filters + Board Type Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {TIME_FILTERS.map(t => (
            <button
              key={t}
              onClick={() => setActiveTime(t)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTime === t
                  ? 'bg-[#6CABDD] text-white'
                  : 'bg-white/5 text-[#8899AA] hover:bg-white/10 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-white/5 rounded-xl p-1">
          <button
            onClick={() => setBoardType('global')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              boardType === 'global' ? 'bg-white/10 text-white' : 'text-[#8899AA]'
            }`}
          >
            Global
          </button>
          <button
            onClick={() => setBoardType('friends')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              boardType === 'friends' ? 'bg-white/10 text-white' : 'text-[#8899AA]'
            }`}
          >
            Friends
          </button>
        </div>
      </div>

      {boardType === 'global' ? (
        <>
          {/* Monthly Prize Banner */}
          <GlassCard gold className="!border-[#D4A843]/40 mb-6">
            <h3 className="text-xl font-bold text-[#D4A843] mb-4 text-center uppercase tracking-wider">
              Top 5 This Month Win:
            </h3>
            <div className="space-y-2 mb-4">
              {MONTHLY_PRIZES.map((p, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <MedalDot medalRank={p.medalRank} />
                  <span className="text-white font-medium">{p.rank}:</span>
                  <span className="text-[#8899AA]">{p.prize}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 text-[#8899AA] text-sm">
              <Clock className="w-4 h-4" />
              <span>Resets in 12 days</span>
            </div>
          </GlassCard>

          {/* Podium — top 3 */}
          <div className="mb-10">
            <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-5 max-w-2xl mx-auto px-1">
              {[2, 1, 3].map(rank => {
                const entry = MOCK_LEADERBOARD.find(e => e.rank === rank)
                if (!entry) return null
                const height =
                  rank === 1
                    ? 'min-h-[248px] md:min-h-[272px]'
                    : rank === 2
                      ? 'min-h-[200px] md:min-h-[220px]'
                      : 'min-h-[184px] md:min-h-[200px]'
                const flexBasis = rank === 1 ? 'basis-[38%] sm:basis-[40%]' : 'basis-[29%] sm:basis-[28%]'
                const glow =
                  rank === 1
                    ? 'border-[#D4A843]/55 shadow-[0_0_56px_rgba(212,168,67,0.22)] ring-1 ring-[#D4A843]/20'
                    : rank === 2
                      ? 'border-[#C0C0C0]/35 bg-gradient-to-b from-[#C0C0C0]/10 to-transparent'
                      : 'border-[#CD7F32]/40 bg-gradient-to-b from-[#CD7F32]/10 to-transparent'
                return (
                  <div
                    key={rank}
                    className={`${flexBasis} ${height} shrink-0 backdrop-blur-xl border rounded-2xl p-4 flex flex-col items-center justify-end text-center ${glow} ${
                      rank === 1 ? 'md:scale-[1.04] z-10' : ''
                    }`}
                  >
                    {rank === 1 && (
                      <Crown className="w-7 h-7 text-[#D4A843] mb-2 drop-shadow-[0_0_12px_rgba(212,168,67,0.5)]" />
                    )}
                    <div className="mb-2 flex justify-center">
                      <RankBadge rank={entry.rank} />
                    </div>
                    <p className="text-white font-semibold truncate w-full text-sm md:text-base">{entry.name}</p>
                    <div className="mt-1 flex justify-center">
                      <TierBadge tierName={entry.tier} />
                    </div>
                    <p className="text-white font-extrabold text-lg md:text-xl mt-3">{entry.credits.toLocaleString()}</p>
                    <p className="text-[#8899AA] text-[10px] uppercase tracking-wide mt-0.5 mb-2">this month</p>
                    <MovementIndicator movement={entry.movement} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Ranks 4-5 */}
          <div className="space-y-3 mb-6">
            {MOCK_LEADERBOARD.slice(3, 5).map(entry => (
              <div
                key={entry.rank}
                className={`backdrop-blur-xl border rounded-2xl p-5 flex items-center gap-4 ${getRankStyle(entry.rank)}`}
              >
                <RankBadge rank={entry.rank} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{entry.name}</p>
                  <TierBadge tierName={entry.tier} />
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="text-white font-bold">{entry.credits.toLocaleString()}</p>
                    <p className="text-[#8899AA] text-xs">credits this month</p>
                  </div>
                  <MovementIndicator movement={entry.movement} />
                </div>
              </div>
            ))}
          </div>

          {/* Ranks 6-10 */}
          <div className="space-y-2 mb-6">
            {MOCK_LEADERBOARD.slice(5).map(entry => (
              <div
                key={entry.rank}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <span className="text-sm font-bold text-[#8899AA] w-8">#{entry.rank}</span>
                <span className="text-white text-sm font-medium flex-1 truncate">{entry.name}</span>
                <TierBadge tierName={entry.tier} />
                <span className="text-white text-sm font-bold">{entry.credits.toLocaleString()}</span>
                <MovementIndicator movement={entry.movement} />
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Friends Leaderboard */
        <div className="space-y-3 mb-6">
          <GlassCard className="!p-4 mb-4">
            <p className="text-[#8899AA] text-sm text-center">Compete with friends — invite more to climb the ranks</p>
          </GlassCard>
          {friendBoard.map(entry => (
            <div
              key={entry.rank}
              className={`backdrop-blur-xl border rounded-2xl p-4 flex items-center gap-4 transition-all ${
                entry.isUser
                  ? 'border-[#6CABDD]/40 bg-[#6CABDD]/10'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <RankBadge rank={entry.rank} />
              <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate ${entry.isUser ? 'text-[#6CABDD]' : 'text-white'}`}>
                  {entry.name} {entry.isUser && '(You)'}
                </p>
              </div>
              <span className="text-white font-bold">{entry.credits.toLocaleString()}</span>
              <MovementIndicator movement={entry.movement} />
            </div>
          ))}
          <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#6CABDD] font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
            <Users className="w-4 h-4" /> Invite Friends (+50 credits each)
          </button>
        </div>
      )}

      {/* User Position */}
      <GlassCard className="!border-[#6CABDD]/30 bg-[#6CABDD]/5 mb-6">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-[#6CABDD]">#127</div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold truncate">{userName || 'You'}</p>
            <TierBadge tierName={userTier.name} />
          </div>
          <div className="text-right">
            <p className="text-white font-bold">{totalCreditsEarned.toLocaleString()}</p>
            <p className="text-[#8899AA] text-xs">credits this month</p>
          </div>
          <MovementIndicator movement={5} />
        </div>
        <p className="text-[#8899AA] text-sm mt-3">
          You need 450 more credits to reach Top 100
        </p>
      </GlassCard>

      {/* Leaderboard Challenges */}
      <div className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#e6ff00]" /> Climb Faster
        </h2>
        <div className="space-y-3">
          {LEADERBOARD_CHALLENGES.map((ch, i) => (
            <GlassCard key={i} className="!p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#e6ff00]/10 flex items-center justify-center shrink-0">
                <ch.icon className="w-5 h-5 text-[#e6ff00]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{ch.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#e6ff00] rounded-full transition-all"
                      style={{ width: `${(ch.progress / ch.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#8899AA]">{ch.progress}/{ch.total}</span>
                </div>
              </div>
              <span className="text-[#D4A843] font-bold text-sm whitespace-nowrap">{ch.reward}</span>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Match Prediction */}
      <GlassCard className="!border-[#D4A843]/30">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-[#D4A843]" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">Match Prediction</h3>
        </div>
        <p className="text-[#8899AA] text-sm mb-4">Predict the score of Man City vs Arsenal (Sat 29 Mar) — earn bonus credits for correct predictions</p>

        {prediction ? (
          <div className="text-center py-4" style={{ animation: 'slide-in 0.4s ease-out' }}>
            <p className="text-[#e6ff00] font-bold text-lg">Prediction locked: {prediction}</p>
            <p className="text-[#8899AA] text-sm mt-1">Results after the match</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {['Man City Win', 'Draw', 'Arsenal Win'].map(opt => (
              <button
                key={opt}
                onClick={() => setPrediction(opt)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4A843]/40 text-white font-medium py-3 rounded-xl text-sm transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
        <p className="text-[#8899AA] text-xs mt-3 text-center">Correct prediction: +100 credits</p>
      </GlassCard>
      </div>
    </div>
  )
}
