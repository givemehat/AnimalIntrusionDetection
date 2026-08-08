import React from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';

export default function ForecastSection() {
  const forecast = [
    { day: 'Today', high: 75, low: 62, icon: Sun },
    { day: 'Tomorrow', high: 73, low: 60, icon: Cloud },
    { day: 'Wed', high: 71, low: 58, icon: CloudRain },
    { day: 'Thu', high: 70, low: 57, icon: Sun },
    { day: 'Fri', high: 72, low: 59, icon: Sun },
    { day: 'Sat', high: 74, low: 61, icon: Cloud },
    { day: 'Sun', high: 73, low: 60, icon: CloudRain },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">7-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
        {forecast.map((day) => {
          const Icon = day.icon;
          return (
            <div key={day.day} className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="font-medium">{day.day}</p>
              <Icon className="h-8 w-8 mx-auto my-2 text-blue-600" />
              <p className="text-sm">
                <span className="font-semibold">{day.high}°</span> /{' '}
                <span className="text-gray-500">{day.low}°</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}