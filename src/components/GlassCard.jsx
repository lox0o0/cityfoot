export default function GlassCard({ children, className = '', gold = false, onClick }) {
  const borderClass = gold ? 'border-[#D4A843]/30' : 'border-white/15'
  return (
    <div
      className={`bg-white/5 backdrop-blur-xl border ${borderClass} rounded-2xl p-6 hover:translate-y-[-2px] hover:bg-white/10 transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
