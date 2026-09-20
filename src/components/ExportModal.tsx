import React, { useRef, useState } from 'react';
import { Profile, WallTheme } from '../types';
import { X, Download, Upload, RotateCcw, Image, Check, FileJson, AlertCircle } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: Profile[];
  currentTheme: WallTheme;
  onImportProfiles: (profiles: Profile[]) => void;
  onResetDefaults: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  profiles,
  currentTheme,
  onImportProfiles,
  onResetDefaults
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [imageGenerating, setImageGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Export JSON file
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profiles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `coolwall-${currentTheme.id}-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Import JSON file
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            onImportProfiles(parsed);
            onClose();
          } else {
            alert('Invalid Cool Wall JSON file format.');
          }
        } catch (err) {
          alert('Failed to parse JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Generate Image Snapshot using HTML5 Canvas
  const handleExportCanvasImage = async () => {
    setImageGenerating(true);
    try {
      const canvas = document.createElement('canvas');
      const width = 1600;
      const height = 900;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Dark Top Gear themed background
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, width, height);

      // Studio header banner
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, width, 120);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 44px "Oswald", sans-serif';
      ctx.fillText('COOLWALL', 40, 75);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '18px "Inter", sans-serif';
      ctx.fillText(`Top Gear Profiling Board • Theme: ${currentTheme.name}`, 310, 70);

      // Draw 4 columns
      const colWidth = (width - 100) / 4;
      const columns = [
        { id: 'seriously-uncool', title: currentTheme.columns['seriously-uncool'].title, color: '#f43f5e' },
        { id: 'uncool', title: currentTheme.columns['uncool'].title, color: '#f59e0b' },
        { id: 'cool', title: currentTheme.columns['cool'].title, color: '#10b981' },
        { id: 'subzero', title: currentTheme.columns['subzero'].title, color: '#38bdf8' }
      ];

      columns.forEach((col, colIdx) => {
        const x = 40 + colIdx * (colWidth + 10);
        const y = 140;

        // Column Box
        ctx.fillStyle = '#121215';
        ctx.fillRect(x, y, colWidth, height - 160);

        // Column Header
        ctx.fillStyle = col.color;
        ctx.fillRect(x, y, colWidth, 40);

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 16px "Oswald", sans-serif';
        ctx.fillText(col.title.toUpperCase(), x + 15, y + 26);

        // Draw profile summaries in this column
        const items = profiles.filter((p) => p.category === col.id);
        items.slice(0, 7).forEach((item, itemIdx) => {
          const cardY = y + 55 + itemIdx * 85;
          ctx.fillStyle = '#1f1f23';
          ctx.fillRect(x + 10, cardY, colWidth - 20, 75);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 14px "Inter", sans-serif';
          ctx.fillText(item.name.slice(0, 24), x + 20, cardY + 25);

          ctx.fillStyle = '#9ca3af';
          ctx.font = '11px "Inter", sans-serif';
          ctx.fillText(item.subtitle.slice(0, 30), x + 20, cardY + 45);

          // Score badge
          ctx.fillStyle = col.color;
          ctx.font = 'bold 11px monospace';
          ctx.fillText(`Score: ${item.coolScore}/100`, x + 20, cardY + 65);
        });
      });

      // Download canvas as PNG
      const imageURL = canvas.toDataURL('image/png');
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', imageURL);
      downloadAnchor.setAttribute('download', `coolwall-snapshot-${currentTheme.id}.png`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setImageGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 text-white space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-cyan-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-topgear text-xl font-bold uppercase tracking-tight">
                Export & Wall Backup
              </h3>
              <p className="text-xs text-zinc-400">
                Save your profiles, download an image snapshot, or restore defaults.
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

        {/* Action Options */}
        <div className="space-y-3">
          {/* Export Snapshot as Image */}
          <button
            onClick={handleExportCanvasImage}
            disabled={imageGenerating}
            className="w-full p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-cyan-500/50 flex items-center justify-between transition-all cursor-pointer group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Image className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                  Download Image Snapshot (PNG)
                </h4>
                <p className="text-xs text-zinc-400">
                  Renders high-res 1600x900 wallpaper of the current Cool Wall
                </p>
              </div>
            </div>
            <Download className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400" />
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="w-full p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-cyan-500/50 flex items-center justify-between transition-all cursor-pointer group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <FileJson className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Export Wall Data (JSON)
                </h4>
                <p className="text-xs text-zinc-400">
                  Backup all profiles, stats, verdicts, and custom placements
                </p>
              </div>
            </div>
            <Download className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400" />
          </button>

          {/* Import JSON */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-cyan-500/50 flex items-center justify-between transition-all cursor-pointer group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  Import Wall Data (JSON)
                </h4>
                <p className="text-xs text-zinc-400">
                  Load profiles from an existing Cool Wall backup file
                </p>
              </div>
            </div>
            <Upload className="w-4 h-4 text-zinc-500 group-hover:text-amber-400" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            className="hidden"
          />

          {/* Reset Defaults */}
          <button
            onClick={() => {
              if (confirm('Reset this wall back to curated theme defaults? Your custom profiles will be replaced.')) {
                onResetDefaults();
                onClose();
              }
            }}
            className="w-full p-3.5 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 hover:border-rose-700/60 flex items-center justify-between transition-all cursor-pointer group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-950/80 border border-rose-800/80 flex items-center justify-center text-rose-400">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-rose-300 group-hover:text-rose-200 transition-colors">
                  Reset to Curated Theme Defaults
                </h4>
                <p className="text-xs text-rose-300/70">
                  Restore default {currentTheme.name} profiles and positions
                </p>
              </div>
            </div>
            <RotateCcw className="w-4 h-4 text-rose-400" />
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Download completed successfully!</span>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
