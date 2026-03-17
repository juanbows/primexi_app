import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WeekSelectorProps {
  currentGameweek: number;
  onGameweekChange: (gw: number) => void;
}

export function WeekSelector({ currentGameweek, onGameweekChange }: WeekSelectorProps) {
  const handlePrevious = () => {
    if (currentGameweek > 1) {
      onGameweekChange(currentGameweek - 1);
    }
  };

  const handleNext = () => {
    if (currentGameweek < 38) {
      onGameweekChange(currentGameweek + 1);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <motion.button
        onClick={handlePrevious}
        disabled={currentGameweek === 1}
        className={`p-3 rounded-xl transition-all ${
          currentGameweek === 1 
            ? 'bg-[#38003c]/30 text-white/30 cursor-not-allowed' 
            : 'bg-[#38003c]/60 text-[#00ff85] hover:bg-[#38003c]/80 border border-[#00ff85]/30'
        }`}
        whileHover={currentGameweek > 1 ? { scale: 1.05 } : {}}
        whileTap={currentGameweek > 1 ? { scale: 0.95 } : {}}
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.div
        className="flex-1 bg-gradient-to-r from-[#00ff85] to-[#04f5ff] rounded-2xl p-4 text-center"
        key={currentGameweek}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm text-[#38003c] font-medium mb-1">Jornada</p>
        <p className="text-3xl font-bold text-[#38003c]">GW {currentGameweek}</p>
      </motion.div>

      <motion.button
        onClick={handleNext}
        disabled={currentGameweek === 38}
        className={`p-3 rounded-xl transition-all ${
          currentGameweek === 38 
            ? 'bg-[#38003c]/30 text-white/30 cursor-not-allowed' 
            : 'bg-[#38003c]/60 text-[#00ff85] hover:bg-[#38003c]/80 border border-[#00ff85]/30'
        }`}
        whileHover={currentGameweek < 38 ? { scale: 1.05 } : {}}
        whileTap={currentGameweek < 38 ? { scale: 0.95 } : {}}
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
}