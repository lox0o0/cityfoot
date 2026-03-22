/**
 * Man City crest — replace public/assets/shared/logos/man-city-crest.svg with official artwork when available.
 */
export default function McCrest({ className = 'w-10 h-10', alt = '' }) {
  return (
    <img
      src="/assets/shared/logos/man-city-crest.svg"
      alt={alt}
      className={`object-contain select-none ${className}`}
      draggable={false}
    />
  )
}
