import type { ReactNode } from 'react';

const accentStyles = {
  green: 'border-[#00ff85]/25 bg-[#1b001c]/80',
  purple: 'border-[#7c3aed]/30 bg-[#220024]/80',
  pink: 'border-[#ff4fd8]/30 bg-[#22001f]/80',
  blue: 'border-[#04f5ff]/30 bg-[#14002a]/80',
};

type Accent = keyof typeof accentStyles;

type ProfileCardProps = {
  title?: string;
  subtitle?: string;
  accent?: Accent;
  children: ReactNode;
  className?: string;
};

export function ProfileCard({
  title,
  subtitle,
  accent = 'green',
  children,
  className,
}: ProfileCardProps) {
  return (
    <div
      className={`rounded-3xl border p-4 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.9)] ${accentStyles[accent]} ${className ?? ''}`}
    >
      {(title || subtitle) && (
        <div className="mb-3">
          {title && <h2 className="text-sm font-semibold">{title}</h2>}
          {subtitle && <p className="text-xs text-white/60">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
