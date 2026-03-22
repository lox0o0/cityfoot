# City Football Rewards Hub -- Design System

Shared design reference for all tools (Claude Code, Cursor, etc.). Source of truth for visual decisions.

---

## Fonts

| Token | Font | Usage |
|-------|------|-------|
| **Headings** | Barlow Condensed (400, 600, 700, 800) | h1-h6, page titles, section headers. Always uppercase with `letter-spacing: 0.02em` |
| **Body** | Barlow (300, 400, 500, 600) | Body text, labels, descriptions |

Loaded via Google Fonts in `index.html`. CSS applied in `index.css`.

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Electric Lime** | `#e6ff00` | Primary CTA buttons (Join Now, Play Now, Redeem), NEW badges |
| **Primary (Sky Blue)** | `#6CABDD` | Informational elements, progress bars, active nav, tier displays |
| **Secondary (Navy)** | `#1C2C5B` | Backgrounds, tier badges |
| **Accent (Gold)** | `#D4A843` | Tier badges, premium elements, credit amounts |
| **Background** | `#0A0E17` | Page background |
| **Admin Background** | `#0F1520` | Admin screen background (slightly lighter) |
| **Surface** | `rgba(255,255,255,0.05)` | Card backgrounds (glassmorphism) |
| **Text Primary** | `#FFFFFF` | Headings, body text |
| **Text Secondary** | `#8899AA` | Subtitles, descriptions, muted text |
| **Dark Text** | `#001838` | Text on lime buttons |
| **Success** | `#22C55E` | Connected states, positive movement |
| **Error** | `#EF4444` | Negative movement, errors |

## Glassmorphism Cards

Every card uses this pattern:
```
bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-6
```
- Hover: `hover:translate-y-[-2px] hover:bg-white/10 transition-all duration-300`
- Gold-bordered (featured): `border-[#D4A843]/30`
- Featured cards top glow: `border-t-2 border-t-[#6CABDD]/50`

## Buttons

| Variant | Classes |
|---------|---------|
| **Primary CTA (Lime)** | `bg-[#e6ff00] hover:bg-[#d4eb00] text-[#001838] font-bold py-3 px-8 rounded-xl hover:scale-[1.02]` |
| **Info/Secondary (Sky Blue)** | `bg-[#6CABDD] hover:bg-[#5A9BC9] text-white font-bold py-3 px-8 rounded-xl` |
| **Gold CTA** | `bg-[#D4A843] hover:bg-[#C49A3A] text-black font-bold py-3 px-8 rounded-xl` |
| **Ghost** | `border border-white/20 text-white hover:bg-white/10 py-3 px-8 rounded-xl` |
| **Small** | `text-sm py-2 px-4 rounded-lg` |

## Typography

| Element | Classes |
|---------|---------|
| Page title | `text-4xl font-extrabold uppercase tracking-tight text-white` |
| Landing hero | `text-6xl md:text-7xl font-extrabold uppercase tracking-tight` |
| Section header | `text-xl font-bold uppercase tracking-wider text-white` |
| Card title | `text-lg font-semibold text-white` |
| Body text | `text-sm text-[#8899AA]` |
| Credit balance | `text-5xl font-extrabold` with gradient text |
| Large numbers | `text-3xl font-extrabold` or gradient: `bg-gradient-to-r from-[#6CABDD] to-[#D4A843] bg-clip-text text-transparent` |

## Layout

- **Left sidebar:** 70px fixed, dark background, border-r, lime active indicator
- **Right sidebar (dashboard only):** 280px fixed, glassmorphism background, border-l
- **Main content:** Offset by sidebar widths, `p-6`
- **Card grids:** `grid grid-cols-2 gap-6` or `grid grid-cols-3 gap-6`
- **Section spacing:** `space-y-6` or `gap-6`

## Badges

- **Tier badge:** `px-3 py-1 rounded-full text-xs font-bold uppercase` with tier color
- **NEW badge:** `bg-[#e6ff00] text-[#001838] px-2 py-0.5 rounded text-xs font-bold`
- **Admin badge:** `bg-[#6CABDD]/20 text-[#6CABDD] border border-[#6CABDD]/30 px-3 py-1 rounded text-xs font-bold uppercase`

## Progress Bar

```
Container: w-full bg-white/10 rounded-full h-3
Fill: h-3 rounded-full bg-gradient-to-r from-[#6CABDD] to-[#D4A843] transition-all duration-1000
```

## Icons

Lucide React only. Monochromatic. No emojis anywhere in the UI. Sizes:
- Default: `w-5 h-5`
- Navigation: `w-6 h-6`
- Feature/hero: `w-8 h-8`
- Game cards: `w-12 h-12`

## Effects

| Effect | Usage |
|--------|-------|
| **Confetti** | Tier upgrades, reward claims |
| **Float-up** | Credit award notifications (+50 City Credits) |
| **Shimmer** | Streak cards (lime-tinted), special highlights |
| **Pulse glow** | Primary CTA buttons (lime glow) |
| **Counter animation** | Credit balance changes |
| **Hover lift** | Cards lift 2px on hover |
| **Button scale** | Buttons scale 1.02x on hover |

## Tier System

| Tier | Credits Required | Color | Badge Style |
|------|-----------------|-------|-------------|
| Fan | 0 | White | `bg-white/20 text-white` |
| Matchday | 250 | Sky Blue | `bg-[#6CABDD]/20 text-[#6CABDD]` |
| Blue Moon | 1,000 | Royal Blue | `bg-[#2B5BA0]/20 text-[#2B5BA0]` |
| Centurion | 2,500 | Navy + Gold | `bg-[#D4A843]/20 text-[#D4A843]` |
| Treble | 5,000 | Gold | `bg-[#D4A843]/30 text-[#D4A843]` |
| Legend | 10,000 | Gold + Sky Blue | gradient background |

## Hard Rules

- ALWAYS dark theme -- never white/light backgrounds
- ALWAYS glassmorphism cards with backdrop-blur
- ALWAYS Tailwind utility classes -- no CSS modules or styled-components
- ALWAYS `rounded-xl` minimum on cards
- ALWAYS `<button>` for interactive elements, never `<div onClick>`
- NEVER external image URLs -- use CSS gradients, SVG, or Lucide icons
- NEVER localStorage -- React state only
- NEVER emojis -- use Lucide React icons for all visual indicators
- Font: Barlow Condensed for headings (uppercase), Barlow for body
- Primary CTA: Electric Lime #e6ff00 with dark text #001838
- Sky Blue #6CABDD for informational/secondary elements
- Gold #D4A843 for tier badges and premium elements
