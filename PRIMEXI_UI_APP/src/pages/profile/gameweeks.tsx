import { useMemo, useState } from 'react';
import { Crown, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import { ProfilePageLayout } from '../../app/components/profile/ProfilePageLayout';
import { ProfileCard } from '../../app/components/profile/ProfileCard';
import { LineChart } from '../../app/components/profile/LineChart';

const gameweekHistory = [
  { gw: 20, points: 52, captain: 'Saka', hit: 0, bench: 9 },
  { gw: 21, points: 64, captain: 'Haaland', hit: -4, bench: 7 },
  { gw: 22, points: 48, captain: 'Palmer', hit: 0, bench: 5 },
  { gw: 23, points: 73, captain: 'Salah', hit: 0, bench: 11 },
  { gw: 24, points: 67, captain: 'Haaland', hit: -8, bench: 4 },
  { gw: 25, points: 81, captain: 'Saka', hit: 0, bench: 6 },
  { gw: 26, points: 42, captain: 'Watkins', hit: 0, bench: 3 },
  { gw: 27, points: 58, captain: 'Salah', hit: 0, bench: 8 },
  { gw: 28, points: 76, captain: 'Haaland', hit: -4, bench: 10 },
  { gw: 29, points: 61, captain: 'Palmer', hit: 0, bench: 5 },
];

export default function GameweeksHistoryPage() {
  const [startGW, setStartGW] = useState(gameweekHistory[0].gw);
  const [endGW, setEndGW] = useState(
    gameweekHistory[gameweekHistory.length - 1].gw,
  );

  const filtered = useMemo(
    () =>
      gameweekHistory.filter(
        (week) => week.gw >= startGW && week.gw <= endGW,
      ),
    [startGW, endGW],
  );

  const pointsSeries = filtered.map((week) => week.points);
  const bestWeek = filtered.reduce((best, week) =>
    week.points > best.points ? week : best,
  );
  const worstWeek = filtered.reduce((worst, week) =>
    week.points < worst.points ? week : worst,
  );

  const handleStartChange = (value: number) => {
    setStartGW(value);
    if (value > endGW) {
      setEndGW(value);
    }
  };

  const handleEndChange = (value: number) => {
    setEndGW(value);
    if (value < startGW) {
      setStartGW(value);
    }
  };

  return (
    <ProfilePageLayout
      title="Historial de Gameweeks"
      subtitle="Rendimiento jornada a jornada"
    >
      <ProfileCard accent="purple">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Puntos por GW
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {filtered.reduce((sum, week) => sum + week.points, 0)} pts
            </p>
          </div>
          <div className="text-right text-xs text-white/60">
            Rango
            <div className="text-sm font-semibold text-white">
              GW {startGW} - {endGW}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <LineChart data={pointsSeries} accent="#04f5ff" />
        </div>
      </ProfileCard>

      <ProfileCard accent="green">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-white/60">Filtrar rango</p>
            <div className="mt-2 flex items-center gap-2">
              <select
                value={startGW}
                onChange={(event) => handleStartChange(Number(event.target.value))}
                className="rounded-xl border border-white/10 bg-[#140015] px-3 py-2 text-sm"
              >
                {gameweekHistory.map((week) => (
                  <option key={`start-${week.gw}`} value={week.gw}>
                    GW {week.gw}
                  </option>
                ))}
              </select>
              <span className="text-white/40">→</span>
              <select
                value={endGW}
                onChange={(event) => handleEndChange(Number(event.target.value))}
                className="rounded-xl border border-white/10 bg-[#140015] px-3 py-2 text-sm"
              >
                {gameweekHistory.map((week) => (
                  <option key={`end-${week.gw}`} value={week.gw}>
                    GW {week.gw}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="rounded-2xl border border-[#00ff85]/30 bg-[#00ff85]/10 px-3 py-2 text-xs">
            {filtered.length} GWs
          </div>
        </div>
      </ProfileCard>

      <div className="grid grid-cols-2 gap-3">
        <ProfileCard accent="green" className="p-3">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <TrendingUp className="h-4 w-4 text-[#00ff85]" />
            Mejor GW
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#00ff85]">
            {bestWeek.points} pts
          </p>
          <p className="text-xs text-white/60">GW {bestWeek.gw}</p>
        </ProfileCard>
        <ProfileCard accent="pink" className="p-3">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <TrendingDown className="h-4 w-4 text-[#ff5a7a]" />
            Peor GW
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#ff5a7a]">
            {worstWeek.points} pts
          </p>
          <p className="text-xs text-white/60">GW {worstWeek.gw}</p>
        </ProfileCard>
      </div>

      <ProfileCard accent="purple" title="Detalle por jornada">
        <div className="space-y-3">
          {filtered.map((week) => {
            const isBest = week.gw === bestWeek.gw;
            const isWorst = week.gw === worstWeek.gw;
            const highlightClass = isBest
              ? 'border-[#00ff85]/40 bg-[#00ff85]/10'
              : isWorst
              ? 'border-[#ff5a7a]/40 bg-[#ff5a7a]/10'
              : 'border-white/5 bg-[#140015]';

            return (
              <div
                key={week.gw}
                className={`flex items-center justify-between rounded-2xl border px-3 py-3 text-sm ${highlightClass}`}
              >
                <div>
                  <p className="text-xs text-white/50">GW {week.gw}</p>
                  <p className="text-base font-semibold">
                    {week.points} pts
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-xs text-white/60">
                    <Crown className="h-3 w-3 text-[#facc15]" />
                    {week.captain}
                  </div>
                  <div className="mt-1 flex items-center justify-end gap-3 text-xs">
                    <span className="text-white/50">Bench {week.bench}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 ${
                        week.hit < 0
                          ? 'bg-[#ff5a7a]/20 text-[#ff5a7a]'
                          : 'bg-[#00ff85]/15 text-[#00ff85]'
                      }`}
                    >
                      {week.hit < 0 ? week.hit : 'Sin hit'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ProfileCard>

      <ProfileCard accent="blue">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Sparkles className="h-4 w-4 text-[#04f5ff]" />
          Insight rapido
        </div>
        <p className="mt-2 text-sm text-white/60">
          Las mejores jornadas coincidieron con capitanes ofensivos y banca
          activa. Considera mantener un banco con al menos 7 puntos promedio.
        </p>
      </ProfileCard>
    </ProfilePageLayout>
  );
}
