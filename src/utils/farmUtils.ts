import { Farm } from '../types';
import { Coordinates } from './locationUtils';

const DEFAULT_FARM: Farm = {
  id: 'saskatoon-farm',
  name: 'The Saskatoon Farm',
  location: {
    latitude: 50.9171,
    longitude: -106.6338,
  },
  size: 240,
  crops: [
    {
      id: '1',
      name: 'Saskatoon Berries',
      type: 'Berry',
      plantingDate: new Date('2024-04-15'),
      harvestDate: new Date('2024-08-15'),
      irrigationType: 'drip',
    },
    {
      id: '2',
      name: 'Wheat',
      type: 'Grain',
      plantingDate: new Date('2024-05-01'),
      harvestDate: new Date('2024-09-15'),
      irrigationType: 'sprinkler',
    },
  ],
};

const MOCK_FARMS: Farm[] = [
  {
    id: '1',
    name: 'Green Valley Farm',
    location: {
      latitude: 39.8283,
      longitude: -98.5795,
    },
    size: 150,
    crops: [
      {
        id: '1',
        name: 'Corn',
        type: 'Grain',
        plantingDate: new Date('2024-04-15'),
        harvestDate: new Date('2024-09-15'),
        irrigationType: 'sprinkler',
      },
      {
        id: '2',
        name: 'Soybeans',
        type: 'Legume',
        plantingDate: new Date('2024-05-01'),
        harvestDate: new Date('2024-10-01'),
        irrigationType: 'drip',
      },
    ],
  },
];

export const getFarmsNearLocation = async (coordinates: Coordinates): Promise<Farm[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Calculate distance between coordinates and farm locations
  // In a real app, this would be handled by a backend service
  const nearbyFarms = MOCK_FARMS.filter(farm => {
    const distance = calculateDistance(
      coordinates.latitude,
      coordinates.longitude,
      farm.location.latitude,
      farm.location.longitude
    );
    return distance <= 100; // Within 100km
  });

  return nearbyFarms.length > 0 ? nearbyFarms : [DEFAULT_FARM];
};

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}