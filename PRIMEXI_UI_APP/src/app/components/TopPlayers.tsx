import { motion } from 'motion/react';
import { Trophy, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import { useRef } from 'react';

type Player = {
  id: number;
  name: string;
  team: string;
  points: number;
  achievement: string;
  position: number;
  image: string;
};

interface TopPlayersProps {
  gameweek: number;
}

// Mock data for different gameweeks
const getPlayersForGameweek = (gw: number): Player[] => {
  const allPlayers = [
    // GW 24
    [
      { id: 1, name: 'Foden', team: 'MCI', points: 18, achievement: 'Hat trick y MVP', position: 1, image: 'https://images.unsplash.com/photo-1765046876564-aa4034b6c71a?w=400' },
      { id: 2, name: 'Isak', team: 'NEW', points: 15, achievement: 'Doble Gol', position: 2, image: 'https://images.unsplash.com/photo-1701363539457-875b9bc9bbc1?w=400' },
      { id: 3, name: 'Palmer', team: 'CHE', points: 14, achievement: 'Gol y Asistencia', position: 3, image: 'https://images.unsplash.com/photo-1632300873131-1dd749c83f97?w=400' },
      { id: 4, name: 'Salah', team: 'LIV', points: 13, achievement: 'Gol y Assist', position: 4, image: 'https://images.unsplash.com/photo-1765046876564-aa4034b6c71a?w=400' },
      { id: 5, name: 'Saka', team: 'ARS', points: 12, achievement: 'Gol de MVP', position: 5, image: 'https://images.unsplash.com/photo-1701363539457-875b9bc9bbc1?w=400' }
    ],
    // GW 25
    [
      { id: 1, name: 'Haaland', team: 'MCI', points: 20, achievement: 'Triplete Histórico', position: 1, image: 'https://images.unsplash.com/photo-1632300873131-1dd749c83f97?w=400' },
      { id: 2, name: 'Salah', team: 'LIV', points: 16, achievement: 'Doblete', position: 2, image: 'https://images.unsplash.com/photo-1765046876564-aa4034b6c71a?w=400' },
      { id: 3, name: 'Son', team: 'TOT', points: 14, achievement: 'Gol y 2 Assists', position: 3, image: 'https://images.unsplash.com/photo-1701363539457-875b9bc9bbc1?w=400' },
      { id: 4, name: 'Watkins', team: 'AVL', points: 13, achievement: 'Doblete Crucial', position: 4, image: 'https://images.unsplash.com/photo-1632300873131-1dd749c83f97?w=400' },
      { id: 5, name: 'Foden', team: 'MCI', points: 11, achievement: 'Asistencias', position: 5, image: 'https://images.unsplash.com/photo-1765046876564-aa4034b6c71a?w=400' }
    ],
    // GW 23
    [
      { id: 1, name: 'Palmer', team: 'CHE', points: 19, achievement: 'Hat trick perfecto', position: 1, image: 'https://images.unsplash.com/photo-1701363539457-875b9bc9bbc1?w=400' },
      { id: 2, name: 'Isak', team: 'NEW', points: 14, achievement: 'Doblete', position: 2, image: 'https://images.unsplash.com/photo-1632300873131-1dd749c83f97?w=400' },
      { id: 3, name: 'Bowen', team: 'WHU', points: 13, achievement: 'Gol y Assist', position: 3, image: 'https://images.unsplash.com/photo-1765046876564-aa4034b6c71a?w=400' },
      { id: 4, name: 'De Bruyne', team: 'MCI', points: 12, achievement: '3 Asistencias', position: 4, image: 'https://images.unsplash.com/photo-1701363539457-875b9bc9bbc1?w=400' },
      { id: 5, name: 'Rashford', team: 'MUN', points: 11, achievement: 'Gol clave', position: 5, image: 'https://images.unsplash.com/photo-1632300873131-1dd749c83f97?w=400' }
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

function PlayerCard({ player }: { player: Player }) {
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
      
      <motion.div
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
      </motion.div>
    </motion.div>
  );
}

export function TopPlayers({ gameweek }: TopPlayersProps) {
  const players = getPlayersForGameweek(gameweek);
  const sliderRef = useRef<Slider>(null);
  
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
              <PlayerCard key={player.id} player={player} />
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
    </motion.section>
  );
}