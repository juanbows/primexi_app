import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  gameweek: number;
}

export function CountdownTimer({ gameweek }: CountdownTimerProps) {
  // Mock countdown - in a real app this would be based on actual deadline
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex items-baseline gap-1">
      <motion.span 
        key={value}
        className="text-4xl font-bold text-[#e90052]"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="text-lg text-[#e90052]/80">{label}</span>
    </div>
  );

  return (
    <motion.div 
      className="bg-gradient-to-r from-[#38003c]/80 to-[#38003c]/60 rounded-2xl p-6 border-2 border-[#00ff85]/30 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-[#04f5ff]" />
        <h2 className="text-sm text-white font-medium">Deadline Countdown GW{gameweek}:</h2>
      </div>
      
      <div className="flex items-center justify-center gap-3">
        <TimeUnit value={timeLeft.days} label="d" />
        <span className="text-2xl text-[#e90052] font-bold">:</span>
        <TimeUnit value={timeLeft.hours} label="h" />
        <span className="text-2xl text-[#e90052] font-bold">:</span>
        <TimeUnit value={timeLeft.minutes} label="m" />
        <span className="text-2xl text-[#e90052] font-bold">:</span>
        <TimeUnit value={timeLeft.seconds} label="s" />
      </div>
      
      <p className="text-center text-xs text-white/60 mt-3">
        Tiempo restante para GW{gameweek}
      </p>
    </motion.div>
  );
}