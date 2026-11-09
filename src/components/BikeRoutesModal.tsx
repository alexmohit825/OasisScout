import React from 'react';
import { BikeRoute } from '../types';
import { X, Bike, CheckCircle2, Navigation } from 'lucide-react';

interface BikeRoutesModalProps {
  isOpen: boolean;
  onClose: () => void;
  routes: BikeRoute[];
  onFlyToRoute: (coords: [number, number]) => void;
}

export const BikeRoutesModal: React.FC<BikeRoutesModalProps> = ({
  isOpen,
  onClose,
  routes,
  onFlyToRoute
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[88vh] glass-panel-elevated rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Coachella Valley Cycling Network</h3>
              <p className="text-xs text-slate-400">Curated road, endurance, and scenic architectural routes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Route Cards List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {routes.map((route) => {
            const centerPoint = route.coordinates[Math.floor(route.coordinates.length / 2)];

            return (
              <div
                key={route.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-sky-500/40 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: route.color }}
                    />
                    <h4 className="font-display font-bold text-base text-white">{route.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/10 text-slate-300">
                      {route.category.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onFlyToRoute(centerPoint);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30 hover:bg-sky-500/20 flex items-center gap-1.5 transition-all self-start sm:self-auto"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>View on 3D Map</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{route.description}</p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono pt-1">
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <span className="text-[10px] text-slate-500 block">Distance</span>
                    <span className="font-bold text-white text-sm">{route.distanceMiles} miles</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <span className="text-[10px] text-slate-500 block">Elevation Gain</span>
                    <span className="font-bold text-amber-400 text-sm">+{route.elevationGainFt} ft</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <span className="text-[10px] text-slate-500 block">Difficulty</span>
                    <span
                      className={`font-bold text-sm ${
                        route.difficulty === 'Easy'
                          ? 'text-emerald-400'
                          : route.difficulty === 'Moderate'
                          ? 'text-sky-400'
                          : 'text-red-400'
                      }`}
                    >
                      {route.difficulty}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <span className="text-[10px] text-slate-500 block">Surface</span>
                    <span className="font-bold text-slate-300 text-xs truncate block">{route.surface}</span>
                  </div>
                </div>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {route.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
