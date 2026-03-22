# City Football Rewards Hub — Product Requirements Document (PRD)

## Context & Purpose

This document describes a **demo** to be presented to City Football Group. The contact manages licensing for City Football into games (EA FC, Roblox, etc.). The core problem: City Football earns licensing fees from game publishers, but receives **zero customer data** back — the games don't share user data. City Football wants to **own the player relationship** by intercepting users before they reach the games, capturing their data, and enabling cross-sell across the licensed product ecosystem.

This demo needs to show:
1. How a fan arrives at a City Football-owned landing page
2. How they onboard and hand over their data willingly
3. How they discover and launch Man City games from a central hub (capturing data before redirect)
4. How a rewards/credits/tier system keeps them coming back
5. How City Football ends up with enriched user profiles and connected social accounts

**Reference:** This is heavily informed by the NRL Player+ demo we built (see NRL_Deal_Comprehensive_Handover.md for full architecture). The City Football version is scoped tighter and repositioned around the gaming licensing use case.

---

## How Users Get Here (Narrative for the Call — Not Demoed)

We don't demo the acquisition funnel, but we need a sharp informed view for the meeting. The intercept has to happen **before** the game, not inside it — game publishers will not drive traffic out of their platforms.

**Realistic intercept surfaces:**
- **mancity.com & Man City app** — banners, interstitials: "Playing EA FC as Man City? Earn real rewards." Highest-intent traffic City Football already owns.
- **Social media** — Man City's massive social following (Instagram, TikTok, X, YouTube). Posts, stories, reels promoting the rewards hub.
- **YouTube content** — Man City already produces EA FC content with players. Pre-roll, mid-roll, description links. "Powered by City Rewards."
- **Kit & merch packaging** — QR code inserts: "You just bought the kit — now earn rewards when you wear it in EA FC."
- **Matchday & stadium** — Etihad screens, half-time content, app notifications at the ground.
- **Paid UA** — Meta, Google, YouTube, TikTok ads targeting the intersection of Man City followers + EA FC / Roblox gamers.
- **Email / CRM re-activation** — existing Cityzens members and shop customers pulled into the platform.
- **Influencer & streamer partnerships** — Man City-affiliated FIFA/FC content creators with referral links.

**Key narrative for the pitch:** "You don't need the games to cooperate. You already have millions of touchpoints with fans across owned channels. The landing page just needs to be compelling enough that fans come through your door first. Then you own the relationship permanently."

---

## Demo Flow (8 Screens)

### Screen 1: Landing Page

**Purpose:** First impression. Communicate the value prop in 5 seconds. Drive sign-up.

**Layout:**
- Full-screen hero with Man City visual treatment (sky blue gradient, Etihad imagery or player imagery)
- Dark theme with glassmorphism (consistent with NRL demo aesthetic)

**Content:**
- **Hero headline:** "Welcome to Man City Rewards" (with gradient sky blue text effect)
- **Subtitle:** "Your home for Man City gaming"
- **Description:** "Play, earn, and unlock exclusive rewards across every Man City game"

**Three value pillars** (editorial style, separated by vertical dividers — no boxes):
1. **Play Games, Earn Credits**
   - Icon: Gamepad
   - "Launch EA FC, Roblox, Fortnite and more — earn City Credits every time you play"
2. **Rise Through the Ranks**
   - Icon: TrendingUp
   - "From Fan to Legend — climb tiers and unlock bigger rewards"
3. **Claim Exclusive Rewards**
   - Icon: Gift
   - "Signed jerseys, matchday tickets, player experiences, and more"

**Prizes carousel** (horizontal scroll, auto-advance):
- Signed Man City Jersey
- Etihad Stadium VIP Experience
- Player Meet & Greet
- Matchday Tickets
- Training Ground Access
- Man City Merch Bundle
- City Credits Drop
- Sponsor Reward (e.g. partner voucher)

**Social proof section:**
- "Join 50,000+ Man City fans already earning" (placeholder stat)
- "1.2M City Credits earned · 25K games launched · £50K in prizes claimed"

