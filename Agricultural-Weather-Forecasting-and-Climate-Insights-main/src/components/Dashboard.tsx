import React, { useState } from "react";
import { MapPin } from "lucide-react";
import WeatherMap from "./WeatherMap";
import CurrentConditions from "./CurrentConditions";
import ForecastSection from "./ForecastSection";
import AlertsPanel from "./AlertsPanel";
import CropRecommendations from "./CropRecommendations";
import FarmSelectionModal from "./modals/FarmSelectionModal";
import { useFarmContext } from "../context/FarmContext";
import { getUserLocation } from "../utils/locationUtils";

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
    <div className="min-h-screen bg-[#021510] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#032e22] via-[#021510] to-black text-white relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div
        className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none"
        style={{ animationDelay: "2s" }}
      ></div>
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center group">
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all">
                <MapPin className="h-6 w-6 text-emerald-400" />
              </div>
              <h1 className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                Farm Weather Insights
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddFarm}
                className="px-5 py-2.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              >
                {selectedFarm ? "Change Farm" : "Add Farm"}
              </button>
            </div>
          </div>
          {selectedFarm && (
            <div className="mt-3 text-sm text-emerald-200/70 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
              Active Zone: {selectedFarm.name} ({selectedFarm.size} acres)
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 hover:bg-white/10 transition-colors duration-500">
              <CurrentConditions farm={selectedFarm} />
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 h-96 hover:border-emerald-500/30 transition-colors duration-500 overflow-hidden relative">
              {/* Subtle overlay to blend map with dark theme */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(2,21,16,0.8)] z-10"></div>
              <WeatherMap farm={selectedFarm} />
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 hover:bg-white/10 transition-colors duration-500">
              <ForecastSection farm={selectedFarm} />
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 hover:bg-white/10 transition-colors duration-500">
              <AlertsPanel farm={selectedFarm} />
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 hover:bg-white/10 transition-colors duration-500">
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
