import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  href?: string;
  className?: string;
  textColor?: 'dark' | 'light';
}

const sizes = {
  sm: { width: 150, height: 45 },
  md: { width: 200, height: 60 },
  lg: { width: 300, height: 90 }
};

export default function Logo({ 
  size = 'sm', 
  showText = false,
  href = '/',
  className = '',
  textColor = 'dark'
}: LogoProps) {
  const { width, height } = sizes[size];
  
  const LogoContent = () => (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src="/logo.png"
        alt="licitex"
        fill
        priority
        className="object-contain object-left"
        sizes={`${width}px`}
      />
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