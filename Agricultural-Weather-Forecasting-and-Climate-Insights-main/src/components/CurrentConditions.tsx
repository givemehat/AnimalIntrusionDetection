import React from 'react';
import { Thermometer, Droplets, Wind, Compass } from 'lucide-react';

export default function CurrentConditions() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
          <Thermometer className="h-6 w-6 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="text-xl font-semibold">72°F</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
          <Droplets className="h-6 w-6 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-xl font-semibold">65%</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
          <Wind className="h-6 w-6 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="text-xl font-semibold">8 mph</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
          <Compass className="h-6 w-6 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Wind Direction</p>
            <p className="text-xl font-semibold">NE</p>
          </div>
        </div>
      </div>
    </div>
  );
}