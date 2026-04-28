import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

const scales = { sm: 1, md: 1.4, lg: 2 };

function LicitexSVG({ scale = 1, variant = 'light' }: { scale?: number; variant?: 'light' | 'dark' }) {
  const w = 120 * scale;
  const h = 32 * scale;
  const textColor = variant === 'light' ? '#ffffff' : '#1e2d4a';

  return (
    <svg width={w} height={h} viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bars — bottom-aligned to y=29 */}
      <rect x="0" y="18" width="7" height="11" rx="1.5" fill="#3B82F6" />
      <rect x="10" y="12" width="7" height="17" rx="1.5" fill="#2563EB" />
      <rect x="20" y="5" width="7" height="24" rx="1.5" fill="#1D4ED8" />
      {/* Red checkmark above tallest bar */}
      <polyline
        points="22,2 25,5.5 31,0"
        stroke="#EF4444"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* LICITEX — vertically centered */}
      <text
        x="36"
        y="20.5"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontSize="16"
        fontWeight="800"
        letterSpacing="1.5"
        dominantBaseline="middle"
        fill={textColor}
      >
        LICITEX
      </text>
    </svg>
  );
}

export default function Logo({
  size = 'sm',
  href = '/',
  className = '',
  variant = 'light',
}: LogoProps) {
  const scale = scales[size];

  const LogoContent = () => (
    <div className={`inline-flex items-center ${className}`}>
      <LicitexSVG scale={scale} variant={variant} />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block hover:opacity-90 transition-opacity">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}
