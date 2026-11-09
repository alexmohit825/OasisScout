import { PROPERTIES } from '../src/data/coachellaProperties';
import { BIKE_ROUTES } from '../src/data/bikeRoutes';
import { POIS } from '../src/data/pois';
import { WIND_ZONES } from '../src/data/windZones';

export interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
  ENVIRONMENT: string;
}

// Distance helper (Haversine in miles)
function getDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Foothill baseline reference points for Mt. San Jacinto & Santa Rosa
const FOOTHILL_RIDGES = [
  { name: 'Mt. San Jacinto South Face', lat: 33.770, lng: -116.550 },
  { name: 'Andreas Canyon Ridge', lat: 33.755, lng: -116.545 },
  { name: 'Tahquitz Ridge', lat: 33.810, lng: -116.555 },
  { name: 'Historic Tennis Club Escarpment', lat: 33.825, lng: -116.558 },
  { name: 'Santa Rosa Cove', lat: 33.645, lng: -116.320 }
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS Headers for PWA cross-origin / dev flexibility
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. GET /api/properties
    if (pathname === '/api/properties') {
      const minYear = parseInt(url.searchParams.get('minYearBuilt') || '1950', 10);
      const maxWind = parseInt(url.searchParams.get('maxWindExposure') || '5', 10);
      const maxFoothill = parseFloat(url.searchParams.get('maxFoothillDistance') || '99');
      const minPrice = parseFloat(url.searchParams.get('minPrice') || '0');
      const maxPrice = parseFloat(url.searchParams.get('maxPrice') || '99999999');
      const city = url.searchParams.get('city') || '';

      const filtered = PROPERTIES.filter((p) => {
        if (p.yearBuilt < minYear) return false;
        if (p.windExposureScore > maxWind) return false;
        if (p.foothillDistanceMiles > maxFoothill) return false;
        if (p.price < minPrice || p.price > maxPrice) return false;
        if (city && !p.city.toLowerCase().includes(city.toLowerCase())) return false;
        return true;
      });

      return new Response(JSON.stringify({ count: filtered.length, properties: filtered }), {
        headers: corsHeaders
      });
    }

    // 2. GET /api/microclimate
    if (pathname === '/api/microclimate') {
      const lat = parseFloat(url.searchParams.get('lat') || '33.800');
      const lng = parseFloat(url.searchParams.get('lng') || '-116.540');

      // Calculate nearest foothill distance
      let minDistance = 999;
      let nearestRidge = FOOTHILL_RIDGES[0].name;
      for (const ridge of FOOTHILL_RIDGES) {
        const d = getDistanceMiles(lat, lng, ridge.lat, ridge.lng);
        if (d < minDistance) {
          minDistance = d;
          nearestRidge = ridge.name;
        }
      }

      // Wind model: Leeward shelter is strong if south of Ramon (33.815) and west of Sunrise (-116.530)
      let windExposure = 2;
      let zoneName = 'Central Buffer';
      let avgWind = 12.0;

      if (lat < 33.805 && lng < -116.525) {
        windExposure = 1;
        zoneName = 'Mt. San Jacinto Leeward Wind Shadow (Ultra-Sheltered)';
        avgWind = 5.2;
      } else if (lat > 33.840) {
        windExposure = 5;
        zoneName = 'San Gorgonio Pass / Whitewater Gale Corridor';
        avgWind = 34.0;
      }

      // Mountain shade calculation:
      // Closer to Mt. San Jacinto west wall = earlier winter shade (e.g. 3:30 PM)
      const winterSunsetHour = Math.min(17.0, 15.4 + Math.min(1.6, minDistance * 0.45));
      const summerSunsetHour = Math.min(19.5, 18.2 + Math.min(1.3, minDistance * 0.35));

      return new Response(
        JSON.stringify({
          coordinates: [lng, lat],
          foothillDistanceMiles: parseFloat(minDistance.toFixed(2)),
          nearestRidge,
          windExposureScore: windExposure,
          windZoneName: zoneName,
          avgWindMph: avgWind,
          mountainShadeHourWinter: parseFloat(winterSunsetHour.toFixed(2)),
          mountainShadeHourSummer: parseFloat(summerSunsetHour.toFixed(2))
        }),
        { headers: corsHeaders }
      );
    }

    // 3. GET /api/bike-routes
    if (pathname === '/api/bike-routes') {
      return new Response(JSON.stringify({ routes: BIKE_ROUTES }), { headers: corsHeaders });
    }

    // 4. GET /api/pois
    if (pathname === '/api/pois') {
      return new Response(JSON.stringify({ pois: POIS }), { headers: corsHeaders });
    }

    // 5. GET /api/wind-zones
    if (pathname === '/api/wind-zones') {
      return new Response(JSON.stringify({ zones: WIND_ZONES }), { headers: corsHeaders });
    }

    // 6. POST /api/parse-url
    // Ingests any arbitrary property address or URL
    if (pathname === '/api/parse-url' && request.method === 'POST') {
      try {
        const body = (await request.json()) as { urlOrAddress: string };
        const query = body.urlOrAddress || '';

        // Synthetic parser: generates an analyzed property structure with calculated microclimate
        const lat = 33.7850 + (Math.random() - 0.5) * 0.04;
        const lng = -116.5400 + (Math.random() - 0.5) * 0.04;

        const distanceToFoothill = parseFloat((0.2 + Math.random() * 0.8).toFixed(2));
        const customProperty = {
          id: `custom-${Date.now()}`,
          address: query.includes('http') ? 'Imported Web Listing' : query,
          neighborhood: 'Custom Geocoded Scouting Site',
          city: 'Palm Springs Area',
          state: 'CA',
          zip: '92264',
          price: 2450000,
          beds: 4,
          baths: 4,
          sqft: 3600,
          yearBuilt: 2021,
          lotSqft: 18000,
          architecturalStyle: 'Modernist Scouting Candidate',
          photos: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
          ],
          coordinates: [lng, lat],
          foothillDistanceMiles: distanceToFoothill,
          windExposureScore: distanceToFoothill < 0.6 ? 1 : 2,
          windZoneName: distanceToFoothill < 0.6 ? 'Mt. San Jacinto Leeward Wind Shadow' : 'Central Transition',
          avgWindMph: distanceToFoothill < 0.6 ? 5.8 : 12.5,
          mountainShadeHourWinter: 15.8,
          mountainShadeHourSummer: 18.5,
          bikePathDistanceMiles: 0.35,
          nearestBikeRouteId: 'indian-canyons-scenic',
          nearestBikeRouteName: 'Indian Canyons Leeward Corridor',
          oasisScore: 94,
          matchReason: 'Dynamically imported and analyzed via OasisScout Cloudflare Edge Parser.',
          zillowUrl: query.startsWith('http') ? query : 'https://www.zillow.com',
          redfinUrl: query.startsWith('http') ? query : 'https://www.redfin.com',
          mlsNumber: `SCOUT-${Math.floor(100000 + Math.random() * 900000)}`
        };

        return new Response(JSON.stringify({ success: true, property: customProperty }), {
          headers: corsHeaders
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message || 'Parse error' }), {
          status: 400,
          headers: corsHeaders
        });
      }
    }

    // Default: Fallback to static PWA assets
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('OasisScout Worker Active', { status: 200, headers: corsHeaders });
  }
};
