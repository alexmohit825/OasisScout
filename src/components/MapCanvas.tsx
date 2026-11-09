import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { Property, BikeRoute, Poi, WindZone } from '../types';
import { Compass, RotateCcw } from 'lucide-react';

interface MapCanvasProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  bikeRoutes: BikeRoute[];
  pois: Poi[];
  windZones: WindZone[];
  showWindOverlay: boolean;
  showBikeOverlay: boolean;
  showPoiOverlay: boolean;
  terrain3D: boolean;
  flyToCoords: [number, number] | null;
  onClearFlyTo: () => void;
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  bikeRoutes,
  pois,
  windZones,
  showWindOverlay,
  showBikeOverlay,
  showPoiOverlay,
  terrain3D: _terrain3D,
  flyToCoords,
  onClearFlyTo
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const poiMarkersRef = useRef<maplibregl.Marker[]>([]);

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Dark cartographic baseline style with open vector/raster fallback
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-116.538, 33.795], // Centered over South Palm Springs leeward pocket
      zoom: 12.2,
      pitch: 52, // 3D perspective angle
      bearing: -28, // Looking directly into Mt. San Jacinto's eastern wall
      attributionControl: false
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-left');

    map.on('load', () => {
      // Add Wind Zones GeoJSON Source & Layer
      const windGeoJson: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: windZones.map((z) => ({
          type: 'Feature',
          properties: {
            id: z.id,
            name: z.name,
            color: z.color,
            risk: z.risk,
            avgSpeed: z.avgSpeedMph
          },
          geometry: {
            type: 'Polygon',
            coordinates: z.coordinates
          }
        }))
      };

      map.addSource('wind-zones', {
        type: 'geojson',
        data: windGeoJson
      });

      map.addLayer({
        id: 'wind-zones-fill',
        type: 'fill',
        source: 'wind-zones',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': showWindOverlay ? 0.28 : 0.0
        }
      });

      map.addLayer({
        id: 'wind-zones-line',
        type: 'line',
        source: 'wind-zones',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 2.5,
          'line-opacity': showWindOverlay ? 0.8 : 0.0,
          'line-dasharray': [2, 1]
        }
      });

      // Add Bike Routes GeoJSON Source & Layer
      const bikeGeoJson: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: bikeRoutes.map((r) => ({
          type: 'Feature',
          properties: {
            id: r.id,
            name: r.name,
            color: r.color,
            category: r.category,
            distance: r.distanceMiles
          },
          geometry: {
            type: 'LineString',
            coordinates: r.coordinates
          }
        }))
      };

      map.addSource('bike-routes', {
        type: 'geojson',
        data: bikeGeoJson
      });

      map.addLayer({
        id: 'bike-routes-line',
        type: 'line',
        source: 'bike-routes',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 4.5,
          'line-opacity': showBikeOverlay ? 0.9 : 0.0
        }
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // 2. Toggle Wind Overlay visibility
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    if (map.getLayer('wind-zones-fill')) {
      map.setPaintProperty('wind-zones-fill', 'fill-opacity', showWindOverlay ? 0.28 : 0.0);
      map.setPaintProperty('wind-zones-line', 'line-opacity', showWindOverlay ? 0.8 : 0.0);
    }
  }, [showWindOverlay]);

  // 3. Toggle Bike Overlay visibility
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    if (map.getLayer('bike-routes-line')) {
      map.setPaintProperty('bike-routes-line', 'line-opacity', showBikeOverlay ? 0.9 : 0.0);
    }
  }, [showBikeOverlay]);

  // 4. Update Property Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing property markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    properties.forEach((prop) => {
      const el = document.createElement('div');
      el.className = 'property-marker-pin group cursor-pointer';

      const isSelected = selectedProperty?.id === prop.id;
      const scoreColor =
        prop.oasisScore >= 90
          ? 'bg-emerald-500 text-black border-emerald-300'
          : prop.oasisScore >= 75
          ? 'bg-amber-500 text-black border-amber-300'
          : 'bg-red-500 text-white border-red-300';

      const priceFormatted = `$${(prop.price / 1000000).toFixed(2)}M`;

      el.innerHTML = `
        <div class="relative flex items-center transition-all duration-300 ${
          isSelected ? 'scale-125 z-30' : 'group-hover:scale-110 z-10'
        }">
          <div class="px-2.5 py-1 rounded-xl bg-slate-900/95 text-white text-xs font-mono font-bold shadow-2xl border ${
            isSelected ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-white/20'
          } flex items-center gap-1.5 backdrop-blur-md">
            <span class="w-2 h-2 rounded-full ${
              prop.windExposureScore === 1 ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
            }"></span>
            <span>${priceFormatted}</span>
            <span class="px-1 py-0.2 rounded text-[9px] font-bold ${scoreColor}">${prop.oasisScore}</span>
          </div>
          <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-slate-900"></div>
        </div>
      `;

      el.addEventListener('click', () => {
        onSelectProperty(prop);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(prop.coordinates)
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [properties, selectedProperty, onSelectProperty]);

  // 5. Update POI Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    poiMarkersRef.current.forEach((m) => m.remove());
    poiMarkersRef.current = [];

    if (!showPoiOverlay) return;

    pois.forEach((poi) => {
      const el = document.createElement('div');
      el.className = 'poi-marker cursor-pointer group';

      const iconBg =
        poi.category === 'fine_dining'
          ? 'bg-amber-500 text-black'
          : poi.category === 'cocktail_lounge'
          ? 'bg-purple-500 text-white'
          : poi.category === 'specialty_coffee'
          ? 'bg-emerald-500 text-black'
          : poi.category === 'luxury_shopping'
          ? 'bg-sky-500 text-white'
          : 'bg-green-600 text-white';

      el.innerHTML = `
        <div class="px-2 py-0.5 rounded-lg ${iconBg} text-[10px] font-bold shadow-lg border border-white/20 flex items-center gap-1 group-hover:scale-110 transition-transform">
          <span>${poi.category === 'trailhead' ? '🥾' : poi.category === 'fine_dining' ? '🍽️' : poi.category === 'specialty_coffee' ? '☕' : '🍸'}</span>
          <span class="max-w-[90px] truncate">${poi.name}</span>
        </div>
      `;

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(poi.coordinates)
        .addTo(map);

      poiMarkersRef.current.push(marker);
    });
  }, [pois, showPoiOverlay]);

  // 6. Handle Fly-To Requests
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !flyToCoords) return;

    map.flyTo({
      center: flyToCoords,
      zoom: 15.5,
      pitch: 65, // Low perspective looking upward toward the mountain ridge
      bearing: -30,
      duration: 2200,
      essential: true
    });

    onClearFlyTo();
  }, [flyToCoords, onClearFlyTo]);

  // Reset Camera View
  const handleResetCamera = () => {
    const map = mapRef.current;
    if (!map) return;

    map.flyTo({
      center: [-116.538, 33.795],
      zoom: 12.2,
      pitch: 52,
      bearing: -28,
      duration: 1800
    });
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />

      {/* Map Floating HUD Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={handleResetCamera}
          title="Reset Mountain Orientation"
          className="p-2.5 rounded-xl glass-panel text-slate-300 hover:text-amber-400 hover:bg-slate-900 transition-all border border-white/10 shadow-xl"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:block">
        <div className="glass-panel rounded-xl p-3 border border-white/10 text-[11px] space-y-1.5 shadow-2xl backdrop-blur-md">
          <div className="font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Topographic Compass
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/80"></span>
            <span>Leeward Wind Shadow (Andreas Hills / South PS)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-3 h-3 rounded bg-red-500/30 border border-red-500/80"></span>
            <span>Gale Corridor (North PS / Escena Wind Trap)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-3 h-1 rounded bg-sky-400"></span>
            <span>CV Link & Scenic Cycling Corridors</span>
          </div>
        </div>
      </div>
    </div>
  );
};
