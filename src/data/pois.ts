import { Poi } from '../types';

export const POIS: Poi[] = [
  // Fine Dining
  {
    id: 'bar-cecil',
    name: 'Bar Cecil',
    category: 'fine_dining',
    neighborhood: 'South Palm Springs',
    address: '1555 S Palm Canyon Dr, Palm Springs',
    coordinates: [-116.5410, 33.8015],
    rating: 4.9,
    priceLevel: '$$$$',
    tagline: 'Iconic mid-century bistro homage to Cecil Beaton. World-class cocktails & prime steaks.'
  },
  {
    id: 'workshop-kitchen',
    name: 'Workshop Kitchen + Bar',
    category: 'fine_dining',
    neighborhood: 'Uptown Design District',
    address: '800 N Palm Canyon Dr, Palm Springs',
    coordinates: [-116.5468, 33.8340],
    rating: 4.8,
    priceLevel: '$$$$',
    tagline: 'James Beard Award-winning brutalist concrete architecture with farm-to-table culinary brilliance.'
  },
  {
    id: 'le-vallauris',
    name: 'Le Vallauris',
    category: 'fine_dining',
    neighborhood: 'Historic Tennis Club',
    address: '385 W Tahquitz Canyon Way, Palm Springs',
    coordinates: [-116.5492, 33.8235],
    rating: 4.9,
    priceLevel: '$$$$',
    tagline: 'Grand French culinary landmark with romantic tree-shaded courtyard dining tucked under the mountain.'
  },
  {
    id: 'mastros-steakhouse',
    name: "Mastro's Steakhouse",
    category: 'fine_dining',
    neighborhood: 'El Paseo, Palm Desert',
    address: '73405 El Paseo, Palm Desert',
    coordinates: [-116.3880, 33.7200],
    rating: 4.8,
    priceLevel: '$$$$',
    tagline: 'High-energy luxury dining, prime steaks, seafood towers & live piano lounge.'
  },

  // Cocktail Lounges
  {
    id: 'seymours',
    name: "Seymour's",
    category: 'cocktail_lounge',
    neighborhood: 'South Palm Springs',
    address: '233 E Palm Canyon Dr, Palm Springs',
    coordinates: [-116.5395, 33.7995],
    rating: 4.8,
    priceLevel: '$$$',
    tagline: 'Moody speakeasy hidden behind Mr. Lyons. Velvet booths and bespoke craft mixology.'
  },
  {
    id: 'bootlegger-tiki',
    name: 'Bootlegger Tiki',
    category: 'cocktail_lounge',
    neighborhood: 'Uptown Design District',
    address: '1101 N Palm Canyon Dr, Palm Springs',
    coordinates: [-116.5460, 33.8395],
    rating: 4.7,
    priceLevel: '$$$',
    tagline: 'Legendary subterranean rum den located on the original 1953 Don the Beachcomber site.'
  },

  // Specialty Coffee
  {
    id: 'koffi-south',
    name: 'Koffi South (Mountain Garden)',
    category: 'specialty_coffee',
    neighborhood: 'South Palm Springs',
    address: '1700 S Camino Real, Palm Springs',
    coordinates: [-116.5380, 33.7980],
    rating: 4.8,
    priceLevel: '$$',
    tagline: 'Roastery with expansive grassy courtyard boasting uninterrupted vistas of Mt. San Jacinto.'
  },
  {
    id: 'cartel-roasting',
    name: 'Cartel Roasting Co.',
    category: 'specialty_coffee',
    neighborhood: 'Araby / Deepwell Gateway',
    address: '1551 E Palm Canyon Dr, Palm Springs',
    coordinates: [-116.5260, 33.8010],
    rating: 4.7,
    priceLevel: '$$',
    tagline: 'Single-origin precision roasters situated inside the historic mid-century modern Ace Hotel.'
  },

  // Luxury Shopping
  {
    id: 'uptown-design-district',
    name: 'Uptown Design District',
    category: 'luxury_shopping',
    neighborhood: 'Uptown Palm Springs',
    address: 'N Palm Canyon Dr (Amado to Vista Chino)',
    coordinates: [-116.5465, 33.8360],
    rating: 4.9,
    priceLevel: '$$$$',
    tagline: 'Curated 2-mile promenade of vintage modernist galleries, interior ateliers, and chic boutiques.'
  },
  {
    id: 'el-paseo-shopping',
    name: 'The Gardens on El Paseo',
    category: 'luxury_shopping',
    neighborhood: 'Palm Desert',
    address: '73545 El Paseo, Palm Desert',
    coordinates: [-116.3860, 33.7190],
    rating: 4.9,
    priceLevel: '$$$$',
    tagline: 'The "Rodeo Drive of the Desert" featuring Gucci, Saks Fifth Avenue, Tiffany & Co., and art galleries.'
  },

  // Hiking Trailheads
  {
    id: 'lykken-trail-south',
    name: 'South Lykken Trailhead',
    category: 'trailhead',
    neighborhood: 'Andreas Hills Foothills',
    address: 'South Palm Canyon Dr (near Mesquite Ave)',
    coordinates: [-116.5440, 33.7930],
    rating: 4.9,
    priceLevel: 'Free',
    tagline: 'Rigorous foothill switchbacks climbing 1,000 ft directly above the leeward Palm Springs basin.'
  },
  {
    id: 'tahquitz-canyon-trailhead',
    name: 'Tahquitz Canyon & 60-Ft Waterfall',
    category: 'trailhead',
    neighborhood: 'Tahquitz Foothills',
    address: '500 W Mesquite Ave, Palm Springs',
    coordinates: [-116.5480, 33.8090],
    rating: 4.9,
    priceLevel: '$$',
    tagline: 'Sacred Agua Caliente canyon leading to a dramatic 60-foot seasonal desert waterfall.'
  }
];
