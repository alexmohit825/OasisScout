import { Property } from '../types';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-andreas-hills-01',
    address: '2480 Sridge Way',
    neighborhood: 'Andreas Hills (The Wind Shadow)',
    city: 'Palm Springs',
    state: 'CA',
    zip: '92264',
    price: 3650000,
    beds: 4,
    baths: 5,
    sqft: 4420,
    yearBuilt: 2021,
    lotSqft: 22650,
    architecturalStyle: 'Desert Contemporary Modernist',
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80'
    ],
    coordinates: [-116.5420, 33.7745],
    foothillDistanceMiles: 0.18, // Practically touches Mt. San Jacinto
    windExposureScore: 1, // Ultra-sheltered leeward pocket
    windZoneName: 'Mt. San Jacinto Leeward Wind Shadow',
    avgWindMph: 4.8,
    mountainShadeHourWinter: 15.6, // 3:36 PM mountain shadow
    mountainShadeHourSummer: 18.4, // 6:24 PM mountain shadow
    bikePathDistanceMiles: 0.25,
    nearestBikeRouteId: 'indian-canyons-scenic',
    nearestBikeRouteName: 'Indian Canyons Leeward Corridor',
    oasisScore: 98,
    matchReason: 'Top-tier match: 2021 modern construction built right at the mountain base with near-zero wind exposure and immediate access to the Indian Canyons bike corridor.',
    zillowUrl: 'https://www.zillow.com/homes/Palm-Springs-CA-92264_rb/',
    redfinUrl: 'https://www.redfin.com/city/14233/CA/Palm-Springs',
    mlsNumber: 'CDAR2400981'
  },
  {
    id: 'prop-linea-south-02',
    address: '1410 Linea Way',
    neighborhood: 'Linea Enclave (South Palm Springs)',
    city: 'Palm Springs',
    state: 'CA',
    zip: '92264',
    price: 2985000,
    beds: 4,
    baths: 5,
    sqft: 4890,
    yearBuilt: 2020,
    lotSqft: 20000,
    architecturalStyle: 'Minimalist Architectural Masterpiece',
    photos: [
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1600&q=80'
    ],
    coordinates: [-116.5385, 33.7840],
    foothillDistanceMiles: 0.45,
    windExposureScore: 1,
    windZoneName: 'Mt. San Jacinto Leeward Wind Shadow',
    avgWindMph: 5.5,
    mountainShadeHourWinter: 15.8, // 3:48 PM
    mountainShadeHourSummer: 18.6,
    bikePathDistanceMiles: 0.40,
    nearestBikeRouteId: 'indian-canyons-scenic',
    nearestBikeRouteName: 'Indian Canyons Leeward Corridor',
    oasisScore: 96,
    matchReason: 'Pristine 2020 minimalist estate designed by Hugh Kaptur collaborator. Floor-to-ceiling glass sheltered from desert crosswinds.',
    zillowUrl: 'https://www.zillow.com/homes/Palm-Springs-CA-92264_rb/',
    redfinUrl: 'https://www.redfin.com/city/14233/CA/Palm-Springs',
    mlsNumber: 'CDAR2401124'
  },
  {
    id: 'prop-skye-central-03',
    address: '422 Skye Crest Dr',
    neighborhood: 'Skye Enclave (Old Las Palmas Adjacent)',
    city: 'Palm Springs',
    state: 'CA',
    zip: '92262',
    price: 3350000,
    beds: 3,
    baths: 4,
    sqft: 3980,
    yearBuilt: 2018,
    lotSqft: 14500,
    architecturalStyle: 'Mid-Century Reimagined Modern',
    photos: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'
    ],
    coordinates: [-116.5480, 33.8290],
    foothillDistanceMiles: 0.32,
    windExposureScore: 2, // Mild transition zone
    windZoneName: 'Central Palm Springs (Transitional Buffer Zone)',
    avgWindMph: 12.0,
    mountainShadeHourWinter: 15.5, // 3:30 PM
    mountainShadeHourSummer: 18.2,
    bikePathDistanceMiles: 0.30,
    nearestBikeRouteId: 'midcentury-architecture-loop',
    nearestBikeRouteName: 'Mid-Century Modern Landmark Tour',
    oasisScore: 91,
    matchReason: 'Rare newer build (2018) right in the Historic Tennis Club / Old Las Palmas corridor. Walk to Uptown dining, low wind.',
    zillowUrl: 'https://www.zillow.com/homes/Palm-Springs-CA-92262_rb/',
    redfinUrl: 'https://www.redfin.com/city/14233/CA/Palm-Springs',
    mlsNumber: 'CDAR2400589'
  },
  {
    id: 'prop-indian-canyons-04',
    address: '1090 Apache Rd',
    neighborhood: 'Indian Canyons Golf Resort',
    city: 'Palm Springs',
    state: 'CA',
    zip: '92264',
    price: 2475000,
    beds: 4,
    baths: 4,
    sqft: 3650,
    yearBuilt: 2019,
    lotSqft: 16500,
    architecturalStyle: 'Palm Springs Modern Organic',
    photos: [
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1600&q=80'
    ],
    coordinates: [-116.5310, 33.7880],
    foothillDistanceMiles: 0.65,
    windExposureScore: 1,
    windZoneName: 'Mt. San Jacinto Leeward Wind Shadow',
    avgWindMph: 6.2,
    mountainShadeHourWinter: 16.1, // 4:06 PM - slightly more afternoon sun
    mountainShadeHourSummer: 18.8,
    bikePathDistanceMiles: 0.15,
    nearestBikeRouteId: 'indian-canyons-scenic',
    nearestBikeRouteName: 'Indian Canyons Leeward Corridor',
    oasisScore: 95,
    matchReason: 'Fairway frontage on South Course. Perfect balance of late afternoon sun before mountain shadow, ultra-sheltered breeze.',
    zillowUrl: 'https://www.zillow.com/homes/Palm-Springs-CA-92264_rb/',
    redfinUrl: 'https://www.redfin.com/city/14233/CA/Palm-Springs',
    mlsNumber: 'CDAR2402341'
  },
  {
    id: 'prop-rancho-mirage-05',
    address: '71250 Clancy Ln',
    neighborhood: 'Clancy Lane Luxury Corridor',
    city: 'Rancho Mirage',
    state: 'CA',
    zip: '92270',
    price: 4100000,
    beds: 5,
    baths: 6,
    sqft: 5800,
    yearBuilt: 2022,
    lotSqft: 43560, // 1 Full Acre
    architecturalStyle: 'Contemporary Desert Compound',
    photos: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    coordinates: [-116.4180, 33.7550],
    foothillDistanceMiles: 1.10,
    windExposureScore: 1, // Sheltered by Santa Rosa orientation
    windZoneName: 'Santa Rosa Leeward Shield',
    avgWindMph: 5.0,
    mountainShadeHourWinter: 16.7, // 4:42 PM - Extra hour of golden sun!
    mountainShadeHourSummer: 19.3,
    bikePathDistanceMiles: 0.35,
    nearestBikeRouteId: 'cv-link-whitewater',
    nearestBikeRouteName: 'CV Link (Regional Multi-Use Expressway)',
    oasisScore: 94,
    matchReason: 'Full 1-acre private equestrian/modern estate. Solves the Palm Springs early sunset problem with 75 more minutes of golden hour sunshine.',
    zillowUrl: 'https://www.zillow.com/homes/Rancho-Mirage-CA_rb/',
    redfinUrl: 'https://www.redfin.com/city/15312/CA/Rancho-Mirage',
    mlsNumber: 'CDAR2404012'
  },
  {
    id: 'prop-la-quinta-cove-06',
    address: '54200 Avenida Obregon',
    neighborhood: 'Santa Rosa Foothill Cove',
    city: 'La Quinta',
    state: 'CA',
    zip: '92253',
    price: 1895000,
    beds: 3,
    baths: 3,
    sqft: 2850,
    yearBuilt: 2021,
    lotSqft: 11000,
    architecturalStyle: 'Modern Spanish Revival',
    photos: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
    ],
    coordinates: [-116.3120, 33.6520],
    foothillDistanceMiles: 0.12, // Literally surrounded by the Santa Rosa cove
    windExposureScore: 1,
    windZoneName: 'Santa Rosa Mountain Bowl',
    avgWindMph: 4.0,
    mountainShadeHourWinter: 16.3,
    mountainShadeHourSummer: 19.1,
    bikePathDistanceMiles: 0.50,
    nearestBikeRouteId: 'la-quinta-cahuilla-loop',
    nearestBikeRouteName: 'Santa Rosa Foothills & Lake Cahuilla Loop',
    oasisScore: 93,
    matchReason: 'Nestled deep in the 3-sided mountain bowl of the La Quinta Cove. Completely protected from wind, superb road cycling routes nearby.',
    zillowUrl: 'https://www.zillow.com/homes/La-Quinta-CA_rb/',
    redfinUrl: 'https://www.redfin.com/city/9912/CA/La-Quinta',
    mlsNumber: 'CDAR2401876'
  },
  {
    id: 'prop-escena-wind-trap-07',
    address: '4331 Clubhouse Dr',
    neighborhood: 'Escena Golf Club (The Wind Corridor)',
    city: 'Palm Springs',
    state: 'CA',
    zip: '92262',
    price: 1650000,
    beds: 3,
    baths: 3,
    sqft: 2750,
    yearBuilt: 2022,
    lotSqft: 8500,
    architecturalStyle: 'Desert Modern Golf Villa',
    photos: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    coordinates: [-116.4950, 33.8420],
    foothillDistanceMiles: 3.40, // Far out in the open valley
    windExposureScore: 5, // SEVERE WIND CORRIDOR
    windZoneName: 'San Gorgonio Pass / Whitewater Gale Corridor (Severe)',
    avgWindMph: 32.5,
    mountainShadeHourWinter: 17.0, // Long sun, but intense wind
    mountainShadeHourSummer: 19.5,
    bikePathDistanceMiles: 1.80,
    nearestBikeRouteId: 'cv-link-whitewater',
    nearestBikeRouteName: 'CV Link (Regional Multi-Use Expressway)',
    oasisScore: 48, // Low Oasis score due to high wind despite newer build!
    matchReason: 'WARNING (Microclimate Penalty): Gorgeous 2022 modern build on the golf course, but situated directly in the Whitewater wind funnel. Frequent 45-60 mph sand gusts.',
    zillowUrl: 'https://www.zillow.com/homes/Palm-Springs-CA-92262_rb/',
    redfinUrl: 'https://www.redfin.com/city/14233/CA/Palm-Springs',
    mlsNumber: 'CDAR2403198'
  }
];
