export default function ProgressBar({ current, max, className = '' }) {
  const pct = Math.min((current / max) * 100, 100)
  return (
    <div className={`w-full bg-white/10 rounded-full h-3 ${className}`}>
      <div
        className="h-3 rounded-full bg-gradient-to-r from-[#6CABDD] to-[#D4A843] transition-all duration-1000"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