**CTA:**
- Large "Join Now" button with glow effect
- Footer: "Free to join · Real rewards · Play your way"

---

### Screen 2: Onboarding

**Purpose:** Capture email + basic data. Make it feel fast and rewarding from the first interaction.

**Flow:**

#### Step 1: Quick Sign-In
- **Headline:** "Start earning City Credits"
- **Sign-in options:**
  - Google (one-tap)
  - Apple
  - Email (input field expands on click)
- Profile completion bar appears immediately after sign-in (starts at 20%)
- **First points drop:** "+50 City Credits for signing up" (animated)

#### Step 2: Social Connections
- **Headline:** "Connect your accounts for bonus credits"
- **Tiles for each platform** (toggleable, each awards credits):
  - X (Twitter) — +30 credits
  - Instagram — +25 credits
  - Facebook — +25 credits
  - Discord — +20 credits
  - YouTube — +20 credits
- **Visual:** Each tile shows platform icon, credit reward, and connected/not-connected state
- **Profile completion bar updates** as connections are made (e.g. 20% → 50%)
- **Skip option** available (but de-emphasized)

#### Step 3: Confirmation
- Welcome message: "You're in. Let's play."
- Summary of credits earned so far
- Auto-redirect to dashboard

**Data captured at this point:**
- Email address (required — primary identifier)
- Name (from Google/Apple SSO)
- Connected social accounts (X, Instagram, Facebook, Discord, YouTube)
- Timestamp of sign-up
- Referral source (if applicable)

**Captured later via optional profile completion (on dashboard):**
- Phone number (optional, +30 credits)
- Date of birth
- Location / postcode
- Favourite Man City player
- Preferred game platform (console/PC/mobile)

---

### Screen 3: Games Hub ("Play")

**Purpose:** The killer screen. This is the **Man City gaming directory** — every game with Man City IP, launchable from one place. City Football captures the click-through data before redirecting to the game.

**Layout:**
- Section header: "PLAY" with gamepad icon
- Subtitle: "Launch any Man City game and earn City Credits"

**Game Tiles** (card grid, 2-3 per row):

1. **EA Sports FC 26**
   - Image: EA FC key art / Man City player in EA FC
   - Platform badges: PS5, Xbox, PC, Mobile
   - Description: "Play as Man City in the world's biggest football game"
   - Credits: "+50 credits per session"
   - CTA: "Play Now →"
   - Status badge: "MOST POPULAR"

2. **Roblox — Blue Moon**
   - Image: Blue Moon experience key art / Moonchester character
   - Platform badges: PC, Mobile, Xbox
   - Description: "Explore Man City's official Roblox world"
   - Credits: "+30 credits per session"
   - CTA: "Play Now →"

3. **Fortnite**
   - Image: Fortnite with Man City crossover imagery
   - Platform badges: PS5, Xbox, PC, Mobile, Switch
   - Description: "Rep Man City in Battle Royale"
   - Credits: "+30 credits per session"
   - CTA: "Play Now →"

4. **Rocket League**
   - Image: Rocket League with Man City decal/team imagery
   - Platform badges: PS5, Xbox, PC, Switch
   - Description: "Score goals at supersonic speed with Man City"
   - Credits: "+30 credits per session"
   - CTA: "Play Now →"
   - Status badge: "NEW"

5. **FC Online (Asia)**
   - Image: FC Online key art
   - Platform badges: PC, Mobile
   - Description: "Man City in Asia's biggest football game"
   - Credits: "+30 credits per session"
   - CTA: "Play Now →"

**Behaviour on "Play Now" click:**
- Modal appears: "Launching EA FC 26 — your City Credits will be tracked"
- Redirect to external game page/store
- Session logged to user profile (game, timestamp, platform)
- Credits awarded on return or via time-based trigger

**Connect Game Account (optional upsell within each tile):**
- "Connect your EA FC account for bonus credits" — links to platform OAuth if available
- For platforms without OAuth: self-reported ("I play this game" toggle for credit eligibility)

---

