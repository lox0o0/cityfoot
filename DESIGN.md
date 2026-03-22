# City Football Rewards Hub — Design System

Shared design reference for all tools (Claude Code, Cursor, etc.). Source of truth for visual decisions.

---

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary (Sky Blue)** | `#6CABDD` | Buttons, links, active states, progress bars |
| **Secondary (Navy)** | `#1C2C5B` | Backgrounds, tier badges |
| **Accent (Gold)** | `#D4A843` | Tier badges, special CTAs, reward highlights, premium elements |
| **Background** | `#0A0E17` | Page background |
| **Surface** | `rgba(255,255,255,0.05)` | Card backgrounds (glassmorphism) |
| **Text Primary** | `#FFFFFF` | Headings, body text |
| **Text Secondary** | `#8899AA` | Subtitles, descriptions, muted text |
| **Success** | `#22C55E` | Connected states, positive movement |
| **Error** | `#EF4444` | Negative movement, errors |

## Glassmorphism Cards

Every card uses this pattern:
```
bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6
```
- Hover: `hover:bg-white/10 transition-all duration-300`
- Gold-bordered (featured): `border-[#D4A843]/30`

## Buttons

| Variant | Classes |
|---------|---------|
| **Primary CTA** | `bg-[#6CABDD] hover:bg-[#5A9BC9] text-white font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(108,171,221,0.3)]` |
| **Gold CTA** | `bg-[#D4A843] hover:bg-[#C49A3A] text-black font-bold py-3 px-8 rounded-xl` |
| **Ghost** | `border border-white/20 text-white hover:bg-white/10 py-3 px-8 rounded-xl` |
| **Small** | `text-sm py-2 px-4 rounded-lg` |

## Typography

| Element | Classes |
|---------|---------|
| Page title | `text-3xl font-bold text-white` |
| Section header | `text-lg font-bold uppercase tracking-wider text-white` |
| Card title | `text-lg font-semibold text-white` |
| Body text | `text-sm text-[#8899AA]` |
| Large numbers | `text-4xl font-bold` or gradient: `bg-gradient-to-r from-[#6CABDD] to-[#D4A843] bg-clip-text text-transparent` |

## Layout

- **Left sidebar:** 70px fixed, dark background, border-r
- **Right sidebar (dashboard only):** 280px fixed, glassmorphism background, border-l
- **Main content:** Offset by sidebar widths, `p-6`
- **Card grids:** `grid grid-cols-2 gap-6` or `grid grid-cols-3 gap-6`
- **Section spacing:** `space-y-6` or `gap-6`

## Badges

- **Tier badge:** `px-3 py-1 rounded-full text-xs font-bold uppercase` with tier color
- **Status badge:** `bg-[#D4A843] text-black px-2 py-0.5 rounded text-xs font-bold`

## Progress Bar

```
Container: w-full bg-white/10 rounded-full h-3
Fill: h-3 rounded-full bg-gradient-to-r from-[#6CABDD] to-[#D4A843] transition-all duration-1000
```

## Icons

Lucide React only. Monochromatic. Sizes:
- Default: `w-5 h-5`
- Navigation: `w-6 h-6`
- Feature/hero: `w-8 h-8`

## Effects

| Effect | Usage |
|--------|-------|
| **Confetti** | Tier upgrades, reward claims |
| **Float-up** | Credit award notifications (+50 City Credits) |
| **Shimmer** | Streak cards, special highlights |
| **Pulse glow** | Primary CTA buttons |
| **Counter animation** | Credit balance changes |

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

- ALWAYS dark theme — never white/light backgrounds
- ALWAYS glassmorphism cards with backdrop-blur
- ALWAYS Tailwind utility classes — no CSS modules or styled-components
- ALWAYS `rounded-xl` minimum on cards
- ALWAYS `<button>` for interactive elements, never `<div onClick>`
- NEVER external image URLs — use CSS gradients, SVG, Lucide icons, or emoji
- NEVER localStorage — React state only
