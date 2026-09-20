import React, { useState } from 'react';
import { Profile, CategoryId } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Snowflake,
  ShieldAlert,
  ArrowUp,
  SlidersHorizontal,
  Trash2,
  Quote,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { playCardSlapSound } from '../utils/audio';

interface ProfileCardProps {
  profile: Profile;
  onMoveCategory: (id: string, newCat: CategoryId) => void;
  onToggleOutOfReach: (id: string) => void;
  onSelect: (profile: Profile) => void;
  onEdit: (profile: Profile) => void;
  onDelete: (id: string) => void;
}

const CATEGORY_ORDER: CategoryId[] = [
  'seriously-uncool',
  'uncool',
  'cool',
  'subzero',
  'fridge'
];

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onMoveCategory,
  onToggleOutOfReach,
  onSelect,
  onEdit,
  onDelete
}) => {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Determinate slight natural tilt angle based on profile ID string
  const getTiltAngle = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
    }
    const angles = [-1.5, -0.8, 0, 0.8, 1.2, -1.2];
    return angles[Math.abs(hash) % angles.length];
  };

  const tilt = getTiltAngle(profile.id);

  // Score color styles
  const getScoreBadge = (score: number) => {
    if (score >= 90) {
      return {
        bg: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/50',
        label: 'SUB-ZERO',
        icon: <Snowflake className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
      };
    } else if (score >= 65) {
      return {
        bg: 'bg-emerald-500 text-zinc-950 font-bold shadow-emerald-500/40',
        label: 'COOL',
        icon: <Sparkles className="w-3 h-3" />
      };
    } else if (score >= 35) {
      return {
        bg: 'bg-amber-500 text-zinc-950 font-bold shadow-amber-500/40',
        label: 'UNCOOL',
        icon: null
      };
    } else {
      return {
        bg: 'bg-rose-600 text-white font-bold shadow-rose-600/40',
        label: 'BIN IT',
        icon: <Flame className="w-3 h-3" />
      };
    }
  };

  const scoreBadge = getScoreBadge(profile.coolScore);

  const currentIdx = CATEGORY_ORDER.indexOf(profile.category);
  const canMoveLeft = currentIdx > 0;
  const canMoveRight = currentIdx < CATEGORY_ORDER.length - 1;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', profile.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'scale(1.02) translateY(-2px)' : `rotate(${tilt}deg)`,
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease'
      }}
      className={`group relative rounded-xl overflow-hidden border transition-all cursor-grab active:cursor-grabbing select-none ${
        profile.category === 'subzero' || profile.category === 'fridge'
          ? 'bg-gradient-to-b from-sky-950/80 to-zinc-900 border-sky-400/50 shadow-lg shadow-sky-500/10 hover:border-sky-300 hover:shadow-sky-400/25'
          : profile.category === 'seriously-uncool'
          ? 'bg-gradient-to-b from-rose-950/40 to-zinc-900 border-rose-900/40 hover:border-rose-500/50 shadow-md'
          : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 shadow-md hover:shadow-xl'
      }`}
    >
      {/* Magnetic silver top pin */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-600 border border-zinc-200/80 shadow-md flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700/60" />
      </div>

      {/* Out of Reach top banner if flagged */}
      {profile.isOutOfReach && (
        <div className="bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-wider py-0.5 px-2 text-center flex items-center justify-center gap-1">
          <ArrowUp className="w-3 h-3 stroke-[3]" />
          <span>Out of Reach of Hammond</span>
        </div>
      )}

      {/* Card Image Banner */}
      <div
        className="relative h-36 w-full overflow-hidden bg-zinc-950 cursor-pointer"
        onClick={() => onSelect(profile)}
      >
        {!imgError ? (
          <img
            src={profile.imageUrl}
            alt={profile.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-800 text-zinc-400 p-4 text-center">
            <span className="text-3xl font-black font-topgear text-zinc-500 mb-1">
              {profile.name.slice(0, 2).toUpperCase()}
            </span>
            <span className="text-xs text-zinc-400">{profile.name}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

        {/* Score Pill */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <span
            className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-black tracking-wide shadow-md ${scoreBadge.bg}`}
          >
            {scoreBadge.icon}
            <span>{profile.coolScore}</span>
          </span>
        </div>

        {/* Expand / View Dossier Icon on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(profile);
          }}
          title="Open Dossier"
          className="absolute top-3 left-3 z-10 w-7 h-7 rounded-lg bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Sub-Zero Ice Frost Particle Effect overlay */}
        {(profile.category === 'subzero' || profile.category === 'fridge') && (
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#38bdf825_1px,transparent_1px)] [background-size:8px_8px] mix-blend-screen opacity-60" />
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-3.5 pt-2 space-y-2">
        {/* Title and Subtitle */}
        <div
          className="cursor-pointer"
          onClick={() => onSelect(profile)}
        >
          <h4 className="font-topgear text-base sm:text-lg font-bold tracking-tight text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
            {profile.name}
          </h4>
          <p className="text-[11px] text-zinc-400 line-clamp-1 leading-snug">
            {profile.subtitle}
          </p>
        </div>

        {/* Clarkson Verdict Quote Snippet */}
        {profile.clarksonVerdict && (
          <div
            onClick={() => onSelect(profile)}
            className="cursor-pointer text-[11px] italic text-zinc-300 bg-zinc-950/60 rounded-lg p-2 border border-zinc-800/80 leading-snug flex items-start gap-1.5"
          >
            <Quote className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{profile.clarksonVerdict}</span>
          </div>
        )}

        {/* Key Stats Row */}
        {profile.stats && profile.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {profile.stats.slice(0, 2).map((st, i) => (
              <div key={i} className="bg-zinc-800/50 rounded px-2 py-1 border border-zinc-800">
                <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-medium truncate">
                  {st.label}
                </div>
                <div className="text-[11px] font-semibold text-zinc-200 truncate">
                  {st.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {profile.tags && profile.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {profile.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono border border-zinc-700/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Toolbar */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-zinc-400">
          {/* Shift Left */}
          <button
            disabled={!canMoveLeft}
            onClick={() => {
              if (canMoveLeft) {
                playCardSlapSound();
                onMoveCategory(profile.id, CATEGORY_ORDER[currentIdx - 1]);
              }
            }}
            title={canMoveLeft ? `Move to ${CATEGORY_ORDER[currentIdx - 1]}` : 'At lowest tier'}
            className="p-1 rounded hover:bg-zinc-800 hover:text-white disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Quick Out of Reach Toggle */}
          <button
            onClick={() => onToggleOutOfReach(profile.id)}
            title={profile.isOutOfReach ? 'Bring down from top shelf' : 'Put out of reach (Clarkson style)'}
            className={`p-1 rounded transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-medium ${
              profile.isOutOfReach
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{profile.isOutOfReach ? 'High' : 'Reach'}</span>
          </button>

          {/* Edit Profile */}
          <button
            onClick={() => onEdit(profile)}
            title="Edit Profile"
            className="p-1 rounded hover:bg-zinc-800 hover:text-cyan-400 cursor-pointer transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Delete Profile */}
          <button
            onClick={() => onDelete(profile.id)}
            title="Delete Profile"
            className="p-1 rounded hover:bg-rose-950/60 hover:text-rose-400 cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Shift Right */}
          <button
            disabled={!canMoveRight}
            onClick={() => {
              if (canMoveRight) {
                playCardSlapSound();
                onMoveCategory(profile.id, CATEGORY_ORDER[currentIdx + 1]);
              }
            }}
            title={canMoveRight ? `Move to ${CATEGORY_ORDER[currentIdx + 1]}` : 'At highest tier'}
            className="p-1 rounded hover:bg-zinc-800 hover:text-white disabled:opacity-20 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
