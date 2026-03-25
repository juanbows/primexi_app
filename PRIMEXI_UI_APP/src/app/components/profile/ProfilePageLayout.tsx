import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

type ProfilePageLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function ProfilePageLayout({
  title,
  subtitle,
  children,
}: ProfilePageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#38003c] via-[#2a0029] to-[#38003c] text-white">
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-md mx-auto min-h-screen px-4 pb-16 pt-8">
        <header className="mb-6 flex items-center gap-3">
          <Link
            href="/?tab=perfil"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#140015]/70 text-white/70 transition hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Perfil
            </p>
            <h1 className="text-2xl font-semibold">{title}</h1>
            {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
          </div>
        </header>

        <main className="space-y-4">{children}</main>
      </div>
    </div>
  );
}
