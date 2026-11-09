import React from 'react';
import { FilterState } from '../types';
import { Wind, Mountain, Bike, Utensils, Sun, X, RotateCcw } from 'lucide-react';

interface FilterToolbarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset
}) => {
  if (!isOpen) return null;

  const formatHour = (hour: number) => {
    const whole = Math.floor(hour);
    const mins = Math.round((hour - whole) * 60);
    const period = whole >= 12 ? 'PM' : 'AM';
    const displayHour = whole > 12 ? whole - 12 : whole;
    return `${displayHour}:${mins < 10 ? '0' : ''}${mins} ${period}`;
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 glass-panel-elevated z-40 p-5 flex flex-col shadow-2xl border-l border-white/10 overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 className="font-display font-bold text-lg text-white">Scout Parameters</h2>
          <p className="text-xs text-slate-400">Calibrate terrain, wind tolerance & amenities</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            title="Reset Filters"
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-white/5 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-6 py-4 flex-1">
        {/* Year Built Filter */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
              Minimum Year Built
            </label>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {filters.minYearBuilt >= 2026 ? '2026 (New Only)' : `${filters.minYearBuilt}+`}
            </span>
          </div>
          <input
            type="range"
            min="1950"
            max="2024"
            step="1"
            value={filters.minYearBuilt}
            onChange={(e) => onChange({ minYearBuilt: parseInt(e.target.value, 10) })}
            className="w-full accent-amber-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>1950 (Mid-Century)</span>
            <span>2015</span>
            <span>2024+ (Brand New)</span>
          </div>
        </div>

        {/* Wind Exposure Tolerance */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-emerald-400" />
              Wind Tolerance
            </label>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                filters.maxWindExposure === 1
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : filters.maxWindExposure <= 2
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                  : 'text-slate-400 bg-slate-800 border-white/5'
              }`}
            >
              {filters.maxWindExposure === 1
                ? 'Level 1 (Leeward Only)'
                : filters.maxWindExposure === 2
                ? 'Level 2 (Calm & Light Breeze)'
                : `Level ${filters.maxWindExposure} (Any / Gale Zone)`}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={filters.maxWindExposure}
            onChange={(e) => onChange({ maxWindExposure: parseInt(e.target.value, 10) })}
            className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400 mt-1.5">
            {filters.maxWindExposure === 1
              ? '🛡️ Excludes North Palm Springs / Escena wind tunnel. Focuses on Andreas Hills, Deepwell & Indian Canyons.'
              : filters.maxWindExposure === 2
              ? '🌤️ Includes South Palm Springs and central transitional neighborhoods.'
              : '💨 Allows properties in high-wind corridors (e.g. Escena, Desert Hot Springs).'}
          </p>
        </div>

        {/* Foothill Proximity Radius */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-sky-400" />
              Foothill Proximity Radius
            </label>
            <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              {filters.maxFoothillDistance >= 5 ? 'Any Distance' : `< ${filters.maxFoothillDistance} miles`}
            </span>
          </div>
          <input
            type="range"
            min="0.25"
            max="5"
            step="0.25"
            value={filters.maxFoothillDistance}
            onChange={(e) => onChange({ maxFoothillDistance: parseFloat(e.target.value) })}
            className="w-full accent-sky-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
            <span>0.25 mi (Mountain Base)</span>
            <span>1.0 mi</span>
            <span>5.0 mi (Valley Center)</span>
          </div>
        </div>

        {/* Bike Trail Proximity */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-emerald-400" />
              Proximity to Paved Cycling Trail
            </label>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {filters.maxBikeDistance >= 3 ? 'Any' : `< ${filters.maxBikeDistance} miles`}
            </span>
          </div>
          <input
            type="range"
            min="0.25"
            max="3"
            step="0.25"
            value={filters.maxBikeDistance}
            onChange={(e) => onChange({ maxBikeDistance: parseFloat(e.target.value) })}
            className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
          />
        </div>

        {/* Mountain Shade & Sun Hours Simulator */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-white">Mountain Shade Simulator</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] bg-slate-800 p-0.5 rounded">
              <button
                onClick={() => onChange({ season: 'winter' })}
                className={`px-2 py-0.5 rounded font-medium transition-all ${
                  filters.season === 'winter' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400'
                }`}
              >
                Winter
              </button>
              <button
                onClick={() => onChange({ season: 'summer' })}
                className={`px-2 py-0.5 rounded font-medium transition-all ${
                  filters.season === 'summer' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400'
                }`}
              >
                Summer
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Time of Day:</span>
              <span className="text-amber-400 font-bold">{formatHour(filters.timeOfDayHour)}</span>
            </div>
            <input
              type="range"
              min="9.0"
              max="18.5"
              step="0.25"
              value={filters.timeOfDayHour}
              onChange={(e) => onChange({ timeOfDayHour: parseFloat(e.target.value) })}
              className="w-full accent-amber-400 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            {filters.season === 'winter'
              ? '☀️ Winter Solstice: Mt. San Jacinto (10,834 ft) casts shade on South PS pools starting at 3:30 - 4:00 PM. Rancho Mirage receives ~75 mins extra direct sun.'
              : '☀️ Summer Solstice: Direct pool sunshine extends until 6:15 - 6:45 PM before mountain ridge occlusion.'}
          </p>
        </div>

        {/* Map Layer Toggles */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block mb-2">Interactive 3D Overlays</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChange({ showWindOverlay: !filters.showWindOverlay })}
              className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                filters.showWindOverlay
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900/60 text-slate-400 border-white/5'
              }`}
            >
              <Wind className="w-3.5 h-3.5 text-emerald-400" />
              Wind Heatmap
            </button>

            <button
              onClick={() => onChange({ showBikeOverlay: !filters.showBikeOverlay })}
              className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                filters.showBikeOverlay
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                  : 'bg-slate-900/60 text-slate-400 border-white/5'
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-sky-400" />
              Bike Corridors
            </button>

            <button
              onClick={() => onChange({ showPoiOverlay: !filters.showPoiOverlay })}
              className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                filters.showPoiOverlay
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-slate-900/60 text-slate-400 border-white/5'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-purple-400" />
              Dining & POIs
            </button>

            <button
              onClick={() => onChange({ terrain3D: !filters.terrain3D })}
              className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                filters.terrain3D
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900/60 text-slate-400 border-white/5'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
              3D Foothills
            </button>
          </div>
        </div>
      </div>

      {/* Done Button */}
      <div className="pt-3 border-t border-white/10">
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-xs tracking-wide shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
        >
          Apply Parameters
        </button>
      </div>
    </div>
  );
};
