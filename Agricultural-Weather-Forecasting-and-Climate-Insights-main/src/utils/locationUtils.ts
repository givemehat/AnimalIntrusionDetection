import { fromLonLat } from 'ol/proj';

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export const DEFAULT_COORDINATES: Coordinates = {
  longitude: -98.5795,
  latitude: 39.8283
};

export const getUserLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.warn('Error getting location:', error.message);
        resolve(DEFAULT_COORDINATES);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
};