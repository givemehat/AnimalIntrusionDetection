import React, { useEffect, useRef } from 'react';
import { Map as OLMap } from 'ol';
import { MapPin, Loader2 } from 'lucide-react';
import 'ol/ol.css';
import { createMap } from '../utils/mapUtils';
import { getUserLocation, Coordinates, DEFAULT_COORDINATES } from '../utils/locationUtils';

export default function WeatherMap({ farm }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<OLMap | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        if (mapRef.current && !mapInstanceRef.current) {
          const coordinates = farm?.location || await getUserLocation();
          mapInstanceRef.current = createMap('map', coordinates);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget('');
        mapInstanceRef.current = null;
      }
    };
  }, [farm]);

  useEffect(() => {
    if (mapInstanceRef.current && farm?.location) {
      const view = mapInstanceRef.current.getView();
      view.animate({
        center: [farm.location.longitude, farm.location.latitude],
        zoom: 12,
        duration: 1000
      });
    }
  }, [farm]);

  const handleCenterMap = () => {
    if (mapInstanceRef.current && farm?.location) {
      const view = mapInstanceRef.current.getView();
      view.animate({
        center: [farm.location.longitude, farm.location.latitude],
        zoom: 12,
        duration: 1000
      });
    }
  };

  return (
    <div className="h-full">
      <h2 className="text-xl font-semibold mb-4">Weather Map</h2>
      <div className="relative h-[calc(100%-2rem)] bg-gray-100 rounded-lg overflow-hidden">
        <div 
          id="map" 
          ref={mapRef} 
          className="absolute inset-0 w-full h-full"
          style={{ background: '#f3f4f6' }}
        />
        <div className="absolute bottom-4 right-4 space-y-2">
          <button 
            onClick={handleCenterMap}
            className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <MapPin className="h-4 w-4" />
            <span>Center Map</span>
          </button>
        </div>
      </div>
    </div>
  );
}