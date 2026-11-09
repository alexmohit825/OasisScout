import { BikeRoute } from '../types';

export const BIKE_ROUTES: BikeRoute[] = [
  {
    id: 'indian-canyons-scenic',
    name: 'Indian Canyons Leeward Corridor',
    category: 'scenic_cruise',
    distanceMiles: 8.4,
    elevationGainFt: 340,
    difficulty: 'Easy',
    surface: 'Smooth Asphalt / Wide Paved Shoulder',
    description: 'The crown jewel of Palm Springs cruising. Glides through Andreas Hills directly into the ancient palm oases of Murray & Andreas Canyons under the wind shadow.',
    color: '#10B981', // Emerald
    coordinates: [
      [-116.5445, 33.7990],
      [-116.5450, 33.7910],
      [-116.5430, 33.7820],
      [-116.5390, 33.7710],
      [-116.5360, 33.7620],
      [-116.5385, 33.7540],
      [-116.5350, 33.7430]
    ],
    highlights: ['Wind-sheltered basin', 'Towering California Fan Palms', 'Minimal cross-traffic', 'Andreas Hills architecture']
  },
  {
    id: 'cv-link-whitewater',
    name: 'CV Link (Regional Multi-Use Expressway)',
    category: 'road_endurance',
    distanceMiles: 16.2,
    elevationGainFt: 210,
    difficulty: 'Moderate',
    surface: 'Dedicated Grade-Separated Concrete/Pave',
    description: 'The Coachella Valley dual-path artery. Separated completely from vehicular traffic, providing uninterrupted cruising from Palm Springs through Cathedral City and Rancho Mirage.',
    color: '#38BDF8', // Sky Blue
    coordinates: [
      [-116.5180, 33.8280],
      [-116.5020, 33.8210],
      [-116.4850, 33.8120],
      [-116.4630, 33.7940],
      [-116.4350, 33.7720],
      [-116.4100, 33.7530]
    ],
    highlights: ['Zero cars/grade crossings', 'Electric bike friendly', 'Direct valley connectivity', 'Panoramic mountain vistas']
  },
  {
    id: 'midcentury-architecture-loop',
    name: 'Mid-Century Modern Landmark Tour',
    category: 'scenic_cruise',
    distanceMiles: 11.5,
    elevationGainFt: 180,
    difficulty: 'Easy',
    surface: 'Quiet Tree-Lined Residential Streets',
    description: 'Meanders through Twin Palms, Deepwell, and Vista Las Palmas past original William Krisel, Donald Wexler, and Richard Neutra desert masterworks.',
    color: '#F59E0B', // Amber
    coordinates: [
      [-116.5360, 33.7920],
      [-116.5250, 33.7940],
      [-116.5210, 33.8050],
      [-116.5380, 33.8070],
      [-116.5480, 33.8250],
      [-116.5560, 33.8340],
      [-116.5510, 33.8420],
      [-116.5410, 33.8360],
      [-116.5360, 33.7920]
    ],
    highlights: ['Kaufmann Desert House', 'Twin Palms estates', 'Deepwell canopy trees', 'Elvis Honeymoon hideaway']
  },
  {
    id: 'tramway-hc-climb',
    name: 'Palm Springs Aerial Tramway HC Ascent',
    category: 'hc_climb',
    distanceMiles: 3.8,
    elevationGainFt: 1980,
    difficulty: 'Expert',
    surface: 'Paved Mountain Highway',
    description: 'Southern California’s premier Hors Catégorie road climb. Ramps averaging 10% to 14% grade up Chino Canyon to the Tramway Valley Station.',
    color: '#EF4444', // Red
    coordinates: [
      [-116.5650, 33.8560],
      [-116.5780, 33.8540],
      [-116.5920, 33.8500],
      [-116.6080, 33.8440],
      [-116.6180, 33.8380]
    ],
    highlights: ['1,980 ft vertical ascent', 'Average 10.4% grade', 'Chino Canyon gorge', 'Epic valley floor overlook']
  },
  {
    id: 'la-quinta-cahuilla-loop',
    name: 'Santa Rosa Foothills & Lake Cahuilla Loop',
    category: 'road_endurance',
    distanceMiles: 14.8,
    elevationGainFt: 420,
    difficulty: 'Moderate',
    surface: 'Dedicated Bike Lanes & Low-Traffic Desert Roads',
    description: 'Rides hugging the jagged purple rock face of the Santa Rosa Mountains past PGA West, citrus groves, and Lake Cahuilla recreation area.',
    color: '#8B5CF6', // Purple
    coordinates: [
      [-116.3050, 33.6720],
      [-116.3150, 33.6550],
      [-116.3300, 33.6380],
      [-116.3450, 33.6150],
      [-116.3380, 33.6020],
      [-116.3050, 33.6200],
      [-116.2900, 33.6500],
      [-116.3050, 33.6720]
    ],
    highlights: ['Zero wind pocket', 'PGA West tournament greens', 'Desert lake views', 'Silky asphalt']
  }
];
