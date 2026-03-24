import { useState, useRef, useEffect } from 'react'
import { Flame, Star, Gamepad2, Share2, UserPlus, UserCheck, Shirt, Plane, Beer, Gift, Trophy } from 'lucide-react'
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
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay muted playsInline
        src={DASH_VIDEOS[0]}
      />
      <div className="absolute inset-0 bg-[#0A0E17]/80" />
      <div className="relative z-10 p-6 space-y-6">
      {/* Hero Carousel */}
      <Carousel slides={carouselSlides} />

      {/* XP / Tier Section */}
      <GlassCard>
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

      {/* Spend Your Credits */}
      <div>
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
