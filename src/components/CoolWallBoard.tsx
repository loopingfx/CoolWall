import React, { useState } from 'react';
import { Profile, CategoryId, WallTheme } from '../types';
import { ProfileCard } from './ProfileCard';
import { Flame, Meh, ThumbsUp, Snowflake, Sparkles } from 'lucide-react';
import { playCategoryDropSound, playCardSlapSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CoolWallBoardProps {
  profiles: Profile[];
  theme: WallTheme;
  useClassicTitles: boolean;
  onMoveCategory: (id: string, newCat: CategoryId) => void;
  onToggleOutOfReach: (id: string) => void;
  onSelectProfile: (profile: Profile) => void;
  onEditProfile: (profile: Profile) => void;
  onDeleteProfile: (id: string) => void;
  onQuickAdd: (category: CategoryId) => void;
}

const CLASSIC_COLUMN_TITLES: Record<CategoryId, { title: string; subtitle: string; badge: string }> = {
  'seriously-uncool': {
    title: 'Seriously Uncool',
    subtitle: 'The automotive scrapheap',
    badge: 'BIN IT'
  },
  'uncool': {
    title: 'Uncool',
    subtitle: 'Dull, beige, or trying too hard',
    badge: 'MEH'
  },
  'cool': {
    title: 'Cool',
    subtitle: 'Properly stylish & approved',
    badge: 'APPROVED'
  },
  'subzero': {
    title: 'Sub-Zero',
    subtitle: 'Colder than the Arctic Circle',
    badge: 'ICE COLD'
  },
  'fridge': {
    title: 'The DB9 Fridge',
    subtitle: 'Beyond Sub-Zero Icebox',
    badge: 'VAULT'
  }
};

export const CoolWallBoard: React.FC<CoolWallBoardProps> = ({
  profiles,
  theme,
  useClassicTitles,
  onMoveCategory,
  onToggleOutOfReach,
  onSelectProfile,
  onEditProfile,
  onDeleteProfile,
  onQuickAdd
}) => {
  const [dragOverCol, setDragOverCol] = useState<CategoryId | null>(null);

  const mainColumns: {
    id: CategoryId;
    icon: React.ReactNode;
    colorClasses: {
      border: string;
      headerBg: string;
      accentText: string;
      glow: string;
      badgeBg: string;
    };
  }[] = [
    {
      id: 'seriously-uncool',
      icon: <Flame className="w-5 h-5 text-rose-500 animate-pulse" />,
      colorClasses: {
        border: 'border-rose-900/40 hover:border-rose-700/60',
        headerBg: 'bg-gradient-to-b from-rose-950/70 via-rose-950/30 to-transparent',
        accentText: 'text-rose-400',
        glow: 'shadow-[0_0_25px_rgba(244,63,94,0.15)]',
        badgeBg: 'bg-rose-900/60 text-rose-300 border-rose-700/50'
      }
    },
    {
      id: 'uncool',
      icon: <Meh className="w-5 h-5 text-amber-500" />,
      colorClasses: {
        border: 'border-amber-900/40 hover:border-amber-700/60',
        headerBg: 'bg-gradient-to-b from-amber-950/70 via-amber-950/30 to-transparent',
        accentText: 'text-amber-400',
        glow: 'shadow-[0_0_25px_rgba(245,158,11,0.1)]',
        badgeBg: 'bg-amber-900/60 text-amber-300 border-amber-700/50'
      }
    },
    {
      id: 'cool',
      icon: <ThumbsUp className="w-5 h-5 text-emerald-400" />,
      colorClasses: {
        border: 'border-emerald-900/40 hover:border-emerald-700/60',
        headerBg: 'bg-gradient-to-b from-emerald-950/70 via-emerald-950/30 to-transparent',
        accentText: 'text-emerald-400',
        glow: 'shadow-[0_0_25px_rgba(16,185,129,0.15)]',
        badgeBg: 'bg-emerald-900/60 text-emerald-300 border-emerald-700/50'
      }
    },
    {
      id: 'subzero',
      icon: <Snowflake className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />,
      colorClasses: {
        border: 'border-cyan-500/50 hover:border-cyan-400 shadow-cyan-500/20',
        headerBg: 'bg-gradient-to-b from-cyan-950/80 via-sky-950/40 to-transparent',
        accentText: 'text-cyan-300',
        glow: 'shadow-[0_0_35px_rgba(56,189,248,0.25)] ring-1 ring-cyan-500/30',
        badgeBg: 'bg-cyan-900/80 text-cyan-200 border-cyan-400/60 animate-pulse'
      }
    }
  ];

  const handleDragOver = (e: React.DragEvent, colId: CategoryId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCol !== colId) {
      setDragOverCol(colId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverCol(null);
  };

  const handleDrop = (e: React.DragEvent, colId: CategoryId) => {
    e.preventDefault();
    setDragOverCol(null);
    const profileId = e.dataTransfer.getData('text/plain');
    if (!profileId) return;

    onMoveCategory(profileId, colId);
    playCategoryDropSound(colId);

    // If dropped in Sub-Zero, trigger ice confetti!
    if (colId === 'subzero') {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#38bdf8', '#7dd3fc', '#0284c7', '#ffffff']
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 w-full">
      {mainColumns.map((col) => {
        const colMeta = useClassicTitles
          ? CLASSIC_COLUMN_TITLES[col.id]
          : theme.columns[col.id];

        // Normal profiles in this column (excluding out-of-reach shelf which is handled separately)
        const colProfiles = profiles.filter(
          (p) => p.category === col.id && !p.isOutOfReach
        );

        const isOver = dragOverCol === col.id;

        return (
          <div
            key={col.id}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.id)}
            className={`flex flex-col rounded-2xl border transition-all duration-200 bg-zinc-950/60 backdrop-blur-md relative min-h-[520px] ${
              col.colorClasses.border
            } ${col.colorClasses.glow} ${
              isOver ? 'scale-[1.01] ring-2 ring-white/50 bg-zinc-900/90' : ''
            }`}
          >
            {/* Column Header */}
            <div
              className={`p-4 rounded-t-2xl border-b border-zinc-800/80 ${col.colorClasses.headerBg}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-zinc-900/80 border border-zinc-700/50 shadow-inner">
                    {col.icon}
                  </div>
                  <div>
                    <h3 className="font-topgear text-xl font-bold tracking-tight uppercase text-white flex items-center gap-2">
                      {colMeta.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${col.colorClasses.badgeBg}`}
                  >
                    {colMeta.badge}
                  </span>
                  <span className="text-xs font-mono font-bold bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700">
                    {colProfiles.length}
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-snug line-clamp-1">
                {colMeta.subtitle}
              </p>
            </div>

            {/* Profiles Container */}
            <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto max-h-[820px] scrollbar-thin">
              {colProfiles.map((profile) => (
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

              {colProfiles.length === 0 && (
                <div
                  onClick={() => onQuickAdd(col.id)}
                  className={`h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-colors ${
                    isOver
                      ? 'border-white/60 bg-white/5 text-white'
                      : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/30 text-zinc-500'
                  }`}
                >
                  <Sparkles className="w-6 h-6 mb-2 opacity-50" />
                  <span className="text-xs font-medium">
                    {isOver ? 'Drop profile here' : 'Empty Column'}
                  </span>
                  <span className="text-[11px] text-zinc-500 mt-1">
                    Drag a card here or tap to add
                  </span>
                </div>
              )}
            </div>

            {/* Quick Add Footer button */}
            <div className="p-2 border-t border-zinc-800/60 bg-zinc-950/40 rounded-b-2xl">
              <button
                onClick={() => onQuickAdd(col.id)}
                className="w-full py-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-800/80 rounded-lg border border-zinc-800/80 transition-colors flex items-center justify-center gap-1.5 font-medium cursor-pointer"
              >
                <span>+ Slap New Profile Here</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
