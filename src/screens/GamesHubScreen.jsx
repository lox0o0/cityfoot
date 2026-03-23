import { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Gamepad2, X, Monitor, Smartphone } from 'lucide-react'
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

export default function GamesHubScreen({
  creditBalance,
  setCreditBalance,
  totalCreditsEarned,
  setTotalCreditsEarned,
  gamesPlayed,
  setGamesPlayed,
  onTierUp,
}) {
  const [launchingGame, setLaunchingGame] = useState(null)
  const [connectingGame, setConnectingGame] = useState(null)
  const [showCredit, setShowCredit] = useState(false)
  const [creditAmount, setCreditAmount] = useState(0)
  const [launchPlatform, setLaunchPlatform] = useState(null)

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

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Gamepad2 className="w-6 h-6 text-[#6CABDD]" />
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white">PLAY</h1>
      </div>
      <p className="text-[#8899AA] mb-8">Launch any Man City game and earn City Credits</p>

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
                <button
                  onClick={() => setConnectingGame(game)}
                  disabled={!!launchingGame}
                  className="bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-2 px-5 rounded-xl text-sm transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  Play Now
                </button>
              </div>
            </GlassCard>
          )
        })}
      </div>
      </div>
    </div>
  )
}
