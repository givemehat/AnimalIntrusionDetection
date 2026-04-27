import { useState, useEffect } from 'react';
import { Farm } from '../types';
import { getFarmsNearLocation } from '../utils/farmUtils';
import { Coordinates } from '../utils/locationUtils';

export function useFarms(coordinates: Coordinates) {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadFarms = async () => {
      try {
        setIsLoading(true);
        const nearbyFarms = await getFarmsNearLocation(coordinates);
        setFarms(nearbyFarms);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load farms'));
      } finally {
        setIsLoading(false);
      }
    };

    loadFarms();
  }, [coordinates]);

  return { farms, isLoading, error };
}