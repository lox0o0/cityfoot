import { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Gamepad2, X, Monitor, Smartphone, Link2, Users, Target, Trophy, Zap, Share2, Heart, Clock, BarChart3, ChevronRight } from 'lucide-react'
import { GAMES } from '../data/games'
import GlassCard from '../components/GlassCard'
import CreditAward from '../components/CreditAward'

const PLATFORM_ICONS = {
  PS5: '/assets/shared/icons/ps5.jpg',
  Xbox: '/assets/shared/icons/xbox.png',
}

function PlatformFallbackIcon({ platform }) {
  if (platform === 'PC') return <Monitor className="w-4 h-4 text-white/60 group-hover:text-[#6CABDD]" />
  if (platform === 'Mobile') return <Smartphone className="w-4 h-4 text-white/60 group-hover:text-[#6CABDD]" />
  if (platform === 'Switch') return <Gamepad2 className="w-4 h-4 text-white/60 group-hover:text-[#6CABDD]" />
  return <span className="text-[10px] text-white/60 group-hover:text-[#6CABDD]">{platform}</span>
}

const GAMING_SURVEY_QUESTIONS = [
  {
    id: 'fav-genre',
    question: 'What\'s your favourite game genre?',
    options: ['Sports / Football', 'Battle Royale', 'RPG / Adventure', 'Simulation', 'Puzzle / Casual'],
    credits: 15,
  },
  {
    id: 'play-time',
    question: 'How many hours per week do you game?',
    options: ['1-3 hours', '4-8 hours', '9-15 hours', '16+ hours'],
    credits: 15,
  },
  {
    id: 'fav-platform',
    question: 'What\'s your primary gaming platform?',
    options: ['PlayStation', 'Xbox', 'PC', 'Mobile', 'Nintendo Switch'],
    credits: 15,
  },
  {
    id: 'fav-player',
    question: 'Who\'s your favourite Man City player?',
    options: ['Haaland', 'Foden', 'De Bruyne', 'Grealish', 'Other'],
    credits: 10,
  },
]

const ACHIEVEMENTS = [
  { name: 'First Game', desc: 'Play your first Man City game', icon: Gamepad2, unlocked: true },
  { name: 'Connector', desc: 'Link 3 game accounts', icon: Link2, unlocked: false, progress: '1/3' },
  { name: 'Social Star', desc: 'Share a gaming moment on social', icon: Share2, unlocked: false },
  { name: 'Marathon Gamer', desc: 'Play 10 sessions in a week', icon: Clock, unlocked: false, progress: '3/10' },
  { name: 'Challenge Champion', desc: 'Complete 5 weekly challenges', icon: Trophy, unlocked: false, progress: '1/5' },
  { name: 'Top 100', desc: 'Reach top 100 on the leaderboard', icon: BarChart3, unlocked: false },
]

