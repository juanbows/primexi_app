import { useState } from 'react';
import { Header } from './components/Header';
import { CountdownTimer } from './components/CountdownTimer';
import { WeekSelector } from './components/WeekSelector';
import { TopPlayers } from './components/TopPlayers';
import { RevelationPlayer } from './components/RevelationPlayer';
import { NewsIntelligence } from './components/NewsIntelligence';
import { BottomNavigation } from './components/BottomNavigation';

export default function App() {
  const [currentGameweek, setCurrentGameweek] = useState(24);

  const gwSummary = {
    fixture: currentGameweek % 2 === 0 ? 'low' : 'medium',
    rotation: currentGameweek % 3 === 0 ? 'high' : 'low',
    injuries: currentGameweek % 4 === 0 ? 'high' : 'low'
  } as const;

  const statusColor = (level: 'low' | 'medium' | 'high') => {
    if (level === 'high') return 'bg-[#e90052]/15 text-[#e90052] border-[#e90052]/40';
    if (level === 'medium') return 'bg-[#04f5ff]/15 text-[#04f5ff] border-[#04f5ff]/40';
    return 'bg-[#00ff85]/15 text-[#00ff85] border-[#00ff85]/40';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#38003c] via-[#2a0029] to-[#38003c] text-white">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Content */}
      <div className="relative max-w-md mx-auto min-h-screen">
        <Header />
        
        <main className="px-4 pb-6 space-y-6">
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
              <span className={`px-3 py-2 rounded-xl text-xs font-semibold border text-center ${statusColor(gwSummary.fixture)}`}>
                Calendario
              </span>
              <span className={`px-3 py-2 rounded-xl text-xs font-semibold border text-center ${statusColor(gwSummary.rotation)}`}>
                Rotación
              </span>
              <span className={`px-3 py-2 rounded-xl text-xs font-semibold border text-center ${statusColor(gwSummary.injuries)}`}>
                Lesiones
              </span>
            </div>
          </section>

          <TopPlayers gameweek={currentGameweek} />
          <RevelationPlayer gameweek={currentGameweek} />
          <NewsIntelligence />
        </main>
        
        <BottomNavigation />
      </div>
    </div>
  );
}
