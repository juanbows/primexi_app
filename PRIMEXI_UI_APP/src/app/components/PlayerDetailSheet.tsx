import { motion } from 'motion/react';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from './ui/drawer';
import type { PlayerData } from './PlayerNode';
import { TrendingUp, DollarSign, Users, Flame, Swords } from 'lucide-react';

interface PlayerDetailSheetProps {
    player: PlayerData | null;
    open: boolean;
    onClose: () => void;
}

const statusLabel: Record<string, { text: string; color: string }> = {
    fit: { text: 'En Forma', color: '#00ff85' },
    normal: { text: 'Normal', color: '#04f5ff' },
    doubt: { text: 'Duda', color: '#e90052' },
};

const difficultyColor = (d: number) => {
    if (d <= 2) return '#00ff85';
    if (d === 3) return '#04f5ff';
    if (d === 4) return '#f59e0b';
    return '#e90052';
};

export function PlayerDetailSheet({ player, open, onClose }: PlayerDetailSheetProps) {
    if (!player) return null;

    const status = statusLabel[player.status];
    const maxLast5 = Math.max(...player.last5, 1);

    return (
        <Drawer open={open} onOpenChange={(v) => !v && onClose()}>
            <DrawerContent className="bg-gradient-to-b from-[#1a0020] to-[#0d000f] border-t-2 border-[#00ff85]/30 max-h-[85vh] rounded-t-3xl">
                {/* Handle */}
                <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/20" />

                <DrawerHeader className="pb-2">
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div
                            className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0"
                            style={{
                                border: `2px solid ${status.color}`,
                                background: 'linear-gradient(135deg, #1a0020, #2a0035)',
                            }}
                        >
                            {player.image ? (
                                <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-sm font-bold text-white/70">
                                    {player.shortName.slice(0, 3).toUpperCase()}
                                </span>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <DrawerTitle className="text-white text-lg">{player.name}</DrawerTitle>
                            <DrawerDescription className="text-white/50 text-sm">
                                {player.team} · {player.position}
                            </DrawerDescription>
                            <span
                                className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                style={{
                                    backgroundColor: `${status.color}20`,
                                    color: status.color,
                                    border: `1px solid ${status.color}40`,
                                }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: status.color }}
                                />
                                {status.text}
                            </span>
                        </div>

                        {/* Captain badge */}
                        {(player.isCaptain || player.isVice) && (
                            <span
                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                style={{
                                    background: player.isCaptain
                                        ? 'linear-gradient(135deg, #00ff85, #04f5ff)'
                                        : 'linear-gradient(135deg, #04f5ff, #7c3aed)',
                                    color: '#0b0b0b',
                                }}
                            >
                                {player.isCaptain ? 'C' : 'V'}
                            </span>
                        )}
                    </div>
                </DrawerHeader>

                {/* Metrics Grid */}
                <div className="px-4 pb-2">
                    <div className="grid grid-cols-4 gap-2">
                        <MetricCard
                            icon={<TrendingUp className="w-3.5 h-3.5" />}
                            label="xP"
                            value={player.xP.toFixed(1)}
                            color="#00ff85"
                            index={0}
                        />
                        <MetricCard
                            icon={<DollarSign className="w-3.5 h-3.5" />}
                            label="Precio"
                            value={`£${player.price}`}
                            color="#04f5ff"
                            index={1}
                        />
                        <MetricCard
                            icon={<Users className="w-3.5 h-3.5" />}
                            label="Prop."
                            value={`${player.ownership}%`}
                            color="#7c3aed"
                            index={2}
                        />
                        <MetricCard
                            icon={<Flame className="w-3.5 h-3.5" />}
                            label="Forma"
                            value={player.form.toFixed(1)}
                            color="#f59e0b"
                            index={3}
                        />
                    </div>
                </div>

                {/* Last 5 GW Performance */}
                <div className="px-4 py-3">
                    <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">
                        Últimas 5 jornadas
                    </p>
                    <div className="flex items-end gap-2 h-16">
                        {player.last5.map((pts, i) => {
                            const height = Math.max((pts / maxLast5) * 100, 12);
                            const barColor =
                                pts >= 10
                                    ? '#00ff85'
                                    : pts >= 6
                                        ? '#04f5ff'
                                        : pts >= 3
                                            ? '#f59e0b'
                                            : '#e90052';
                            return (
                                <motion.div
                                    key={i}
                                    className="flex-1 flex flex-col items-center gap-1"
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                                    style={{ transformOrigin: 'bottom' }}
                                >
                                    <span className="text-[9px] font-bold" style={{ color: barColor }}>
                                        {pts}
                                    </span>
                                    <div
                                        className="w-full rounded-lg"
                                        style={{
                                            height: `${height}%`,
                                            backgroundColor: `${barColor}30`,
                                            border: `1px solid ${barColor}50`,
                                            background: `linear-gradient(to top, ${barColor}40, ${barColor}15)`,
                                        }}
                                    />
                                    <span className="text-[8px] text-white/30">GW</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Next Fixture */}
                <div className="px-4 pb-6">
                    <div
                        className="flex items-center justify-between rounded-2xl p-3 border"
                        style={{
                            backgroundColor: `${difficultyColor(player.fixtureDifficulty)}10`,
                            borderColor: `${difficultyColor(player.fixtureDifficulty)}30`,
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <Swords
                                className="w-4 h-4"
                                style={{ color: difficultyColor(player.fixtureDifficulty) }}
                            />
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-white/40">
                                    Próximo rival
                                </p>
                                <p className="text-sm font-semibold text-white">{player.nextFixture}</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((d) => (
                                <div
                                    key={d}
                                    className="w-2 h-4 rounded-sm"
                                    style={{
                                        backgroundColor:
                                            d <= player.fixtureDifficulty
                                                ? difficultyColor(player.fixtureDifficulty)
                                                : 'rgba(255,255,255,0.1)',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

function MetricCard({
    icon,
    label,
    value,
    color,
    index,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
    index: number;
}) {
    return (
        <motion.div
            className="rounded-xl p-2.5 text-center border"
            style={{
                backgroundColor: `${color}08`,
                borderColor: `${color}25`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + index * 0.06 }}
        >
            <div className="flex justify-center mb-1" style={{ color }}>
                {icon}
            </div>
            <p className="text-[9px] uppercase text-white/40">{label}</p>
            <p className="text-sm font-bold" style={{ color }}>
                {value}
            </p>
        </motion.div>
    );
}
