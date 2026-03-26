import { useState, useEffect, useMemo } from 'react';
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
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [nextGameweek, setNextGameweek] = useState<number | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  const displayGameweek = useMemo(
    () => nextGameweek ?? gameweek,
    [nextGameweek, gameweek]
  );

  const computeTimeLeft = (target: Date): TimeLeft => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadDeadline = async () => {
      try {
        setStatus('loading');
        const res = await fetch('/api/fpl/next-deadline', {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error('Failed to load FPL data');
        }
        const data: { gameweek: number; deadlineTime: string } = await res.json();
        const deadlineDate = new Date(data.deadlineTime);
        setDeadline(deadlineDate);
        setNextGameweek(data.gameweek);
        setTimeLeft(computeTimeLeft(deadlineDate));
        setStatus('ready');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setStatus('error');
        }
      }
    };

    loadDeadline();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!deadline) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(computeTimeLeft(deadline));
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

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
        <h2 className="text-sm text-white font-medium">Deadline Countdown GW{displayGameweek}:</h2>
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
        {status === 'loading'
          ? 'Cargando deadline en tiempo real...'
          : status === 'error'
          ? 'No se pudo cargar la deadline en tiempo real'
          : `Tiempo restante para GW${displayGameweek}`}
      </p>
      {status === 'ready' && deadline && (
        <p className="text-center text-[11px] text-white/45 mt-1">
          Deadline local: {deadline.toLocaleString()}
        </p>
      )}
    </motion.div>
  );
}
