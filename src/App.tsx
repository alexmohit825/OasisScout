import { useState, useMemo } from 'react';
import { Property, FilterState } from './types';
import { PROPERTIES } from './data/coachellaProperties';
import { BIKE_ROUTES } from './data/bikeRoutes';
import { POIS } from './data/pois';
import { WIND_ZONES } from './data/windZones';
import { Navbar } from './components/Navbar';
import { MapCanvas } from './components/MapCanvas';
import { PropertyCard } from './components/PropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { FilterToolbar } from './components/FilterToolbar';
import { BikeRoutesModal } from './components/BikeRoutesModal';
import { ScoutUrlModal } from './components/ScoutUrlModal';
import { Mountain, ShieldCheck } from 'lucide-react';

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  minYearBuilt: 2018, // Default to newer builds
  minPrice: 0,
  maxPrice: 10000000,
  minBeds: 0,
  minBaths: 0,
  maxWindExposure: 2, // Default to sheltered / light breeze (excludes high wind)
  maxFoothillDistance: 1.5, // Foothill close
  maxBikeDistance: 1.5,
  showWindOverlay: true,
  showBikeOverlay: true,
  showPoiOverlay: true,
  terrain3D: true,
  timeOfDayHour: 15.75, // 3:45 PM winter sunset shadow
  season: 'winter'
};

