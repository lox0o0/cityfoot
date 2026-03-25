import { useState } from 'react'
import { Trophy, ArrowUp, ArrowDown, Minus, Clock, Crown, Target, Users, Zap, ChevronRight, Flame, TrendingUp, Gamepad2, Award } from 'lucide-react'
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

function StreakIndicator({ streak }) {
  if (!streak || streak < 3) return null
  return (
    <span className="flex items-center gap-0.5" title={`${streak}-day streak`}>
      <Flame className={`w-3.5 h-3.5 ${streak >= 7 ? 'text-[#e6ff00]' : streak >= 5 ? 'text-orange-400' : 'text-orange-500/60'}`} />
      {streak >= 7 && <span className="text-[10px] font-bold text-[#e6ff00]">{streak}</span>}
    </span>
  )
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

const TIME_FILTERS = ['This Week', 'This Month', 'All Time', 'By Game']

const LEADERBOARD_CHALLENGES = [
  { title: 'Score 10 goals in EA FC', reward: '+150 credits', progress: 7, total: 10, icon: Target },
  { title: 'Play 5 different games', reward: '+200 credits', progress: 3, total: 5, icon: Zap },
  { title: 'Invite 3 friends', reward: '+300 credits', progress: 1, total: 3, icon: Users },
]

const FRIEND_LEADERBOARD = [
  { rank: 1, name: 'Alex M.', credits: 820, movement: 2, streak: 8 },
  { rank: 2, name: 'Jordan K.', credits: 650, movement: 0, streak: 3 },
  { rank: 3, name: 'You', credits: 0, movement: 5, isUser: true, streak: 5 },
  { rank: 4, name: 'Sam T.', credits: 410, movement: -1, streak: 0 },
  { rank: 5, name: 'Riley P.', credits: 380, movement: 1, streak: 4 },
]

// Add streak data to mock leaderboard entries
const LEADERBOARD_WITH_STREAKS = MOCK_LEADERBOARD.map((entry, i) => ({
  ...entry,
  streak: [12, 8, 5, 6, 3, 0, 9, 2, 4, 7][i] || 0,
}))

export default function LeaderboardScreen({ userName, totalCreditsEarned, onNavigate }) {
  const userTier = getTierForCredits(totalCreditsEarned)
  const [activeTime, setActiveTime] = useState('This Month')
  const [boardType, setBoardType] = useState('global')
  const [prediction, setPrediction] = useState(null)

  // User position data
  const userRank = 247
  const totalCityzens = 50000
  const userPercentile = ((userRank / totalCityzens) * 100).toFixed(1)
  const creditsToNextRank = 38
  const weeklyProgress = 6 // spots moved up this week toward the 10-spot goal
  const weeklyGoal = 10

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
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>LEADERBOARD</h1>
      </div>
      <p className="text-[#8899AA] mb-6">Top fans win exclusive monthly rewards</p>

      {/* Filter Tabs with lime underline */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {TIME_FILTERS.map(t => (
          <button
            key={t}
            onClick={() => setActiveTime(t)}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap relative ${
              activeTime === t
                ? 'text-[#e6ff00]'
                : 'text-[#8899AA] hover:text-white'
            }`}
          >
            {t === 'By Game' && <Gamepad2 className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
            {t}
            {activeTime === t && (
              <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#e6ff00] rounded-full" style={{ animation: 'slide-in 0.3s ease-out' }} />
            )}
          </button>
        ))}
      </div>

      {/* Board Type Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 bg-white/5 rounded-xl p-1">
          <button
            onClick={() => setBoardType('global')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              boardType === 'global' ? 'bg-[#e6ff00]/15 text-[#e6ff00]' : 'text-[#8899AA] hover:text-white'
            }`}
          >
            Global
          </button>
          <button
            onClick={() => setBoardType('friends')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              boardType === 'friends' ? 'bg-[#e6ff00]/15 text-[#e6ff00]' : 'text-[#8899AA] hover:text-white'
            }`}
          >
            Friends
          </button>
        </div>
        <span className="text-[#8899AA] text-xs">{totalCityzens.toLocaleString()} Cityzens</span>
      </div>

      {/* User's Position Card */}
      <div
        className="relative mb-6 bg-white/5 backdrop-blur-xl border border-[#6CABDD]/40 rounded-2xl p-5 overflow-hidden"
        style={{ boxShadow: '0 0 30px rgba(108,171,221,0.12), inset 0 0 30px rgba(108,171,221,0.04)' }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6CABDD] rounded-l-2xl" />
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold text-[#6CABDD]" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>#{userRank}</span>
            <span className="text-[10px] text-[#8899AA] uppercase tracking-wide">of {totalCityzens.toLocaleString()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold truncate text-lg">{userName || 'You'}</p>
            <div className="flex items-center gap-2 mt-1">
              <TierBadge tierName={userTier.name} />
              <span className="bg-[#e6ff00]/15 text-[#e6ff00] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Top {userPercentile}%
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-extrabold text-xl">{totalCreditsEarned.toLocaleString()}</p>
            <p className="text-[#8899AA] text-xs">credits</p>
          </div>
          <MovementIndicator movement={5} />
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#6CABDD]" />
            <span className="text-[#8899AA] text-xs">
              <span className="text-white font-semibold">{creditsToNextRank}</span> credits to move up 1 spot
            </span>
          </div>
          <span className="text-[#6CABDD] text-xs font-bold cursor-pointer hover:text-[#e6ff00] transition-colors">
            Earn Credits <ChevronRight className="w-3 h-3 inline" />
          </span>
        </div>
      </div>

      {/* Challenge Banner — move up 10 spots */}
      <div className="mb-6 bg-gradient-to-r from-[#1C2C5B]/80 to-[#6CABDD]/20 backdrop-blur-xl border border-[#6CABDD]/25 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#e6ff00]/15 flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#e6ff00]" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">Weekly Challenge</p>
              <p className="text-[#8899AA] text-[11px]">Move up 10 spots this week</p>
            </div>
          </div>
          <span className="text-[#e6ff00] font-extrabold text-sm">+200 credits</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6CABDD] to-[#e6ff00] rounded-full transition-all duration-700"
              style={{ width: `${(weeklyProgress / weeklyGoal) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-white">{weeklyProgress}/{weeklyGoal}</span>
        </div>
      </div>

      {boardType === 'global' ? (
        <>
          {/* Monthly Prizes Banner */}
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#D4A843] mb-3 flex items-center gap-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              <Award className="w-4 h-4" /> This Month's Prizes
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {MONTHLY_PRIZES.slice(0, 3).map((p, i) => {
                const glowColor = i === 0 ? 'rgba(212,168,67,0.2)' : i === 1 ? 'rgba(192,192,192,0.15)' : 'rgba(205,127,50,0.15)'
                const borderColor = i === 0 ? 'border-[#D4A843]/50' : i === 1 ? 'border-[#C0C0C0]/40' : 'border-[#CD7F32]/40'
                const gradFrom = i === 0 ? 'from-[#D4A843]/15' : i === 1 ? 'from-[#C0C0C0]/10' : 'from-[#CD7F32]/10'
                return (
                  <div
                    key={i}
                    className={`bg-gradient-to-b ${gradFrom} to-transparent backdrop-blur-xl border ${borderColor} rounded-2xl p-4 text-center`}
                    style={{ boxShadow: `0 0 24px ${glowColor}` }}
                  >
                    <MedalDot medalRank={p.medalRank} />
                    <p className="text-white font-bold text-xs mt-2 mb-1">{p.rank}</p>
                    <p className="text-[#8899AA] text-[10px] leading-tight">{p.prize}</p>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-center gap-2 text-[#8899AA] text-xs mt-3">
              <Clock className="w-3.5 h-3.5" />
              <span>Resets in 12 days</span>
            </div>
          </div>

          {/* Podium — top 3 */}
          <div className="mb-10">
            <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-5 max-w-2xl mx-auto px-1">
              {[2, 1, 3].map(rank => {
                const entry = LEADERBOARD_WITH_STREAKS.find(e => e.rank === rank)
                if (!entry) return null
                const height =
                  rank === 1
                    ? 'min-h-[260px] md:min-h-[284px]'
                    : rank === 2
                      ? 'min-h-[208px] md:min-h-[228px]'
                      : 'min-h-[188px] md:min-h-[204px]'
                const flexBasis = rank === 1 ? 'basis-[38%] sm:basis-[40%]' : 'basis-[29%] sm:basis-[28%]'
                const avatarSize = rank === 1 ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-lg'
                const glow =
                  rank === 1
                    ? 'border-[#D4A843]/55 shadow-[0_0_56px_rgba(212,168,67,0.22)] ring-1 ring-[#D4A843]/20'
                    : rank === 2
                      ? 'border-[#C0C0C0]/35 bg-gradient-to-b from-[#C0C0C0]/10 to-transparent'
                      : 'border-[#CD7F32]/40 bg-gradient-to-b from-[#CD7F32]/10 to-transparent'
                const avatarBg = rank === 1 ? 'bg-[#D4A843]/20 border-[#D4A843]/40' : rank === 2 ? 'bg-[#C0C0C0]/15 border-[#C0C0C0]/30' : 'bg-[#CD7F32]/15 border-[#CD7F32]/30'
                const avatarGlow = rank === 1 ? '0 0 20px rgba(212,168,67,0.3)' : rank === 2 ? '0 0 16px rgba(192,192,192,0.2)' : '0 0 16px rgba(205,127,50,0.2)'
                return (
                  <div
                    key={rank}
                    className={`${flexBasis} ${height} shrink-0 backdrop-blur-xl border rounded-2xl p-4 flex flex-col items-center justify-end text-center ${glow} ${
                      rank === 1 ? 'md:scale-[1.04] z-10' : ''
                    }`}
                    style={{ animation: `slide-in ${0.3 + rank * 0.1}s ease-out` }}
                  >
                    {rank === 1 && (
                      <Crown className="w-7 h-7 text-[#D4A843] mb-2 drop-shadow-[0_0_12px_rgba(212,168,67,0.5)]" />
                    )}
                    {/* Avatar circle */}
                    <div
                      className={`${avatarSize} rounded-full ${avatarBg} border-2 flex items-center justify-center font-bold text-white mb-2`}
                      style={{ boxShadow: avatarGlow }}
                    >
                      {entry.name.charAt(0)}
                    </div>
                    <div className="mb-1 flex justify-center">
                      <RankBadge rank={entry.rank} />
                    </div>
                    <p className="text-white font-semibold truncate w-full text-sm md:text-base">{entry.name}</p>
                    <div className="mt-1 flex items-center justify-center gap-1.5">
                      <TierBadge tierName={entry.tier} />
                      <StreakIndicator streak={entry.streak} />
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
            {LEADERBOARD_WITH_STREAKS.slice(3, 5).map(entry => (
              <div
                key={entry.rank}
                className={`backdrop-blur-xl border rounded-2xl p-5 flex items-center gap-4 ${getRankStyle(entry.rank)}`}
              >
                <RankBadge rank={entry.rank} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{entry.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <TierBadge tierName={entry.tier} />
                    <StreakIndicator streak={entry.streak} />
                  </div>
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
            {LEADERBOARD_WITH_STREAKS.slice(5).map(entry => (
              <div
                key={entry.rank}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <span className="text-sm font-bold text-[#8899AA] w-8">#{entry.rank}</span>
                <span className="text-white text-sm font-medium flex-1 truncate">{entry.name}</span>
                <StreakIndicator streak={entry.streak} />
                <TierBadge tierName={entry.tier} />
                <span className="text-white text-sm font-bold">{entry.credits.toLocaleString()}</span>
                <MovementIndicator movement={entry.movement} />
              </div>
            ))}
          </div>

          {/* Friends Leaderboard (compact inline section on global view) */}
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-3 flex items-center gap-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              <Users className="w-4 h-4 text-[#6CABDD]" /> Your Friends
            </h2>
            <div className="space-y-2">
              {friendBoard.slice(0, 4).map(entry => (
                <div
                  key={entry.name}
                  className={`backdrop-blur-xl border rounded-xl px-4 py-3 flex items-center gap-3 transition-all ${
                    entry.isUser
                      ? 'border-[#6CABDD]/40 bg-[#6CABDD]/8'
                      : 'border-white/10 bg-white/5'
                  }`}
                  style={entry.isUser ? { boxShadow: '0 0 16px rgba(108,171,221,0.1)' } : {}}
                >
                  <span className={`text-sm font-bold w-6 ${entry.isUser ? 'text-[#6CABDD]' : 'text-[#8899AA]'}`}>#{entry.rank}</span>
                  <span className={`text-sm font-medium flex-1 truncate ${entry.isUser ? 'text-[#6CABDD]' : 'text-white'}`}>
                    {entry.name} {entry.isUser && '(You)'}
                  </span>
                  <StreakIndicator streak={entry.streak} />
                  <span className="text-white text-sm font-bold">{entry.credits.toLocaleString()}</span>
                  <MovementIndicator movement={entry.movement} />
                </div>
              ))}
            </div>
            <button
              onClick={() => setBoardType('friends')}
              className="mt-2 text-[#6CABDD] text-xs font-bold hover:text-[#e6ff00] transition-colors flex items-center gap-1"
            >
              See All Friends <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </>
      ) : (
        /* Friends Leaderboard (full view) */
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
              style={entry.isUser ? { boxShadow: '0 0 20px rgba(108,171,221,0.12)' } : {}}
            >
              {entry.isUser && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6CABDD] rounded-l-2xl" />}
              <RankBadge rank={entry.rank} />
              <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate ${entry.isUser ? 'text-[#6CABDD]' : 'text-white'}`}>
                  {entry.name} {entry.isUser && '(You)'}
                </p>
              </div>
              <StreakIndicator streak={entry.streak} />
              <span className="text-white font-bold">{entry.credits.toLocaleString()}</span>
              <MovementIndicator movement={entry.movement} />
            </div>
          ))}
          <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#6CABDD] font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
            <Users className="w-4 h-4" /> Invite Friends (+50 credits each)
          </button>
        </div>
      )}

      {/* Leaderboard Challenges */}
      <div className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
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
          <h3 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Match Prediction</h3>
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
