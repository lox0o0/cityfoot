# City Football Rewards Hub

## What This Is
A demo app for City Football Group showing a fan rewards hub for Man City gaming. 8 screens: Landing, Onboarding, Games Hub, Dashboard, Activity/Level Up, Rewards Store, Leaderboard, Backend Admin. Built to demonstrate data capture and fan engagement.

## Tech Stack
- **Vite + React** (single-page app)
- **Tailwind CSS** (utility classes only, no CSS modules)
- **Lucide React** (icons)
- **No backend** — all data is client-side / simulated
- **No localStorage** — React state only (demo environment constraint)
- **No React Router** — state-driven navigation via useState

## Key Documents
- `docs/PRD.md` — Full product requirements (8 screens, tier system, credits economy, demo script)
- `DESIGN.md` — Design system tokens (colors, typography, components, effects)

## Architecture Rules
1. Keep the app as few files as possible — ideally components in `src/components/` and screens in `src/screens/`
2. Navigation is state-driven: `currentScreen` useState in App.jsx
3. No external image dependencies — CSS gradients, SVG, Lucide icons, or emoji only
4. All interactions are simulated (game launches, social connects, reward claims)
5. Demo user starts at ~700 credits (Matchday tier) so tier-up can be triggered during walkthrough

## Credits System (CRITICAL)
- `totalCreditsEarned` — cumulative, NEVER decreases, determines tier
- `creditBalance` — spendable, decreases on reward redemption
- Spending does NOT affect tier — once you reach Centurion, you stay Centurion
- See `docs/PRD.md` for full earning/spending tables

## Design System
- Dark theme ALWAYS — background `#0A0E17`
- Primary: Sky Blue `#6CABDD`
- Accent: Gold `#D4A843`
- Glassmorphism cards: `bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl`
- See `DESIGN.md` for full token reference

## Animations
- Confetti on tier upgrades and reward claims
- Float-up effect on credit awards
- Shimmer on streak cards
- Glow pulse on CTA buttons
- Animated progress bars and counters
- All self-contained — no framer-motion or external animation libs
- Use CSS keyframes via inline `<style>` tags

## Demo Flow
The app should support this walkthrough sequence:
1. Landing page → Click "Join Now"
2. Onboarding (sign up + social connects) → Auto-redirect to dashboard
3. Dashboard → Navigate to Games Hub
4. Games Hub → Click "Play" on EA FC → 2s delay → credits awarded → tier up triggered
5. Rewards Store → Claim a Tier 1 reward
6. Leaderboard → Show user's position
7. Admin view → Show captured user data
