import { motion } from 'motion/react';
import { Sparkles, Zap } from 'lucide-react';

interface RevelationPlayerProps {
  gameweek: number;
}

// Mock data for different gameweeks
const getRevelationForGameweek = (gw: number) => {
  const revelations = [
    { name: 'Gordon', team: 'NEW', points: 12, achievement: 'Impacto Sorpresivo y xG Alto' },
    { name: 'Mbeumo', team: 'BRE', points: 13, achievement: 'Doblete inesperado' },
    { name: 'Paquetá', team: 'WHU', points: 11, achievement: 'Gol y dominio del medio' }
  ];
  
  const index = (gw - 23) % revelations.length;
  return index >= 0 ? revelations[index] : revelations[0];
};

export function RevelationPlayer({ gameweek }: RevelationPlayerProps) {
  const revelation = getRevelationForGameweek(gameweek);
  
  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      key={gameweek}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-[#e90052]" />
        <h2 className="text-xl font-bold text-white">Jugador Revelación</h2>
      </div>
      
      <motion.div
        className="relative bg-gradient-to-br from-[#e90052]/20 via-[#38003c] to-[#e90052]/20 rounded-3xl p-6 border-2 border-[#e90052]/50 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated Background Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#e90052]/10 to-[#04f5ff]/10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Sparkle effects */}
        <motion.div
          className="absolute top-4 right-4"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-6 h-6 text-[#00ff85]" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-4 left-4"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-5 h-5 text-[#04f5ff]" />
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-1">{revelation.name}</h3>
              <p className="text-sm text-[#04f5ff]">({revelation.team})</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#e90052]/30 to-[#04f5ff]/30 rounded-2xl py-4 px-6 border border-[#e90052]/40 shadow-lg shadow-[#e90052]/30">
            <Zap className="w-8 h-8 text-[#00ff85]" />
            <span className="text-5xl font-bold bg-gradient-to-r from-[#00ff85] to-[#04f5ff] bg-clip-text text-transparent">{revelation.points}</span>
            <span className="text-xl text-[#00ff85]">PTS</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-center">
            <Sparkles className="w-4 h-4 text-[#00ff85]" />
            <p className="text-sm font-medium text-white">{revelation.achievement}</p>
            <Sparkles className="w-4 h-4 text-[#00ff85]" />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
