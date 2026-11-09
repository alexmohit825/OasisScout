import { WindZone } from '../types';

export const WIND_ZONES: WindZone[] = [
  {
    id: 'leeward-shadow',
    name: 'Mt. San Jacinto Leeward Wind Shadow (Ultra-Sheltered)',
    risk: 'calm_leeward',
    avgSpeedMph: 6,
    peakGustMph: 14,
    color: '#10B981', // Emerald
    description: 'Shielded by the 10,834-ft sheer wall of Mt. San Jacinto. Highest outdoor livability, tranquil pools, zero sand scouring.',
    coordinates: [[
      [-116.565, 33.770],
      [-116.515, 33.770],
      [-116.520, 33.820],
      [-116.555, 33.820],
      [-116.570, 33.795],
      [-116.565, 33.770]
    ]]
  },
  {
    id: 'central-transitional',
    name: 'Central Palm Springs (Transitional Buffer Zone)',
    risk: 'moderate_breeze',
    avgSpeedMph: 15,
    peakGustMph: 28,
    color: '#F59E0B', // Amber
    description: 'Moderate breeze corridor. Downtown & Uptown transition area. Occasional breezy afternoons during spring cold fronts.',
    coordinates: [[
      [-116.555, 33.820],
      [-116.510, 33.820],
      [-116.505, 33.855],
      [-116.550, 33.855],
      [-116.555, 33.820]
    ]]
  },
  {
    id: 'gale-corridor',
    name: 'San Gorgonio Pass / Whitewater Gale Corridor (Severe)',
    risk: 'gale_funnel',
    avgSpeedMph: 38,
    peakGustMph: 68,
    color: '#EF4444', // Red
    description: 'High-velocity wind tunnel funneled through the San Gorgonio Pass. Frequent sandstorms, flying patio umbrellas, blowing dust.',
    coordinates: [[
      [-116.560, 33.855],
      [-116.470, 33.855],
      [-116.460, 33.930],
      [-116.570, 33.930],
      [-116.560, 33.855]
    ]]
  }
];
