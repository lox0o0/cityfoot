---
description: Man City design system — colors, cards, buttons, typography
globs: ["src/**/*.jsx", "src/**/*.tsx", "src/**/*.css"]
---

## Design Tokens

### Colors
- Background: `#0A0E17`
- Primary (Sky Blue): `#6CABDD`
- Secondary (Navy): `#1C2C5B`
- Accent (Gold): `#D4A843`
- Text: `#FFFFFF` primary, `#8899AA` secondary

### Glassmorphism Cards
```
bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6
```

### Buttons
- Primary: `bg-[#6CABDD] hover:bg-[#5A9BC9] text-white font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(108,171,221,0.3)]`
- Gold: `bg-[#D4A843] hover:bg-[#C49A3A] text-black font-bold py-3 px-8 rounded-xl`
- Ghost: `border border-white/20 text-white hover:bg-white/10 py-3 px-8 rounded-xl`

### Rules
- ALWAYS dark theme — never white/light backgrounds
- ALWAYS Tailwind utilities — no CSS modules
- ALWAYS `<button>` for interactive elements
- Minimum `rounded-xl` on cards
- No external image URLs
