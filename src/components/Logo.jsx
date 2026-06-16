export default function Logo({ dark = false }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 12, color: dark ? '#fff' : 'inherit' }}>
      <svg width="40" height="24" viewBox="0 0 40 24" fill="none" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4B86FF" />
            <stop offset="1" stopColor="#1A45D8" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="3.4" />
        <circle cx="28" cy="12" r="9.2" fill="none" stroke="url(#lg)" strokeWidth="3.4" />
        <rect x="12" y="9.6" width="16" height="4.8" rx="2.4" fill="currentColor" />
      </svg>
      <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.02em', lineHeight: 1.02, textAlign: 'left' }}>
        BOOT<br />CAMP
      </span>
    </span>
  )
}
