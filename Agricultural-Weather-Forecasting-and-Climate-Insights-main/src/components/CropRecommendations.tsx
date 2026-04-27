import React from 'react';
import { Sprout, Calendar, Droplets } from 'lucide-react';

export default function CropRecommendations() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Crop Insights</h2>
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Sprout className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Optimal Planting</p>
              <p className="text-sm text-green-800 mt-1">
                Conditions are favorable for corn planting in the next 3 days
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Irrigation Needed</p>
              <p className="text-sm text-blue-800 mt-1">
                Schedule irrigation for tomorrow morning due to low rainfall forecast
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-900">Harvest Planning</p>
              <p className="text-sm text-yellow-800 mt-1">
                Clear weather window for harvest operations next week
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}