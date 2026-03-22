---
description: App architecture constraints — navigation, state, dependencies
globs: ["src/**/*.jsx", "src/**/*.tsx"]
---

## Architecture

- **Vite + React** single-page app
- **No React Router** — navigation via `currentScreen` useState
- **No localStorage** — React state only
- **No backend** — all data simulated
- **No external images** — CSS gradients, SVG, Lucide icons, emoji only

## Allowed Dependencies
- React (hooks only: useState, useEffect, useCallback, useMemo, useRef)
- Lucide React (icons)
- Tailwind CSS
- Nothing else — no framer-motion, no chart libs, no axios

## Credits System (CRITICAL)
- `totalCreditsEarned` — cumulative, never decreases, determines tier
- `creditBalance` — spendable, decreases on redemption
- Spending does NOT reduce tier
- Tier is always DERIVED from totalCreditsEarned

## Navigation
```jsx
const [currentScreen, setCurrentScreen] = useState('landing');
// Screens: landing, onboarding, dashboard, games, leaderboard, rewards, profile, admin
```
