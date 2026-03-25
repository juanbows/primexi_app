import { useState } from 'react';
import {
  ArrowRightLeft,
  Award,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { CountdownTimer } from './components/CountdownTimer';
import { WeekSelector } from './components/WeekSelector';
import { TopPlayers } from './components/TopPlayers';
import { RevelationPlayer } from './components/RevelationPlayer';
import { NewsIntelligence } from './components/NewsIntelligence';
import { BottomNavigation, type BottomNavId } from './components/BottomNavigation';
import { TeamFormation } from './components/TeamFormation';
import TransfersPage from './transfers/TransfersPage';

const transfers = [
  { inPlayer: 'Ollie Watkins', outPlayer: 'Darwin Nunez' },
  { inPlayer: 'Cole Palmer', outPlayer: 'Jarrod Bowen' },
  { inPlayer: 'William Saliba', outPlayer: 'Joachim Andersen' },
];

export default function App() {
  const [currentGameweek, setCurrentGameweek] = useState(24);
  const [activeTab, setActiveTab] = useState<BottomNavId>('inicio');

  const gwSummary = {
    fixture: currentGameweek % 2 === 0 ? 'low' : 'medium',
    rotation: currentGameweek % 3 === 0 ? 'high' : 'low',
    injuries: currentGameweek % 4 === 0 ? 'high' : 'low',
  } as const;


  const statusColor = (level: 'low' | 'medium' | 'high') => {
    if (level === 'high') {
      return 'bg-[#e90052]/15 text-[#e90052] border-[#e90052]/40';
    }
    if (level === 'medium') {
      return 'bg-[#04f5ff]/15 text-[#04f5ff] border-[#04f5ff]/40';
    }
    return 'bg-[#00ff85]/15 text-[#00ff85] border-[#00ff85]/40';
  };

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

      <div className="relative max-w-md mx-auto min-h-screen">
        {activeTab === 'equipo' ? (
          <main className="px-4 pb-28 pt-6 space-y-4">
            <TeamFormation />
          </main>
        ) : activeTab === 'traspasos' ? (
          <TransfersPage />
        ) : activeTab === 'perfil' ? (
          <main className="px-4 pb-28 pt-8 space-y-6">
            <header className="flex items-center gap-4 rounded-3xl border border-[#00ff85]/20 bg-[#2a0029]/70 p-4 shadow-[0_20px_45px_-30px_rgba(0,0,0,0.9)]">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#00ff85] via-[#7c3aed] to-[#00d4ff] p-[2px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#140015] text-lg font-semibold">
                    NN
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 rounded-full bg-[#00ff85] px-2 py-0.5 text-[10px] font-semibold text-[#0b0b0b]">
                  ACTIVE
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Manager
                </p>
                <h1 className="text-xl font-semibold">Nicolas Suarez</h1>
                <p className="text-sm text-white/70">Midnight XI FC</p>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-[#00ff85]/40 bg-[#00ff85]/10 px-2 py-1 text-[11px] font-medium text-[#b6ffe2]">
                  <Star className="h-3 w-3" />
                  Top 10% form
                </div>
              </div>
            </header>

            <section className="space-y-4">
              <div className="rounded-3xl border border-[#7c3aed]/30 bg-[#220024]/80 p-4 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Trophy className="h-4 w-4 text-[#7c3aed]" />
                    Ranking global
                  </div>
                  <span className="rounded-full bg-[#7c3aed]/20 px-2 py-1 text-xs text-[#d9b7ff]">
                    Elite
                  </span>
                </div>
                <div className="mt-3 flex items-end gap-3">
                  <p className="text-3xl font-semibold">48,320</p>
                  <p className="text-xs text-white/60">de 11.2M</p>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-white/70">
                  <Users className="h-4 w-4 text-[#00ff85]" />
                  Liga privada: <span className="text-white">#3</span>
                </div>
              </div>

              <div className="rounded-3xl border border-[#00ff85]/20 bg-[#1b001c]/80 p-4 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Award className="h-4 w-4 text-[#00ff85]" />
                  Puntos
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#140015] p-3">
                    <p className="text-xs text-white/60">Totales</p>
                    <p className="text-2xl font-semibold">1,687</p>
                  </div>
                  <div className="rounded-2xl bg-[#140015] p-3">
                    <p className="text-xs text-white/60">GW actual</p>
                    <p className="text-2xl font-semibold text-[#00ff85]">67</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-[#7c3aed]/30 bg-[#220024]/80 p-4 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Shield className="h-4 w-4 text-[#7c3aed]" />
                  Capitan actual
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#111827] to-[#1f2937] p-[2px]">
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#140015] text-xs text-white/60">
                      IMG
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold">Erling Haaland</p>
                    <p className="text-xs text-white/60">
                      Decision clave esta jornada
                    </p>
                  </div>
                  <span className="rounded-full bg-[#00ff85]/20 px-2 py-1 text-xs text-[#b6ffe2]">
                    C
                  </span>
                </div>
              </div>

              <div className="rounded-3xl border border-[#00ff85]/20 bg-[#1b001c]/80 p-4 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <ArrowRightLeft className="h-4 w-4 text-[#00ff85]" />
                  Transfers recientes
                </div>
                <div className="mt-3 space-y-3">
                  {transfers.map((transfer) => (
                    <div
                      key={`${transfer.inPlayer}-${transfer.outPlayer}`}
                      className="flex items-center justify-between rounded-2xl bg-[#140015] px-3 py-2 text-sm"
                    >
                      <span className="text-[#b6ffe2]">{transfer.inPlayer}</span>
                      <span className="text-white/40">→</span>
                      <span className="text-[#f0b3ff]">{transfer.outPlayer}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        ) : (
          <>
            <Header />
            <main className="px-4 pb-24 space-y-6">
              <CountdownTimer gameweek={currentGameweek} />
              <WeekSelector
                currentGameweek={currentGameweek}
                onGameweekChange={setCurrentGameweek}
              />

              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00ff85]" />
                  <h2 className="text-lg font-bold text-white">Resumen GW</h2>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border text-center ${statusColor(gwSummary.fixture)}`}
                  >
                    Calendario
                  </span>
                  <span
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border text-center ${statusColor(gwSummary.rotation)}`}
                  >
                    Rotacion
                  </span>
                  <span
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border text-center ${statusColor(gwSummary.injuries)}`}
                  >
                    Lesiones
                  </span>
                </div>
              </section>

              <TopPlayers gameweek={currentGameweek} />
              <RevelationPlayer gameweek={currentGameweek} />
              <div className="space-y-3 -mt-2">
                <NewsIntelligence />
                <motion.section
                  className="space-y-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                />
              </div>
            </main>
          </>
        )}

        <BottomNavigation activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}
