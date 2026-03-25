import { useMemo, useState } from 'react';
import { ArrowRightLeft, BadgeCheck, BadgeX } from 'lucide-react';
import { ProfilePageLayout } from '../../app/components/profile/ProfilePageLayout';
import { ProfileCard } from '../../app/components/profile/ProfileCard';

const transferHistory = [
  {
    gw: 21,
    outPlayer: 'Bowen',
    inPlayer: 'Palmer',
    cost: -4,
    impact: 12,
  },
  {
    gw: 22,
    outPlayer: 'Nunez',
    inPlayer: 'Watkins',
    cost: 0,
    impact: -3,
  },
  {
    gw: 23,
    outPlayer: 'Trippier',
    inPlayer: 'Saliba',
    cost: -4,
    impact: 9,
  },
  {
    gw: 24,
    outPlayer: 'Jota',
    inPlayer: 'Gordon',
    cost: 0,
    impact: 6,
  },
  {
    gw: 25,
    outPlayer: 'Foden',
    inPlayer: 'Saka',
    cost: -8,
    impact: -2,
  },
];

export default function TransfersHistoryPage() {
  const [selectedGW, setSelectedGW] = useState('all');
  const [selectedPlayer, setSelectedPlayer] = useState('all');

  const players = useMemo(() => {
    const names = transferHistory.flatMap((transfer) => [
      transfer.inPlayer,
      transfer.outPlayer,
    ]);
    return Array.from(new Set(names)).sort();
  }, []);

  const filtered = transferHistory.filter((transfer) => {
    const matchesGW =
      selectedGW === 'all' || transfer.gw === Number(selectedGW);
    const matchesPlayer =
      selectedPlayer === 'all' ||
      transfer.inPlayer === selectedPlayer ||
      transfer.outPlayer === selectedPlayer;
    return matchesGW && matchesPlayer;
  });

  return (
    <ProfilePageLayout
      title="Historial de transfers"
      subtitle="Movimientos y su impacto real"
    >
      <ProfileCard accent="purple">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Filtros
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <select
                value={selectedGW}
                onChange={(event) => setSelectedGW(event.target.value)}
                className="rounded-xl border border-white/10 bg-[#140015] px-3 py-2 text-sm"
              >
                <option value="all">Todas las GWs</option>
                {transferHistory.map((transfer) => (
                  <option key={`gw-${transfer.gw}`} value={transfer.gw}>
                    GW {transfer.gw}
                  </option>
                ))}
              </select>
              <select
                value={selectedPlayer}
                onChange={(event) => setSelectedPlayer(event.target.value)}
                className="rounded-xl border border-white/10 bg-[#140015] px-3 py-2 text-sm"
              >
                <option value="all">Todos los jugadores</option>
                {players.map((player) => (
                  <option key={player} value={player}>
                    {player}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="rounded-2xl border border-[#00ff85]/30 bg-[#00ff85]/10 px-3 py-2 text-xs">
            {filtered.length} movimientos
          </div>
        </div>
      </ProfileCard>

      <ProfileCard accent="green" title="Detalle por Gameweek">
        <div className="space-y-3">
          {filtered.map((transfer) => {
            const isGood = transfer.impact >= 0;
            return (
              <div
                key={`${transfer.gw}-${transfer.inPlayer}-${transfer.outPlayer}`}
                className={`flex items-center justify-between rounded-2xl border px-3 py-3 text-sm ${
                  isGood
                    ? 'border-[#00ff85]/40 bg-[#00ff85]/10'
                    : 'border-[#ff5a7a]/40 bg-[#ff5a7a]/10'
                }`}
              >
                <div>
                  <p className="text-xs text-white/50">GW {transfer.gw}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[#f0b3ff]">{transfer.outPlayer}</span>
                    <ArrowRightLeft className="h-4 w-4 text-white/40" />
                    <span className="text-[#b6ffe2]">{transfer.inPlayer}</span>
                  </div>
                  <p className="text-xs text-white/60">
                    Costo: {transfer.cost} pts
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-xs">
                    {isGood ? (
                      <BadgeCheck className="h-4 w-4 text-[#00ff85]" />
                    ) : (
                      <BadgeX className="h-4 w-4 text-[#ff5a7a]" />
                    )}
                    <span
                      className={`font-semibold ${
                        isGood ? 'text-[#00ff85]' : 'text-[#ff5a7a]'
                      }`}
                    >
                      {isGood ? 'Buen transfer' : 'Mal transfer'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/60">
                    Impacto: {transfer.impact} pts
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
