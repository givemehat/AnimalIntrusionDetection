import React from 'react';
import { X } from 'lucide-react';
import { Farm } from '../../types';
import { useFarms } from '../../hooks/useFarms';
import { Coordinates } from '../../utils/locationUtils';

interface FarmSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFarm: (farm: Farm) => void;
  coordinates: Coordinates;
}

export default function FarmSelectionModal({ 
  isOpen, 
  onClose, 
  onSelectFarm,
  coordinates 
}: FarmSelectionModalProps) {
  const { farms, isLoading, error } = useFarms(coordinates);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Farm</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-gray-600">Loading farms...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading farms. Please try again.</p>
          </div>
        )}

        {!isLoading && !error && farms.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No farms found in this area.</p>
          </div>
        )}

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {farms.map((farm) => (
            <button
              key={farm.id}
              onClick={() => onSelectFarm(farm)}
              className="w-full text-left p-4 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
            >
              <h3 className="font-medium">{farm.name}</h3>
              <p className="text-sm text-gray-600">
                Size: {farm.size} acres
              </p>
              <p className="text-sm text-gray-600">
                Crops: {farm.crops.map(crop => crop.name).join(', ')}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}