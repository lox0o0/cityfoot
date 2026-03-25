import { useState, useRef, useEffect } from 'react'
import { Flame, Star, Gamepad2, Share2, UserPlus, UserCheck, Shirt, Plane, Beer, Gift, Trophy, Zap, CalendarCheck, MessageCircle, Bell, Target, Clock, Sparkles, Calendar, RotateCw, ChevronRight, Swords, ShieldCheck, Ticket } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import TierBadge from '../components/TierBadge'
import ProgressBar from '../components/ProgressBar'
import Carousel from '../components/Carousel'
import { getTierForCredits, getNextTier } from '../utils/credits'

const ACTIVITIES = [
  { icon: Gamepad2, label: 'Play EA FC', credits: 50, desc: 'Launch and play a match', cta: 'Play' },
  { icon: Gamepad2, label: 'Play Roblox Blue Moon', credits: 30, desc: 'Complete a quest in Blue Moon', cta: 'Play' },
  { icon: Share2, label: 'Share on Social', credits: 20, desc: 'Share your tier badge on X or Instagram', cta: 'Share', socialIcons: ['/assets/shared/icons/x.png', '/assets/shared/icons/instagram.png'] },
  { icon: UserPlus, label: 'Refer a Friend', credits: 100, desc: 'Invite a friend to join City Rewards', cta: 'Invite' },
  { icon: UserCheck, label: 'Complete Profile', credits: 50, desc: 'Add phone number and preferences', cta: 'Complete' },
]

const SPONSORS = [
  {
    name: 'Puma -- Kit Day Deal',
    icon: Shirt,
    logoSrc: '/assets/shared/sponsors/puma-white.png',
    altText: 'Puma',
    desc: 'Shop the latest Puma x Man City collection using code CITYCREDITS at checkout',
    benefit: '20% off + 40 City Credits',
    availability: 'Available: Ongoing',
    cta: 'Shop Now',
  },
  {
    name: 'Etihad Airways -- Fly with City',
    icon: Plane,
    logoSrc: '/assets/shared/sponsors/etihad-white.svg',
    altText: 'Etihad Airways',
    desc: 'Complete a 2-min travel quiz and discover exclusive Etihad offers for Man City fans',
    benefit: '1,000 Etihad Guest Miles + 30 City Credits',
    availability: 'Available: Ongoing',
    cta: 'Start Quiz',
  },
  {
    name: 'Asahi Super Dry -- Matchday Pint',
    icon: Beer,
    logoSrc: '/assets/shared/sponsors/asahi-white.jpg',
    altText: 'Asahi Super Dry',
    desc: 'Show your City Rewards profile at any Etihad Stadium bar on matchday',
    benefit: 'Free Asahi Super Dry + 25 City Credits',
    availability: 'Available: Home matchdays only',
    cta: 'Get Offer',
    note: 'Must be 18+ to claim',
  },
]

const COMMUNITY_FEED = [
  { user: 'BlueMoonRising', action: 'reached Legend tier', time: '2m ago' },
  { user: 'CityTilIDie', action: 'claimed Signed Jersey', time: '5m ago' },
  { user: 'HaalandFan9', action: 'played EA Sports FC 26', time: '12m ago' },
  { user: 'FodenIsKing', action: 'won 200 credits on Daily Spin', time: '18m ago' },
  { user: 'SkyBlue_MCR', action: 'completed Weekly Challenge', time: '25m ago' },
]

const NOTIFICATIONS = [
  { text: 'New Kit Room Drop: Haaland Hat-Trick Badge', type: 'drop', time: '1h ago' },
  { text: 'You\'re 50 credits from Matchday tier', type: 'tier', time: '3h ago' },
  { text: 'Weekly Challenge resets in 2 days', type: 'challenge', time: '6h ago' },
]

const QUICK_ACTIONS = [
  { icon: RotateCw, label: 'Spin the Wheel', nav: 'rewards', accent: '#D4A843' },
  { icon: Gamepad2, label: 'Play Now', nav: 'games', accent: '#6CABDD' },
  { icon: Gift, label: 'Claim Reward', nav: 'rewards', accent: '#e6ff00' },
  { icon: UserPlus, label: 'Invite Friends', nav: null, bonus: '+50 credits', accent: '#22C55E' },
]

