import React from 'react';
import { Compass, SlidersHorizontal, PlusCircle, Bike, Mountain, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenFilters: () => void;
  onOpenScoutModal: () => void;
  onOpenBikeModal: () => void;
  activePreset: string;
  onSelectPreset: (preset: string) => void;
  filteredCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenFilters,
  onOpenScoutModal,
  onOpenBikeModal,
  activePreset,
  onSelectPreset,
  filteredCount
}) => {
  return (
    <header className="h-16 px-4 md:px-6 glass-panel border-b border-white/10 flex items-center justify-between gap-3 z-30 shrink-0">
      {/* Brand & Identity */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-600 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
            <Compass className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-lg tracking-tight text-white">
              Oasis<span className="text-amber-400">Scout</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold tracking-wider">
              3D PWA
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Microclimate Real Estate & Mountain Terrain Intelligence
          </p>
        </div>
      </div>

      {/* Quick Filter Presets (Desktop) */}
      <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-white/5">
        <button
          onClick={() => onSelectPreset('least-wind')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            activePreset === 'least-wind'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Least Wind & Foothills
        </button>

        <button
          onClick={() => onSelectPreset('newer-builds')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            activePreset === 'newer-builds'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Mountain className="w-3.5 h-3.5 text-amber-400" />
          Newer Builds (2018+)
        </button>

        <button
          onClick={() => onSelectPreset('bike-haven')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            activePreset === 'bike-haven'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Bike className="w-3.5 h-3.5 text-sky-400" />
          Best Bike Access
        </button>

        <button
          onClick={() => onSelectPreset('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activePreset === 'all'
              ? 'bg-slate-800 text-white border border-white/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          View All
        </button>
      </div>

      {/* Search Input & Action Buttons */}
      <div className="flex items-center gap-2">
        <div className="relative w-36 sm:w-48 md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search city, zip, or area..."
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40"
          />
        </div>

        {/* Bike Routes Directory */}
        <button
          onClick={onOpenBikeModal}
          title="View Iconic Bike Routes"
          className="px-3 py-1.5 rounded-xl text-xs font-medium bg-sky-950/40 text-sky-300 border border-sky-500/30 hover:bg-sky-900/50 flex items-center gap-1.5 transition-all"
        >
          <Bike className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline">Bike Rides</span>
        </button>

        {/* Scout Any Listing URL */}
        <button
          onClick={onOpenScoutModal}
          title="Scout any property by URL or address"
          className="px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/50 flex items-center gap-1.5 transition-all"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span className="hidden md:inline">Scout Any URL</span>
        </button>

        {/* Filter Drawer Toggle */}
        <button
          onClick={onOpenFilters}
          className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 relative transition-all"
          title="Tune Parameters"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center">
            {filteredCount}
          </span>
        </button>
      </div>
    </header>
  );
};
