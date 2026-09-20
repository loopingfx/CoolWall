import React, { useState } from 'react';
import { Profile, CategoryId, WallTheme } from '../types';
import { ProfileCard } from './ProfileCard';
import { Snowflake, Thermometer, ShieldAlert, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { playCategoryDropSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CryoFridgeProps {
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

export const CryoFridge: React.FC<CryoFridgeProps> = ({
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
  const [isOpen, setIsOpen] = useState(true);
  const [isDragOver, setIsDragOver] = useState(false);

  const fridgeProfiles = profiles.filter((p) => p.category === 'fridge');

  const fridgeTitle = useClassicTitles
    ? 'The DB9 Fridge'
    : theme.columns.fridge.title;

  const fridgeSubtitle = useClassicTitles
    ? 'Beyond Sub-Zero Cryogenic Icebox'
    : theme.columns.fridge.subtitle;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const profileId = e.dataTransfer.getData('text/plain');
    if (!profileId) return;

    onMoveCategory(profileId, 'fridge');
    playCategoryDropSound('fridge');

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#00f5ff', '#38bdf8', '#ffffff', '#e0f2fe']
    });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-full rounded-2xl border transition-all duration-300 relative overflow-hidden ${
        isDragOver
          ? 'ring-4 ring-cyan-400 bg-cyan-950/90 border-cyan-300'
          : 'bg-gradient-to-r from-sky-950/60 via-zinc-950 to-blue-950/60 border-cyan-500/40 shadow-2xl shadow-cyan-500/10'
      }`}
    >
      {/* Glacial Frost Background Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500" />

      {/* Header Bar */}
      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <Snowflake className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-topgear text-xl font-bold tracking-tight text-white flex items-center gap-2">
                {fridgeTitle}
              </h3>
              <span className="text-[10px] font-mono font-bold bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 px-2 py-0.5 rounded-full uppercase">
                {useClassicTitles ? 'VAULT' : theme.columns.fridge.badge}
              </span>
              <span className="text-xs font-mono font-bold bg-zinc-800 text-cyan-300 px-2 py-0.5 rounded-full border border-zinc-700">
                {fridgeProfiles.length}
              </span>
            </div>
            <p className="text-xs text-cyan-200/70 leading-snug">
              {fridgeSubtitle} — Too breathtaking for standard wall physics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Temperature HUD */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
            <Thermometer className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-bold">-273.15°C (ABS ZERO)</span>
          </div>

          {/* Quick Add */}
          <button
            onClick={() => onQuickAdd('fridge')}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            + Add to Vault
          </button>

          {/* Expand/Collapse */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
            title={isOpen ? 'Collapse Fridge' : 'Open Fridge'}
          >
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Drawer Content */}
      {isOpen && (
        <div className="p-4 pt-1 border-t border-cyan-500/20 relative z-10">
          {fridgeProfiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {fridgeProfiles.map((profile) => (
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
            <div
              onClick={() => onQuickAdd('fridge')}
              className={`py-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-colors ${
                isDragOver
                  ? 'border-cyan-300 bg-cyan-500/10 text-cyan-200'
                  : 'border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/30 text-cyan-300/60'
              }`}
            >
              <Snowflake className="w-8 h-8 mb-2 opacity-60 animate-pulse" />
              <span className="text-sm font-semibold">
                {isDragOver ? 'Drop into Cryo Freeze!' : 'The Fridge is Empty'}
              </span>
              <span className="text-xs text-zinc-400 mt-1 max-w-md">
                Drag any profile that transcends mortal coolness here, like the Aston Martin DB9 or Voyager 1 probe!
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
