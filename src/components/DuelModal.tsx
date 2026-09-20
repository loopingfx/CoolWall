import React, { useState, useEffect } from 'react';
import { Profile, CategoryId } from '../types';
import { X, Swords, Trophy, Sparkles, Flame, Snowflake, RotateCcw } from 'lucide-react';
import { playSubZeroFanfare, playCardSlapSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface DuelModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: Profile[];
  onUpdateScore: (id: string, delta: number) => void;
}

export const DuelModal: React.FC<DuelModalProps> = ({
  isOpen,
  onClose,
  profiles,
  onUpdateScore
}) => {
  const [profileA, setProfileA] = useState<Profile | null>(null);
  const [profileB, setProfileB] = useState<Profile | null>(null);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [settledCount, setSettledCount] = useState(0);

  const pickRandomPair = () => {
    if (profiles.length < 2) return;
    const shuffled = [...profiles].sort(() => 0.5 - Math.random());
    setProfileA(shuffled[0]);
    setProfileB(shuffled[1]);
    setWinnerId(null);
  };

  useEffect(() => {
    if (isOpen) {
      pickRandomPair();
    }
  }, [isOpen, profiles]);

  if (!isOpen) return null;

  if (profiles.length < 2) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center max-w-md">
          <p className="text-zinc-300 mb-4">You need at least 2 profiles on the wall to start a Cool Duel!</p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold"
          >
            Got it
          </button>
        </div>
      </div>
    );
  }

  const handleVote = (winner: Profile, loser: Profile) => {
    if (winnerId) return; // already voted for this round
    setWinnerId(winner.id);
    onUpdateScore(winner.id, 4);
    onUpdateScore(loser.id, -4);
    setSettledCount((prev) => prev + 1);

    playSubZeroFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Arena Banner */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 bg-gradient-to-r from-red-950/40 via-zinc-900 to-blue-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-500 to-blue-500 text-white flex items-center justify-center shadow-lg">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-topgear text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                  Top Gear Cool Duel
                </h3>
                <span className="text-[10px] font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded-full">
                  Debates Settled: {settledCount}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Clarkson and Hammond are arguing! Vote for which profile is cooler to shift their wall standing.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The VS Duel Arena */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {profileA && profileB && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative items-stretch">
              {/* Central VS Badge (on desktop) */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-zinc-950 border-2 border-red-500/80 shadow-2xl items-center justify-center">
                <span className="font-topgear text-lg font-black text-white italic">
                  VS
                </span>
              </div>

              {/* CARD A */}
              <div
                className={`relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between border-2 transition-all ${
                  winnerId === profileA.id
                    ? 'border-emerald-400 bg-emerald-950/20 shadow-2xl shadow-emerald-500/20 scale-[1.02]'
                    : winnerId === profileB.id
                    ? 'border-zinc-800 bg-zinc-900/40 opacity-60'
                    : 'border-zinc-800 bg-zinc-900/60 hover:border-cyan-500/60'
                }`}
              >
                {winnerId === profileA.id && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-emerald-500 text-black font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Cooler (+4 Pts)</span>
                  </div>
                )}

                <div>
                  <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-zinc-950 border border-zinc-800">
                    <img
                      src={profileA.imageUrl}
                      alt={profileA.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/80 px-2.5 py-1 rounded-full text-xs font-mono font-bold text-cyan-400 border border-cyan-500/40">
                      Score: {profileA.coolScore}
                    </div>
                  </div>

                  <h4 className="font-topgear text-2xl font-bold text-white mb-1">
                    {profileA.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mb-3 leading-snug">
                    {profileA.subtitle}
                  </p>

                  {profileA.clarksonVerdict && (
                    <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800/80 text-xs italic text-zinc-300 mb-4">
                      "{profileA.clarksonVerdict}"
                    </div>
                  )}

                  {/* Stats list */}
                  {profileA.stats && profileA.stats.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {profileA.stats.slice(0, 3).map((st, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center text-xs py-1 px-2.5 rounded bg-zinc-800/60 border border-zinc-700/40"
                        >
                          <span className="text-zinc-400 font-medium">{st.label}</span>
                          <span className="font-semibold text-white">{st.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-5 mt-4 border-t border-zinc-800">
                  <button
                    disabled={winnerId !== null}
                    onClick={() => handleVote(profileA, profileB)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                  >
                    Vote {profileA.name} Cooler!
                  </button>
                </div>
              </div>

              {/* CARD B */}
              <div
                className={`relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between border-2 transition-all ${
                  winnerId === profileB.id
                    ? 'border-emerald-400 bg-emerald-950/20 shadow-2xl shadow-emerald-500/20 scale-[1.02]'
                    : winnerId === profileA.id
                    ? 'border-zinc-800 bg-zinc-900/40 opacity-60'
                    : 'border-zinc-800 bg-zinc-900/60 hover:border-red-500/60'
                }`}
              >
                {winnerId === profileB.id && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-emerald-500 text-black font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Cooler (+4 Pts)</span>
                  </div>
                )}

                <div>
                  <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-zinc-950 border border-zinc-800">
                    <img
                      src={profileB.imageUrl}
                      alt={profileB.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/80 px-2.5 py-1 rounded-full text-xs font-mono font-bold text-cyan-400 border border-cyan-500/40">
                      Score: {profileB.coolScore}
                    </div>
                  </div>

                  <h4 className="font-topgear text-2xl font-bold text-white mb-1">
                    {profileB.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mb-3 leading-snug">
                    {profileB.subtitle}
                  </p>

                  {profileB.clarksonVerdict && (
                    <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800/80 text-xs italic text-zinc-300 mb-4">
                      "{profileB.clarksonVerdict}"
                    </div>
                  )}

                  {/* Stats list */}
                  {profileB.stats && profileB.stats.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {profileB.stats.slice(0, 3).map((st, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center text-xs py-1 px-2.5 rounded bg-zinc-800/60 border border-zinc-700/40"
                        >
                          <span className="text-zinc-400 font-medium">{st.label}</span>
                          <span className="font-semibold text-white">{st.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-5 mt-4 border-t border-zinc-800">
                  <button
                    disabled={winnerId !== null}
                    onClick={() => handleVote(profileB, profileA)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 disabled:opacity-50 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-red-500/20 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                  >
                    Vote {profileB.name} Cooler!
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Duel Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <button
            onClick={pickRandomPair}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Next Matchup</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-medium text-xs cursor-pointer transition-colors"
          >
            Close Debate
          </button>
        </div>
      </div>
    </div>
  );
};
