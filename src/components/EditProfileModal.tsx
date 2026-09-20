import React, { useState, useEffect } from 'react';
import { Profile, CategoryId, WallTheme, ProfileStat } from '../types';
import { X, Upload, Sparkles, Plus, Trash2, Sliders, Dices, ArrowUp } from 'lucide-react';
import { generateClarksonQuip } from '../utils/clarksonQuotes';
import { playCardSlapSound } from '../utils/audio';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: Profile) => void;
  initialProfile?: Profile | null;
  currentTheme: WallTheme;
  defaultCategory?: CategoryId;
}

const PRESET_IMAGE_GALLERY = [
  { label: 'Supercar', url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80' },
  { label: 'Hypercar', url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Classic Car', url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tech Titan', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Superyacht', url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80' },
  { label: 'Rocket Launch', url: 'https://images.unsplash.com/photo-1517976487588-b4b1a41a4a58?auto=format&fit=crop&w=800&q=80' },
  { label: 'Deep Space', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },
  { label: 'AI Matrix', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cyberpunk Neon', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Ugly Clunker', url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80' }
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProfile,
  currentTheme,
  defaultCategory = 'cool'
}) => {
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<CategoryId>(defaultCategory);
  const [coolScore, setCoolScore] = useState<number>(75);
  const [clarksonVerdict, setClarksonVerdict] = useState('');
  const [isOutOfReach, setIsOutOfReach] = useState(false);
  const [tagsInput, setTagsInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [stats, setStats] = useState<ProfileStat[]>([]);
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);

  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');
  const [newStatLabel, setNewStatLabel] = useState('');
  const [newStatValue, setNewStatValue] = useState('');

  // Reset or initialize fields
  useEffect(() => {
    if (initialProfile) {
      setName(initialProfile.name || '');
      setSubtitle(initialProfile.subtitle || '');
      setImageUrl(initialProfile.imageUrl || '');
      setCategory(initialProfile.category || 'cool');
      setCoolScore(initialProfile.coolScore ?? 75);
      setClarksonVerdict(initialProfile.clarksonVerdict || '');
      setIsOutOfReach(Boolean(initialProfile.isOutOfReach));
      setTags(initialProfile.tags || []);
      setStats(initialProfile.stats || []);
      setPros(initialProfile.pros || []);
      setCons(initialProfile.cons || []);
    } else {
      // Create fresh default profile tailored to active theme
      setName('');
      setSubtitle('');
      setImageUrl(PRESET_IMAGE_GALLERY[0].url);
      setCategory(defaultCategory);
      setCoolScore(defaultCategory === 'subzero' ? 95 : defaultCategory === 'seriously-uncool' ? 10 : 75);
      setClarksonVerdict('');
      setIsOutOfReach(false);
      setTags(['Profile', currentTheme.badge]);

      // Initialize default stats from theme
      const initStats = currentTheme.presetStats.map((label) => ({
        label,
        value: 'Standard'
      }));
      setStats(initStats);
      setPros(['Effortlessly appealing in the right company']);
      setCons(['Depreciates if parked in the rain']);
    }
  }, [initialProfile, isOpen, currentTheme, defaultCategory]);

  if (!isOpen) return null;

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagsInput.trim()) {
      setTags([...tags, tagsInput.trim()]);
      setTagsInput('');
    }
  };

  const handleRemoveTag = (idx: number) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  const handleAddStat = () => {
    if (newStatLabel.trim() && newStatValue.trim()) {
      setStats([...stats, { label: newStatLabel.trim(), value: newStatValue.trim() }]);
      setNewStatLabel('');
      setNewStatValue('');
    }
  };

  const handleRemoveStat = (idx: number) => {
    setStats(stats.filter((_, i) => i !== idx));
  };

  const handleAddPro = () => {
    if (newPro.trim()) {
      setPros([...pros, newPro.trim()]);
      setNewPro('');
    }
  };

  const handleRemovePro = (idx: number) => {
    setPros(pros.filter((_, i) => i !== idx));
  };

  const handleAddCon = () => {
    if (newCon.trim()) {
      setCons([...cons, newCon.trim()]);
      setNewCon('');
    }
  };

  const handleRemoveCon = (idx: number) => {
    setCons(cons.filter((_, i) => i !== idx));
  };

  const handleGenerateQuip = () => {
    const quip = generateClarksonQuip(category, coolScore, name || 'this candidate');
    setClarksonVerdict(quip);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a name for the profile.');
      return;
    }

    const savedProfile: Profile = {
      id: initialProfile?.id || `profile-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: name.trim(),
      subtitle: subtitle.trim() || 'Custom Dossier',
      themeId: currentTheme.id,
      category,
      imageUrl: imageUrl.trim() || PRESET_IMAGE_GALLERY[0].url,
      clarksonVerdict: clarksonVerdict.trim() || generateClarksonQuip(category, coolScore, name),
      coolScore,
      tags,
      stats,
      pros,
      cons,
      isOutOfReach,
      createdAt: initialProfile?.createdAt || Date.now()
    };

    playCardSlapSound();
    onSave(savedProfile);
    onClose();
  };

  // Helper label for coolness score
  const getScoreDescription = (s: number) => {
    if (s >= 95) return '👑 Transcends Mortal Coolness (Sub-Zero God)';
    if (s >= 85) return '❄️ Glacial Sub-Zero (Clarkson Approved)';
    if (s >= 70) return '✨ Genuinely Cool & Classless';
    if (s >= 50) return '😐 Mildly Acceptable / Neutral';
    if (s >= 30) return '🥱 Uncool / Beige & Boring';
    if (s >= 15) return '🚨 Seriously Uncool / Visual Hazard';
    return '🔥 Catastrophic Municipal Incinerator Level';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-950 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-topgear text-xl sm:text-2xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>{initialProfile ? 'Edit Profile' : 'Make New Profile'}</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Build a custom profile dossier and slap it right onto the Cool Wall!
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Section 1: Basic Identity */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              1. Profile Identification
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Subject / Entity Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aston Martin DB9, Jensen Huang, Starship S30"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Subtitle / Sub-category
                </label>
                <input
                  type="text"
                  placeholder="e.g. 6.0L V12 Grand Tourer, Leather Jacket Monopolist"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Photo / Visual */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              2. Photography / Image
            </h4>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Image Preview */}
              <div className="relative w-full sm:w-44 h-36 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                    No image
                  </div>
                )}
              </div>

              {/* Image Input Options */}
              <div className="flex-1 space-y-3 w-full">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Upload Local Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-zinc-500">or pick preset:</span>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                  {PRESET_IMAGE_GALLERY.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className={`text-[10px] px-2 py-1 rounded border transition-colors cursor-pointer ${
                        imageUrl === preset.url
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Wall Category & Top Gear Coolness Score */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              3. Wall Placement & Coolness Score
            </h4>

            {/* Category Select Buttons */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Target Wall Column
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'seriously-uncool' as CategoryId, label: 'Seriously Uncool', color: 'hover:border-rose-500' },
                  { id: 'uncool' as CategoryId, label: 'Uncool', color: 'hover:border-amber-500' },
                  { id: 'cool' as CategoryId, label: 'Cool', color: 'hover:border-emerald-500' },
                  { id: 'subzero' as CategoryId, label: 'Sub-Zero', color: 'hover:border-cyan-400' },
                  { id: 'fridge' as CategoryId, label: 'DB9 Fridge', color: 'hover:border-blue-400' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(cat.id);
                      if (cat.id === 'seriously-uncool' && coolScore > 25) setCoolScore(15);
                      if (cat.id === 'uncool' && (coolScore > 60 || coolScore < 25)) setCoolScore(45);
                      if (cat.id === 'cool' && (coolScore < 60 || coolScore > 85)) setCoolScore(75);
                      if (cat.id === 'subzero' && coolScore < 85) setCoolScore(92);
                      if (cat.id === 'fridge' && coolScore < 95) setCoolScore(98);
                    }}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      category === cat.id
                        ? 'bg-zinc-100 text-zinc-950 border-white shadow-lg shadow-white/10 scale-[1.02]'
                        : `bg-zinc-900/80 text-zinc-400 border-zinc-800 ${cat.color}`
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Score Slider */}
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-300">
                  Coolness Meter:
                </span>
                <span className="text-sm font-mono font-bold text-cyan-400 bg-zinc-950 px-2.5 py-0.5 rounded border border-zinc-800">
                  {coolScore} / 100
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={coolScore}
                onChange={(e) => setCoolScore(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />

              <div className="text-xs text-zinc-400 font-medium pt-1">
                {getScoreDescription(coolScore)}
              </div>
            </div>

            {/* Out of Reach Checkbox */}
            <div className="flex items-center gap-2.5 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <input
                type="checkbox"
                id="outOfReachCheck"
                checked={isOutOfReach}
                onChange={(e) => setIsOutOfReach(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
              />
              <label htmlFor="outOfReachCheck" className="text-xs text-amber-200 cursor-pointer flex items-center gap-1.5 font-medium">
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Stick high up on the wall (out of reach of Richard Hammond)</span>
              </label>
            </div>
          </div>

          {/* Section 4: Clarkson Verdict & Quotes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                4. Clarkson's Verdict & Quip
              </h4>

              <button
                type="button"
                onClick={handleGenerateQuip}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/60 transition-colors cursor-pointer"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Generate Witty Quip</span>
              </button>
            </div>

            <textarea
              rows={3}
              placeholder="e.g. Driven exclusively by dental hygienists who wear polo shirts inside out..."
              value={clarksonVerdict}
              onChange={(e) => setClarksonVerdict(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs leading-relaxed focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Section 5: Technical Specifications / Stats */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              5. Performance Telemetry & Specs
            </h4>

            {/* Existing Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stats.map((st, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs"
                >
                  <div>
                    <span className="text-zinc-500 font-mono uppercase text-[10px] block">
                      {st.label}
                    </span>
                    <span className="font-semibold text-zinc-200">{st.value}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveStat(idx)}
                    className="p-1 text-zinc-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Stat inputs */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Stat (e.g. 0-60 mph)"
                value={newStatLabel}
                onChange={(e) => setNewStatLabel(e.target.value)}
                className="w-1/2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Value (e.g. 2.9 s)"
                value={newStatValue}
                onChange={(e) => setNewStatValue(e.target.value)}
                className="w-1/2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddStat}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium rounded-lg shrink-0 cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Section 6: Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pros */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-emerald-400">
                Why It's Cool (Pros)
              </label>
              <div className="space-y-1.5">
                {pros.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
                  >
                    <span className="truncate">{p}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePro(idx)}
                      className="p-1 text-zinc-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  placeholder="Add reason it's cool..."
                  value={newPro}
                  onChange={(e) => setNewPro(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddPro();
                    }
                  }}
                  className="flex-1 px-3 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddPro}
                  className="px-2.5 py-1.5 bg-emerald-950/60 text-emerald-400 border border-emerald-800 rounded text-xs font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Cons */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-rose-400">
                Why It Sucks (Cons)
              </label>
              <div className="space-y-1.5">
                {cons.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
                  >
                    <span className="truncate">{c}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCon(idx)}
                      className="p-1 text-zinc-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  placeholder="Add reason it sucks..."
                  value={newCon}
                  onChange={(e) => setNewCon(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCon();
                    }
                  }}
                  className="flex-1 px-3 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddCon}
                  className="px-2.5 py-1.5 bg-rose-950/60 text-rose-400 border border-rose-800 rounded text-xs font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Section 7: Tags */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-300">
              Tags & Badges
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-cyan-300 font-mono border border-zinc-700 flex items-center gap-1"
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(idx)}
                    className="hover:text-rose-400 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="New tag (e.g. V12, Apex Giga)"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium rounded-lg cursor-pointer"
              >
                + Add Tag
              </button>
            </div>
          </div>

          {/* Sticky Submit Footer inside form */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer transition-all"
            >
              Slap onto Cool Wall
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
