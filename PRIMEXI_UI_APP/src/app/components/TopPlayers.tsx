import { motion } from 'motion/react';
import { Trophy, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import { useRef, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from './ui/drawer';

type Player = {
  id: number;
  name: string;
  team: string;
  points: number;
  achievement: string;
  position: number;
  image: string;
  matchStats: {
    minutes: number;
    goals: number;
    assists: number;
    shots: number;
    keyPasses: number;
    xG: number;
    xA: number;
    bonus: number;
    bps: number;
  };
};

interface TopPlayersProps {
  gameweek: number;
}

// Mock data for different gameweeks
const getPlayersForGameweek = (gw: number): Player[] => {
  const allPlayers = [
    // GW 24
    [
      {
        id: 1,
        name: 'Foden',
        team: 'MCI',
        points: 18,
        achievement: 'Hat trick y MVP',
        position: 1,
        image: 'https://images.unsplash.com/photo-1765046876564-aa4034b6c71a?w=400',
        matchStats: { minutes: 90, goals: 3, assists: 0, shots: 6, keyPasses: 2, xG: 1.9, xA: 0.3, bonus: 3, bps: 42 },
      },
      {
        id: 2,
        name: 'Isak',
        team: 'NEW',
        points: 15,
        achievement: 'Doble Gol',
        position: 2,
        image: 'https://images.unsplash.com/photo-1701363539457-875b9bc9bbc1?w=400',
        matchStats: { minutes: 90, goals: 2, assists: 0, shots: 5, keyPasses: 1, xG: 1.4, xA: 0.1, bonus: 3, bps: 38 },
      },
      {
        id: 3,
        name: 'Palmer',
        team: 'CHE',
        points: 14,
        achievement: 'Gol y Asistencia',
        position: 3,
        image: 'https://images.unsplash.com/photo-1632300873131-1dd749c83f97?w=400',
        matchStats: { minutes: 88, goals: 1, assists: 1, shots: 3, keyPasses: 4, xG: 0.6, xA: 0.7, bonus: 2, bps: 34 },
      },
      {
        id: 4,
        name: 'Salah',
        team: 'LIV',
        points: 13,
        achievement: 'Gol y Assist',
        position: 4,
        image: 'https://images.unsplash.com/photo-1765046876564-aa4034b6c71a?w=400',
        matchStats: { minutes: 90, goals: 1, assists: 1, shots: 4, keyPasses: 3, xG: 0.7, xA: 0.5, bonus: 2, bps: 31 },
      },
      {
        id: 5,
        name: 'Saka',
        team: 'ARS',
        points: 12,
        achievement: 'Gol de MVP',
        position: 5,
        image: 'https://images.unsplash.com/photo-1701363539457-875b9bc9bbc1?w=400',
        matchStats: { minutes: 90, goals: 1, assists: 0, shots: 2, keyPasses: 2, xG: 0.5, xA: 0.2, bonus: 1, bps: 28 },
      },
    ],
    // GW 25
    [
      {
        id: 1,
        name: 'Haaland',
        team: 'MCI',
        points: 20,
        achievement: 'Triplete Histórico',
        position: 1,
        image: 'https://images.unsplash.com/photo-1632300873131-1dd749c83f97?w=400',
        matchStats: { minutes: 90, goals: 3, assists: 0, shots: 7, keyPasses: 1, xG: 2.2, xA: 0.1, bonus: 3, bps: 44 },
      },
      {
        id: 2,
        name: 'Salah',
        team: 'LIV',
        points: 16,
        achievement: 'Doblete',
        position: 2,
        image: 'https://images.unsplash.com/photo-1765046876564-aa4034b6c71a?w=400',
        matchStats: { minutes: 90, goals: 2, assists: 0, shots: 5, keyPasses: 2, xG: 1.3, xA: 0.2, bonus: 2, bps: 36 },
      },
      {
        id: 3,
        name: 'Son',
        team: 'TOT',
        points: 14,
        achievement: 'Gol y 2 Assists',
        position: 3,
        image: 'https://images.unsplash.com/photo-1701363539457-875b9bc9bbc1?w=400',
        matchStats: { minutes: 88, goals: 1, assists: 2, shots: 4, keyPasses: 5, xG: 0.7, xA: 1.1, bonus: 3, bps: 39 },
      },
      {
        id: 4,
        name: 'Watkins',
        team: 'AVL',
        points: 13,
        achievement: 'Doblete Crucial',
        position: 4,
        image: 'https://images.unsplash.com/photo-1632300873131-1dd749c83f97?w=400',
        matchStats: { minutes: 90, goals: 2, assists: 0, shots: 5, keyPasses: 1, xG: 1.5, xA: 0.1, bonus: 2, bps: 33 },
      },
      {
        id: 5,
        name: 'Foden',
        team: 'MCI',
        points: 11,
        achievement: 'Asistencias',
        position: 5,
        image: 'https://images.unsplash.com/photo-1765046876564-aa4034b6c71a?w=400',
        matchStats: { minutes: 90, goals: 0, assists: 2, shots: 2, keyPasses: 4, xG: 0.3, xA: 0.8, bonus: 1, bps: 27 },
      },
    ],
    // GW 23
    [
      {
        id: 1,
        name: 'Palmer',
        team: 'CHE',
        points: 19,
        achievement: 'Hat trick perfecto',
        position: 1,
        image: 'https://images.unsplash.com/photo-1701363539457-875b9bc9bbc1?w=400',
        matchStats: { minutes: 90, goals: 3, assists: 0, shots: 6, keyPasses: 3, xG: 1.8, xA: 0.2, bonus: 3, bps: 41 },
      },
      {
        id: 2,
        name: 'Isak',
        team: 'NEW',
        points: 14,
        achievement: 'Doblete',
        position: 2,
        image: 'https://images.unsplash.com/photo-1632300873131-1dd749c83f97?w=400',
        matchStats: { minutes: 90, goals: 2, assists: 0, shots: 4, keyPasses: 1, xG: 1.2, xA: 0.1, bonus: 2, bps: 32 },
      },
      {
        id: 3,
        name: 'Bowen',
        team: 'WHU',
        points: 13,
        achievement: 'Gol y Assist',
        position: 3,
        image: 'https://images.unsplash.com/photo-1765046876564-aa4034b6c71a?w=400',
        matchStats: { minutes: 90, goals: 1, assists: 1, shots: 3, keyPasses: 3, xG: 0.6, xA: 0.6, bonus: 2, bps: 30 },
      },
      {
        id: 4,
        name: 'De Bruyne',
        team: 'MCI',
        points: 12,
        achievement: '3 Asistencias',
        position: 4,
        image: 'https://images.unsplash.com/photo-1701363539457-875b9bc9bbc1?w=400',
        matchStats: { minutes: 82, goals: 0, assists: 3, shots: 2, keyPasses: 6, xG: 0.2, xA: 1.4, bonus: 3, bps: 40 },
      },
      {
        id: 5,
        name: 'Rashford',
        team: 'MUN',
        points: 11,
        achievement: 'Gol clave',
        position: 5,
        image: 'https://images.unsplash.com/photo-1632300873131-1dd749c83f97?w=400',
        matchStats: { minutes: 90, goals: 1, assists: 0, shots: 3, keyPasses: 2, xG: 0.7, xA: 0.2, bonus: 1, bps: 26 },
      },
    ]
  ];

  // Return data based on gameweek, cycling through available data
  const index = (gw - 23) % allPlayers.length;
  return index >= 0 ? allPlayers[index] : allPlayers[0];
};

const positionColors = {
  1: {
    border: 'border-[#04f5ff]',
    shadow: 'shadow-[#04f5ff]/50',
    badge: 'bg-gradient-to-br from-[#04f5ff] to-[#00ff85]',
    glow: 'shadow-2xl shadow-[#04f5ff]/60'
  },
  2: {
    border: 'border-[#00ff85]',
    shadow: 'shadow-[#00ff85]/50',
    badge: 'bg-gradient-to-br from-[#00ff85] to-[#04f5ff]',
    glow: 'shadow-xl shadow-[#00ff85]/50'
  },
  3: {
    border: 'border-[#e90052]',
    shadow: 'shadow-[#e90052]/50',
    badge: 'bg-gradient-to-br from-[#e90052] to-[#04f5ff]',
    glow: 'shadow-xl shadow-[#e90052]/40'
  },
  4: {
    border: 'border-[#04f5ff]/60',
    shadow: 'shadow-[#04f5ff]/30',
    badge: 'bg-gradient-to-br from-[#38003c] to-[#04f5ff]/80',
    glow: 'shadow-lg shadow-[#04f5ff]/30'
  },
  5: {
    border: 'border-[#00ff85]/60',
    shadow: 'shadow-[#00ff85]/30',
    badge: 'bg-gradient-to-br from-[#38003c] to-[#00ff85]/80',
    glow: 'shadow-lg shadow-[#00ff85]/30'
  }
};

function PlayerCard({
  player,
  onClick,
}: {
  player: Player;
  onClick: (player: Player) => void;
}) {
  const colors = positionColors[player.position as keyof typeof positionColors];
  const isFirst = player.position === 1;
  
  return (
    <motion.div
      className="px-4 py-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Position Badge */}
      <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-full ${colors.badge} flex items-center justify-center ${colors.shadow} shadow-lg`}>
        <span className="text-white font-bold text-2xl">{player.position}</span>
      </div>
      
      <motion.button
        type="button"
        onClick={() => onClick(player)}
        className={`relative bg-gradient-to-b from-[#38003c]/90 to-[#38003c]/70 rounded-3xl border-2 ${colors.border} ${colors.glow} overflow-hidden backdrop-blur-sm ${isFirst ? 'scale-105' : 'scale-100'}`}
        whileHover={{ scale: isFirst ? 1.08 : 1.03 }}
        transition={{ duration: 0.2 }}
      >
        {/* Player Image */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#38003c] z-10" />
          <img 
            src={player.image} 
            alt={player.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Player Info */}
        <div className="p-6 space-y-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-2">{player.name}</h3>
            <p className="text-lg text-white/70">({player.team})</p>
          </div>
          
          <div className="flex items-center justify-center gap-2 bg-[#00ff85]/20 rounded-2xl py-4 px-6 border-2 border-[#00ff85]/40">
            <TrendingUp className="w-7 h-7 text-[#00ff85]" />
            <span className="text-5xl font-bold text-[#00ff85]">{player.points}</span>
            <span className="text-xl text-[#00ff85]">PTS</span>
          </div>
          
          <p className="text-base text-center text-white/90 min-h-[3rem] flex items-center justify-center px-4">
            {player.achievement}
          </p>
        </div>
      </motion.button>
    </motion.div>
  );
}

export function TopPlayers({ gameweek }: TopPlayersProps) {
  const players = getPlayersForGameweek(gameweek);
  const sliderRef = useRef<Slider>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '40px',
    dotsClass: 'slick-dots !bottom-0',
    customPaging: (i: number) => (
      <div className="w-2 h-2 rounded-full bg-white/30 hover:bg-[#00ff85] transition-all mt-4" />
    )
  };
  
  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      key={gameweek}
    >
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-[#04f5ff]" />
        <h2 className="text-xl font-bold text-white">Top 5 de la Jornada</h2>
      </div>
      
      <div className="relative">
        {/* Left Arrow */}
        <motion.button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#00ff85]/90 border-2 border-[#00ff85] text-[#38003c] shadow-lg shadow-[#00ff85]/50"
          whileHover={{ scale: 1.15, backgroundColor: 'rgba(0, 255, 133, 1)' }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Slider */}
        <div className="relative -mx-4">
          <Slider ref={sliderRef} {...settings}>
            {players.map(player => (
              <PlayerCard
                key={player.id}
                player={player}
                onClick={(picked) => {
                  setSelectedPlayer(picked);
                  setDetailsOpen(true);
                }}
              />
            ))}
          </Slider>
        </div>

        {/* Right Arrow */}
        <motion.button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#00ff85]/90 border-2 border-[#00ff85] text-[#38003c] shadow-lg shadow-[#00ff85]/50"
          whileHover={{ scale: 1.15, backgroundColor: 'rgba(0, 255, 133, 1)' }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      <Drawer open={detailsOpen} onOpenChange={(open) => setDetailsOpen(open)}>
        <DrawerContent className="bg-gradient-to-b from-[#1a0020] to-[#0d000f] border-t-2 border-[#00ff85]/30 max-h-[85vh] rounded-t-3xl">
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/20" />
          {selectedPlayer && (
            <>
              <DrawerHeader className="pb-0">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#140015]/80">
                  <div className="absolute inset-0">
                    <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#00ff85]/20 blur-3xl" />
                    <div className="absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-[#04f5ff]/20 blur-3xl" />
                  </div>
                  <div className="relative p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl overflow-hidden border border-white/10 bg-[#0d000f]">
                        <img
                          src={selectedPlayer.image}
                          alt={selectedPlayer.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <DrawerTitle className="text-white text-lg">
                          {selectedPlayer.name}
                        </DrawerTitle>
                        <DrawerDescription className="text-white/50 text-sm">
                          {selectedPlayer.team} · Top {selectedPlayer.position}
                        </DrawerDescription>
                        <p className="text-xs text-white/60 mt-1">
                          {selectedPlayer.achievement}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-[#00ff85]/40 bg-[#00ff85]/10 px-3 py-2 text-center">
                        <p className="text-[10px] text-[#00ff85]/80">PTS</p>
                        <p className="text-lg font-bold text-[#00ff85]">
                          {selectedPlayer.points}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <StatPill label="Minutos" value={`${selectedPlayer.matchStats.minutes}`} />
                      <StatPill label="Goles" value={`${selectedPlayer.matchStats.goals}`} />
                      <StatPill label="Asist." value={`${selectedPlayer.matchStats.assists}`} />
                      <StatPill label="Tiros" value={`${selectedPlayer.matchStats.shots}`} />
                      <StatPill label="Key Passes" value={`${selectedPlayer.matchStats.keyPasses}`} />
                      <StatPill label="Bonus" value={`${selectedPlayer.matchStats.bonus}`} />
                    </div>
                  </div>
                </div>
              </DrawerHeader>

              <div className="px-4 pb-6 pt-3 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <StatMiniCard label="xG" value={selectedPlayer.matchStats.xG.toFixed(2)} tone="mint" />
                  <StatMiniCard label="xA" value={selectedPlayer.matchStats.xA.toFixed(2)} tone="cyan" />
                  <StatMiniCard label="BPS" value={`${selectedPlayer.matchStats.bps}`} tone="violet" />
                  <StatMiniCard label="Impacto" value={`${selectedPlayer.points} PTS`} tone="mint" />
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#140015]/70 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    Mapa de impacto
                  </p>
                  <div className="mt-3 space-y-2">
                    <StatBar label="xG" value={selectedPlayer.matchStats.xG} max={2.5} color="#00ff85" />
                    <StatBar label="xA" value={selectedPlayer.matchStats.xA} max={2.0} color="#04f5ff" />
                    <StatBar label="Key Passes" value={selectedPlayer.matchStats.keyPasses} max={6} color="#7c3aed" />
                  </div>
                </div>
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </motion.section>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      <span className="text-white/50">{label}</span>
      <span className="ml-2 font-semibold text-white">{value}</span>
    </div>
  );
}

function StatMiniCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'mint' | 'cyan' | 'violet';
}) {
  const toneMap = {
    mint: {
      bg: 'bg-[#00ff85]/10',
      border: 'border-[#00ff85]/30',
      text: 'text-[#00ff85]',
    },
    cyan: {
      bg: 'bg-[#04f5ff]/10',
      border: 'border-[#04f5ff]/30',
      text: 'text-[#04f5ff]',
    },
    violet: {
      bg: 'bg-[#7c3aed]/10',
      border: 'border-[#7c3aed]/30',
      text: 'text-[#7c3aed]',
    },
  } as const;

  const style = toneMap[tone];

  return (
    <div className={`rounded-2xl border ${style.border} ${style.bg} p-3`}>
      <p className="text-[10px] uppercase tracking-wider text-white/50">{label}</p>
      <p className={`text-xl font-semibold ${style.text}`}>{value}</p>
    </div>
  );
}

function StatBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const width = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] text-white/50">
        <span>{label}</span>
        <span className="text-white/80">{value.toFixed(2).replace('.00', '')}</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
          }}
        />
      </div>
    </div>
  );
}