const CITYZENS_ACTIVITY = [
  { initials: 'AM', name: 'Alex M.', action: 'just claimed Matchday Tickets', time: '2m ago', color: '#6CABDD' },
  { initials: 'JK', name: 'Jordan K.', action: 'reached Centurion tier', time: '5m ago', color: '#D4A843' },
  { initials: 'ST', name: 'Sam T.', action: 'played EA Sports FC 26', time: '8m ago', color: '#22C55E' },
  { initials: 'PR', name: 'Priya R.', action: 'won 500 credits on Daily Spin', time: '12m ago', color: '#e6ff00' },
  { initials: 'LW', name: 'Liam W.', action: 'unlocked Haaland Badge', time: '18m ago', color: '#6CABDD' },
]

const RECOMMENDATIONS = [
  {
    tag: 'Because you play EA FC 26',
    title: 'Connect your Xbox for +25 credits',
    accent: '#22C55E',
    icon: Gamepad2,
  },
  {
    tag: "You're 150 credits from Matchday tier",
    title: 'Play 3 games to level up',
    accent: '#6CABDD',
    icon: Target,
  },
  {
    tag: 'New Drop',
    title: 'Haaland Hat-Trick Badge — only 7 left',
    accent: '#D4A843',
    icon: Sparkles,
  },
]

const UPCOMING_EVENTS = [
  { title: 'Man City vs Arsenal', date: 'Sat 29 Mar', icon: Swords, accent: '#6CABDD' },
  { title: 'New Kit Room Drop', date: 'Mon 31 Mar', icon: Gift, accent: '#D4A843' },
  { title: 'Double Credits Weekend', date: 'Apr 5–6', icon: Zap, accent: '#e6ff00' },
  { title: 'Man City vs Liverpool', date: 'Sat 12 Apr', icon: Swords, accent: '#6CABDD' },
]

function SponsorBrand({ logoSrc, altText, Icon }) {
  const [failed, setFailed] = useState(false)
  if (failed || !logoSrc) {
    return <Icon className="w-8 h-8 text-[#6CABDD] mb-3" />
  }
  return (
    <img
      src={logoSrc}
      alt={altText || ''}
      className="h-8 object-contain mb-3 opacity-90 mix-blend-lighten"
      onError={() => setFailed(true)}
    />
  )
}

