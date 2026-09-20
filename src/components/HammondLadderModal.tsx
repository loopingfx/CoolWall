import React from 'react';
import { Profile, CategoryId } from '../types';
import { X, ArrowDown, Sparkles } from 'lucide-react';
import { playCardSlapSound, playHammondLadderSound } from '../utils/audio';

interface HammondLadderModalProps {
  isOpen: boolean;
  onClose: () => void;
  outOfReachProfiles: Profile[];
  onToggleOutOfReach: (id: string) => void;
  onMoveCategory: (id: string, newCat: CategoryId) => void;
}

export const HammondLadderModal: React.FC<HammondLadderModalProps> = ({
  isOpen,
  onClose,
  outOfReachProfiles,
  onToggleOutOfReach,
  onMoveCategory
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-amber-500/50 rounded-2xl p-6 shadow-2xl shadow-amber-500/10 text-white overflow-hidden">
        {/* Background visual motif */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500" />
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center text-2xl shadow-inner">
              🪜
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-topgear text-2xl font-bold tracking-tight text-white uppercase">
                  Hammond's Stepladder
                </h3>
                <span className="text-[10px] font-mono font-bold bg-amber-500 text-zinc-950 px-2 py-0.5 rounded-full uppercase">
                  BBC Top Gear Rig
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                "Clarkson has stuck these cars so high up that Richard Hammond literally cannot reach them without a ladder or a broom handle."
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

        {/* Body */}
        <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {outOfReachProfiles.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Items currently pinned to the studio ceiling ({outOfReachProfiles.length}):
              </p>

              {outOfReachProfiles.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-zinc-950/70 rounded-xl border border-zinc-800 hover:border-amber-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-14 h-14 rounded-lg object-cover border border-zinc-700 shrink-0"
                    />
                    <div>
                      <h4 className="font-topgear text-base font-bold text-white">
                        {p.name}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-1">
                        {p.subtitle}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        Cool Score: {p.coolScore}/100
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end shrink-0">
                    <button
                      onClick={() => {
                        playHammondLadderSound();
                        onToggleOutOfReach(p.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Pull Down</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <div className="text-4xl">🌤️</div>
              <h4 className="font-topgear text-lg font-bold text-zinc-300">
                The ceiling is clear!
              </h4>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Jeremy hasn't put any cards out of reach yet. To pin something high up, click the <strong>"Reach"</strong> button on any card.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span className="italic flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Top Gear Tip: High-shelf cards remain in their category but float above!
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