### Screen 4: Dashboard (Home)

**Purpose:** Central hub showing the user's status, current activities, and nudges to earn more credits.

**Layout:**
- Left sidebar: Navigation (Home, Games, Leaderboard, Rewards, Profile) — 70px
- Main content: Scrollable area
- Right sidebar: User profile card — 280px
- Background: Dark with subtle Man City sky blue accents

**Hero Carousel** (auto-scroll, 4 slides):
1. **"Complete Your Profile"** — "+50 credits to reach next tier. Add your details." → CTA: "Complete Profile"
2. **"This Week's Challenge"** — "Play 3 different Man City games this week for 200 bonus credits" → CTA: "View Challenge"
3. **"New: Rocket League"** — "Man City just launched in Rocket League. Play now and earn double credits!" → CTA: "Play Now"
4. **"Claim Your Rewards"** — "You have 2 rewards waiting. Don't miss out!" → CTA: "View Rewards"

**XP / Reputation Section** (prominent, below carousel):
- **Current Tier:** Displayed with badge (e.g. "MATCHDAY" tier with sky blue badge)
- **XP Progress Bar:** Visual bar showing progress to next tier (e.g. "750 / 1,000 credits to CENTURION")
- **Tier name + icon** on both sides of the progress bar (current → next)
- **Credits balance:** Large number display (e.g. "750 City Credits")

**Weekly Activities Section:**
- Header: "EARN MORE CREDITS"
- Activity cards in list format:
  1. **Play EA FC** — "+50 credits" — "Launch and play a match" — CTA: "Play"
  2. **Play Roblox Blue Moon** — "+30 credits" — "Complete a quest in Blue Moon" — CTA: "Play"
  3. **Share on Social** — "+20 credits" — "Share your tier badge on X or Instagram" — CTA: "Share"
  4. **Refer a Friend** — "+100 credits" — "Invite a friend to join City Rewards" — CTA: "Invite"
  5. **Complete Profile** — "+50 credits" — "Add phone number and preferences" — CTA: "Complete"

**Fan Engagement Streak Card** (like NRL):
- Flame icon with large number: "3 week streak"
- "Keep your streak to earn bonus credits each week"
- Shimmer animation effect

**Sponsor Activities Section** (below weekly activities):
- Header: "PARTNER OFFERS" with star icon
- Layout: Horizontal grid of 3 cards side-by-side

1. **Puma — Kit Day Deal**
   - Image: Puma x Man City logo
   - Description: "Shop the latest Puma x Man City collection using code CITYCREDITS at checkout"
   - Benefit: "20% off + 40 City Credits"
   - Availability: "Available: Ongoing"
   - CTA: "Shop Now"

2. **Etihad Airways — Fly with City**
   - Image: Etihad logo
   - Description: "Complete a 2-min travel quiz and discover exclusive Etihad offers for Man City fans"
   - Benefit: "1,000 Etihad Guest Miles + 30 City Credits"
   - Availability: "Available: Ongoing"
   - CTA: "Start Quiz"

3. **Asahi Super Dry — Matchday Pint**
   - Image: Asahi Super Dry logo
   - Description: "Show your City Rewards profile at any Etihad Stadium bar on matchday"
   - Benefit: "Free Asahi Super Dry + 25 City Credits"
   - Availability: "Available: Home matchdays only"
   - CTA: "Get Offer"
   - Note: "Must be 18+ to claim"

**Card Design:** Glass cards with sponsor images, point badges, hover effects (same style as NRL sponsor cards)

**Right Sidebar — User Card:**
- User name, avatar
- Current tier badge
- City Credits balance
- Recent activity (last 3 actions)
- "View Profile" link

---

### Screen 5: Activity + Level Up

**Purpose:** Show the moment a user completes an activity and levels up. This is the "wow" moment in the demo — proves the engagement loop works.

**Trigger:** User clicks "Play" on EA FC from the Games Hub or dashboard. On return (simulated), they receive credits.

**Credit Award Animation:**
- "+50 City Credits" flies in with particle effect
- XP bar on dashboard fills up in real time
- If the bar crosses a threshold → tier upgrade triggers

