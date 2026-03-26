import { useState } from 'react'
import { Mail, ChevronRight, Check, X as XIcon, Lock, Image, Tag, Pen } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import CreditAward from '../components/CreditAward'
import TopLeftCrest from '../components/TopLeftCrest'

const SOCIAL_PLATFORMS = [
  { id: 'x', name: 'X (Twitter)', credits: 30, abbr: 'X', handle: '@CityFan', icon: '/assets/shared/icons/x.png' },
  { id: 'instagram', name: 'Instagram', credits: 25, abbr: 'IG', handle: '@cityfan', icon: '/assets/shared/icons/instagram.png' },
  { id: 'facebook', name: 'Facebook', credits: 25, abbr: 'FB', handle: 'City Fan', icon: '/assets/shared/icons/facebook.png' },
  { id: 'discord', name: 'Discord', credits: 20, abbr: 'DC', handle: 'CityFan#1234', icon: '/assets/shared/icons/discord.png' },
  { id: 'youtube', name: 'YouTube', credits: 20, abbr: 'YT', handle: 'CityFan', icon: '/assets/shared/icons/youtube.jpg' },
]

export default function OnboardingScreen({
  onNavigate,
  connectedAccounts,
  setConnectedAccounts,
  creditBalance,
  setCreditBalance,
  totalCreditsEarned,
  setTotalCreditsEarned,
  setUserName,
  setUserEmail,
}) {
  const [step, setStep] = useState(1)
  const [showCredit, setShowCredit] = useState(false)
  const [creditAmount, setCreditAmount] = useState(0)
  const [emailInput, setEmailInput] = useState('')

  const socialCredits = connectedAccounts.reduce((sum, id) => {
    const p = SOCIAL_PLATFORMS.find(s => s.id === id)
    return sum + (p ? p.credits : 0)
  }, 0)

  const totalOnboardingCredits = 50 + socialCredits
  const profileCompletion = 20 + connectedAccounts.length * 16

  function handleSignIn(method) {
    if (method === 'email') {
      setUserName('City Fan')
      setUserEmail(emailInput || 'fan@example.com')
    } else {
      setUserName(method === 'google' ? 'Alex Johnson' : 'Alex J.')
      setUserEmail(method === 'google' ? 'alex.j@gmail.com' : 'alex@icloud.com')
    }
    setCreditBalance(b => b + 50)
    setTotalCreditsEarned(t => t + 50)
    setCreditAmount(50)
    setShowCredit(true)
    setTimeout(() => {
      setShowCredit(false)
      setStep(2)
    }, 1500)
  }

  function toggleSocial(id) {
    const platform = SOCIAL_PLATFORMS.find(s => s.id === id)
    if (connectedAccounts.includes(id)) {
      setConnectedAccounts(c => c.filter(x => x !== id))
      setCreditBalance(b => b - platform.credits)
      setTotalCreditsEarned(t => t - platform.credits)
    } else {
      setConnectedAccounts(c => [...c, id])
      setCreditBalance(b => b + platform.credits)
      setTotalCreditsEarned(t => t + platform.credits)
      setCreditAmount(platform.credits)
      setShowCredit(true)
      setTimeout(() => setShowCredit(false), 1500)
    }
  }

  function handleFinish() {
    onNavigate('dashboard')
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6" style={{ backgroundImage: "url('/assets/leaderboard/backgrounds/stadium.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-[#0A0E17]/90" />
      <div className="relative z-10 w-full flex flex-col items-center">
      <TopLeftCrest />
      <CreditAward amount={creditAmount} show={showCredit} onDone={() => setShowCredit(false)} />

      <div className="max-w-lg w-full" style={{ animation: 'slide-in 0.5s ease-out' }}>
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  s < step ? 'bg-[#22C55E] text-white'
                  : s === step ? 'bg-[#6CABDD] text-white'
                  : 'bg-white/10 text-[#8899AA]'
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-0.5 ${s < step ? 'bg-[#22C55E]' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-8">
          {/* Step 1: Sign In */}
          {step === 1 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Start earning City Credits</h2>
              <p className="text-[#8899AA] mb-8">Quick sign-in to get started</p>

              <div className="space-y-3">
                <button
                  onClick={() => handleSignIn('google')}
                  className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                >
                  <img src="/assets/shared/icons/google.jpg" alt="Google" className="w-5 h-5 rounded-full" />
                  Continue with Google
                </button>
                <button
                  onClick={() => handleSignIn('apple')}
                  className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                >
                  <img src="/assets/shared/icons/apple.jpg" alt="Apple" className="w-5 h-5 rounded-full" />
                  Continue with Apple
                </button>

                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[#8899AA] text-sm">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#8899AA] focus:outline-none focus:border-[#6CABDD]"
                  />
                  <button
                    onClick={() => handleSignIn('email')}
                    className="bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-3 px-6 rounded-xl transition-all hover:scale-[1.02]"
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Social Connections */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 text-center">Connect your accounts</h2>
              <p className="text-[#8899AA] text-center mb-2">Earn bonus credits for each connection</p>

              <div className="mb-6">
                <div className="flex justify-between text-xs text-[#8899AA] mb-1">
                  <span>Profile Completion</span>
                  <span>{Math.min(profileCompletion, 100)}%</span>
                </div>
                <ProgressBar current={profileCompletion} max={100} />
              </div>

              <div className="space-y-3 mb-6">
                {SOCIAL_PLATFORMS.map(platform => {
                  const connected = connectedAccounts.includes(platform.id)
                  return (
                    <button
                      key={platform.id}
                      onClick={() => toggleSocial(platform.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                        connected
                          ? 'bg-[#22C55E]/10 border-[#22C55E]/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {platform.icon ? (
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-black flex items-center justify-center flex-shrink-0">
                            <img src={platform.icon} alt={platform.name} className={`w-5 h-5 object-contain ${!connected ? 'grayscale' : ''}`} />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {platform.abbr}
                          </div>
                        )}
                        <div className="text-left">
                          <p className="text-white font-medium text-sm">{platform.name}</p>
                          {connected && (
                            <p className="text-[#22C55E] text-xs">{platform.handle}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!connected && (
                          <span className="text-[#D4A843] text-sm font-bold">+{platform.credits}</span>
                        )}
                        {connected ? (
                          <div className="w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#8899AA]" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-3 px-6 rounded-xl transition-all hover:scale-[1.02]"
                >
                  Continue
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="border border-white/20 text-[#8899AA] hover:text-white hover:bg-white/5 py-3 px-6 rounded-xl text-sm transition-all"
                >
                  Skip
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-4"
                style={{
                  boxShadow: '0 0 40px rgba(34, 197, 94, 0.3), 0 0 80px rgba(34, 197, 94, 0.1)',
                  animation: 'count-pop 0.5s ease-out',
                }}
              >
                <Check className="w-10 h-10 text-[#22C55E]" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-1 uppercase tracking-tight">You're in. Let's play.</h2>
              <p className="text-[#6CABDD] mb-6 font-medium">Your journey to Legend starts now</p>

              {/* Glowing Credits Counter — massive, unmissable */}
              <div
                className="relative bg-gradient-to-br from-[#6CABDD]/10 via-white/5 to-[#D4A843]/10 rounded-2xl p-6 mb-6 border border-[#e6ff00]/20 overflow-hidden"
              >
                {/* Animated glow orb behind the number */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(230, 255, 0, 0.4) 0%, transparent 70%)',
                    animation: 'pulse-glow 2s ease-in-out infinite',
                  }}
                />
                <p className="relative text-[#8899AA] text-xs uppercase tracking-widest mb-2 font-bold">Your City Credits</p>
                <p
                  className="relative text-5xl font-extrabold bg-gradient-to-r from-[#6CABDD] via-[#e6ff00] to-[#D4A843] bg-clip-text text-transparent leading-none"
                  style={{
                    animation: 'count-pop 0.6s ease-out',
                    filter: 'drop-shadow(0 0 30px rgba(230, 255, 0, 0.5)) drop-shadow(0 0 60px rgba(108, 171, 221, 0.3))',
                  }}
                >
                  {totalOnboardingCredits}
                </p>
                <p className="relative text-[#e6ff00]/60 text-xs mt-1 font-medium">and counting</p>
                <div className="relative mt-4 space-y-1 text-sm text-left">
                  <div className="flex justify-between text-[#8899AA]">
                    <span>Sign-up bonus</span>
                    <span className="text-[#e6ff00] font-bold">+50</span>
                  </div>
                  {connectedAccounts.map(id => {
                    const p = SOCIAL_PLATFORMS.find(s => s.id === id)
                    return (
                      <div key={id} className="flex justify-between text-[#8899AA]">
                        <span>{p.name}</span>
                        <span className="text-[#e6ff00] font-bold">+{p.credits}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Reward Tiers — escalating excitement */}
              <div className="mb-6">
                <p className="text-[#e6ff00] text-sm font-extrabold mb-1 uppercase tracking-widest">This is what you're unlocking</p>
                <p className="text-[#8899AA] text-xs mb-4">Real rewards. Not points that expire.</p>

                <div className="space-y-3">
                  {/* Tier 1: Claimable NOW — green glow pulse */}
                  <div
                    className="relative bg-white/5 border border-[#22C55E]/40 rounded-xl px-4 py-3 text-left overflow-hidden"
                    style={{
                      boxShadow: '0 0 20px rgba(34, 197, 94, 0.15)',
                      animation: 'slide-in 0.4s ease-out',
                    }}
                  >
                    <div className="absolute top-0 right-0 bg-[#22C55E] text-[8px] font-bold text-white uppercase tracking-wider px-2.5 py-0.5 rounded-bl-lg" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}>Ready to claim</div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <Image className="w-5 h-5 text-[#6CABDD]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-bold">Exclusive Digital Wallpaper Pack</p>
                        <p className="text-[#8899AA] text-xs">Haaland, Foden & squad — 4K, mobile & desktop</p>
                      </div>
                      <span className="text-[#22C55E] text-sm font-bold whitespace-nowrap">50 credits</span>
                    </div>
                  </div>

                  {/* Tier 2: Within reach ~200 credits — Puma voucher */}
                  <div
                    className="relative bg-white/5 border border-[#D4A843]/25 rounded-xl px-4 py-3 text-left overflow-hidden"
                    style={{ animation: 'slide-in 0.5s ease-out' }}
                  >
                    <div className="absolute top-0 right-0 bg-[#D4A843] text-[8px] font-bold text-[#001838] uppercase tracking-wider px-2.5 py-0.5 rounded-bl-lg">Almost there</div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center shrink-0">
                        <img src="/assets/shared/sponsors/puma-white.png" alt="Puma" className="w-6 h-6 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-bold">Puma x Man City Voucher</p>
                        <p className="text-[#8899AA] text-xs">{'\u00A3'}15 off any Puma x Man City product</p>
                      </div>
                      <span className="text-[#D4A843] text-sm font-bold whitespace-nowrap">200 credits</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#D4A843] to-[#e6ff00] rounded-full transition-all"
                          style={{ width: `${Math.min(100, (totalOnboardingCredits / 200) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#D4A843] font-bold">{Math.max(0, 200 - totalOnboardingCredits)} to go</span>
                    </div>
                  </div>

                  {/* Tier 3: The dream — Signed Jersey with gold shimmer */}
                  <div
                    className="relative bg-gradient-to-r from-[#D4A843]/5 to-white/5 border border-[#D4A843]/30 rounded-xl px-4 py-4 text-left overflow-hidden"
                    style={{ animation: 'slide-in 0.6s ease-out' }}
                  >
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(110deg, transparent 33%, rgba(212, 168, 67, 0.3) 50%, transparent 67%)', backgroundSize: '200% 100%', animation: 'shimmer 3s ease-in-out infinite' }} />
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-[#D4A843] to-[#e6ff00] text-[8px] font-extrabold text-[#001838] uppercase tracking-wider px-2.5 py-0.5 rounded-bl-lg">Legendary</div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-[#D4A843]/30"
                        style={{ boxShadow: '0 0 15px rgba(212, 168, 67, 0.2)' }}
                      >
                        <Pen className="w-6 h-6 text-[#D4A843]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold">Signed Man City Jersey</p>
                        <p className="text-[#D4A843] text-xs font-medium">Authenticated 25/26 first-team signatures</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[#D4A843] text-lg font-extrabold">2,500</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Lock className="w-2.5 h-2.5 text-[#8899AA]" />
                          <span className="text-[9px] text-[#8899AA]">Centurion Tier</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[#8899AA] text-[11px] mt-3">Play games, connect platforms, complete challenges — credits stack fast</p>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-extrabold py-4 px-8 rounded-xl text-lg transition-all hover:scale-[1.02]"
                style={{
                  animation: 'pulse-glow 2s ease-in-out infinite',
                  boxShadow: '0 0 30px rgba(230, 255, 0, 0.3), 0 0 60px rgba(230, 255, 0, 0.1)',
                }}
              >
                Let's Go <ChevronRight className="w-5 h-5 inline ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}
