import { motion } from 'motion/react';

export type PlayerStatus = 'fit' | 'normal' | 'doubt';

export type PlayerData = {
    id: number;
    name: string;
    shortName: string;
    team: string;
    position: 'GK' | 'DEF' | 'MID' | 'FWD';
    xP: number;
    price: number;
    ownership: number;
    form: number;
    status: PlayerStatus;
    isCaptain?: boolean;
    isVice?: boolean;
    nextFixture: string;
    fixtureDifficulty: 1 | 2 | 3 | 4 | 5;
    last5: number[];
    image?: string;
};

interface PlayerNodeProps {
    player: PlayerData;
    index: number;
    onTap: (player: PlayerData) => void;
}

const statusRingColor: Record<PlayerStatus, string> = {
    fit: '#00ff85',
    normal: '#04f5ff',
    doubt: '#e90052',
};

const statusGlow: Record<PlayerStatus, string> = {
    fit: 'drop-shadow(0 0 8px rgba(0,255,133,0.6))',
    normal: 'drop-shadow(0 0 6px rgba(4,245,255,0.4))',
    doubt: 'drop-shadow(0 0 8px rgba(233,0,82,0.6))',
};

export function PlayerNode({ player, index, onTap }: PlayerNodeProps) {
    const ringColor = statusRingColor[player.status];
    const glow = statusGlow[player.status];

    return (
        <motion.button
            className="relative flex flex-col items-center gap-1 cursor-pointer"
            style={{ minWidth: 64, minHeight: 80 }}
            initial={{ opacity: 0, y: 30, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 + index * 0.06, type: 'spring', bounce: 0.3 }}
            whileTap={{ scale: 0.88 }}
            onClick={() => onTap(player)}
        >
            {/* Captain / Vice badge */}
            {(player.isCaptain || player.isVice) && (
                <motion.span
                    className="absolute -top-1 -right-1 z-20 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{
                        background: player.isCaptain
                            ? 'linear-gradient(135deg, #00ff85, #04f5ff)'
                            : 'linear-gradient(135deg, #04f5ff, #7c3aed)',
                        color: '#0b0b0b',
                    }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {player.isCaptain ? 'C' : 'V'}
                </motion.span>
            )}

            {/* Animated performance ring */}
            <div className="relative" style={{ filter: glow }}>
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        border: `2.5px solid ${ringColor}`,
                        borderRadius: '50%',
                    }}
                    animate={{
                        scale: [1, 1.18, 1],
                        opacity: [0.7, 0.3, 0.7],
                    }}
                    transition={{
                        duration: player.status === 'doubt' ? 1.2 : 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Player avatar */}
                <div
                    className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center"
                    style={{
                        border: `2.5px solid ${ringColor}`,
                        background: 'linear-gradient(135deg, #1a0020, #2a0035)',
                    }}
                >
                    {player.image ? (
                        <img src={player.image} alt={player.shortName} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xs font-bold text-white/80">
                            {player.shortName.slice(0, 3).toUpperCase()}
                        </span>
                    )}
                </div>
            </div>

            {/* Name */}
            <span className="text-[10px] font-semibold text-white/90 leading-tight text-center max-w-[64px] truncate">
                {player.shortName}
            </span>

            {/* xP badge */}
            <motion.span
                className="px-2 py-0.5 rounded-lg text-[9px] font-bold border"
                style={{
                    background: `${ringColor}18`,
                    borderColor: `${ringColor}50`,
                    color: ringColor,
                    backdropFilter: 'blur(4px)',
                }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
                {player.xP.toFixed(1)} xP
            </motion.span>
        </motion.button>
    );
}
