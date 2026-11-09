import React, { useState } from 'react';
import { Property } from '../types';
import {
  X,
  Wind,
  Mountain,
  Bike,
  Sun,
  ShieldCheck,
  Compass,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Navigation,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onFlyTo: (coords: [number, number]) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose, onFlyTo }) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'streetview' | 'microclimate' | 'bike'>('photos');
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  if (!property) return null;

  const nextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % property.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev - 1 + property.photos.length) % property.photos.length);
  };

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);
  };

  // Google Street View interactive embed URL
  const streetViewEmbedUrl = `https://maps.google.com/maps?q=&layer=c&cbll=${property.coordinates[1]},${property.coordinates[0]}&cbp=11,0,0,0,0&output=svembed`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] glass-panel-elevated rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
        {/* Top Bar */}
        <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 ${
                property.oasisScore >= 90
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : property.oasisScore >= 75
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-red-500/20 text-red-300 border-red-500/30'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Oasis Score: {property.oasisScore}/100
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              MLS #{property.mlsNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onFlyTo(property.coordinates)}
              title="Fly to Property in 3D Terrain"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 flex items-center gap-1 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D Fly-To</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 border-b border-white/5 flex gap-2 bg-slate-950/40 text-xs">
          <button
            onClick={() => setActiveTab('photos')}
            className={`py-2.5 px-3 font-medium border-b-2 transition-all ${
              activeTab === 'photos'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Photos ({property.photos.length})
          </button>
          <button
            onClick={() => setActiveTab('streetview')}
            className={`py-2.5 px-3 font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'streetview'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            360° Street View
          </button>
          <button
            onClick={() => setActiveTab('microclimate')}
            className={`py-2.5 px-3 font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'microclimate'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wind className="w-3.5 h-3.5 text-emerald-400" />
            Microclimate & Wind Scorecard
          </button>
          <button
            onClick={() => setActiveTab('bike')}
            className={`py-2.5 px-3 font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'bike'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bike className="w-3.5 h-3.5 text-amber-400" />
            Cycling & Trails
          </button>
        </div>

        {/* Main Content Viewport */}
        <div className="flex-1 overflow-y-auto">
          {/* Tab 1: Photos */}
          {activeTab === 'photos' && (
            <div className="relative aspect-video max-h-[460px] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={property.photos[currentPhotoIdx]}
                alt={property.address}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {property.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all border border-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all border border-white/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 text-xs font-mono text-white border border-white/10">
                    {currentPhotoIdx + 1} / {property.photos.length}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tab 2: Interactive 360° Google Street View */}
          {activeTab === 'streetview' && (
            <div className="relative aspect-video max-h-[460px] w-full bg-slate-950">
              <iframe
                title="Google Street View"
                src={streetViewEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-xs text-white border border-white/10 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin" />
                <span>Interactive 360° Panoramic Inspection (Rotate with Mouse / Finger)</span>
              </div>
            </div>
          )}

          {/* Tab 3: Microclimate & Wind Scorecard */}
          {activeTab === 'microclimate' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                    <Wind className="w-4 h-4" />
                    Wind Velocity Rating
                  </div>
                  <div className="text-2xl font-bold font-display text-white">
                    {property.avgWindMph} mph
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {property.windZoneName}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-sky-500/20">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold mb-1">
                    <Mountain className="w-4 h-4" />
                    Foothill Proximity
                  </div>
                  <div className="text-2xl font-bold font-display text-white">
                    {property.foothillDistanceMiles} mi
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Direct distance to Mt. San Jacinto / Santa Rosa ridge
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/20">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                    <Sun className="w-4 h-4" />
                    Winter Pool Sun Cutoff
                  </div>
                  <div className="text-2xl font-bold font-display text-white">
                    {Math.floor(property.mountainShadeHourWinter)}:
                    {Math.round((property.mountainShadeHourWinter % 1) * 60) < 10 ? '0' : ''}
                    {Math.round((property.mountainShadeHourWinter % 1) * 60)} PM
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Mountain ridge sunset shadow (Summer: ~6:30 PM)
                  </div>
                </div>
              </div>

              {/* Assessment Summary */}
              <div
                className={`p-4 rounded-xl border flex gap-3 ${
                  property.windExposureScore === 1
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                    : property.windExposureScore <= 2
                    ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                    : 'bg-red-950/20 border-red-500/30 text-red-200'
                }`}
              >
                {property.windExposureScore <= 2 ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                )}
                <div>
                  <h4 className="font-semibold text-sm mb-1">Microclimate Intelligence Summary</h4>
                  <p className="text-xs opacity-90 leading-relaxed">{property.matchReason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Cycling & Trails */}
          {activeTab === 'bike' && (
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-sky-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-sky-400">Nearest Designated Bike Corridor</span>
                  <h4 className="text-lg font-bold text-white mt-0.5">{property.nearestBikeRouteName}</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Only <strong className="text-white">{property.bikePathDistanceMiles} miles</strong> from front door.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400">
                  <Bike className="w-6 h-6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/40 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">Cycling Safety Grade</span>
                  <span className="text-emerald-400 font-bold">Grade A (Low-traffic / Dedicated Trail)</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/40 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">CV Link Connectivity</span>
                  <span className="text-white font-bold">Direct Access Corridor</span>
                </div>
              </div>
            </div>
          )}

          {/* Property Header & Key Specs */}
          <div className="p-5 border-t border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display font-bold text-xl text-white">{property.address}</h3>
                <p className="text-xs text-slate-400">
                  {property.neighborhood} • {property.city}, {property.state} {property.zip}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="font-display font-extrabold text-2xl text-amber-400">
                  {formatPrice(property.price)}
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  ${Math.round(property.price / property.sqft)}/sqft
                </span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-white/5 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Year Built</span>
                <span className="font-display font-bold text-base text-amber-300">{property.yearBuilt}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-white/5 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Bedrooms / Baths</span>
                <span className="font-display font-bold text-base text-white">
                  {property.beds} Bed • {property.baths} Bath
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-white/5 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Living Space</span>
                <span className="font-display font-bold text-base text-white">
                  {property.sqft.toLocaleString()} sqft
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-white/5 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Style</span>
                <span className="font-display font-semibold text-xs text-slate-200 line-clamp-1 mt-1">
                  {property.architecturalStyle}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-white/10 bg-slate-900/70 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 hidden sm:block">
            Verified California Desert MLS Syndicate Listing
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={property.redfinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-600/20 text-red-300 border border-red-500/40 hover:bg-red-600/30 flex items-center justify-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View on Redfin
            </a>
            <a
              href={property.zillowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600/20 text-blue-300 border border-blue-500/40 hover:bg-blue-600/30 flex items-center justify-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View on Zillow
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
