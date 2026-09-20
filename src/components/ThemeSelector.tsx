import React from 'react';
import { THEMES } from '../data/themes';
import { WallTheme } from '../types';
import { Gauge, Crown, Rocket, Cpu, Zap, Sparkles } from 'lucide-react';
import { playThemeSound } from '../utils/audio';

interface ThemeSelectorProps {
  currentTheme: WallTheme;
  onSelectTheme: (theme: WallTheme) => void;
  useClassicTitles: boolean;
  onToggleClassicTitles: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
  useClassicTitles,
  onToggleClassicTitles
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gauge': return <Gauge className="w-4 h-4" />;
      case 'Crown': return <Crown className="w-4 h-4" />;
      case 'Rocket': return <Rocket className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-xl">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 pl-1 mr-1 flex items-center gap-1 shrink-0">
          Themes:
        </span>
        {THEMES.map((theme) => {
          const isActive = theme.id === currentTheme.id;
          return (
            <button
              key={theme.id}
              onClick={() => {
                onSelectTheme(theme);
                playThemeSound(theme.soundPreset);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-lg shadow-white/10 scale-[1.02]'
                  : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80 hover:text-white border border-zinc-700/50'
              }`}
            >
              <span className={isActive ? 'text-zinc-950' : 'text-zinc-400'}>
                {getIcon(theme.icon)}
              </span>
              <span>{theme.name}</span>
              {theme.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-zinc-900 text-zinc-200'
                      : 'bg-zinc-700 text-zinc-300'
                  }`}
                >
                  {theme.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 justify-end shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-800">
        <button
          onClick={onToggleClassicTitles}
          title="Toggle between theme-specific column names and Top Gear classic names"
          className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
            useClassicTitles
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-medium'
              : 'bg-zinc-800/60 border-zinc-700 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{useClassicTitles ? 'Top Gear Names' : 'Theme Names'}</span>
        </button>
      </div>
    </div>
  );
};
