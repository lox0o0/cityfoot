import { Shield, Check, X, User, Mail, Phone, Calendar, Link2, Gamepad2, Trophy, Flame, Gift } from 'lucide-react'
import { getTierForCredits } from '../utils/credits'

const SOCIAL_NAMES = {
  x: { name: 'X (Twitter)', handle: '@CityFan', icon: '/assets/shared/icons/x.png' },
  instagram: { name: 'Instagram', handle: '@cityfan', icon: '/assets/shared/icons/instagram.png' },
  facebook: { name: 'Facebook', handle: 'City Fan', icon: '/assets/shared/icons/facebook.png' },
  discord: { name: 'Discord', handle: 'CityFan#1234', icon: '/assets/shared/icons/discord.png' },
  youtube: { name: 'YouTube', handle: 'CityFan', icon: null },
}

export default function AdminScreen({
  userName,
  userEmail,
  connectedAccounts,
  totalCreditsEarned,
  creditBalance,
  gamesPlayed,
  claimedRewards,
  streakWeeks,
}) {
  const tier = getTierForCredits(totalCreditsEarned)
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  const uniqueGames = [...new Set(gamesPlayed.map(g => typeof g === 'string' ? g : g.name))]

  return (
    <div className="relative min-h-screen" style={{ animation: 'slide-in 0.4s ease-out' }}>
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/leaderboard/backgrounds/adminpic.webp')" }} />
      <div className="absolute inset-0 bg-[#0F1520]/90" />
      <div className="relative z-10 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Shield className="w-6 h-6 text-[#6CABDD]" />
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white">City Football -- Audience Dashboard</h1>
        <span className="ml-3 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-[#6CABDD]/20 text-[#6CABDD] border border-[#6CABDD]/30">
          Admin View
        </span>
      </div>
      <p className="text-[#8899AA]">Backend data capture view -- what City Football sees</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile Card */}
        <div className="bg-[#1C2C5B]/30 backdrop-blur-xl border border-[#6CABDD]/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#6CABDD]" /> User Profile
          </h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6CABDD] to-[#1C2C5B] flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">{userName || 'Demo User'}</p>
                <p className="text-[#8899AA] text-sm">{userEmail || 'fan@example.com'}</p>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[#8899AA]">
                  <Mail className="w-4 h-4 inline mr-1" /> Email
                </p>
                <p className="text-white">{userEmail || 'fan@example.com'}</p>
              </div>
              <div>
                <p className="text-[#8899AA]">
                  <Phone className="w-4 h-4 inline mr-1" /> Phone
                </p>
                <p className="text-white/50">Not captured</p>
              </div>
              <div>
                <p className="text-[#8899AA]">
                  <Calendar className="w-4 h-4 inline mr-1" /> Sign-up Date
                </p>
                <p className="text-white">{today}</p>
              </div>
              <div>
                <p className="text-[#8899AA]">
                  <Link2 className="w-4 h-4 inline mr-1" /> Referral Source
                </p>
                <p className="text-white">mancity.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="bg-[#1C2C5B]/30 backdrop-blur-xl border border-[#6CABDD]/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-[#6CABDD]" /> Connected Accounts
          </h2>

          <div className="space-y-2">
            {Object.entries(SOCIAL_NAMES).map(([id, info]) => {
              const connected = connectedAccounts.includes(id)
              return (
                <div key={id} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    {info.icon ? (
                      <img src={info.icon} alt="" className={`w-5 h-5 rounded-full object-cover ${!connected ? 'grayscale opacity-50' : ''}`} />
                    ) : connected ? (
                      <Check className="w-4 h-4 text-[#22C55E]" />
                    ) : (
                      <X className="w-4 h-4 text-[#EF4444]" />
                    )}
                    <span className="text-white text-sm font-medium">{info.name}</span>
                  </div>
                  <span className={`text-sm ${connected ? 'text-[#22C55E]' : 'text-[#8899AA]'}`}>
                    {connected ? info.handle : 'Not connected'}
                  </span>
                </div>
              )
            })}

            {/* Game accounts */}
            {['EA FC', 'Roblox'].map(game => {
              const played = gamesPlayed.some(g => {
                const name = typeof g === 'string' ? g : g.name
                return name.toLowerCase().includes(game.toLowerCase().split(' ')[0])
              })
              return (
                <div key={game} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    {played ? (
                      <Check className="w-4 h-4 text-[#22C55E]" />
                    ) : (
                      <X className="w-4 h-4 text-[#8899AA]" />
                    )}
                    <span className="text-white text-sm font-medium">{game}</span>
                  </div>
                  <span className={`text-sm ${played ? 'text-[#22C55E]' : 'text-[#8899AA]'}`}>
                    {played ? 'Self-reported player' : 'Not connected'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Engagement Summary */}
      <div className="bg-[#1C2C5B]/30 backdrop-blur-xl border border-[#6CABDD]/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#D4A843]" /> Engagement Summary
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Gamepad2 className="w-6 h-6 text-[#6CABDD] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{uniqueGames.length}</p>
            <p className="text-xs text-[#8899AA]">Games launched</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Gamepad2 className="w-6 h-6 text-[#6CABDD] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{gamesPlayed.length}</p>
            <p className="text-xs text-[#8899AA]">Total sessions</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Trophy className="w-6 h-6 text-[#D4A843] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{totalCreditsEarned.toLocaleString()}</p>
            <p className="text-xs text-[#8899AA]">Credits earned</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Shield className="w-6 h-6 text-[#6CABDD] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white uppercase">{tier.name}</p>
            <p className="text-xs text-[#8899AA]">Current tier</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Gift className="w-6 h-6 text-[#D4A843] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{claimedRewards.length}</p>
            <p className="text-xs text-[#8899AA]">Rewards claimed</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Flame className="w-6 h-6 text-[#D4A843] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{streakWeeks}</p>
            <p className="text-xs text-[#8899AA]">Week streak</p>
          </div>
        </div>
      </div>

      {/* Key Message */}
      <div className="bg-gradient-to-r from-[#6CABDD]/10 to-[#D4A843]/10 border border-[#6CABDD]/20 rounded-2xl p-6 text-center">
        <p className="text-[#8899AA] text-sm leading-relaxed max-w-2xl mx-auto">
          This is one user. Scale this across your entire fan base -- every person who comes
          through this hub, you know who they are, what games they play, how often, and what
          they engage with. You can reach them directly via email, push notification, or any
          of their connected channels.
        </p>
      </div>
      </div>
    </div>
  )
}
