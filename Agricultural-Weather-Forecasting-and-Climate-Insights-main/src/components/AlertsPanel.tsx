import React from 'react';
import { AlertTriangle, ThermometerSnowflake, Cloud, Droplets } from 'lucide-react';

export default function AlertsPanel() {
  const alerts = [
    {
      type: 'frost',
      severity: 'high',
      message: 'Frost warning tonight. Protect sensitive crops.',
      icon: ThermometerSnowflake,
    },
    {
      type: 'storm',
      severity: 'medium',
      message: 'Thunderstorms expected tomorrow afternoon.',
      icon: Cloud,
    },
    {
      type: 'drought',
      severity: 'low',
      message: 'Below average rainfall expected next week.',
      icon: Droplets,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        <h2 className="text-xl font-semibold">Weather Alerts</h2>
      </div>
      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm mt-1 opacity-75">
                    Updated 5 minutes ago
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}