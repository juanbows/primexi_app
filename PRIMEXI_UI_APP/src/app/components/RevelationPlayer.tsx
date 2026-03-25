import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap } from 'lucide-react';
import { useState } from 'react';

interface RevelationPlayerProps {
  gameweek: number;
}

// Mock data for different gameweeks
const getRevelationForGameweek = (gw: number) => {
  const revelations = [
    {
      name: 'Gordon',
      team: 'NEW',
      points: 12,
      achievement: 'Impacto Sorpresivo y xG Alto',
      trend: {
        lastGWs: [2, 3, 12],
        xG: [0.2, 0.4, 0.9],
        minutes: [64, 71, 90],
      },
      reason: 'Subida fuerte de xG y minutos completos esta jornada.',
    },
    {
      name: 'Mbeumo',
      team: 'BRE',
      points: 13,
      achievement: 'Doblete inesperado',
      trend: {
        lastGWs: [4, 5, 13],
        xG: [0.3, 0.5, 1.1],
        minutes: [70, 78, 90],
      },
      reason: 'Aumento de minutos + xG explosivo en el último partido.',
    },
    {
      name: 'Paquetá',
      team: 'WHU',
      points: 11,
      achievement: 'Gol y dominio del medio',
      trend: {
        lastGWs: [3, 4, 11],
        xG: [0.1, 0.2, 0.6],
        minutes: [62, 74, 88],
      },
      reason: 'Mejor volumen ofensivo y rol más avanzado.',
    }
  ];
  
  const index = (gw - 23) % revelations.length;
  return index >= 0 ? revelations[index] : revelations[0];
};

export function RevelationPlayer({ gameweek }: RevelationPlayerProps) {
  const revelation = getRevelationForGameweek(gameweek);
  const last3 = revelation.trend.lastGWs;
  const delta = last3[last3.length - 1] - last3[last3.length - 2];
  const trendUp = delta >= 0;
  const maxPoints = Math.max(...last3, 1);
  const maxXg = Math.max(...revelation.trend.xG, 1);
  const [isOpen, setIsOpen] = useState(false);
  
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
      
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative bg-gradient-to-br from-[#e90052]/20 via-[#38003c] to-[#e90052]/20 rounded-3xl p-6 border-2 border-[#e90052]/50 overflow-hidden w-full text-left"
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

          <div className="text-center text-[11px] text-white/50">
            {isOpen ? 'Toca para ocultar' : 'Toca para ver por qué fue revelación'}
          </div>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                className="rounded-2xl border border-white/10 bg-[#140015]/70 p-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-wider text-white/40">
                    Últimas 3 jornadas
                  </p>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                      trendUp
                        ? 'text-[#00ff85] border-[#00ff85]/40 bg-[#00ff85]/10'
                        : 'text-[#e90052] border-[#e90052]/40 bg-[#e90052]/10'
                    }`}
                  >
                    {trendUp ? `+${delta} PTS` : `${delta} PTS`}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-3">
                  {last3.map((pts, idx) => {
                    const height = Math.max((pts / maxPoints) * 100, 12);
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="h-16 w-8 rounded-full bg-white/10 flex items-end overflow-hidden">
                          <div
                            className="w-full rounded-full"
                            style={{
                              height: `${height}%`,
                              background:
                                'linear-gradient(180deg, rgba(0,255,133,0.95), rgba(4,245,255,0.75))',
                            }}
                          />
                        </div>
                        <span className="text-xs text-white/80 font-semibold">{pts}</span>
                        <span className="text-[10px] text-white/40">GW</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {revelation.trend.xG.map((value, idx) => {
                    const width = Math.min((value / maxXg) * 100, 100);
                    return (
                      <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-2">
                        <p className="text-[9px] uppercase tracking-wider text-white/40">xG</p>
                        <p className="text-sm font-semibold text-white/90">{value.toFixed(2)}</p>
                        <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${width}%`,
                              background:
                                'linear-gradient(90deg, rgba(233,0,82,0.8), rgba(4,245,255,0.9))',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-3 text-xs text-white/60 text-center">
                  {revelation.reason}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </motion.section>
  );
}
