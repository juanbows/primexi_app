import { motion } from 'motion/react';
import { Zap, Wallet, Flame } from 'lucide-react';

interface TeamStatsProps {
    totalXP: number;
    teamValue: number;
    last5Form: number[];
}

const formDotColor = (pts: number) => {
    if (pts >= 60) return '#00ff85';
    if (pts >= 40) return '#04f5ff';
    if (pts >= 25) return '#f59e0b';
    return '#e90052';
};

export function TeamStats({ totalXP, teamValue, last5Form }: TeamStatsProps) {
    return (
        <motion.div
            className="grid grid-cols-3 gap-2"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            {/* Total xP */}
            <motion.div
                className="rounded-2xl border border-[#00ff85]/25 bg-[#1a0020]/70 backdrop-blur-sm p-3 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
            >
                <Zap className="w-4 h-4 text-[#00ff85] mx-auto mb-1" />
                <p className="text-[10px] uppercase tracking-wider text-white/50">xP Total</p>
                <p className="text-xl font-bold text-[#00ff85]">{totalXP.toFixed(1)}</p>
            </motion.div>

            {/* Team Value */}
            <motion.div
                className="rounded-2xl border border-[#04f5ff]/25 bg-[#1a0020]/70 backdrop-blur-sm p-3 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
            >
                <Wallet className="w-4 h-4 text-[#04f5ff] mx-auto mb-1" />
                <p className="text-[10px] uppercase tracking-wider text-white/50">Valor</p>
                <p className="text-xl font-bold text-[#04f5ff]">£{teamValue.toFixed(1)}</p>
            </motion.div>

            {/* Recent Form */}
            <motion.div
                className="rounded-2xl border border-[#7c3aed]/25 bg-[#1a0020]/70 backdrop-blur-sm p-3 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.35 }}
            >
                <Flame className="w-4 h-4 text-[#7c3aed] mx-auto mb-1" />
                <p className="text-[10px] uppercase tracking-wider text-white/50">Forma</p>
                <div className="flex items-center justify-center gap-1 mt-1.5">
                    {last5Form.map((pts, i) => (
                        <motion.div
                            key={i}
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: formDotColor(pts) }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.08, type: 'spring', bounce: 0.5 }}
                            title={`GW: ${pts} pts`}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