**Tier Upgrade Celebration Modal:**
- Full-screen overlay with confetti animation
- Shows: Old tier badge → arrow → New tier badge
- E.g. "MATCHDAY → CENTURION"
- "You've unlocked new rewards!"
- **New unlock highlights:**
  - "10% off Man City merch"
  - "Entry to signed jersey monthly draw"
  - "200 bonus City Credits"
- CTA: "View Rewards" → navigates to Rewards Store
- Secondary CTA: "Keep Playing" → back to dashboard

---

### Screen 6: Rewards Store

**Purpose:** Show the tangible value of City Credits. This is what makes the whole platform worth coming to.

**Layout:**
- Header: "REWARDS STORE" with gift icon
- Current balance displayed prominently: "750 City Credits"
- Filter tabs: All | Experiences | Merch | Digital | Partner Offers

**Reward Cards** (grid layout, 2-3 per row):

#### Tier 1 — Accessible / Frequent
1. **Man City Digital Wallpaper Pack**
   - Cost: 50 credits
   - "Exclusive player wallpapers for phone & desktop"
   - CTA: "Redeem"

2. **Early Access: Kit Launch**
   - Cost: 100 credits
   - "Be first to see and buy the new season kit"
   - CTA: "Redeem"

3. **Puma Voucher — £10 Off**
   - Cost: 100 credits
   - "£10 off any Puma x Man City product"
   - CTA: "Redeem"

#### Tier 2 — Aspirational / Mid (Locked behind tier)
4. **Signed Man City Jersey**
   - Cost: 2,000 credits
   - "Authenticated signatures from the 25/26 squad"
   - Tier required: CENTURION
   - CTA: "Redeem" or "🔒 Reach Centurion to unlock"

5. **Matchday Tickets (2x)**
   - Cost: 3,000 credits
   - "Two tickets to a Premier League home match"
   - Tier required: CENTURION
   - CTA: "Redeem" or locked

6. **Etihad Stadium Tour**
   - Cost: 1,500 credits
   - "Behind-the-scenes tour for you + 1 guest"
   - Tier required: MATCHDAY
   - CTA: "Redeem"

#### Tier 3 — Premium / Rare
7. **Player Meet & Greet**
   - Cost: 5,000 credits
   - "Meet a first-team player at the Etihad"
   - Tier required: LEGEND
   - CTA: locked for demo

8. **VIP Matchday Hospitality**
   - Cost: 8,000 credits
   - "Premium hospitality for 2 at the Etihad"
   - Tier required: LEGEND
   - CTA: locked for demo

9. **Training Ground Experience**
   - Cost: 5,000 credits
   - "Watch first-team training at the City Football Academy"
   - Tier required: LEGEND
   - CTA: locked for demo

**Claim Flow (for demo — simulate one claim):**
- User clicks "Redeem" on a Tier 1 reward
- Confirmation modal: "Claim Man City Wallpaper Pack for 50 credits?"
- Success: Confetti animation, credit balance decreases, reward marked as "Claimed ✓"

---

### Screen 7: Leaderboard

**Purpose:** Create competition and social engagement. Show fans where they rank and what the top fans win each month.

**Layout:**
- Simple, clean single-column layout
- Header: "LEADERBOARD" with trophy icon
- Subtitle: "Top fans win exclusive monthly rewards"

**Monthly Prize Banner** (top of page, prominent):
- Glass card with gold border
- "TOP 5 THIS MONTH WIN:"
- Prize list:
  - 🥇 1st: Signed Man City jersey + 1,000 bonus credits
  - 🥈 2nd: Matchday tickets (2x) + 500 bonus credits
  - 🥉 3rd: Man City merch bundle + 300 bonus credits
  - 4th-5th: 200 bonus City Credits each
- "Resets in 12 days" countdown timer

**Top 5 Display** (large cards):
- Rank, username, tier badge, total credits earned this month
- Movement indicator (up/down arrows)
- Card design: glass cards, #1 gets gold highlight, #2 silver, #3 bronze

