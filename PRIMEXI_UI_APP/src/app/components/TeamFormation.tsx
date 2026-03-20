import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';
import { PlayerNode, type PlayerData } from './PlayerNode';
import { TeamStats } from './TeamStats';
import { PlayerDetailSheet } from './PlayerDetailSheet';

// ── Mock squad data (4-3-3 formation) ──────────────────────────────
const squad: PlayerData[] = [
    // GK
    {
        id: 1, name: 'David Raya', shortName: 'Raya', team: 'ARS', position: 'GK',
        xP: 4.8, price: 5.7, ownership: 28, form: 5.2, status: 'fit',
        nextFixture: 'BOU (H)', fixtureDifficulty: 2, last5: [6, 2, 8, 1, 6],
    },
    // DEF
    {
        id: 2, name: 'Trent Alexander-Arnold', shortName: 'TAA', team: 'LIV', position: 'DEF',
        xP: 6.1, price: 7.2, ownership: 42, form: 6.8, status: 'fit',
        nextFixture: 'WOL (H)', fixtureDifficulty: 2, last5: [9, 2, 10, 6, 5],
    },
    {
        id: 3, name: 'William Saliba', shortName: 'Saliba', team: 'ARS', position: 'DEF',
        xP: 5.3, price: 6.1, ownership: 35, form: 5.0, status: 'fit',
        nextFixture: 'BOU (H)', fixtureDifficulty: 2, last5: [6, 6, 2, 8, 2],
    },
    {
        id: 4, name: 'Gabriel Magalhães', shortName: 'Gabriel', team: 'ARS', position: 'DEF',
        xP: 5.5, price: 6.3, ownership: 30, form: 5.4, status: 'normal',
        nextFixture: 'BOU (H)', fixtureDifficulty: 2, last5: [2, 8, 6, 2, 6],
    },
    {
        id: 5, name: 'Pedro Porro', shortName: 'Porro', team: 'TOT', position: 'DEF',
        xP: 4.9, price: 5.6, ownership: 18, form: 4.6, status: 'doubt',
        nextFixture: 'MCI (A)', fixtureDifficulty: 5, last5: [1, 6, 2, 1, 8],
    },
    // MID
    {
        id: 6, name: 'Mohamed Salah', shortName: 'Salah', team: 'LIV', position: 'MID',
        xP: 8.9, price: 13.2, ownership: 72, form: 9.2, status: 'fit', isCaptain: true,
        nextFixture: 'WOL (H)', fixtureDifficulty: 2, last5: [13, 6, 15, 8, 10],
    },
    {
        id: 7, name: 'Bukayo Saka', shortName: 'Saka', team: 'ARS', position: 'MID',
        xP: 7.4, price: 10.1, ownership: 50, form: 7.0, status: 'doubt',
        nextFixture: 'BOU (H)', fixtureDifficulty: 2, last5: [2, 12, 5, 8, 3],
    },
    {
        id: 8, name: 'Cole Palmer', shortName: 'Palmer', team: 'CHE', position: 'MID',
        xP: 7.8, price: 10.8, ownership: 55, form: 8.1, status: 'fit', isVice: true,
        nextFixture: 'EVE (H)', fixtureDifficulty: 2, last5: [10, 8, 14, 3, 9],
    },
    // FWD
    {
        id: 9, name: 'Erling Haaland', shortName: 'Haaland', team: 'MCI', position: 'FWD',
        xP: 8.2, price: 14.5, ownership: 80, form: 8.8, status: 'fit',
        nextFixture: 'TOT (H)', fixtureDifficulty: 3, last5: [12, 5, 15, 2, 8],
    },
    {
        id: 10, name: 'Alexander Isak', shortName: 'Isak', team: 'NEW', position: 'FWD',
        xP: 7.6, price: 9.0, ownership: 45, form: 7.5, status: 'fit',
        nextFixture: 'BRE (A)', fixtureDifficulty: 3, last5: [8, 10, 2, 13, 6],
    },
    {
        id: 11, name: 'Ollie Watkins', shortName: 'Watkins', team: 'AVL', position: 'FWD',
        xP: 6.4, price: 8.2, ownership: 25, form: 5.9, status: 'normal',
        nextFixture: 'NFO (A)', fixtureDifficulty: 4, last5: [6, 2, 8, 5, 3],
    },
];

const totalXP = squad.reduce((sum, p) => sum + p.xP, 0);
const teamValue = squad.reduce((sum, p) => sum + p.price, 0);
const last5Form = [58, 45, 67, 42, 55]; // team-level GW totals

// ── Formation layout positions (% based for vertical pitch) ────────
// Row structure for 4-3-3: GK → 4 DEF → 3 MID → 3 FWD
const formationRows = [
    { label: 'GK', count: 1, top: 87 },
    { label: 'DEF', count: 4, top: 67 },
    { label: 'MID', count: 3, top: 42 },
    { label: 'FWD', count: 3, top: 17 },
];

