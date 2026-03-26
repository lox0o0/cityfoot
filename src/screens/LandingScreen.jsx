import { useEffect, useRef, useState } from 'react'
import { Gamepad2, TrendingUp, Gift, ChevronRight, Trophy, Ticket, Shirt, MapPin, Users, Tag, Pen, Star } from 'lucide-react'
import McCrest from '../components/McCrest'
import TopLeftCrest from '../components/TopLeftCrest'

const HERO_VIDEOS = [
  '/assets/landing/videos/Untitled.mp4',
  '/assets/landing/videos/vid2.mp4',
  '/assets/landing/videos/vid3.mp4',
  '/assets/landing/videos/vid4.mp4',
  '/assets/landing/videos/vid5.mp4',
]

const PRIZE_ICONS = {
  'Signed Man City Jersey': Pen,
  'Etihad Stadium VIP Experience': MapPin,
  'Player Meet & Greet': Users,
  'Matchday Tickets': Ticket,
  'Training Ground Access': Trophy,
  'Man City Merch Bundle': Shirt,
  'City Credits Drop': TrendingUp,
  'Sponsor Reward Voucher': Tag,
}

const PRIZES = [
  { name: 'Signed Man City Jersey' },
  { name: 'Etihad Stadium VIP Experience' },
  { name: 'Player Meet & Greet' },
  { name: 'Matchday Tickets' },
  { name: 'Training Ground Access' },
  { name: 'Man City Merch Bundle' },
  { name: 'City Credits Drop' },
  { name: 'Sponsor Reward Voucher' },
]

const PILLARS = [
  {
    icon: Gamepad2,
    title: 'Play Games, Earn Credits',
    desc: 'Launch EA FC, Roblox, Fortnite and more — earn City Credits every time you play',
  },
  {
    icon: TrendingUp,
    title: 'Rise Through the Ranks',
    desc: 'From Fan to Legend — climb tiers and unlock bigger rewards',
  },
  {
    icon: Gift,
    title: 'Claim Exclusive Rewards',
    desc: 'Signed jerseys, matchday tickets, player experiences, and more',
  },
]

export default function LandingScreen({ onNavigate, skipIntro = false, onIntroFinished }) {
  const [demoStarted, setDemoStarted] = useState(false)
  const [prizeIndex, setPrizeIndex] = useState(0)
  const [currentVideo, setCurrentVideo] = useState(0)
  const videoRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setPrizeIndex(i => (i + 1) % PRIZES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setCurrentVideo(prev => {
        if (prev === 0) return 1  // After first video, go to vid2
        const next = prev + 1
        return next >= HERO_VIDEOS.length ? 1 : next  // Cycle 1-4, skip 0
      })
    }

    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [currentVideo])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.src = HERO_VIDEOS[currentVideo]
    video.play().catch(() => {})
  }, [currentVideo])

  if (!demoStarted) {
    return (
      <div className="min-h-screen bg-[#0A0E17] flex items-end justify-end p-4">
        <button onClick={() => setDemoStarted(true)} className="group opacity-[0.12] hover:opacity-30 transition-opacity p-2">
          <Star className="w-5 h-5 text-[#8899AA]/50 group-hover:text-[#6CABDD]/60 transition-colors" fill="currentColor" />
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0E17] overflow-y-auto" style={{ animation: 'slide-in 0.8s ease-out' }}>
      <TopLeftCrest />
      {/* Hero — cycling highlight videos behind content */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          src={HERO_VIDEOS[0]}
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0A0E17]" />

        {/* Existing hero content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto" style={{ animation: 'slide-in 0.8s ease-out' }}>
          <div className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-8 flex items-center justify-center">
            <McCrest className="w-full h-full max-w-[7rem] max-h-[7rem] md:max-w-[8.5rem] md:max-h-[8.5rem]" alt="Manchester City" />
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold uppercase tracking-tight mb-4">
            <span className="bg-gradient-to-r from-[#6CABDD] to-[#D4A843] bg-clip-text text-transparent">
              A New Way to Play
            </span>
          </h1>

          <p className="text-xl text-[#6CABDD] font-medium mb-2">Your gateway to Man City gaming rewards</p>
          <p className="text-[#8899AA] text-lg mb-12 max-w-lg mx-auto">
            Play, earn, and unlock exclusive rewards across every Man City game
          </p>

          <button
            onClick={() => onNavigate('onboarding')}
            className="bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-4 px-12 rounded-xl text-lg transition-all hover:scale-[1.02]"
            style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
          >
            Join Now
          </button>

          <p className="text-[#8899AA] text-sm mt-4">Free to join &middot; Real rewards &middot; Play your way</p>
        </div>
      </section>

      {/* Value Pillars — horizontal 3-column grid on md+ */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          {PILLARS.map((pillar, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center md:items-start md:text-left ${
                i > 0 ? 'md:border-l md:border-white/10 md:pl-8 lg:pl-12' : ''
              }`}
            >
              <pillar.icon className="w-8 h-8 text-[#6CABDD] mb-4 shrink-0" />
              <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-2">{pillar.title}</h3>
              <p className="text-sm text-[#8899AA] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prizes Carousel */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-8 text-center">
          Rewards You Can Unlock
        </h2>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${prizeIndex * (100 / 3)}%)` }}
          >
            {[...PRIZES, ...PRIZES].map((prize, i) => {
              const IconComp = PRIZE_ICONS[prize.name] || Gift
              return (
                <div key={i} className="w-1/3 flex-shrink-0 px-3">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-6 text-center hover:bg-white/10 hover:translate-y-[-2px] transition-all duration-300">
                    <IconComp className="w-8 h-8 text-[#6CABDD] mx-auto mb-3" />
                    <p className="text-sm font-semibold text-white">{prize.name}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {PRIZES.map((_, i) => (
            <button
              key={i}
              onClick={() => setPrizeIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === prizeIndex ? 'bg-[#6CABDD] w-6' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Social Proof */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-8">
          <p className="text-center text-[#6CABDD] font-medium mb-6">
            Join 50,000+ Man City fans already getting closer to the game
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-[#6CABDD] to-[#D4A843] bg-clip-text text-transparent">1.2M</p>
              <p className="text-xs text-[#8899AA]">City Credits earned</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-[#6CABDD] to-[#D4A843] bg-clip-text text-transparent">25K</p>
              <p className="text-xs text-[#8899AA]">Games launched</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-[#6CABDD] to-[#D4A843] bg-clip-text text-transparent">£50K</p>
              <p className="text-xs text-[#8899AA]">In prizes claimed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center py-16 px-6">
        <button
          onClick={() => onNavigate('onboarding')}
          className="bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-4 px-12 rounded-xl text-lg transition-all hover:scale-[1.02]"
          style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
        >
          Join Now <ChevronRight className="w-5 h-5 inline ml-1" />
        </button>
      </div>
    </div>
  )
}
