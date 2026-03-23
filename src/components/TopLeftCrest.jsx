import McCrest from './McCrest'

/**
 * Club crest in the top-left. Use `overlay` inside full-screen layers (e.g. intro video);
 * default `fixed` for landing scroll + onboarding.
 */
export default function TopLeftCrest({ variant = 'fixed' }) {
  const positionClass =
    variant === 'overlay'
      ? 'absolute top-4 left-4 z-30 md:top-5 md:left-5'
      : 'fixed top-4 left-4 z-[100] md:top-5 md:left-5'

  return (
    <div className={`${positionClass} pointer-events-none select-none`} aria-hidden>
      <McCrest className="w-12 h-12 md:w-14 md:h-14" alt="" />
    </div>
  )
}
