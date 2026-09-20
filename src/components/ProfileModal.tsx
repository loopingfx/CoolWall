import React from 'react';
import { Profile, CategoryId } from '../types';
import {
  X,
  Flame,
  Snowflake,
  ShieldAlert,
  ArrowUp,
  SlidersHorizontal,
  Trash2,
  Quote,
  CheckCircle2,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { playCardSlapSound } from '../utils/audio';

interface ProfileModalProps {
  profile: Profile | null;
  onClose: () => void;
  onMoveCategory: (id: string, newCat: CategoryId) => void;
  onToggleOutOfReach: (id: string) => void;
  onEdit: (profile: Profile) => void;
  onDelete: (id: string) => void;
}

const CATEGORIES: { id: CategoryId; label: string; color: string }[] = [
  { id: 'seriously-uncool', label: 'Seriously Uncool', color: 'hover:bg-rose-900/40 text-rose-300' },
  { id: 'uncool', label: 'Uncool', color: 'hover:bg-amber-900/40 text-amber-300' },
  { id: 'cool', label: 'Cool', color: 'hover:bg-emerald-900/40 text-emerald-300' },
  { id: 'subzero', label: 'Sub-Zero', color: 'hover:bg-cyan-900/40 text-cyan-300' },
  { id: 'fridge', label: 'DB9 Fridge', color: 'hover:bg-blue-900/40 text-blue-300' }
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  onClose,
  onMoveCategory,
  onToggleOutOfReach,
  onEdit,
  onDelete
}) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Image Hero */}
        <div className="relative h-64 sm:h-72 w-full bg-zinc-900 shrink-0">
          <img
            src={profile.imageUrl}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top shelf notice if applicable */}
          {profile.isOutOfReach && (
            <div className="absolute top-4 left-4 z-20 bg-amber-500 text-zinc-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
              <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
              <span>Out of Reach of Hammond</span>
            </div>
          )}

          {/* Title and Subtitle Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900/80 text-zinc-300 border border-zinc-700">
                  {profile.category}
                </span>
              </div>
              <h2 className="font-topgear text-2xl sm:text-4xl font-black text-white tracking-tight">
                {profile.name}
              </h2>
              <p className="text-sm text-zinc-300 font-medium">
                {profile.subtitle}
              </p>
            </div>

            {/* Coolness Score Badge */}
            <div className="flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-700 p-2.5 rounded-xl shrink-0">
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono text-zinc-400 font-semibold">
                  Coolness Score
                </div>
                <div className="text-2xl font-black font-topgear text-cyan-400 leading-none">
                  {profile.coolScore}
                  <span className="text-xs text-zinc-500 font-normal"> / 100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Clarkson's Verdict Quote Callout */}
          {profile.clarksonVerdict && (
            <div className="p-4 bg-zinc-900/80 rounded-2xl border-l-4 border-cyan-400 border-zinc-800 shadow-inner">
              <div className="flex items-center gap-2 text-cyan-400 font-topgear text-sm font-bold uppercase tracking-wider mb-1.5">
                <Quote className="w-4 h-4" />
                <span>The Top Gear Verdict</span>
              </div>
              <p className="text-sm italic text-zinc-200 leading-relaxed font-serif">
                "{profile.clarksonVerdict}"
              </p>
            </div>
          )}

          {/* Technical Specifications / Stats */}
          {profile.stats && profile.stats.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 font-mono">
                Performance Dossier & Telemetry
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {profile.stats.map((st, i) => (
                  <div
                    key={i}
                    className="p-3 bg-zinc-900/70 rounded-xl border border-zinc-800"
                  >
                    <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-1">
                      {st.label}
                    </div>
                    <div className="text-sm font-bold text-white font-mono truncate">
                      {st.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros & Cons Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pros */}
            <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-topgear text-sm font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Why It's Cool</span>
              </div>
              {profile.pros && profile.pros.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {profile.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-zinc-500 italic">No positive notes listed.</p>
              )}
            </div>

            {/* Cons */}
            <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/80 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-topgear text-sm font-bold uppercase">
                <XCircle className="w-4 h-4" />
                <span>Why It Sucks</span>
              </div>
              {profile.cons && profile.cons.length > 0 ? (
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {profile.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-zinc-500 italic">No flaws listed.</p>
              )}
            </div>
          </div>

          {/* Tags */}
          {profile.tags && profile.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-mono">
                Badges & Attributes
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-zinc-900 text-cyan-300 font-mono border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Relocation Buttons */}
          <div className="pt-3 border-t border-zinc-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-mono">
              Relocate on Cool Wall:
            </h4>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isCurrent = profile.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playCardSlapSound();
                      onMoveCategory(profile.id, cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-zinc-100 text-zinc-950 font-bold border-white'
                        : `bg-zinc-900 border-zinc-800 ${cat.color}`
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleOutOfReach(profile.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                profile.isOutOfReach
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{profile.isOutOfReach ? 'Bring Down to Reach' : 'Put Out of Reach'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onEdit(profile);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => {
                if (confirm(`Remove "${profile.name}" from the Cool Wall?`)) {
                  onDelete(profile.id);
                  onClose();
                }
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-900/50 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs cursor-pointer transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
