import React, { useState } from 'react';
import {
  Plus,
  Swords,
  Volume2,
  VolumeX,
  Search,
  SlidersHorizontal,
  Download,
  Snowflake,
  Flame,
  ArrowUp,
  Sparkles
} from 'lucide-react';
import { isAudioEnabled, setAudioEnabled, playCardSlapSound } from '../utils/audio';

interface HeaderProps {
  onOpenCreate: () => void;
  onOpenDuel: () => void;
  onOpenExport: () => void;
  onOpenLadder: () => void;
  outOfReachCount: number;
  fridgeCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: 'score-desc' | 'score-asc' | 'name' | 'recent';
  onSortChange: (sort: 'score-desc' | 'score-asc' | 'name' | 'recent') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCreate,
  onOpenDuel,
  onOpenExport,
  onOpenLadder,
  outOfReachCount,
  fridgeCount,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange
}) => {
  const [soundOn, setSoundOn] = useState(isAudioEnabled());

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setAudioEnabled(next);
    if (next) playCardSlapSound();
  };

  return (
    <header className="w-full bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800/80 sticky top-0 z-40 px-4 sm:px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Brand / Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-300/40">
              <span className="text-xl">🧊</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-topgear text-2xl sm:text-3xl font-black tracking-tight text-white uppercase italic">
                  COOL<span className="text-cyan-400">WALL</span>
                </h1>
                <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/80 px-2 py-0.5 rounded-full uppercase">
                  Top Gear Studio
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium">
                The Interactive Wall for Profiling & Judging Everything
              </p>
            </div>
          </div>

          {/* Mobile quick actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              title={soundOn ? 'Mute Sounds' : 'Enable Sounds'}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onOpenCreate}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs"
            >
              + Profile
            </button>
          </div>
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-1 max-w-md items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search profiles, verdicts, tags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400/80 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="score-desc">Score: High → Low</option>
            <option value="score-asc">Score: Low → High</option>
            <option value="name">Name: A → Z</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>

        {/* Desktop Buttons Toolbar */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? 'Sound Effects Enabled (Click to Mute)' : 'Sounds Muted (Click to Enable)'}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              soundOn
                ? 'bg-zinc-900 border-zinc-700 text-cyan-400 hover:bg-zinc-850'
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Stepladder Button */}
          <button
            onClick={onOpenLadder}
            title="Hammond's Stepladder (Ceiling cards)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold cursor-pointer transition-colors"
          >
            <span>🪜</span>
            <span>Ladder</span>
            {outOfReachCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center">
                {outOfReachCount}
              </span>
            )}
          </button>

          {/* Face-off Cool Duel */}
          <button
            onClick={onOpenDuel}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/50 text-xs font-semibold cursor-pointer transition-colors shadow-sm"
          >
            <Swords className="w-3.5 h-3.5 text-red-400" />
            <span>Cool Duel</span>
          </button>

          {/* Export & Backup */}
          <button
            onClick={onOpenExport}
            title="Download snapshot or backup profiles"
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Make Profile Main CTA */}
          <button
            onClick={onOpenCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Make Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
};
