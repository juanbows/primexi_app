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
          <TopPlayers gameweek={currentGameweek} />
          <RevelationPlayer gameweek={currentGameweek} />
          <NewsIntelligence />
        </main>
        
        <BottomNavigation />
      </div>
    </div>
  );
}