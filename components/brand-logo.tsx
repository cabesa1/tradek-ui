type BrandLogoProps = { compact?: boolean; tagline?: boolean };

export function BrandLogo({ compact = false, tagline = false }: BrandLogoProps) {
  return <span className={`brand-logo ${compact ? "is-compact" : ""}`}>
    <svg className="brand-monogram" viewBox="0 0 64 48" role="img" aria-label="TradeK">
      <path fill="currentColor" d="M2 4h31l-8 9H18v25L8 46V13H2z"/>
      <path fill="#b9ff1f" d="M39 4h23L43 24l19 20H40L21 24z"/>
    </svg>
    {!compact&&<span className="brand-word-wrap"><span className="brand-word">TRADE<span>K</span></span>{tagline&&<small>Soluções que movem negócios</small>}</span>}
  </span>;
}
