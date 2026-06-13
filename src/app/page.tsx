'use client';

import { useState, useMemo, useCallback } from 'react';

type Peg = number[];

const DISK_COLORS = [
  'from-rose-400 to-rose-600',
  'from-orange-400 to-orange-600',
  'from-amber-400 to-amber-600',
  'from-lime-400 to-lime-600',
  'from-emerald-400 to-emerald-600',
  'from-cyan-400 to-cyan-600',
  'from-blue-400 to-blue-600',
  'from-violet-400 to-violet-600',
];

function buildInitial(diskCount: number): Peg[] {
  const first: Peg = [];
  for (let i = diskCount; i >= 1; i--) first.push(i);
  return [first, [], []];
}

export default function Home() {
  const [diskCount, setDiskCount] = useState(3);
  const [pegs, setPegs] = useState<Peg[]>(() => buildInitial(3));
  const [selectedPeg, setSelectedPeg] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);

  const optimalMoves = useMemo(() => Math.pow(2, diskCount) - 1, [diskCount]);

  const hasWon = useMemo(
    () => pegs[2].length === diskCount && diskCount > 0,
    [pegs, diskCount],
  );

  const reset = useCallback((count: number) => {
    setPegs(buildInitial(count));
    setSelectedPeg(null);
    setMoves(0);
  }, []);

  const changeDiskCount = (count: number) => {
    setDiskCount(count);
    reset(count);
  };

  const handlePegClick = (pegIndex: number) => {
    if (hasWon) return;

    if (selectedPeg === null) {
      if (pegs[pegIndex].length === 0) return;
      setSelectedPeg(pegIndex);
      return;
    }

    if (selectedPeg === pegIndex) {
      setSelectedPeg(null);
      return;
    }

    const fromPeg = pegs[selectedPeg];
    const toPeg = pegs[pegIndex];
    const disk = fromPeg[fromPeg.length - 1];
    const topTarget = toPeg[toPeg.length - 1];

    if (topTarget !== undefined && disk > topTarget) {
      // illegal move: larger disk cannot rest on a smaller one
      setSelectedPeg(null);
      return;
    }

    const next = pegs.map((p) => [...p]);
    next[selectedPeg].pop();
    next[pegIndex].push(disk);
    setPegs(next);
    setMoves((m) => m + 1);
    setSelectedPeg(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
          Tower of Hanoi
        </h1>
        <p className="mt-3 text-center text-slate-300">
          Move the entire stack to the rightmost peg. Click a peg to pick up its
          top disk, then click another peg to drop it. A larger disk can never
          rest on a smaller one.
        </p>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="disks" className="text-sm text-slate-300">
              Disks:
            </label>
            <select
              id="disks"
              value={diskCount}
              onChange={(e) => changeDiskCount(Number(e.target.value))}
              className="rounded-md bg-slate-800 border border-slate-600 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {[3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => reset(diskCount)}
            className="rounded-md bg-cyan-500 hover:bg-cyan-400 transition-colors px-4 py-1.5 text-sm font-semibold text-slate-900"
          >
            Reset
          </button>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="rounded-lg bg-slate-800/60 border border-slate-700 px-4 py-3 text-center">
            <div className="text-xs uppercase tracking-wide text-slate-400">
              Moves
            </div>
            <div className="text-2xl font-bold text-cyan-300">{moves}</div>
          </div>
          <div className="rounded-lg bg-slate-800/60 border border-slate-700 px-4 py-3 text-center">
            <div className="text-xs uppercase tracking-wide text-slate-400">
              Optimal (min)
            </div>
            <div className="text-2xl font-bold text-violet-300">
              {optimalMoves}
            </div>
          </div>
        </div>

        {/* Win message */}
        {hasWon && (
          <div className="mt-6 mx-auto max-w-md rounded-lg bg-emerald-500/20 border border-emerald-400 px-4 py-3 text-center">
            <div className="text-lg font-bold text-emerald-300">
              You solved it! 🎉
            </div>
            <div className="text-sm text-emerald-200">
              {moves} moves
              {moves === optimalMoves
                ? ' — a perfect, optimal solution!'
                : ` (optimal is ${optimalMoves}).`}
            </div>
          </div>
        )}

        {/* Board */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6">
          {pegs.map((peg, pegIndex) => {
            const isSelected = selectedPeg === pegIndex;
            return (
              <button
                key={pegIndex}
                onClick={() => handlePegClick(pegIndex)}
                className={`group relative flex flex-col-reverse items-center justify-start h-72 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-slate-800/70'
                    : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'
                }`}
              >
                {/* Peg rod */}
                <div className="absolute bottom-4 top-6 w-2 rounded-full bg-slate-600" />
                {/* Base */}
                <div className="absolute bottom-2 h-2 w-[85%] rounded-full bg-slate-500" />

                {/* Disks */}
                <div className="absolute bottom-4 flex flex-col-reverse items-center w-full pb-0">
                  {peg.map((disk, idx) => {
                    const isTop = idx === peg.length - 1;
                    const widthPct = 35 + (disk / diskCount) * 60;
                    return (
                      <div
                        key={disk}
                        style={{ width: `${widthPct}%` }}
                        className={`h-6 sm:h-7 my-[2px] rounded-full bg-gradient-to-b shadow-md flex items-center justify-center text-xs font-bold text-white/90 ${
                          DISK_COLORS[(disk - 1) % DISK_COLORS.length]
                        } ${
                          isSelected && isTop
                            ? 'ring-2 ring-white -translate-y-1 transition-transform'
                            : ''
                        }`}
                      >
                        {disk}
                      </div>
                    );
                  })}
                </div>

                <span className="absolute -top-7 text-xs font-semibold text-slate-400">
                  Peg {pegIndex + 1}
                  {pegIndex === 2 ? ' (goal)' : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
