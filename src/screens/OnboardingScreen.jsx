import { useState } from 'react'
import { Mail, ChevronRight, Check, X as XIcon } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import CreditAward from '../components/CreditAward'

const SOCIAL_PLATFORMS = [
  { id: 'x', name: 'X (Twitter)', credits: 30, abbr: 'X', handle: '@CityFan' },
  { id: 'instagram', name: 'Instagram', credits: 25, abbr: 'IG', handle: '@cityfan' },
  { id: 'facebook', name: 'Facebook', credits: 25, abbr: 'FB', handle: 'City Fan' },
  { id: 'discord', name: 'Discord', credits: 20, abbr: 'DC', handle: 'CityFan#1234' },
  { id: 'youtube', name: 'YouTube', credits: 20, abbr: 'YT', handle: 'CityFan' },
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
    <div className="min-h-screen bg-[#0A0E17] flex items-center justify-center p-6">
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
                  <span className="text-lg">G</span>
                  Continue with Google
                </button>
                <button
                  onClick={() => handleSignIn('apple')}
                  className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                >
                  <span className="text-lg"></span>
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
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold">
                          {platform.abbr}
                        </div>
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
              <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-[#22C55E]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">You're in. Let's play.</h2>
              <p className="text-[#8899AA] mb-6">Welcome to Man City Rewards</p>

              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <p className="text-[#8899AA] text-sm mb-1">Credits earned so far</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-[#6CABDD] to-[#D4A843] bg-clip-text text-transparent">
                  {totalOnboardingCredits}
                </p>
                <div className="mt-3 space-y-1 text-sm text-left">
                  <div className="flex justify-between text-[#8899AA]">
                    <span>Sign-up bonus</span>
                    <span className="text-[#D4A843]">+50</span>
                  </div>
                  {connectedAccounts.map(id => {
                    const p = SOCIAL_PLATFORMS.find(s => s.id === id)
                    return (
                      <div key={id} className="flex justify-between text-[#8899AA]">
                        <span>{p.name}</span>
                        <span className="text-[#D4A843]">+{p.credits}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-3 px-8 rounded-xl transition-all hover:scale-[1.02]"
                style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
              >
                Go to Dashboard <ChevronRight className="w-5 h-5 inline ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
