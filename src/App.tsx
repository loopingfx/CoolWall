import React, { useState, useEffect, useMemo } from 'react';
import { Profile, CategoryId, WallTheme } from './types';
import { THEMES } from './data/themes';
import { INITIAL_PROFILES } from './data/initialProfiles';
import { Header } from './components/Header';
import { ThemeSelector } from './components/ThemeSelector';
import { CoolWallBoard } from './components/CoolWallBoard';
import { OutOfReachShelf } from './components/OutOfReachShelf';
import { CryoFridge } from './components/CryoFridge';
import { ProfileModal } from './components/ProfileModal';
import { EditProfileModal } from './components/EditProfileModal';
import { DuelModal } from './components/DuelModal';
import { HammondLadderModal } from './components/HammondLadderModal';
import { ExportModal } from './components/ExportModal';
import { playCardSlapSound, playCategoryDropSound } from './utils/audio';
import { Sparkles, Trophy, Flame, Snowflake, Info, Layers } from 'lucide-react';

const STORAGE_KEY_PROFILES = 'coolwall_profiles_v1';
const STORAGE_KEY_THEME = 'coolwall_theme_v1';
const STORAGE_KEY_CLASSIC_TITLES = 'coolwall_classic_titles_v1';

export function App() {
  // Theme state
  const [currentTheme, setCurrentTheme] = useState<WallTheme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved) {
      const found = THEMES.find((t) => t.id === saved);
      if (found) return found;
    }
    return THEMES[0];
  });

  const [useClassicTitles, setUseClassicTitles] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CLASSIC_TITLES);
    return saved === 'true';
  });

  // Profiles state
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PROFILES);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse saved profiles', e);
      }
    }
    return INITIAL_PROFILES;
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score-desc' | 'score-asc' | 'name' | 'recent'>('score-desc');
  const [showAllThemes, setShowAllThemes] = useState(false);

  // Modals state
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [quickAddCategory, setQuickAddCategory] = useState<CategoryId>('cool');
  const [isDuelOpen, setIsDuelOpen] = useState(false);
  const [isLadderOpen, setIsLadderOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_THEME, currentTheme.id);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CLASSIC_TITLES, String(useClassicTitles));
  }, [useClassicTitles]);

  // Filtered profiles for current view
  const visibleProfiles = useMemo(() => {
    return profiles
      .filter((p) => {
        // Theme filter
        if (!showAllThemes && p.themeId !== currentTheme.id) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSub = p.subtitle.toLowerCase().includes(q);
          const matchVerdict = (p.clarksonVerdict || '').toLowerCase().includes(q);
          const matchTags = (p.tags || []).some((t) => t.toLowerCase().includes(q));
          return matchName || matchSub || matchVerdict || matchTags;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score-desc') return b.coolScore - a.coolScore;
        if (sortBy === 'score-asc') return a.coolScore - b.coolScore;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return b.createdAt - a.createdAt;
      });
  }, [profiles, currentTheme.id, showAllThemes, searchQuery, sortBy]);

  // Wall Statistics
  const stats = useMemo(() => {
    const list = visibleProfiles;
    const total = list.length;
    if (total === 0) return { total: 0, avgScore: 0, subZeroCount: 0, topPick: null, bottomPick: null };

    const avgScore = Math.round(list.reduce((acc, p) => acc + p.coolScore, 0) / total);
    const subZeroCount = list.filter((p) => p.category === 'subzero' || p.category === 'fridge').length;
    const sorted = [...list].sort((a, b) => b.coolScore - a.coolScore);
    const topPick = sorted[0] || null;
    const bottomPick = sorted[sorted.length - 1] || null;

    return { total, avgScore, subZeroCount, topPick, bottomPick };
  }, [visibleProfiles]);

  const outOfReachProfiles = visibleProfiles.filter((p) => p.isOutOfReach);
  const fridgeProfiles = visibleProfiles.filter((p) => p.category === 'fridge');

  // Profile actions
  const handleMoveCategory = (id: string, newCat: CategoryId) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, category: newCat } : p))
    );
  };

  const handleToggleOutOfReach = (id: string) => {
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const next = !p.isOutOfReach;
          return { ...p, isOutOfReach: next };
        }
        return p;
      })
    );
  };

  const handleUpdateScore = (id: string, delta: number) => {
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextScore = Math.max(0, Math.min(100, p.coolScore + delta));
          let nextCategory = p.category;
          // Auto-promote if jumped high or low
          if (nextScore >= 92 && nextCategory !== 'fridge') nextCategory = 'subzero';
          else if (nextScore < 20 && nextCategory !== 'seriously-uncool') nextCategory = 'seriously-uncool';

          return { ...p, coolScore: nextScore, category: nextCategory };
        }
        return p;
      })
    );
  };

  const handleSaveProfile = (savedProfile: Profile) => {
    setProfiles((prev) => {
      const idx = prev.findIndex((p) => p.id === savedProfile.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = savedProfile;
        return next;
      } else {
        return [savedProfile, ...prev];
      }
    });
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    if (selectedProfile?.id === id) setSelectedProfile(null);
  };

  const handleResetDefaults = () => {
    // Restore default profiles for active theme
    const themeDefaults = INITIAL_PROFILES.filter((p) => p.themeId === currentTheme.id);
    setProfiles((prev) => {
      const otherThemes = prev.filter((p) => p.themeId !== currentTheme.id);
      return [...themeDefaults, ...otherThemes];
    });
  };

  const handleImportProfiles = (newProfiles: Profile[]) => {
    setProfiles(newProfiles);
  };

  const handleQuickAdd = (category: CategoryId) => {
    setQuickAddCategory(category);
    setEditingProfile(null);
    setIsCreateOpen(true);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${currentTheme.bgClass} text-zinc-100 flex flex-col relative`}>
      {/* Background Texture & Ambient Lights */}
      <div className={`fixed inset-0 pointer-events-none ${currentTheme.boardTexture} opacity-70`} />
      <div
        className="fixed -top-40 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ backgroundColor: currentTheme.accentColor }}
      />
      <div
        className="fixed top-1/2 -right-20 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ backgroundColor: currentTheme.accentColor }}
      />

      {/* Main Sticky Header */}
      <Header
        onOpenCreate={() => {
          setEditingProfile(null);
          setIsCreateOpen(true);
        }}
        onOpenDuel={() => setIsDuelOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenLadder={() => setIsLadderOpen(true)}
        outOfReachCount={outOfReachProfiles.length}
        fridgeCount={fridgeProfiles.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 space-y-6 relative z-10">
        {/* Theme Selector Bar */}
        <ThemeSelector
          currentTheme={currentTheme}
          onSelectTheme={setCurrentTheme}
          useClassicTitles={useClassicTitles}
          onToggleClassicTitles={() => setUseClassicTitles(!useClassicTitles)}
        />

        {/* Theme Mission & Wall Metrics Hero */}
        <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {currentTheme.id === 'topgear' ? '🏎️' : currentTheme.id === 'billionaire' ? '💎' : currentTheme.id === 'spacex' ? '🚀' : currentTheme.id === 'tech' ? '⚡' : '🦾'}
              </span>
              <h2 className="font-topgear text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                {currentTheme.name} Wall
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                {currentTheme.tagline}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              {currentTheme.description}
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="flex items-center gap-3 shrink-0 overflow-x-auto pb-1 lg:pb-0">
            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl px-3 py-2 text-center min-w-[70px]">
              <div className="text-[10px] font-mono uppercase text-zinc-500">Profiles</div>
              <div className="text-lg font-black font-topgear text-white">{stats.total}</div>
            </div>

            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl px-3 py-2 text-center min-w-[70px]">
              <div className="text-[10px] font-mono uppercase text-zinc-500">Avg Cool</div>
              <div className="text-lg font-black font-topgear text-cyan-400">{stats.avgScore}</div>
            </div>

            <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl px-3 py-2 text-center min-w-[70px]">
              <div className="text-[10px] font-mono uppercase text-zinc-500">Sub-Zero</div>
              <div className="text-lg font-black font-topgear text-sky-400">{stats.subZeroCount}</div>
            </div>

            {/* Toggle show all themes filter */}
            <button
              onClick={() => setShowAllThemes(!showAllThemes)}
              title="Show profiles from all themes on this board"
              className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                showAllThemes
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-zinc-950/70 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showAllThemes ? 'All Themes Active' : 'Current Theme'}</span>
            </button>
          </div>
        </div>

        {/* Out of Reach of Hammond Ceiling Shelf (Clarkson move) */}
        {outOfReachProfiles.length > 0 && (
          <OutOfReachShelf
            profiles={visibleProfiles}
            onMoveCategory={handleMoveCategory}
            onToggleOutOfReach={handleToggleOutOfReach}
            onSelectProfile={setSelectedProfile}
            onEditProfile={(p) => {
              setEditingProfile(p);
              setIsCreateOpen(true);
            }}
            onDeleteProfile={handleDeleteProfile}
            onOpenLadder={() => setIsLadderOpen(true)}
          />
        )}

        {/* The 4 Main Cool Wall Columns */}
        <CoolWallBoard
          profiles={visibleProfiles}
          theme={currentTheme}
          useClassicTitles={useClassicTitles}
          onMoveCategory={handleMoveCategory}
          onToggleOutOfReach={handleToggleOutOfReach}
          onSelectProfile={setSelectedProfile}
          onEditProfile={(p) => {
            setEditingProfile(p);
            setIsCreateOpen(true);
          }}
          onDeleteProfile={handleDeleteProfile}
          onQuickAdd={handleQuickAdd}
        />

        {/* Cryogenic DB9 Fridge / Swiss Vault / Deep Space Cryo */}
        <CryoFridge
          profiles={visibleProfiles}
          theme={currentTheme}
          useClassicTitles={useClassicTitles}
          onMoveCategory={handleMoveCategory}
          onToggleOutOfReach={handleToggleOutOfReach}
          onSelectProfile={setSelectedProfile}
          onEditProfile={(p) => {
            setEditingProfile(p);
            setIsCreateOpen(true);
          }}
          onDeleteProfile={handleDeleteProfile}
          onQuickAdd={handleQuickAdd}
        />
      </main>

      {/* Footer Tribute */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-6 px-4 text-center text-xs text-zinc-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Inspired by BBC <strong>Top Gear's Cool Wall</strong> • Created for profiling & debating anything cool.
          </p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>And on that bombshell, it's time to end!</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Dossier / Detail View Modal */}
      <ProfileModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onMoveCategory={handleMoveCategory}
        onToggleOutOfReach={handleToggleOutOfReach}
        onEdit={(p) => {
          setSelectedProfile(null);
          setEditingProfile(p);
          setIsCreateOpen(true);
        }}
        onDelete={handleDeleteProfile}
      />

      {/* 2. Create / Edit Profile Modal */}
      <EditProfileModal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingProfile(null);
        }}
        onSave={handleSaveProfile}
        initialProfile={editingProfile}
        currentTheme={currentTheme}
        defaultCategory={quickAddCategory}
      />

      {/* 3. Top Gear Cool Duel Face-Off Modal */}
      <DuelModal
        isOpen={isDuelOpen}
        onClose={() => setIsDuelOpen(false)}
        profiles={visibleProfiles}
        onUpdateScore={handleUpdateScore}
      />

      {/* 4. Hammond Stepladder Modal */}
      <HammondLadderModal
        isOpen={isLadderOpen}
        onClose={() => setIsLadderOpen(false)}
        outOfReachProfiles={outOfReachProfiles}
        onToggleOutOfReach={handleToggleOutOfReach}
        onMoveCategory={handleMoveCategory}
      />

      {/* 5. Export / Backup Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        profiles={profiles}
        currentTheme={currentTheme}
        onImportProfiles={handleImportProfiles}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}

export default App;
