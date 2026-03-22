import { useState, useCallback } from 'react'
import { Gamepad2, X, Trophy, Blocks, Crosshair, Zap, Globe } from 'lucide-react'
import { GAMES } from '../data/games'
import GlassCard from '../components/GlassCard'
import CreditAward from '../components/CreditAward'

const ICON_MAP = {
  Trophy,
  Blocks,
  Crosshair,
  Zap,
  Globe,
}

function GameTileArt({ game, GameIcon }) {
  const [imgFailed, setImgFailed] = useState(false)
  const showArt = game.tileImage && !imgFailed

  return (
    <div
      className={`rounded-xl mb-4 text-center relative flex items-center justify-center min-h-[140px] overflow-hidden ${
        showArt ? '' : `bg-gradient-to-br ${game.gradient} p-6`
      }`}
    >
      {showArt && (
        <>
          <img
            src={game.tileImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        </>
      )}
      {game.badge && (
        <span
          className={`absolute top-2 right-2 z-10 px-2 py-0.5 rounded text-xs font-bold ${
            game.badge === 'NEW' ? 'bg-[#e6ff00] text-[#001838]' : 'text-black'
          }`}
          style={game.badge !== 'NEW' ? { backgroundColor: game.badgeColor || '#D4A843' } : undefined}
        >
          {game.badge}
        </span>
      )}
      {!showArt && <GameIcon className="w-12 h-12 text-white/80 relative z-10" />}
    </div>
  )
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
  const [showCredit, setShowCredit] = useState(false)
  const [creditAmount, setCreditAmount] = useState(0)

  const handlePlay = useCallback(
    game => {
      setLaunchingGame(game)
      setTimeout(() => {
        setLaunchingGame(null)
        setCreditBalance(b => b + game.credits)
        setTotalCreditsEarned(t => {
          const newTotal = t + game.credits
          onTierUp(t, newTotal)
          return newTotal
        })
        setGamesPlayed(g => [...g, game.name])
        setCreditAmount(game.credits)
        // Let the launch modal unmount first so the float-up isn't hidden under overlay / same frame clutter
        requestAnimationFrame(() => {
          setTimeout(() => setShowCredit(true), 80)
        })
      }, 2000)
    },
    [onTierUp, setCreditBalance, setGamesPlayed, setTotalCreditsEarned]
  )

  return (
    <div className="p-6" style={{ animation: 'slide-in 0.4s ease-out' }}>
      <CreditAward
        key={creditAmount}
        amount={creditAmount}
        show={showCredit}
        onDone={() => setShowCredit(false)}
      />

      {/* Launch Modal */}
      {launchingGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0A0E17] border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
            {(() => {
              const LaunchIcon = ICON_MAP[launchingGame.iconName] || Gamepad2
              return <LaunchIcon className="w-12 h-12 text-[#6CABDD] mx-auto mb-4" />
            })()}
            <h3 className="text-xl font-bold text-white mb-2">
              Launching {launchingGame.name}
            </h3>
            <p className="text-[#8899AA] text-sm mb-4">
              Your City Credits will be tracked
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#6CABDD] animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-[#6CABDD] animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-[#6CABDD] animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
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
          const GameIcon = ICON_MAP[game.iconName] || Gamepad2
          return (
            <GlassCard key={game.id} className="hover:bg-white/10 hover:translate-y-[-2px] transition-all duration-300 flex flex-col">
              <GameTileArt game={game} GameIcon={GameIcon} />

              <h3 className="text-lg font-semibold text-white mb-1">{game.name}</h3>

              {/* Platform Badges */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {game.platforms.map(p => (
                  <span key={p} className="text-[10px] text-[#8899AA] bg-white/5 px-2 py-0.5 rounded">
                    {p}
                  </span>
                ))}
              </div>

              <p className="text-sm text-[#8899AA] mb-4 flex-1">{game.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-[#D4A843] font-bold text-sm">+{game.credits} credits</span>
                <button
                  onClick={() => handlePlay(game)}
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
  )
}
