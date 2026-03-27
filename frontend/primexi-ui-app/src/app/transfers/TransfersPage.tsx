import { useMemo, useState } from 'react';

type Player = {
  id: string;
  name: string;
  team: string;
  xp: number;
  difficulty: 'green' | 'amber' | 'red';
};

type Replacement = {
  id: string;
  name: string;
  price: number;
  xp: number;
  xpDiff: number;
};

const recommended = {
  outPlayer: { name: 'Darwin Nunez', team: 'LIV', price: 7.6 },
  inPlayer: { name: 'Ollie Watkins', team: 'AVL', price: 8.1 },
  xpGain: 3.2,
  priceDiff: 0.5,
};

const sellCandidates: Player[] = [
  { id: 'p1', name: 'Darwin Nunez', team: 'LIV', xp: 3.4, difficulty: 'red' },
  { id: 'p2', name: 'Jarrod Bowen', team: 'WHU', xp: 3.9, difficulty: 'amber' },
  { id: 'p3', name: 'Joachim Andersen', team: 'CRY', xp: 2.8, difficulty: 'red' },
  { id: 'p4', name: 'Anthony Gordon', team: 'NEW', xp: 4.6, difficulty: 'green' },
  { id: 'p5', name: 'Eberechi Eze', team: 'CRY', xp: 4.1, difficulty: 'amber' },
  { id: 'p6', name: 'James Tarkowski', team: 'EVE', xp: 3.1, difficulty: 'red' },
];

const replacementMap: Record<string, Replacement[]> = {
  p1: [
    { id: 'r1', name: 'Ollie Watkins', price: 8.1, xp: 6.8, xpDiff: 3.4 },
    { id: 'r2', name: 'Dominic Solanke', price: 7.2, xp: 6.1, xpDiff: 2.7 },
    { id: 'r3', name: 'Matheus Cunha', price: 6.6, xp: 5.5, xpDiff: 2.1 },
    { id: 'r4', name: 'Yoane Wissa', price: 6.2, xp: 5.2, xpDiff: 1.8 },
    { id: 'r5', name: 'Ivan Toney', price: 8.4, xp: 6.3, xpDiff: 2.9 },
  ],
  p2: [
    { id: 'r6', name: 'Cole Palmer', price: 10.6, xp: 7.3, xpDiff: 3.4 },
    { id: 'r7', name: 'Bukayo Saka', price: 9.8, xp: 6.7, xpDiff: 2.8 },
    { id: 'r8', name: 'Phil Foden', price: 9.2, xp: 6.4, xpDiff: 2.5 },
    { id: 'r9', name: 'Anthony Gordon', price: 6.4, xp: 5.1, xpDiff: 1.2 },
    { id: 'r10', name: 'Mbeumo', price: 7.1, xp: 5.5, xpDiff: 1.6 },
  ],
  p3: [
    { id: 'r11', name: 'Pedro Porro', price: 5.8, xp: 5.2, xpDiff: 2.4 },
    { id: 'r12', name: 'Gabriel', price: 5.0, xp: 4.8, xpDiff: 2.0 },
    { id: 'r13', name: 'Saliba', price: 5.6, xp: 5.0, xpDiff: 2.2 },
    { id: 'r14', name: 'Udogie', price: 4.9, xp: 4.6, xpDiff: 1.8 },
    { id: 'r15', name: 'Trippier', price: 6.3, xp: 5.1, xpDiff: 2.3 },
  ],
  p4: [
    { id: 'r16', name: 'Cole Palmer', price: 10.6, xp: 7.3, xpDiff: 2.7 },
    { id: 'r17', name: 'Luis Diaz', price: 7.5, xp: 5.8, xpDiff: 1.2 },
    { id: 'r18', name: 'Maddison', price: 7.9, xp: 5.9, xpDiff: 1.3 },
    { id: 'r19', name: 'Eze', price: 6.7, xp: 5.2, xpDiff: 0.6 },
    { id: 'r20', name: 'Mitoma', price: 6.6, xp: 5.1, xpDiff: 0.5 },
  ],
  p5: [
    { id: 'r21', name: 'Foden', price: 9.2, xp: 6.4, xpDiff: 2.3 },
    { id: 'r22', name: 'Mbeumo', price: 7.1, xp: 5.5, xpDiff: 1.4 },
    { id: 'r23', name: 'Gordon', price: 6.4, xp: 5.1, xpDiff: 1.0 },
    { id: 'r24', name: 'Bowen', price: 7.8, xp: 4.6, xpDiff: 0.5 },
    { id: 'r25', name: 'Elliot Anderson', price: 5.2, xp: 4.4, xpDiff: 0.3 },
  ],
  p6: [
    { id: 'r26', name: 'Branthwaite', price: 4.7, xp: 4.2, xpDiff: 1.1 },
    { id: 'r27', name: 'Kilman', price: 4.6, xp: 4.1, xpDiff: 1.0 },
    { id: 'r28', name: 'Colwill', price: 4.5, xp: 4.0, xpDiff: 0.9 },
    { id: 'r29', name: 'Dunk', price: 4.8, xp: 4.3, xpDiff: 1.2 },
    { id: 'r30', name: 'Maguire', price: 4.4, xp: 3.9, xpDiff: 0.8 },
  ],
};

const difficultyStyles: Record<Player['difficulty'], string> = {
  green: 'bg-[#00ff85]/15 text-[#00ff85] border-[#00ff85]/40',
  amber: 'bg-[#f7b500]/15 text-[#f7b500] border-[#f7b500]/40',
  red: 'bg-[#e90052]/15 text-[#e90052] border-[#e90052]/40',
};

