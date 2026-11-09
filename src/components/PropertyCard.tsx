import React from 'react';
import { Property } from '../types';
import { Wind, Mountain, Bike, Sun, ShieldCheck, Navigation, Compass } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isSelected: boolean;
  onSelect: (prop: Property) => void;
  onFlyTo: (coords: [number, number]) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, isSelected, onSelect, onFlyTo }) => {
  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);
  };

  return (
    <div
      onClick={() => onSelect(property)}
      className={`group relative glass-panel rounded-2xl p-3 cursor-pointer border transition-all duration-200 hover:scale-[1.01] hover:border-amber-400/50 hover:shadow-xl hover:shadow-black/50 ${
        isSelected
          ? 'border-amber-400 bg-slate-900/90 ring-1 ring-amber-400/40 shadow-2xl'
          : 'border-white/10 hover:bg-slate-900/70'
      }`}
    >
      {/* Property Image & Overlay Badges */}
      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 mb-3">
        <img
          src={property.photos[0]}
          alt={property.address}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Oasis Score Pill */}
        <div
          className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold backdrop-blur-md border shadow-lg flex items-center gap-1.5 ${
            property.oasisScore >= 90
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
              : property.oasisScore >= 75
              ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
              : 'bg-red-950/80 text-red-300 border-red-500/40'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{property.oasisScore}</span>
          <span className="text-[10px] text-slate-300 font-normal">Score</span>
        </div>

        {/* Year Built Badge */}
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-mono font-semibold text-amber-300 border border-amber-500/30">
          Built {property.yearBuilt}
        </div>

        {/* 3D Fly-To Shortcut */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFlyTo(property.coordinates);
          }}
          title="Fly to Property in 3D Terrain"
          className="absolute bottom-2.5 right-2.5 p-2 rounded-lg bg-black/70 backdrop-blur-md text-slate-300 hover:text-amber-400 hover:bg-black/90 transition-all border border-white/10 shadow-lg"
        >
          <Navigation className="w-3.5 h-3.5" />
        </button>

        {/* Street View Quick Badge */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] text-sky-300 border border-sky-500/20 flex items-center gap-1">
          <Compass className="w-3 h-3 text-sky-400" />
          <span>Street View</span>
        </div>
      </div>

      {/* Content Details */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {property.address}
            </h4>
            <p className="text-xs text-slate-400 line-clamp-1">
              {property.neighborhood} • {property.city}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="font-display font-extrabold text-base text-amber-400">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>

        {/* Key Specs Row */}
        <div className="flex items-center gap-3 text-xs text-slate-300 font-mono py-1 border-y border-white/5">
          <span>{property.beds} <span className="text-slate-500">bd</span></span>
          <span>•</span>
          <span>{property.baths} <span className="text-slate-500">ba</span></span>
          <span>•</span>
          <span>{property.sqft.toLocaleString()} <span className="text-slate-500">sqft</span></span>
        </div>

        {/* Microclimate Intelligence Chips */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <div
            className={`px-2 py-1 rounded-lg text-[11px] flex items-center gap-1.5 border ${
              property.windExposureScore === 1
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                : property.windExposureScore <= 2
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                : 'bg-red-500/10 text-red-300 border-red-500/20'
            }`}
          >
            <Wind className="w-3 h-3 shrink-0" />
            <span className="truncate">{property.avgWindMph} mph wind</span>
          </div>

          <div className="px-2 py-1 rounded-lg text-[11px] bg-slate-800/80 text-sky-300 border border-sky-500/20 flex items-center gap-1.5">
            <Mountain className="w-3 h-3 shrink-0 text-sky-400" />
            <span className="truncate">{property.foothillDistanceMiles} mi to foothills</span>
          </div>

          <div className="px-2 py-1 rounded-lg text-[11px] bg-slate-800/80 text-amber-300 border border-amber-500/20 flex items-center gap-1.5">
            <Sun className="w-3 h-3 shrink-0 text-amber-400" />
            <span className="truncate">Sunset: {Math.floor(property.mountainShadeHourWinter)}:36 PM</span>
          </div>

          <div className="px-2 py-1 rounded-lg text-[11px] bg-slate-800/80 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
            <Bike className="w-3 h-3 shrink-0 text-emerald-400" />
            <span className="truncate">{property.bikePathDistanceMiles} mi to trail</span>
          </div>
        </div>

        {/* Summary note */}
        <p className="text-[11px] text-slate-400 line-clamp-1 italic pt-1">
          "{property.matchReason}"
        </p>
      </div>
    </div>
  );
};
