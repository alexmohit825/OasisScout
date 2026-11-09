export type WindRisk = 'calm_leeward' | 'moderate_breeze' | 'gale_funnel';

export interface Property {
  id: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  lotSqft: number;
  architecturalStyle: string;
  photos: string[];
  coordinates: [number, number]; // [lng, lat]
  
  // Microclimate & Topographic Attributes
  foothillDistanceMiles: number; // Distance to mountain base
  windExposureScore: number;     // 1 (Dead calm leeward shelter) to 5 (Severe gale wind corridor)
  windZoneName: string;
  avgWindMph: number;
  mountainShadeHourWinter: number; // E.g., 15.75 = 3:45 PM sunset behind Mt. San Jacinto
  mountainShadeHourSummer: number; // E.g., 18.25 = 6:15 PM sunset behind peak
  
  // Lifestyle & Cycling
  bikePathDistanceMiles: number;
  nearestBikeRouteId: string;
  nearestBikeRouteName: string;
  
  // Overall Composite Score (0 - 100)
  oasisScore: number;
  matchReason: string;
  
  // External Portals
  zillowUrl: string;
  redfinUrl: string;
  mlsNumber: string;
}

export type BikeCategory = 'scenic_cruise' | 'road_endurance' | 'hc_climb' | 'gravel_wash';

export interface BikeRoute {
  id: string;
  name: string;
  category: BikeCategory;
  distanceMiles: number;
  elevationGainFt: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  surface: string;
  description: string;
  color: string;
  coordinates: [number, number][]; // [lng, lat] polyline
  highlights: string[];
}

export type PoiCategory = 'fine_dining' | 'cocktail_lounge' | 'specialty_coffee' | 'luxury_shopping' | 'trailhead';

export interface Poi {
  id: string;
  name: string;
  category: PoiCategory;
  neighborhood: string;
  address: string;
  coordinates: [number, number];
  rating: number;
  priceLevel: string;
  tagline: string;
}

export interface WindZone {
  id: string;
  name: string;
  risk: WindRisk;
  avgSpeedMph: number;
  peakGustMph: number;
  color: string;
  description: string;
  coordinates: [number, number][][]; // Polygon rings
}

export interface FilterState {
  searchQuery: string;
  minYearBuilt: number;
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  minBaths: number;
  maxWindExposure: number; // 1 to 5
  maxFoothillDistance: number; // miles
  maxBikeDistance: number; // miles
  
  // Layer Toggles
  showWindOverlay: boolean;
  showBikeOverlay: boolean;
  showPoiOverlay: boolean;
  terrain3D: boolean;
  
  // Mountain Shade Simulation
  timeOfDayHour: number; // 9.0 to 18.0
  season: 'winter' | 'summer';
}
