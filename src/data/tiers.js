export const TIERS = [
  {
    name: 'Fan',
    threshold: 0,
    color: '#FFFFFF',
    bgClass: 'bg-white/20 text-white',
    unlocks: ['Access to platform', 'Basic rewards'],
  },
  {
    name: 'Matchday',
    threshold: 250,
    color: '#6CABDD',
    bgClass: 'bg-[#6CABDD]/20 text-[#6CABDD]',
    unlocks: ['Stadium tour eligibility', '5% merch discount'],
  },
  {
    name: 'Blue Moon',
    threshold: 1000,
    color: '#2B5BA0',
    bgClass: 'bg-[#2B5BA0]/20 text-[#2B5BA0]',
    unlocks: ['Monthly prize draw entry', '10% merch discount'],
  },
  {
    name: 'Centurion',
    threshold: 2500,
    color: '#D4A843',
    bgClass: 'bg-[#D4A843]/20 text-[#D4A843]',
    unlocks: ['Signed merch eligibility', 'Matchday ticket access'],
  },
  {
    name: 'Treble',
    threshold: 5000,
    color: '#D4A843',
    bgClass: 'bg-[#D4A843]/30 text-[#D4A843]',
    unlocks: ['Player experience eligibility', 'VIP rewards'],
  },
  {
    name: 'Legend',
    threshold: 10000,
    color: '#6CABDD',
    bgClass: 'bg-gradient-to-r from-[#D4A843]/30 to-[#6CABDD]/30 text-[#D4A843]',
    unlocks: ['All rewards unlocked', 'Exclusive Legend-only drops'],
  },
]