function DashboardSlide({ gradient, title, description, cta, onCta, ctaClass, playerImage }) {
  return (
    <div className={`relative min-h-[220px] md:min-h-[200px] rounded-2xl overflow-hidden ${gradient}`}>
      {playerImage && (
        <img
          src={playerImage}
          alt=""
          className="absolute bottom-0 right-0 max-h-[92%] w-auto max-w-[56%] object-contain object-bottom pointer-events-none select-none"
          onError={e => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent pointer-events-none" />
      <div className="relative z-10 p-8 pr-[40%] md:pr-[44%] text-left">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-[#8899AA] mb-4 text-sm md:text-base">{description}</p>
        <button type="button" onClick={onCta} className={ctaClass}>
          {cta}
        </button>
      </div>
    </div>
  )
}

export default function DashboardScreen({
  creditBalance,
  totalCreditsEarned,
  streakWeeks,
  onNavigate,
}) {
  const tier = getTierForCredits(totalCreditsEarned)
  const nextTier = getNextTier(totalCreditsEarned)
  const [dailyCheckedIn, setDailyCheckedIn] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [homeScore, setHomeScore] = useState('')
  const [awayScore, setAwayScore] = useState('')
  const [predictionSubmitted, setPredictionSubmitted] = useState(false)

  const videoRef = useRef(null)
  const [currentVideo, setCurrentVideo] = useState(0)
  const DASH_VIDEOS = [
    '/assets/landing/videos/vid2.mp4',
    '/assets/landing/videos/vid3.mp4',
    '/assets/landing/videos/vid4.mp4',
    '/assets/landing/videos/vid5.mp4',
  ]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleEnded = () => setCurrentVideo(prev => (prev + 1) % DASH_VIDEOS.length)
    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [currentVideo])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.src = DASH_VIDEOS[currentVideo]
    video.play().catch(() => {})
  }, [currentVideo])

  const btnLime = 'bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-2 px-6 rounded-xl text-sm transition-all hover:scale-[1.02]'
  const btnGold = 'bg-[#D4A843] hover:bg-[#C49A3A] text-black font-bold py-2 px-6 rounded-xl text-sm transition-all hover:scale-[1.02]'

  const carouselSlides = [
    <DashboardSlide
      key="profile"
      gradient="bg-gradient-to-r from-[#6CABDD]/35 to-[#1C2C5B]/55"
      title="Complete Your Profile"
      description="+50 credits to reach next tier. Add your details."
      cta="Complete Profile"
      onCta={() => {}}
      ctaClass={btnLime}
      playerImage="/assets/shared/players/foden.png"
    />,
    <DashboardSlide
      key="challenge"
      gradient="bg-gradient-to-r from-[#D4A843]/30 to-[#1C2C5B]/55"
      title="This Week's Challenge"
      description="Play 3 different Man City games this week for 200 bonus credits"
      cta="View Challenge"
      onCta={() => {}}
      ctaClass={btnGold}
      playerImage="/assets/shared/players/haaland.png"
    />,
    <DashboardSlide
      key="rocket"
      gradient="bg-gradient-to-r from-[#22C55E]/25 to-[#1C2C5B]/50"
      title="New: Rocket League"
      description="Man City just launched in Rocket League. Play now and earn double credits!"
      cta="Play Now"
      onCta={() => onNavigate('games')}
      ctaClass={btnLime}
      playerImage="/assets/shared/players/haaland.png"
    />,
    <DashboardSlide
      key="rewards"
      gradient="bg-gradient-to-r from-[#6CABDD]/30 to-[#D4A843]/25"
      title="Claim Your Rewards"
      description="You have 2 rewards waiting. Don't miss out!"
      cta="View Rewards"
      onCta={() => onNavigate('rewards')}
      ctaClass={btnLime}
      playerImage="/assets/shared/players/foden.png"
    />,
  ]

  return (
    <div className="relative min-h-screen" style={{ animation: 'slide-in 0.4s ease-out' }}>
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover z-0"
        autoPlay muted playsInline
        src={DASH_VIDEOS[0]}
      />
      <div className="fixed inset-0 bg-[#0A0E17]/75 z-0" />
      <div className="relative z-10 p-6 space-y-6">

      {/* Notification Bell */}
      <div className="flex justify-end mb-[-12px]">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
        >
          <Bell className="w-5 h-5 text-[#8899AA]" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#e6ff00] rounded-full" />
        </button>
      </div>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="bg-[#0A0E17]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 space-y-2" style={{ animation: 'slide-in 0.3s ease-out' }}>
          <p className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Notifications</p>
          {NOTIFICATIONS.map((n, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all">
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                n.type === 'drop' ? 'bg-[#D4A843]' : n.type === 'tier' ? 'bg-[#6CABDD]' : 'bg-[#e6ff00]'
              }`} />
              <p className="text-sm text-white flex-1">{n.text}</p>
              <span className="text-xs text-[#8899AA]">{n.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* Hero Carousel */}
      <Carousel slides={carouselSlides} />

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-4 gap-3">
        {QUICK_ACTIONS.map((action, i) => (
          <button
            key={i}
            onClick={() => action.nav ? onNavigate(action.nav) : null}
            className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/10 hover:border-white/25 transition-all hover:scale-[1.03] group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{ backgroundColor: `${action.accent}15` }}
            >
              <action.icon className="w-5 h-5 transition-all" style={{ color: action.accent }} />
            </div>
            <span className="text-white text-xs font-semibold text-center leading-tight">{action.label}</span>
            {action.bonus && (
              <span className="text-[10px] font-bold text-[#22C55E]">{action.bonus}</span>
            )}
          </button>
        ))}
      </div>

      {/* Daily Check-In + XP row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Daily Check-In */}
        <GlassCard className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <CalendarCheck className="w-5 h-5 text-[#e6ff00]" />
            <p className="text-sm font-bold text-white uppercase tracking-wider">Daily Check-In</p>
          </div>
          {dailyCheckedIn ? (
            <div className="text-center py-2">
              <p className="text-[#e6ff00] font-bold">+15 credits earned</p>
              <p className="text-[#8899AA] text-xs mt-1">Come back tomorrow</p>
            </div>
          ) : (
            <button
              onClick={() => setDailyCheckedIn(true)}
              className="w-full bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-3 rounded-xl text-sm transition-all hover:scale-[1.02]"
            >
              Check In (+15 credits)
            </button>
          )}
          <div className="flex gap-1 mt-3">
            {[1, 2, 3, 4, 5, 6, 7].map(d => (
              <div
                key={d}
                className={`flex-1 h-1.5 rounded-full ${d <= 3 ? 'bg-[#e6ff00]' : 'bg-white/10'}`}
              />
            ))}
          </div>
          <p className="text-[#8899AA] text-xs mt-1">Day 3/7 — 7-day streak bonus: +100 credits</p>
        </GlassCard>

        {/* XP / Tier Section */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[#8899AA] text-xs uppercase tracking-wider mb-1">Current Tier</p>
              <TierBadge tierName={tier.name} size="lg" />
            </div>
            <div className="text-right">
              <p className="text-[#8899AA] text-xs uppercase tracking-wider mb-1">City Credits</p>
              <p className="text-5xl font-extrabold bg-gradient-to-r from-[#6CABDD] to-[#D4A843] bg-clip-text text-transparent">
                {creditBalance.toLocaleString()}
              </p>
            </div>
          </div>

          {nextTier && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <TierBadge tierName={tier.name} />
                <span className="text-xs text-[#8899AA]">
                  {totalCreditsEarned.toLocaleString()} / {nextTier.threshold.toLocaleString()} credits
                </span>
                <TierBadge tierName={nextTier.name} />
              </div>
              <ProgressBar current={totalCreditsEarned - tier.threshold} max={nextTier.threshold - tier.threshold} />
            </div>
          )}
        </GlassCard>
      </div>

      {/* Weekly Activities */}
      <div>
        <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Earn More Credits</h2>
        <div className="space-y-3">
          {ACTIVITIES.map((act, i) => (
            <GlassCard key={i} className="!p-4 flex items-center justify-between hover:bg-white/10 hover:translate-y-[-2px] transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6CABDD]/10 flex items-center justify-center">
                  <act.icon className="w-5 h-5 text-[#6CABDD]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium text-sm">{act.label}</p>
                    {act.socialIcons && act.socialIcons.map((src, j) => (
                      <img key={j} src={src} alt="" className="w-4 h-4 rounded-full object-cover" />
                    ))}
                  </div>
                  <p className="text-[#8899AA] text-xs">{act.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#D4A843] font-bold text-sm">+{act.credits}</span>
                <button
                  onClick={() => act.cta === 'Play' ? onNavigate('games') : null}
                  className="bg-white/10 hover:bg-white/15 text-white text-sm py-1.5 px-4 rounded-lg transition-all"
                >
                  {act.cta}
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Spend Your Credits + Community Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spend Your Credits */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4">Spend Your Credits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GlassCard className="cursor-pointer hover:border-[#e6ff00]/30" onClick={() => onNavigate('rewards')}>
              <Gift className="w-6 h-6 text-[#6CABDD] mb-2" />
              <h4 className="text-sm font-bold text-white">Digital Wallpaper Pack</h4>
              <p className="text-[#D4A843] text-sm font-bold mt-1">50 credits</p>
            </GlassCard>
            <GlassCard className="cursor-pointer hover:border-[#e6ff00]/30" onClick={() => onNavigate('rewards')}>
              <Shirt className="w-6 h-6 text-[#6CABDD] mb-2" />
              <h4 className="text-sm font-bold text-white">Puma Voucher £10 Off</h4>
              <p className="text-[#D4A843] text-sm font-bold mt-1">100 credits</p>
            </GlassCard>
            <GlassCard className="cursor-pointer hover:border-[#e6ff00]/30" onClick={() => onNavigate('rewards')}>
              <Trophy className="w-6 h-6 text-[#D4A843] mb-2" />
              <h4 className="text-sm font-bold text-white">Signed Jersey</h4>
              <p className="text-[#D4A843] text-sm font-bold mt-1">2,000 credits</p>
              <p className="text-[#8899AA] text-xs mt-0.5">Requires Centurion</p>
            </GlassCard>
          </div>
        </div>

        {/* Community Feed */}
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#6CABDD]" /> Live
          </h2>
          <GlassCard className="!p-0 overflow-hidden">
            <div className="divide-y divide-white/5">
              {COMMUNITY_FEED.map((item, i) => (
                <div key={i} className="px-4 py-3 hover:bg-white/5 transition-all">
                  <p className="text-sm">
                    <span className="text-[#6CABDD] font-medium">{item.user}</span>{' '}
                    <span className="text-white/70">{item.action}</span>
                  </p>
                  <p className="text-[10px] text-[#8899AA] mt-0.5">{item.time}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Streak Card */}
      <GlassCard className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(230, 255, 0, 0.15), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        />
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#e6ff00]/20 flex items-center justify-center">
            <Flame className="w-8 h-8 text-[#e6ff00]" />
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{streakWeeks} week streak</p>
            <p className="text-[#8899AA] text-sm">Keep your streak to earn bonus credits each week</p>
          </div>
        </div>
      </GlassCard>

      {/* Match Prediction */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[#6CABDD]" />
          <h2 className="text-xl font-bold uppercase tracking-wider text-white font-['Barlow_Condensed']">Predict the Score</h2>
        </div>
        <GlassCard className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#6CABDD]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[#8899AA] text-xs uppercase tracking-wider">Next Fixture</p>
              <span className="text-[10px] bg-white/10 text-[#8899AA] px-2 py-0.5 rounded-full">Premier League</span>
            </div>
            <p className="text-white font-bold text-lg mb-1">Man City vs Arsenal</p>
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-3.5 h-3.5 text-[#8899AA]" />
              <p className="text-[#8899AA] text-sm">Sat 29 Mar, 15:00</p>
            </div>
            {predictionSubmitted ? (
              <div className="text-center py-4">
                <ShieldCheck className="w-8 h-8 text-[#e6ff00] mx-auto mb-2" />
                <p className="text-[#e6ff00] font-bold">Prediction locked in!</p>
                <p className="text-[#8899AA] text-sm mt-1">Man City {homeScore} – {awayScore} Arsenal</p>
                <p className="text-[#8899AA] text-xs mt-2">+25 credits earned. Result revealed after full time.</p>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-[#8899AA] text-xs block mb-1">Man City</label>
                    <input
                      type="number"
                      min="0"
                      max="9"
                      value={homeScore}
                      onChange={e => setHomeScore(e.target.value)}
                      className="w-full bg-white/10 border border-white/15 rounded-xl text-center text-white text-2xl font-bold py-3 focus:outline-none focus:border-[#6CABDD] transition-all"
                      placeholder="–"
                    />
                  </div>
                  <span className="text-[#8899AA] text-lg font-bold mt-5">vs</span>
                  <div className="flex-1">
                    <label className="text-[#8899AA] text-xs block mb-1">Arsenal</label>
                    <input
                      type="number"
                      min="0"
                      max="9"
                      value={awayScore}
                      onChange={e => setAwayScore(e.target.value)}
                      className="w-full bg-white/10 border border-white/15 rounded-xl text-center text-white text-2xl font-bold py-3 focus:outline-none focus:border-[#6CABDD] transition-all"
                      placeholder="–"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setPredictionSubmitted(true)}
                  disabled={homeScore === '' || awayScore === ''}
                  className="bg-[#e6ff00] hover:bg-[#d4eb00] disabled:opacity-40 disabled:hover:bg-[#e6ff00] text-[#001838] font-bold py-3 px-5 rounded-xl text-sm transition-all hover:scale-[1.02] mt-5 whitespace-nowrap"
                >
                  Submit (+25 credits)
                </button>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Cityzens Activity */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-[#6CABDD]" />
          <h2 className="text-xl font-bold uppercase tracking-wider text-white font-['Barlow_Condensed']">Cityzens Activity</h2>
        </div>
        <GlassCard className="!p-0 overflow-hidden">
          <div className="divide-y divide-white/5">
            {CITYZENS_ACTIVITY.map((item, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-all">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}
                >
                  {item.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="text-white font-medium">{item.name}</span>{' '}
                    <span className="text-white/60">{item.action}</span>
                  </p>
                </div>
                <span className="text-[10px] text-[#8899AA] shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recommended For You */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#D4A843]" />
          <h2 className="text-xl font-bold uppercase tracking-wider text-white font-['Barlow_Condensed']">Recommended for You</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECOMMENDATIONS.map((rec, i) => (
            <GlassCard
              key={i}
              className="cursor-pointer hover:translate-y-[-2px] transition-all duration-300 relative overflow-hidden"
              style={{ borderTopColor: `${rec.accent}50`, borderTopWidth: '2px' }}
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10"
                style={{ backgroundColor: rec.accent }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${rec.accent}15` }}
                  >
                    <rec.icon className="w-4 h-4" style={{ color: rec.accent }} />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: rec.accent }}>{rec.tag}</span>
                </div>
                <p className="text-white font-semibold text-sm">{rec.title}</p>
                <div className="flex items-center gap-1 mt-3 text-[#8899AA] text-xs group-hover:text-white transition-all">
                  <span>View</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Upcoming Events Timeline */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#6CABDD]" />
          <h2 className="text-xl font-bold uppercase tracking-wider text-white font-['Barlow_Condensed']">Upcoming Events</h2>
        </div>
        <GlassCard className="!p-0 overflow-hidden">
          <div className="relative pl-8">
            {/* Timeline line */}
            <div className="absolute left-[18px] top-4 bottom-4 w-px bg-gradient-to-b from-[#6CABDD]/40 via-[#D4A843]/40 to-[#e6ff00]/40" />
            {UPCOMING_EVENTS.map((event, i) => (
              <div key={i} className="relative flex items-center gap-4 px-4 py-4 hover:bg-white/5 transition-all">
                {/* Timeline dot */}
                <div
                  className="absolute left-[14px] w-[9px] h-[9px] rounded-full border-2 z-10"
                  style={{ borderColor: event.accent, backgroundColor: '#0A0E17' }}
                />
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${event.accent}15` }}
                >
                  <event.icon className="w-4.5 h-4.5" style={{ color: event.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">{event.title}</p>
                  <p className="text-[#8899AA] text-xs">{event.date}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8899AA] shrink-0" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Partner Offers */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-[#D4A843]" />
          <h2 className="text-xl font-bold uppercase tracking-wider text-white">Partner Offers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPONSORS.map((sponsor, i) => {
            const SponsorIcon = sponsor.icon
            return (
              <GlassCard key={i} className="hover:bg-white/10 hover:translate-y-[-2px] transition-all duration-300 flex flex-col border-t-2 border-t-[#6CABDD]/50">
                <SponsorBrand logoSrc={sponsor.logoSrc} altText={sponsor.altText} Icon={SponsorIcon} />
                <h3 className="text-lg font-semibold text-white mb-2">{sponsor.name}</h3>
                <p className="text-sm text-[#8899AA] mb-3 flex-1">{sponsor.desc}</p>
                <div className="bg-[#D4A843]/10 rounded-lg px-3 py-2 mb-3">
                  <p className="text-[#D4A843] text-sm font-semibold">{sponsor.benefit}</p>
                </div>
                <p className="text-xs text-[#8899AA] mb-3">{sponsor.availability}</p>
                {sponsor.note && (
                  <p className="text-xs text-[#8899AA] italic mb-3">{sponsor.note}</p>
                )}
                <button className="bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-2 px-5 rounded-xl text-sm transition-all hover:scale-[1.02] w-full">
                  {sponsor.cta}
                </button>
              </GlassCard>
            )
          })}
        </div>
      </div>
      </div>
    </div>
  )
}
