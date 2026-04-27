import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { Coordinates } from './locationUtils';

export const createMap = (target: string, coordinates: Coordinates): OLMap => {
  // Create base map layer
  const baseLayer = new TileLayer({
    source: new OSM({
      attributions: []  // Remove default attributions for cleaner look
    })
  });

  // Create weather layer
  const weatherLayer = new TileLayer({
    source: new XYZ({
      url: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY',
      attributions: '© OpenWeatherMap'
    }),
    opacity: 0.6
  });

  // Create and return the map instance
  return new Map({
    target,
    layers: [baseLayer, weatherLayer],
    view: new View({
      center: fromLonLat([coordinates.longitude, coordinates.latitude]),
      zoom: 12,
      minZoom: 2,
      maxZoom: 19
    }),
    controls: []  // Remove default controls for custom styling
  });
};