export default function GamesHubScreen({
  creditBalance,
  setCreditBalance,
  totalCreditsEarned,
  setTotalCreditsEarned,
  gamesPlayed,
  setGamesPlayed,
  onTierUp,
  connectedAccounts,
  setConnectedAccounts,
}) {
  const [launchingGame, setLaunchingGame] = useState(null)
  const [connectingGame, setConnectingGame] = useState(null)
  const [showCredit, setShowCredit] = useState(false)
  const [creditAmount, setCreditAmount] = useState(0)
  const [launchPlatform, setLaunchPlatform] = useState(null)
  const [connectedGames, setConnectedGames] = useState([])
  const [surveyStep, setSurveyStep] = useState(0)
  const [surveyDone, setSurveyDone] = useState(false)
  const [surveyAnswers, setSurveyAnswers] = useState({})
  const [showSurvey, setShowSurvey] = useState(false)
  const [sharedMoments, setSharedMoments] = useState(0)

  const handleConnectGame = useCallback((game) => {
    if (connectedGames.includes(game.id)) return
    setConnectedGames(g => [...g, game.id])
    const credits = game.connectCredits || 20
    setCreditBalance(b => b + credits)
    setTotalCreditsEarned(t => {
      const newTotal = t + credits
      onTierUp(t, newTotal)
      return newTotal
    })
    setCreditAmount(credits)
    setShowCredit(true)
    setTimeout(() => setShowCredit(false), 1500)
  }, [connectedGames, onTierUp, setCreditBalance, setTotalCreditsEarned])

  const handlePlatformSelect = useCallback(
    (game, platform) => {
      setConnectingGame(null)
      setLaunchPlatform(platform)
      setLaunchingGame(game)
      setTimeout(() => {
        setLaunchingGame(null)
        setLaunchPlatform(null)
        setCreditBalance(b => b + game.credits)
        setTotalCreditsEarned(t => {
          const newTotal = t + game.credits
          onTierUp(t, newTotal)
          return newTotal
        })
        setGamesPlayed(g => [...g, { name: game.name, platform }])
        setCreditAmount(game.credits)
        setShowCredit(true)
        setTimeout(() => setShowCredit(false), 1500)
      }, 2000)
    },
    [onTierUp, setCreditBalance, setGamesPlayed, setTotalCreditsEarned]
  )

  function handleSurveyAnswer(questionId, answer) {
    setSurveyAnswers(prev => ({ ...prev, [questionId]: answer }))
    const question = GAMING_SURVEY_QUESTIONS[surveyStep]
    setCreditBalance(b => b + question.credits)
    setTotalCreditsEarned(t => {
      const newTotal = t + question.credits
      onTierUp(t, newTotal)
      return newTotal
    })
    setCreditAmount(question.credits)
    setShowCredit(true)
    setTimeout(() => setShowCredit(false), 1500)

    if (surveyStep < GAMING_SURVEY_QUESTIONS.length - 1) {
      setSurveyStep(s => s + 1)
    } else {
      setSurveyDone(true)
      setShowSurvey(false)
    }
  }

  function handleShareMoment() {
    setSharedMoments(s => s + 1)
    const credits = 25
    setCreditBalance(b => b + credits)
    setTotalCreditsEarned(t => {
      const newTotal = t + credits
      onTierUp(t, newTotal)
      return newTotal
    })
    setCreditAmount(credits)
    setShowCredit(true)
    setTimeout(() => setShowCredit(false), 1500)
  }

  return (
    <div className="relative min-h-screen" style={{ animation: 'slide-in 0.4s ease-out' }}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/leaderboard/backgrounds/stadium.jpeg')" }} />
      <div className="absolute inset-0 bg-[#0A0E17]/85" />
      <div className="relative z-10 p-6">
      <CreditAward
        key={creditAmount}
        amount={creditAmount}
        show={showCredit}
        onDone={() => setShowCredit(false)}
      />

      {/* Connect Platform Modal */}
      {connectingGame && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0A0E17] border border-white/15 rounded-2xl p-8 max-w-sm w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold uppercase text-white">Connect & Play</h3>
              <button onClick={() => setConnectingGame(null)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={connectingGame.image} alt={connectingGame.name} className="w-full h-32 object-cover rounded-xl mb-4" />
            <p className="text-[#8899AA] text-sm mb-4">Select your platform to connect and start earning credits</p>
            <div className="space-y-2">
              {connectingGame.platforms.map(p => {
                const iconSrc = PLATFORM_ICONS[p]
                return (
                  <button
                    key={p}
                    onClick={() => handlePlatformSelect(connectingGame, p)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#6CABDD]/50 hover:bg-white/10 transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      {iconSrc ? (
                        <img src={iconSrc} alt={p} className="w-5 h-5 object-contain" />
                      ) : (
                        <PlatformFallbackIcon platform={p} />
                      )}
                    </div>
                    <span className="text-white font-medium">{p}</span>
                    <span className="ml-auto text-[#8899AA] text-sm">Connect</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Launch Modal */}
      {launchingGame && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0A0E17] border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
            <Gamepad2 className="w-12 h-12 text-[#6CABDD] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {launchPlatform ? `Connecting to ${launchPlatform}...` : `Launching ${launchingGame.name}...`}
            </h3>
            <p className="text-[#8899AA] text-sm mb-4">
              {launchPlatform ? `Launching ${launchingGame.name}` : 'Your City Credits will be tracked'}
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#6CABDD] animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-[#6CABDD] animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-[#6CABDD] animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Gaming Survey Modal */}
      {showSurvey && !surveyDone && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0A0E17] border border-white/15 rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold uppercase text-white">Gaming Profile</h3>
              <button onClick={() => setShowSurvey(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-1 mb-4">
              {GAMING_SURVEY_QUESTIONS.map((_, i) => (
                <div key={i} className={`flex-1 h-1 rounded-full ${i <= surveyStep ? 'bg-[#e6ff00]' : 'bg-white/10'}`} />
              ))}
            </div>

            <p className="text-[#8899AA] text-xs mb-1">Question {surveyStep + 1} of {GAMING_SURVEY_QUESTIONS.length}</p>
            <p className="text-white font-bold text-lg mb-4">{GAMING_SURVEY_QUESTIONS[surveyStep].question}</p>

            <div className="space-y-2">
              {GAMING_SURVEY_QUESTIONS[surveyStep].options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleSurveyAnswer(GAMING_SURVEY_QUESTIONS[surveyStep].id, opt)}
                  className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#6CABDD]/50 hover:bg-white/10 transition-all text-white text-sm"
                >
                  {opt}
                </button>
              ))}
            </div>

            <p className="text-[#D4A843] text-xs font-bold mt-4 text-center">
              +{GAMING_SURVEY_QUESTIONS[surveyStep].credits} credits per answer
            </p>
          </div>
        </div>,
        document.body
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Gamepad2 className="w-6 h-6 text-[#6CABDD]" />
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white">PLAY</h1>
      </div>
      <p className="text-[#8899AA] mb-8">Launch any Man City game and earn City Credits</p>

      {/* Gaming Profile Survey CTA */}
      {!surveyDone && (
        <GlassCard
          className="!border-[#D4A843]/30 cursor-pointer hover:bg-white/10 transition-all mb-6"
          onClick={() => setShowSurvey(true)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4A843]/10 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 text-[#D4A843]" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold">Tell us about your gaming</h3>
              <p className="text-[#8899AA] text-sm">Answer 4 quick questions and earn +55 credits</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#8899AA]" />
          </div>
        </GlassCard>
      )}

      {/* Game Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAMES.map(game => {
          return (
            <GlassCard key={game.id} className="hover:bg-white/10 hover:translate-y-[-2px] transition-all duration-300 flex flex-col">
              <div className="rounded-xl mb-4 relative overflow-hidden h-[180px]">
                {game.badge && (
                  <span className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded text-xs font-bold ${
                    game.badge === 'NEW' ? 'bg-[#e6ff00] text-[#001838]' : 'bg-[#D4A843] text-black'
                  }`}>
                    {game.badge}
                  </span>
                )}
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <h3 className="text-lg font-semibold text-white mb-1">{game.name}</h3>

              {/* Platform Icons */}
              <div className="flex flex-wrap gap-2 mb-3">
                {game.platforms.map(p => {
                  const iconSrc = PLATFORM_ICONS[p]
                  return (
                    <div
                      key={p}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center opacity-50 hover:opacity-100 hover:border-[#6CABDD]/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                      title={p}
                    >
                      {iconSrc ? (
                        <img src={iconSrc} alt={p} className="w-5 h-5 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                      ) : (
                        <PlatformFallbackIcon platform={p} />
                      )}
                    </div>
                  )
                })}
              </div>

              <p className="text-sm text-[#8899AA] mb-4 flex-1">{game.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-[#D4A843] font-bold text-sm">+{game.credits} credits</span>
                <div className="flex gap-2">
                  {!connectedGames.includes(game.id) ? (
                    <button
                      onClick={() => handleConnectGame(game)}
                      className="border border-[#6CABDD]/50 text-[#6CABDD] hover:bg-[#6CABDD]/10 font-bold py-2 px-3 rounded-xl text-sm transition-all flex items-center gap-1.5"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      Connect
                    </button>
                  ) : (
                    <span className="text-[#6CABDD] text-xs font-medium flex items-center gap-1 px-3 py-2">
                      <Link2 className="w-3.5 h-3.5" /> Linked
                    </span>
                  )}
                  <button
                    onClick={() => setConnectingGame(game)}
                    disabled={!!launchingGame}
                    className="bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-2 px-5 rounded-xl text-sm transition-all hover:scale-[1.02] disabled:opacity-50"
                  >
                    Play Now
                  </button>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* Share Your Moment + Weekly Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {/* Share Gaming Moment */}
        <GlassCard className="!border-[#6CABDD]/20">
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="w-5 h-5 text-[#6CABDD]" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Share a Moment</h3>
          </div>
          <p className="text-[#8899AA] text-sm mb-4">Share your gaming highlights on social media and earn credits every time</p>
          <div className="flex items-center gap-3 mb-4">
            {['/assets/shared/icons/x.png', '/assets/shared/icons/instagram.png', '/assets/shared/icons/facebook.png', '/assets/shared/icons/discord.png'].map((src, i) => (
              <button
                key={i}
                onClick={handleShareMoment}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#6CABDD]/50 hover:bg-white/10 flex items-center justify-center transition-all"
              >
                <img src={src} alt="" className="w-5 h-5 object-contain" />
              </button>
            ))}
          </div>
          <p className="text-[#D4A843] text-xs font-bold">+25 credits per share — {sharedMoments} shared today</p>
        </GlassCard>

        {/* Weekly Challenge */}
        <GlassCard className="relative overflow-hidden border-[#e6ff00]/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#e6ff00]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#e6ff00]/10 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-[#e6ff00]" />
            </div>
            <div className="flex-1">
              <p className="text-[#e6ff00] text-xs font-bold uppercase tracking-wider mb-1">Weekly Challenge</p>
              <h3 className="text-lg font-bold text-white mb-1">Play 3 different games this week</h3>
              <p className="text-[#8899AA] text-sm mb-3">Earn 100 bonus credits for completing this challenge</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#e6ff00] rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (gamesPlayed.length / 3) * 100)}%` }} />
                </div>
                <span className="text-sm font-bold text-white">{Math.min(gamesPlayed.length, 3)}/3</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Achievements */}
      <div className="mt-10">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#D4A843]" /> Achievements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {ACHIEVEMENTS.map((ach, i) => (
            <div
              key={i}
              className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-4 text-center transition-all ${
                ach.unlocked
                  ? 'border-[#D4A843]/40 bg-[#D4A843]/5'
                  : 'border-white/10 opacity-50'
              }`}
            >
              <ach.icon className={`w-6 h-6 mx-auto mb-2 ${ach.unlocked ? 'text-[#D4A843]' : 'text-[#8899AA]'}`} />
              <p className="text-xs font-bold text-white mb-0.5">{ach.name}</p>
              <p className="text-[9px] text-[#8899AA]">{ach.desc}</p>
              {ach.progress && !ach.unlocked && (
                <p className="text-[10px] text-[#6CABDD] font-bold mt-1">{ach.progress}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Friends Playing & Your Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Friends Playing Now */}
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#6CABDD]" /> Friends Playing
          </h2>
          <GlassCard>
            <div className="space-y-3">
              {[
                { name: 'Alex M.', game: 'EA Sports FC 26', platform: 'PS5', status: 'online' },
                { name: 'Jordan K.', game: 'Roblox — Blue Moon', platform: 'PC', status: 'online' },
                { name: 'Sam T.', game: 'Football League 2026', platform: 'Mobile', status: 'away' },
              ].map((friend, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6CABDD]/30 to-[#1C2C5B]/80 flex items-center justify-center text-xs font-bold text-white">
                    {friend.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{friend.name}</p>
                    <p className="text-xs text-[#8899AA] truncate">{friend.game} — {friend.platform}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${friend.status === 'online' ? 'bg-[#e6ff00]' : 'bg-[#D4A843]'}`} />
                </div>
              ))}
            </div>
            <p className="text-[#6CABDD] text-xs mt-3 cursor-pointer hover:underline">Invite friends to earn 50 credits each</p>
          </GlassCard>
        </div>

        {/* Your Stats */}
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#D4A843]" /> Your Stats
          </h2>
          <GlassCard>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Games Played', value: gamesPlayed.length, icon: Gamepad2 },
                { label: 'Accounts Linked', value: connectedGames.length, icon: Link2 },
                { label: 'Credits from Games', value: gamesPlayed.reduce((sum, g) => sum + (GAMES.find(x => x.name === g.name)?.credits || 30), 0), icon: Trophy },
                { label: 'This Week', value: `${Math.min(gamesPlayed.length, 7)} sessions`, icon: Target },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
                  <stat.icon className="w-4 h-4 text-[#6CABDD] mx-auto mb-1.5" />
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-[#8899AA] uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
      </div>
    </div>
  )
}