**User's Position** (highlighted, sticky):
- Shows current rank (e.g. "#127")
- Current tier badge
- Credits earned this month
- "You need 450 more credits to reach Top 100"
- Movement since last week

**Design:**
- Simplified vs NRL (no tabs — single leaderboard based on monthly credits earned)
- Team-coloured accents (sky blue)
- Movement indicators: green up arrows, red down arrows, grey for no change

---

### Screen 8: Backend / Admin View (Data Capture Dashboard)

**Purpose:** Flip the perspective. Show City Football what *they* see — the captured user data that's the whole point of the platform.

**This is NOT a full analytics platform.** It's a simple, clean view showing the data we've captured about the user who just went through the demo.

**Layout:**
- Clean admin-style UI (light theme or contrasting dark theme to differentiate from fan-facing)
- Header: "City Football — Audience Dashboard"

**User Profile Card (the user who just signed up):**
- Name: [Demo user name]
- Email: [Demo email]
- Phone: [if captured]
- Sign-up date: [today]
- Referral source: mancity.com

**Connected Accounts Section:**
- X (Twitter): ✅ Connected — @handle
- Instagram: ✅ Connected — @handle
- Facebook: ✅ Connected — profile linked
- Discord: ✅ Connected — @username
- YouTube: ✅ Connected — channel name
- EA FC: ✅ Connected (or "Self-reported player")
- Roblox: ✅ Connected

**Engagement Summary:**
- Games launched: 3
- Total sessions: 7
- City Credits earned: 750
- Current tier: CENTURION
- Rewards claimed: 1
- Streak: 3 weeks

**Key message for the call:** "This is one user. Now imagine this across your entire fan base. Every single person who comes through this hub, you now know who they are, what games they play, how often, what they engage with — and you can reach them directly via email, push notification, or any of their connected channels."

---

## Tier System

Man City themed tier names. Progression based on cumulative City Credits earned.

| Tier | Credits Required | Badge Colour | Unlocks |
|------|-----------------|--------------|---------|
| **Fan** | 0 | White | Access to platform, basic rewards |
| **Matchday** | 250 | Sky Blue | Stadium tour eligibility, 5% merch discount |
| **Blue Moon** | 1,000 | Royal Blue | Monthly prize draw entry, 10% merch discount |
| **Centurion** | 2,500 | Navy + Gold | Signed merch eligibility, matchday ticket access |
| **Treble** | 5,000 | Gold | Player experience eligibility, VIP rewards |
| **Legend** | 10,000 | Gold + Sky Blue (premium) | All rewards unlocked, exclusive Legend-only drops |

---

## City Credits Economy

**Earning Credits:**

| Action | Credits |
|--------|---------|
| Sign up | 50 |
| Complete profile (full) | 50 |
| Connect social account (each) | 20-30 |
| Launch a game via hub (per session, daily cap) | 30-50 |
| Complete weekly challenge | 100-200 |
| Refer a friend (on their sign-up) | 100 |
| Share tier badge on social | 20 |
| Engagement streak bonus (per week) | 25-50 |

**Spending Credits:** See Rewards Store (Screen 6) for pricing.

**Currency properties:**
- Stable, non-speculative (not crypto, not tradeable)
- 1 credit = 1 credit, always
- On-chain under the hood if desired (invisible to user)
- No expiry in V1 (can add in future for engagement pressure)

---

## Design System

