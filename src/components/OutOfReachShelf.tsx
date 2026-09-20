import React from 'react';
import { Profile, CategoryId } from '../types';
import { ProfileCard } from './ProfileCard';
import { ArrowUp, Sparkles } from 'lucide-react';
import { playHammondLadderSound } from '../utils/audio';

interface OutOfReachShelfProps {
  profiles: Profile[];
  onMoveCategory: (id: string, newCat: CategoryId) => void;
  onToggleOutOfReach: (id: string) => void;
  onSelectProfile: (profile: Profile) => void;
  onEditProfile: (profile: Profile) => void;
  onDeleteProfile: (id: string) => void;
  onOpenLadder: () => void;
}

export const OutOfReachShelf: React.FC<OutOfReachShelfProps> = ({
  profiles,
  onMoveCategory,
  onToggleOutOfReach,
  onSelectProfile,
  onEditProfile,
  onDeleteProfile,
  onOpenLadder
}) => {
  const outOfReachProfiles = profiles.filter((p) => p.isOutOfReach);

  return (
    <div className="w-full bg-gradient-to-r from-amber-950/30 via-zinc-900/60 to-amber-950/30 border border-amber-500/30 rounded-2xl p-4 shadow-xl backdrop-blur-md relative overflow-hidden">
      {/* Top Gear Studio Ceiling Girder visual effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500" />
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
            <ArrowUp className="w-5 h-5 stroke-[2.5] animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-topgear text-lg font-bold tracking-tight text-amber-300 uppercase">
                Clarkson's Ceiling Zone
              </h3>
              <span className="text-[10px] font-mono font-bold bg-amber-500 text-zinc-950 px-2 py-0.5 rounded-full uppercase">
                Out of Reach
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-snug">
              Jeremy stuck these so high that Richard Hammond has to bring in a stepladder to reach them.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playHammondLadderSound();
            onOpenLadder();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer shrink-0"
        >
          <span className="text-base">🪜</span>
          <span>Hammond's Stepladder ({outOfReachProfiles.length})</span>
        </button>
      </div>

      {outOfReachProfiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {outOfReachProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onMoveCategory={onMoveCategory}
              onToggleOutOfReach={onToggleOutOfReach}
              onSelect={onSelectProfile}
              onEdit={onEditProfile}
              onDelete={onDeleteProfile}
            />
          ))}
        </div>
      ) : (
        <div className="py-6 border-2 border-dashed border-amber-500/20 rounded-xl flex items-center justify-center gap-3 text-center text-zinc-400 text-xs">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>
            No items stuck on the ceiling. Click <strong>"High"</strong> on any card to place it out of Hammond's reach!
          </span>
        </div>
      )}
    </div>
  );
};