export function TeamFormation() {
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const handlePlayerTap = (player: PlayerData) => {
        setSelectedPlayer(player);
        setSheetOpen(true);
    };

    // Split squad into rows
    let playerIndex = 0;
    const rows = formationRows.map((row) => {
        const players = squad.slice(playerIndex, playerIndex + row.count);
        playerIndex += row.count;
        return { ...row, players };
    });

    return (
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* Section Header */}
            <motion.div
                className="flex items-center gap-2 px-1"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Shield className="w-5 h-5 text-[#04f5ff]" />
                <h2 className="text-lg font-bold text-white">Mi Equipo</h2>
                <span className="ml-auto text-xs text-white/40 border border-white/10 rounded-lg px-2 py-0.5">
                    4-3-3
                </span>
            </motion.div>

            {/* Team Stats */}
            <TeamStats totalXP={totalXP} teamValue={teamValue} last5Form={last5Form} />

            {/* Tactical Pitch */}
            <motion.div
                className="relative rounded-3xl overflow-hidden border border-[#00ff85]/15"
                style={{
                    background: 'linear-gradient(180deg, #0a3d1a 0%, #0d4f22 30%, #0a3d1a 60%, #0d4f22 100%)',
                    aspectRatio: '3/4.2',
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* Pitch markings */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-15"
                    viewBox="0 0 300 420"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Outer boundary */}
                    <rect x="10" y="10" width="280" height="400" rx="4" stroke="white" strokeWidth="1.5" />
                    {/* Center line */}
                    <line x1="10" y1="210" x2="290" y2="210" stroke="white" strokeWidth="1.5" />
                    {/* Center circle */}
                    <circle cx="150" cy="210" r="45" stroke="white" strokeWidth="1.5" />
                    {/* Center dot */}
                    <circle cx="150" cy="210" r="3" fill="white" />
                    {/* Top penalty box */}
                    <rect x="60" y="10" width="180" height="75" stroke="white" strokeWidth="1.5" />
                    {/* Top goal box */}
                    <rect x="100" y="10" width="100" height="30" stroke="white" strokeWidth="1.5" />
                    {/* Top penalty arc */}
                    <path d="M 100 85 Q 150 110 200 85" stroke="white" strokeWidth="1.5" fill="none" />
                    {/* Bottom penalty box */}
                    <rect x="60" y="335" width="180" height="75" stroke="white" strokeWidth="1.5" />
                    {/* Bottom goal box */}
                    <rect x="100" y="380" width="100" height="30" stroke="white" strokeWidth="1.5" />
                    {/* Bottom penalty arc */}
                    <path d="M 100 335 Q 150 310 200 335" stroke="white" strokeWidth="1.5" fill="none" />
                    {/* Corner arcs */}
                    <path d="M 10 20 Q 20 10 30 10" stroke="white" strokeWidth="1" fill="none" />
                    <path d="M 270 10 Q 280 10 290 20" stroke="white" strokeWidth="1" fill="none" />
                    <path d="M 10 400 Q 20 410 30 410" stroke="white" strokeWidth="1" fill="none" />
                    <path d="M 270 410 Q 280 410 290 400" stroke="white" strokeWidth="1" fill="none" />
                </svg>

                {/* Subtle pitch gradient overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'repeating-linear-gradient(180deg, transparent, transparent 24.5%, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.02) 25.5%, transparent 26%)',
                    }}
                />

                {/* Formation rows */}
                {rows.map((row) => (
                    <div
                        key={row.label}
                        className="absolute left-0 right-0 flex items-center justify-center gap-1"
                        style={{
                            top: `${row.top}%`,
                            transform: 'translateY(-50%)',
                            padding: '0 8px',
                        }}
                    >
                        {row.players.map((player, i) => (
                            <div
                                key={player.id}
                                className="flex-1 flex justify-center"
                            >
                                <PlayerNode
                                    player={player}
                                    index={i + (row.label === 'DEF' ? 1 : row.label === 'MID' ? 5 : row.label === 'FWD' ? 8 : 0)}
                                    onTap={handlePlayerTap}
                                />
                            </div>
                        ))}
                    </div>
                ))}

                {/* Pulso del Equipo indicator — bottom overlay */}
                <motion.div
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00ff85]/20 bg-[#0a3d1a]/80 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                >
                    <motion.div
                        className="w-2 h-2 rounded-full bg-[#00ff85]"
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-[10px] text-white/70 font-medium">Pulso del Equipo</span>
                    <span className="text-[10px] font-bold text-[#00ff85]">
                        {squad.filter((p) => p.status === 'fit').length}/{squad.length} en forma
                    </span>
                </motion.div>
            </motion.div>

            {/* Player Detail Sheet */}
            <PlayerDetailSheet
                player={selectedPlayer}
                open={sheetOpen}
                onClose={() => setSheetOpen(false)}
            />
        </motion.div>
    );
}
