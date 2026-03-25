import { Home, Gamepad2, Trophy, Gift, Shield } from 'lucide-react'
import McCrest from './McCrest'

const NAV_ITEMS = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'games', icon: Gamepad2, label: 'Games' },
  { id: 'leaderboard', icon: Trophy, label: 'Board' },
  { id: 'rewards', icon: Gift, label: 'Rewards' },
  { id: 'account', icon: Shield, label: 'Account' },
]

export default function Sidebar({ currentScreen, onNavigate }) {
  return (
    <div className="fixed left-0 top-0 h-full w-[70px] bg-[#0A0E17] border-r border-white/10 flex flex-col items-center py-5 z-30">
      <button
        type="button"
        onClick={() => onNavigate('dashboard')}
        className="mb-4 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all hover:border-[#6CABDD]/40 hover:bg-white/10"
        aria-label="Manchester City — Home"
      >
        <McCrest className="h-11 w-11" alt="" />
      </button>

      <div className="w-10 h-px bg-white/15 mb-4" />

      <nav className="flex flex-col gap-2 flex-1">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const active = currentScreen === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all relative ${
                active
                  ? 'bg-[#6CABDD]/20 text-[#6CABDD]'
                  : 'text-[#8899AA] hover:text-white hover:bg-white/5'
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#e6ff00] rounded-r" />
              )}
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-medium">{label}</span>
            </button>
          )
        })}
      </nav>

    </div>
  )
}
