import { useMemo } from 'react';
import { CheckCircle2, Crown, Trophy, XCircle } from 'lucide-react';
import { ProfilePageLayout } from '../../app/components/profile/ProfilePageLayout';
import { ProfileCard } from '../../app/components/profile/ProfileCard';

const captainHistory = [
  {
    gw: 20,
    captain: 'Haaland',
    vice: 'Saka',
    points: 18,
    bestOption: 'Haaland',
    bestPoints: 18,
  },
  {
    gw: 21,
    captain: 'Salah',
    vice: 'Palmer',
    points: 8,
    bestOption: 'Palmer',
    bestPoints: 14,
  },
  {
    gw: 22,
    captain: 'Saka',
    vice: 'Watkins',
    points: 12,
    bestOption: 'Saka',
    bestPoints: 12,
  },
  {
    gw: 23,
    captain: 'Palmer',
    vice: 'Haaland',
    points: 6,
    bestOption: 'Haaland',
    bestPoints: 16,
  },
  {
    gw: 24,
    captain: 'Haaland',
    vice: 'Salah',
    points: 22,
    bestOption: 'Haaland',
    bestPoints: 22,
  },
  {
    gw: 25,
    captain: 'Saka',
    vice: 'Palmer',
    points: 14,
    bestOption: 'Saka',
    bestPoints: 14,
  },
];

export default function CaptainDecisionsPage() {
  const summary = useMemo(() => {
    const total = captainHistory.reduce((sum, entry) => sum + entry.points, 0);
    const goodCount = captainHistory.filter(
      (entry) => entry.captain === entry.bestOption,
    ).length;
    const accuracy = Math.round((goodCount / captainHistory.length) * 100);
    return { total, goodCount, accuracy };
  }, []);

  return (
    <ProfilePageLayout
      title="Decisiones de capitan"
      subtitle="Analisis de tus elecciones clave"
    >
      <div className="grid grid-cols-2 gap-3">
        <ProfileCard accent="green" className="p-3">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Trophy className="h-4 w-4 text-[#00ff85]" />
            Acierto capitan
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#00ff85]">
            {summary.accuracy}%
          </p>
          <p className="text-xs text-white/60">
            {summary.goodCount} de {captainHistory.length} GWs
          </p>
        </ProfileCard>
        <ProfileCard accent="purple" className="p-3">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Crown className="h-4 w-4 text-[#facc15]" />
            Puntos capitanes
          </div>
          <p className="mt-2 text-2xl font-semibold">{summary.total}</p>
          <p className="text-xs text-white/60">Total generado</p>
        </ProfileCard>
      </div>

      <ProfileCard accent="pink" title="Resumen por Gameweek">
        <div className="space-y-3">
          {captainHistory.map((entry) => {
            const isGood = entry.captain === entry.bestOption;
            return (
              <div
                key={entry.gw}
                className={`flex items-center justify-between rounded-2xl border px-3 py-3 text-sm ${
                  isGood
                    ? 'border-[#00ff85]/40 bg-[#00ff85]/10'
                    : 'border-[#ff5a7a]/40 bg-[#ff5a7a]/10'
                }`}
              >
                <div>
                  <p className="text-xs text-white/50">GW {entry.gw}</p>
                  <p className="text-base font-semibold">
                    {entry.captain} · {entry.points} pts
                  </p>
                  <p className="text-xs text-white/60">
                    Vice: {entry.vice}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-xs">
                    {isGood ? (
                      <CheckCircle2 className="h-4 w-4 text-[#00ff85]" />
                    ) : (
                      <XCircle className="h-4 w-4 text-[#ff5a7a]" />
                    )}
                    <span
                      className={`font-semibold ${
                        isGood ? 'text-[#00ff85]' : 'text-[#ff5a7a]'
                      }`}
                    >
                      {isGood ? 'Decision correcta' : 'Se perdieron puntos'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/60">
                    Mejor opcion: {entry.bestOption} ({entry.bestPoints} pts)
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ProfileCard>
    </ProfilePageLayout>
  );
}
