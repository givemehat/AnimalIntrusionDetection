export interface Farm {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  size: number; // in acres
  crops: Crop[];
}

export interface Crop {
  id: string;
  name: string;
  type: string;
  plantingDate: Date;
  harvestDate: Date;
  irrigationType: 'sprinkler' | 'drip' | 'rainfed';
}

export interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    precipitation: number;
  };
  forecast: DayForecast[];
  alerts: WeatherAlert[];
}

export interface DayForecast {
  date: Date;
  highTemp: number;
  lowTemp: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

export interface WeatherAlert {
  id: string;
  type: 'frost' | 'storm' | 'drought' | 'extreme';
  severity: 'low' | 'medium' | 'high';
  message: string;
  startTime: Date;
  endTime: Date;
}