export function App() {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [activePreset, setActivePreset] = useState<string>('least-wind');

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBikeModalOpen, setIsBikeModalOpen] = useState(false);
  const [isScoutModalOpen, setIsScoutModalOpen] = useState(false);
  const [flyToCoords, setFlyToCoords] = useState<[number, number] | null>(null);

  // Mobile drawer toggle
  const [mobileTab, setMobileTab] = useState<'map' | 'listings'>('map');

  // Filter properties based on active criteria
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesAddress = prop.address.toLowerCase().includes(q);
        const matchesCity = prop.city.toLowerCase().includes(q);
        const matchesNeighborhood = prop.neighborhood.toLowerCase().includes(q);
        if (!matchesAddress && !matchesCity && !matchesNeighborhood) return false;
      }

      // Year built
      if (prop.yearBuilt < filters.minYearBuilt) return false;

      // Wind tolerance (1 = calmest leeward, 5 = any)
      if (prop.windExposureScore > filters.maxWindExposure) return false;

      // Foothill distance
      if (filters.maxFoothillDistance < 5 && prop.foothillDistanceMiles > filters.maxFoothillDistance) {
        return false;
      }

      // Bike path distance
      if (filters.maxBikeDistance < 3 && prop.bikePathDistanceMiles > filters.maxBikeDistance) {
        return false;
      }

      // Price range
      if (prop.price < filters.minPrice || prop.price > filters.maxPrice) return false;

      return true;
    });
  }, [properties, filters]);

  // Handle preset selection
  const handleSelectPreset = (preset: string) => {
    setActivePreset(preset);
    if (preset === 'least-wind') {
      setFilters((prev) => ({
        ...prev,
        maxWindExposure: 1, // Only level 1 leeward pocket
        maxFoothillDistance: 0.8,
        minYearBuilt: 2018
      }));
    } else if (preset === 'newer-builds') {
      setFilters((prev) => ({
        ...prev,
        minYearBuilt: 2020,
        maxWindExposure: 2,
        maxFoothillDistance: 3.0
      }));
    } else if (preset === 'bike-haven') {
      setFilters((prev) => ({
        ...prev,
        maxBikeDistance: 0.5,
        maxWindExposure: 3
      }));
    } else {
      // All
      setFilters((prev) => ({
        ...prev,
        minYearBuilt: 1950,
        maxWindExposure: 5,
        maxFoothillDistance: 5.0,
        maxBikeDistance: 3.0
      }));
    }
  };

  const handleUpdateFilters = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setActivePreset('least-wind');
  };

  const handleFlyTo = (coords: [number, number]) => {
    setFlyToCoords(coords);
    setMobileTab('map');
  };

  const handlePropertyScouted = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
    setSelectedProperty(newProp);
    setFlyToCoords(newProp.coordinates);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0B0F17]">
      {/* 1. Header Bar */}
      <Navbar
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleUpdateFilters({ searchQuery: q })}
        onOpenFilters={() => setIsFilterOpen(true)}
        onOpenScoutModal={() => setIsScoutModalOpen(true)}
        onOpenBikeModal={() => setIsBikeModalOpen(true)}
        activePreset={activePreset}
        onSelectPreset={handleSelectPreset}
        filteredCount={filteredProperties.length}
      />

      {/* 2. Main Viewport Area (Split Screen on Desktop, Tabbed on Mobile) */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Left Side: 3D Terrain & Map Canvas */}
        <div
          className={`flex-1 h-full relative transition-opacity duration-200 ${
            mobileTab === 'listings' ? 'hidden md:block' : 'block'
          }`}
        >
          <MapCanvas
            properties={filteredProperties}
            selectedProperty={selectedProperty}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            bikeRoutes={BIKE_ROUTES}
            pois={POIS}
            windZones={WIND_ZONES}
            showWindOverlay={filters.showWindOverlay}
            showBikeOverlay={filters.showBikeOverlay}
            showPoiOverlay={filters.showPoiOverlay}
            terrain3D={filters.terrain3D}
            flyToCoords={flyToCoords}
            onClearFlyTo={() => setFlyToCoords(null)}
          />

          {/* Floating Mobile Tab Switcher */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 md:hidden flex items-center p-1 rounded-full bg-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-md">
            <button
              onClick={() => setMobileTab('map')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                mobileTab === 'map' ? 'bg-amber-500 text-black shadow' : 'text-slate-400'
              }`}
            >
              3D Map
            </button>
            <button
              onClick={() => setMobileTab('listings')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                mobileTab === 'listings' ? 'bg-amber-500 text-black shadow' : 'text-slate-400'
              }`}
            >
              Listings ({filteredProperties.length})
            </button>
          </div>
        </div>

        {/* Right Side: Property Listings Drawer */}
        <div
          className={`w-full md:w-[440px] lg:w-[480px] h-full glass-panel border-l border-white/10 flex flex-col z-20 shrink-0 ${
            mobileTab === 'map' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Drawer Top Stats */}
          <div className="p-4 border-b border-white/10 bg-slate-900/50 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-white">
                  {filteredProperties.length} Matching Homes
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                  Coachella Valley
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Filtered for least wind & foothill leeward orientation
              </p>
            </div>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4"
            >
              Tune
            </button>
          </div>

          {/* Quick Notice Banner on Escena / Wind Corridor Trap */}
          <div className="mx-4 my-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex gap-2.5 items-start">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-amber-300">Microclimate Insight:</strong> Homes in South Palm Springs (Andreas Hills, Indian Canyons) average <strong>5-8 mph</strong> leeward breezes under Mt. San Jacinto, compared to <strong>35-50+ mph</strong> gale funnels in North PS / Escena.
            </p>
          </div>

          {/* Scrollable Property Cards */}
          <div className="flex-1 overflow-y-auto px-4 pb-16 md:pb-4 space-y-3.5">
            {filteredProperties.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Mountain className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="font-display font-semibold text-slate-300">No properties match your exact filters</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Try relaxing the Year Built slider (to include classic 1960s Mid-Century remodels) or expand the wind tolerance.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:brightness-110 transition-all"
                >
                  Reset Parameters
                </button>
              </div>
            ) : (
              filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isSelected={selectedProperty?.id === prop.id}
                  onSelect={(p) => setSelectedProperty(p)}
                  onFlyTo={handleFlyTo}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* 3. Deep Property Visual Inspector Modal (Photo Carousel & Google Street View 360) */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onFlyTo={handleFlyTo}
      />

      {/* 4. Sliding Parameter Drawer */}
      <FilterToolbar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onChange={handleUpdateFilters}
        onReset={handleResetFilters}
      />

      {/* 5. Coachella Valley Iconic Bike Rides Modal */}
      <BikeRoutesModal
        isOpen={isBikeModalOpen}
        onClose={() => setIsBikeModalOpen(false)}
        routes={BIKE_ROUTES}
        onFlyToRoute={handleFlyTo}
      />

      {/* 6. Universal Scout URL / Address Importer */}
      <ScoutUrlModal
        isOpen={isScoutModalOpen}
        onClose={() => setIsScoutModalOpen(false)}
        onPropertyScouted={handlePropertyScouted}
      />
    </div>
  );
}

export default App;