**Theme:** Dark mode with Man City branding
- **Primary:** Man City Sky Blue (#6CABDD)
- **Secondary:** Navy (#1C2C5B)
- **Accent:** Gold (#D4A843) — used for tier badges, CTAs, reward highlights
- **Background:** Near-black (#0A0E17) with subtle gradients
- **Cards:** Glassmorphism — translucent with subtle borders and blur
- **Text:** White (#FFFFFF) primary, muted grey (#8899AA) secondary

**Typography:**
- Bold headings, clean sans-serif (system font or similar to Man City brand font)
- Large tier/credit numbers for visual impact

**Effects:**
- Glassmorphism cards
- Glow effects on CTAs
- Confetti on tier upgrades and reward claims
- Shimmer on streak cards
- Particle effects on credit awards
- Smooth transitions between screens

**Icons:** Lucide React (monochromatic), consistent with NRL demo

**Layout:**
- Left sidebar navigation (70px)
- Right sidebar user card (280px) — on dashboard only
- Responsive but desktop-first for demo purposes

---

## Technical Notes (for Claude Code build)

- **Framework:** React (single-page app, artifact-style)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State:** React hooks (useState, useEffect)
- **No backend:** All data is client-side / simulated for demo
- **No localStorage** (artifact environment doesn't support it — use React state only)
- **Images:** Use placeholder images or CSS gradients for game tiles; no external image dependencies
- **Navigation:** State-driven routing (not React Router — single file artifact)
- **Demo mode:** Include a way to simulate actions (click "Play" → auto-award credits after 2s delay, etc.)

---

## What This Is NOT

- This is **not** a replacement for Cityzens membership — it's the engagement and data capture layer that feeds into it
- This is **not** integrated with any game API — game launches are external redirects; data capture happens on our side
- This is **not** crypto/blockchain facing — City Credits are a proprietary loyalty currency, invisible infrastructure only
- This is **not** a full analytics platform — the backend view is a simple data display to prove the capture story

---

## Demo Script (Suggested Walkthrough for the Call)

1. **Open on landing page.** "This is the Man City Rewards Hub — the single destination for every fan who plays Man City games."
2. **Click Join Now → Onboarding.** "Sign up takes 30 seconds. We capture email, name, and then incentivize social connections — X, Instagram, Facebook, Discord, YouTube. Every connection is more data, more channels to reach them."
3. **Land on dashboard.** "Now they're in. They can see their tier, their credits, their weekly activities, and partner offers from Puma, Etihad, and Asahi. But the key screen is this—"
4. **Navigate to Games Hub.** "Every game that has Man City IP, in one place. EA FC, Roblox Blue Moon, Fortnite, Rocket League. The fan clicks Play, we capture the session, they get credits. You now know exactly which games your fans play, how often, and when."
5. **Click Play on EA FC → return → credits awarded → tier up.** "They come back, credits land, and look — they've just hit Centurion tier. New rewards unlocked. This is what keeps them coming back through your door instead of going straight to EA."
6. **Navigate to Rewards Store.** "This is where credits become real. Signed jerseys, matchday tickets, player experiences, Puma vouchers. The rewards are the incentive — the data is the asset."
7. **Show Leaderboard.** "And here's what drives competition — a monthly leaderboard where the top 5 fans win exclusive rewards. Signed jerseys, matchday tickets. This creates urgency and keeps fans coming back."
8. **Flip to backend view.** "And here's what you now have. Full user profile. Email, connected socials — X, Insta, Facebook, Discord, YouTube — every game they play, how engaged they are. This is one user — scale this to your entire fan base and you've gone from zero data to a rich, actionable audience you own."

---

## Resolved Decisions

- [x] **Phone number:** Optional — captured via profile completion on dashboard, not onboarding. Primary capture is email. Social connections prioritised: X, Instagram, Facebook, Discord, YouTube.
- [x] **Games Hub navigation:** Own top-level nav tab (Home, Games, Leaderboard, Rewards, Profile). It's the centrepiece of the platform — deserves its own screen.
- [x] **Man City branding:** Full Man City imagery, colours, and branding throughout the demo. Make it as strong and authentic as possible.
- [x] **Sponsors:** Using real Man City sponsors — Puma (merch), Etihad Airways (travel), Asahi Super Dry (matchday). Structured as partner offer cards with point incentives, same approach as NRL (KFC/Telstra/Ampol).
- [x] **Leaderboard:** Included as Screen 7. Simplified — single monthly leaderboard based on credits earned. Top 5 fans each month win escalating rewards (signed jersey, matchday tickets, merch bundle, bonus credits). Creates competition and urgency.