export default function TransfersPage() {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [selectedReplacementId, setSelectedReplacementId] = useState<
    string | null
  >(null);

  const selectedPlayer = useMemo(
    () => sellCandidates.find((player) => player.id === selectedPlayerId) ?? null,
    [selectedPlayerId]
  );

  const replacements = useMemo(
    () => (selectedPlayer ? replacementMap[selectedPlayer.id] : []),
    [selectedPlayer]
  );

  const selectedReplacement = useMemo(
    () =>
      replacements.find((player) => player.id === selectedReplacementId) ?? null,
    [replacements, selectedReplacementId]
  );

  const updatedXp = selectedReplacement
    ? (selectedReplacement.xp + 52.4).toFixed(1)
    : '52.4';

  const remainingBudget = selectedReplacement
    ? (1.5 - Math.max(selectedReplacement.price - 7.6, 0)).toFixed(1)
    : '1.5';

  return (
    <div className="min-h-screen text-white">
      <div className="safe-top mx-auto min-h-screen max-w-md px-4 pb-[calc(9.5rem+env(safe-area-inset-bottom))] pt-6">
        <header className="glass-panel flex items-center justify-between gap-4 rounded-3xl border-[#00ff85]/20 p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Transfers
            </p>
            <h1 className="text-xl font-semibold">Transfers</h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/60">Budget</p>
            <p className="text-lg font-semibold">£1.5m</p>
            <p className="mt-1 text-xs text-white/60">1 FT</p>
          </div>
        </header>

        <section className="mt-6 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#00ff85]" />
            <h2 className="text-lg font-semibold">Recommended Transfer</h2>
          </div>
          <div className="rounded-3xl border border-[#00ff85]/30 bg-[#1b001c]/80 p-4 shadow-[0_16px_45px_-30px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Player OUT
                </p>
                <p className="text-base font-semibold">
                  {recommended.outPlayer.name}
                </p>
                <p className="text-xs text-white/60">
                  {recommended.outPlayer.team} · £{recommended.outPlayer.price}m
                </p>
              </div>
              <div className="h-10 w-10 rounded-full border border-[#00ff85]/40 bg-[#00ff85]/10 text-center text-xs font-semibold leading-10 text-[#00ff85]">
                OUT
              </div>
            </div>
            <div className="my-4 border-t border-white/10" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Player IN
                </p>
                <p className="text-base font-semibold">
                  {recommended.inPlayer.name}
                </p>
                <p className="text-xs text-white/60">
                  {recommended.inPlayer.team} · £{recommended.inPlayer.price}m
                </p>
              </div>
              <div className="h-10 w-10 rounded-full border border-[#00ff85]/40 bg-[#00ff85]/10 text-center text-xs font-semibold leading-10 text-[#00ff85]">
                IN
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-[#00ff85]/30 bg-[#0f0012] p-3">
                <p className="text-xs text-white/60">xP gain</p>
                <p className="text-lg font-semibold text-[#00ff85]">
                  +{recommended.xpGain}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0f0012] p-3">
                <p className="text-xs text-white/60">Price diff</p>
                <p className="text-lg font-semibold">
                  +£{recommended.priceDiff}m
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#7c3aed]" />
            <h2 className="text-lg font-semibold">Players to Sell</h2>
          </div>
          <div className="space-y-2">
            {sellCandidates.map((player) => (
              <button
                key={player.id}
                type="button"
                onClick={() => {
                  setSelectedPlayerId(player.id);
                  setSelectedReplacementId(null);
                }}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#150018] px-4 py-3 text-left transition-colors hover:border-[#00ff85]/30"
              >
                <div>
                  <p className="text-sm font-semibold">{player.name}</p>
                  <p className="text-xs text-white/60">{player.team}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{player.xp} xP</p>
                    <p className="text-xs text-white/60">Next GW</p>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${difficultyStyles[player.difficulty]}`}
                  >
                    {player.difficulty.toUpperCase()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {selectedPlayer && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/50">
          <div className="w-full max-w-md rounded-t-3xl border border-white/10 bg-[#120015] px-4 pb-6 pt-5 shadow-[0_-20px_45px_-30px_rgba(0,0,0,0.9)]">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/20" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Replace
                </p>
                <p className="text-base font-semibold">{selectedPlayer.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPlayerId(null)}
                className="text-xs text-white/60"
              >
                Close
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {replacements.slice(0, 5).map((player) => {
                const isSelected = player.id === selectedReplacementId;
                return (
                  <button
                    key={player.id}
                    type="button"
                    onClick={() => setSelectedReplacementId(player.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors ${
                      isSelected
                        ? 'border-[#00ff85]/50 bg-[#00ff85]/10'
                        : 'border-white/10 bg-[#1a001c]'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{player.name}</p>
                      <p className="text-xs text-white/60">£{player.price}m</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{player.xp} xP</p>
                      <p className="text-xs text-[#00ff85]">
                        +{player.xpDiff} xP
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#140015]/90 px-4 py-3 backdrop-blur safe-bottom">
        <div className="mx-auto flex max-w-md items-center justify-between gap-4">
          <div>
            <p className="text-xs text-white/60">Updated xP</p>
            <p className="text-sm font-semibold">{updatedXp}</p>
            <p className="mt-1 text-xs text-white/60">
              Remaining £{remainingBudget}m
            </p>
          </div>
          <button
            type="button"
            className="rounded-2xl bg-[#00ff85] px-5 py-3 text-sm font-semibold text-[#0b0b0b]"
          >
            Confirm Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
