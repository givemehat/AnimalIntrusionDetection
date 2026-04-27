import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import WeatherMap from './WeatherMap';
import CurrentConditions from './CurrentConditions';
import ForecastSection from './ForecastSection';
import AlertsPanel from './AlertsPanel';
import CropRecommendations from './CropRecommendations';
import FarmSelectionModal from './modals/FarmSelectionModal';
import { useFarmContext } from '../context/FarmContext';
import { getUserLocation } from '../utils/locationUtils';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedFarm, setSelectedFarm } = useFarmContext();
  const [coordinates, setCoordinates] = useState(null);

  const handleAddFarm = async () => {
    const location = await getUserLocation();
    setCoordinates(location);
    setIsModalOpen(true);
  };

  const handleSelectFarm = (farm) => {
    setSelectedFarm(farm);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">
                Farm Weather Insights
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleAddFarm}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                {selectedFarm ? 'Change Farm' : 'Add Farm'}
              </button>
            </div>
          </div>
          {selectedFarm && (
            <div className="mt-2 text-sm text-gray-600">
              Selected: {selectedFarm.name} ({selectedFarm.size} acres)
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <CurrentConditions farm={selectedFarm} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 h-96">
              <WeatherMap farm={selectedFarm} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ForecastSection farm={selectedFarm} />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <AlertsPanel farm={selectedFarm} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <CropRecommendations farm={selectedFarm} />
            </div>
          </div>
        </div>
      </main>

      {coordinates && (
        <FarmSelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectFarm={handleSelectFarm}
          coordinates={coordinates}
        />
      )}
    </div>
  );
}