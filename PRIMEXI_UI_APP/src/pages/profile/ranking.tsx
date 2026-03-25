import { useMemo, useState } from 'react';
import { TrendingDown, TrendingUp, Users } from 'lucide-react';
import { ProfilePageLayout } from '../../app/components/profile/ProfilePageLayout';
import { ProfileCard } from '../../app/components/profile/ProfileCard';
import { LineChart } from '../../app/components/profile/LineChart';
import { ToggleGroup } from '../../app/components/profile/ToggleGroup';

type RankingView = 'global' | 'liga';

const rankingSeries = {
  global: [128400, 110220, 96210, 77110, 62340, 48320],
  liga: [12, 10, 7, 6, 4, 3],
};

const comparisonStats = {
  global: {
    averagePoints: 1512,
    averageGW: 55,
  },
  liga: {
    averagePoints: 1694,
    averageGW: 61,
  },
};

export default function RankingDetailPage() {
  const [view, setView] = useState<RankingView>('global');
  const data = rankingSeries[view];

  const summary = useMemo(() => {
    const current = data[data.length - 1];
    const previous = data[data.length - 2] ?? current;
    const delta = previous - current;
    return { current, previous, delta };
  }, [data]);

  const isPositive = summary.delta >= 0;

  return (
    <ProfilePageLayout
      title="Detalle de ranking"
      subtitle="Evolucion y comparativos por Gameweek"
    >
      <div className="flex items-center justify-between">
        <ToggleGroup
          options={[
            { id: 'global', label: 'Global' },
            { id: 'liga', label: 'Liga privada' },
          ]}
          active={view}
          onChange={setView}
        />
        <span className="rounded-full border border-[#00ff85]/40 bg-[#00ff85]/10 px-3 py-1 text-xs font-semibold text-[#b6ffe2]">
          Top 10%
        </span>
      </div>

      <ProfileCard accent="purple">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Ranking actual
            </p>
            <div className="mt-2 flex items-end gap-3">
              <p className="text-3xl font-semibold">
                {summary.current.toLocaleString('en-US')}
              </p>
              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  isPositive ? 'text-[#00ff85]' : 'text-[#ff5a7a]'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {isPositive ? '+' : ''}
                {summary.delta.toLocaleString('en-US')} vs GW anterior
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#140015] px-3 py-2 text-xs text-white/60">
            {view === 'global' ? 'de 11.2M' : 'de 18 managers'}
          </div>
        </div>
        <div className="mt-4">
          <LineChart
            data={data}
            accent={view === 'global' ? '#00ff85' : '#7c3aed'}
            background={
              view === 'global'
                ? 'rgba(0, 255, 133, 0.12)'
                : 'rgba(124, 58, 237, 0.18)'
            }
          />
        </div>
      </ProfileCard>

      <div className="grid grid-cols-2 gap-3">
        <ProfileCard accent="green" className="p-3">
          <p className="text-xs text-white/60">Promedio global</p>
          <p className="mt-2 text-xl font-semibold">
            {comparisonStats.global.averagePoints} pts
          </p>
          <p className="text-xs text-white/50">GW promedio</p>
          <p className="text-sm font-semibold text-[#00ff85]">
            {comparisonStats.global.averageGW} pts
          </p>
        </ProfileCard>
        <ProfileCard accent="blue" className="p-3">
          <p className="text-xs text-white/60">Promedio liga privada</p>
          <p className="mt-2 text-xl font-semibold">
            {comparisonStats.liga.averagePoints} pts
          </p>
          <p className="text-xs text-white/50">GW promedio</p>
          <p className="text-sm font-semibold text-[#04f5ff]">
            {comparisonStats.liga.averageGW} pts
          </p>
        </ProfileCard>
      </div>

      <ProfileCard accent="pink">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Users className="h-4 w-4 text-[#ff4fd8]" />
          Comparacion de entorno
        </div>
        <div className="mt-3 space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-2xl bg-[#140015] px-3 py-2">
            <span className="text-white/60">Racha vs global</span>
            <span className="font-semibold text-[#00ff85]">+6.1% mejor</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-[#140015] px-3 py-2">
            <span className="text-white/60">Racha vs liga privada</span>
            <span className="font-semibold text-[#7c3aed]">Top 3</span>
          </div>
        </div>
      </ProfileCard>
    </ProfilePageLayout>
  );
}
