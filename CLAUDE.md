# City Football Rewards Hub

## What This Is
A demo app for City Football Group showing a fan rewards hub for Man City gaming. 8 screens: Landing, Onboarding, Games Hub, Dashboard, Activity/Level Up, Rewards Store, Leaderboard, Backend Admin. Built to demonstrate data capture and fan engagement.

## Tech Stack
- **Vite + React** (single-page app)
- **Tailwind CSS** (utility classes only, no CSS modules)
- **Lucide React** (icons -- no emojis anywhere)
- **Google Fonts** -- Barlow Condensed (headings) + Barlow (body)
- **No backend** -- all data is client-side / simulated
- **No localStorage** -- React state only (demo environment constraint)
- **No React Router** -- state-driven navigation via useState

## Key Documents
- `docs/PRD.md` -- Full product requirements (8 screens, tier system, credits economy, demo script)
- `DESIGN.md` -- Design system tokens (colors, typography, components, effects)

## Architecture Rules
1. Keep the app as few files as possible -- ideally components in `src/components/` and screens in `src/screens/`
2. Navigation is state-driven: `currentScreen` useState in App.jsx
3. No external image dependencies -- CSS gradients, SVG, or Lucide icons only
4. No emojis -- always use Lucide React icons for visual indicators
5. All interactions are simulated (game launches, social connects, reward claims)
6. Demo user starts at ~700 credits (Matchday tier) so tier-up can be triggered during walkthrough

## Design System
- Dark theme ALWAYS -- background `#0A0E17`
- **Font:** Barlow Condensed for headings (uppercase, tracking 0.02em), Barlow for body
- **Primary CTA:** Electric Lime `#e6ff00` with dark text `#001838`
- **Informational:** Sky Blue `#6CABDD` for progress bars, active nav, tier displays
- **Premium:** Gold `#D4A843` for tier badges and premium elements
- Glassmorphism cards: `bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl`
- See `DESIGN.md` for full token reference

## Button Patterns
- Primary CTA: `bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-3 px-8 rounded-xl`
- Secondary: `bg-[#6CABDD] hover:bg-[#5A9BC9] text-white font-bold py-3 px-8 rounded-xl`
- Ghost: `border border-white/20 text-white hover:bg-white/10 py-3 px-8 rounded-xl`

## Credits System (CRITICAL)
- `totalCreditsEarned` -- cumulative, NEVER decreases, determines tier
- `creditBalance` -- spendable, decreases on reward redemption
- Spending does NOT affect tier -- once you reach Centurion, you stay Centurion
- See `docs/PRD.md` for full earning/spending tables

## Animations
- Confetti on tier upgrades and reward claims
- Float-up effect on credit awards
- Shimmer on streak cards (lime-tinted)
- Glow pulse on CTA buttons (lime glow)
- Animated progress bars and counters
- Hover lift on cards (2px), scale on buttons (1.02x)
- All self-contained -- no framer-motion or external animation libs
- Use CSS keyframes in index.css

## Demo Flow
The app should support this walkthrough sequence:
1. Landing page -> Click "Join Now"
2. Onboarding (sign up + social connects) -> Auto-redirect to dashboard
3. Dashboard -> Navigate to Games Hub
4. Games Hub -> Click "Play" on EA FC -> 2s delay -> credits awarded -> tier up triggered
5. Rewards Store -> Claim a Tier 1 reward
6. Leaderboard -> Show user's position
7. Admin view -> Show captured user data
