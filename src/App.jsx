import { useState, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import UserCard from './components/UserCard'
import TierUpModal from './components/TierUpModal'
import LandingScreen from './screens/LandingScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import DashboardScreen from './screens/DashboardScreen'
import GamesHubScreen from './screens/GamesHubScreen'
import LeaderboardScreen from './screens/LeaderboardScreen'
import RewardsStoreScreen from './screens/RewardsStoreScreen'
import AdminScreen from './screens/AdminScreen'
import { getTierForCredits, getNextTier } from './utils/credits'
import { TIERS } from './data/tiers'

const SCREENS_WITH_SIDEBAR = ['dashboard', 'games', 'leaderboard', 'rewards', 'admin']
const SCREENS_WITH_USER_CARD = ['dashboard']

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing')
  const [creditBalance, setCreditBalance] = useState(700)
  const [totalCreditsEarned, setTotalCreditsEarned] = useState(700)
  const [connectedAccounts, setConnectedAccounts] = useState([])
  const [claimedRewards, setClaimedRewards] = useState([])
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [gamesPlayed, setGamesPlayed] = useState([])
  const [streakWeeks, setStreakWeeks] = useState(3)
  /** Play Untitled.mp4 intro once per session; after that show landing home directly. */
  const [landingIntroDone, setLandingIntroDone] = useState(false)

  // Tier up modal state
  const [showTierUp, setShowTierUp] = useState(false)
  const [tierUpOld, setTierUpOld] = useState('')
  const [tierUpNew, setTierUpNew] = useState(null)

  const handleNavigate = useCallback((screen) => {
    setCurrentScreen(screen)
  }, [])

  const handleTierUp = useCallback((oldTotal, newTotal) => {
    const oldTier = getTierForCredits(oldTotal)
    const newTier = getTierForCredits(newTotal)
    if (oldTier.name !== newTier.name) {
      setTierUpOld(oldTier.name)
      setTierUpNew(newTier)
      setShowTierUp(true)
    }
  }, [])

  const showSidebar = SCREENS_WITH_SIDEBAR.includes(currentScreen)
  const showUserCard = SCREENS_WITH_USER_CARD.includes(currentScreen)

  function renderScreen() {
    switch (currentScreen) {
      case 'landing':
        return (
          <LandingScreen
            onNavigate={handleNavigate}
            skipIntro={landingIntroDone}
            onIntroFinished={() => setLandingIntroDone(true)}
          />
        )

      case 'onboarding':
        return (
          <OnboardingScreen
            onNavigate={handleNavigate}
            connectedAccounts={connectedAccounts}
            setConnectedAccounts={setConnectedAccounts}
            creditBalance={creditBalance}
            setCreditBalance={setCreditBalance}
            totalCreditsEarned={totalCreditsEarned}
            setTotalCreditsEarned={setTotalCreditsEarned}
            setUserName={setUserName}
            setUserEmail={setUserEmail}
          />
        )

      case 'dashboard':
        return (
          <DashboardScreen
            creditBalance={creditBalance}
            totalCreditsEarned={totalCreditsEarned}
            streakWeeks={streakWeeks}
            onNavigate={handleNavigate}
          />
        )

      case 'games':
        return (
          <GamesHubScreen
            creditBalance={creditBalance}
            setCreditBalance={setCreditBalance}
            totalCreditsEarned={totalCreditsEarned}
            setTotalCreditsEarned={setTotalCreditsEarned}
            gamesPlayed={gamesPlayed}
            setGamesPlayed={setGamesPlayed}
            onTierUp={handleTierUp}
          />
        )

      case 'leaderboard':
        return (
          <LeaderboardScreen
            userName={userName}
            totalCreditsEarned={totalCreditsEarned}
          />
        )

      case 'rewards':
        return (
          <RewardsStoreScreen
            creditBalance={creditBalance}
            setCreditBalance={setCreditBalance}
            totalCreditsEarned={totalCreditsEarned}
            claimedRewards={claimedRewards}
            setClaimedRewards={setClaimedRewards}
          />
        )

      case 'admin':
        return (
          <AdminScreen
            userName={userName}
            userEmail={userEmail}
            connectedAccounts={connectedAccounts}
            totalCreditsEarned={totalCreditsEarned}
            creditBalance={creditBalance}
            gamesPlayed={gamesPlayed}
            claimedRewards={claimedRewards}
            streakWeeks={streakWeeks}
          />
        )

      default:
        return (
          <LandingScreen
            onNavigate={handleNavigate}
            skipIntro={landingIntroDone}
            onIntroFinished={() => setLandingIntroDone(true)}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0E17]">
      {/* Tier Up Modal */}
      <TierUpModal
        show={showTierUp}
        oldTier={tierUpOld}
        newTier={tierUpNew}
        onClose={() => setShowTierUp(false)}
        onViewRewards={() => {
          setShowTierUp(false)
          setCurrentScreen('rewards')
        }}
      />

      {/* Sidebar */}
      {showSidebar && (
        <Sidebar currentScreen={currentScreen} onNavigate={handleNavigate} />
      )}

      {/* Main Content */}
      <main
        className={`min-h-screen transition-all ${
          showSidebar ? 'ml-[70px]' : ''
        } ${showUserCard ? 'mr-[280px]' : ''}`}
      >
        <div
          key={currentScreen}
          className="min-h-screen"
          style={{ animation: 'screen-enter 0.48s cubic-bezier(0.22, 1, 0.36, 1) both' }}
        >
          {renderScreen()}
        </div>
      </main>

      {/* Right sidebar user card */}
      {showUserCard && (
        <UserCard
          userName={userName}
          creditBalance={creditBalance}
          totalCreditsEarned={totalCreditsEarned}
          gamesPlayed={gamesPlayed}
          streakWeeks={streakWeeks}
        />
      )}
    </div>
  )
}
