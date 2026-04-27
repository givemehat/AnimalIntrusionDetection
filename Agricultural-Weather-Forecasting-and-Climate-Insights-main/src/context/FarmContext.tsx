import React, { createContext, useContext, useState } from 'react';
import { Farm } from '../types';

interface FarmContextType {
  selectedFarm: Farm | null;
  setSelectedFarm: (farm: Farm | null) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export function FarmProvider({ children }: { children: React.ReactNode }) {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);

  return (
    <FarmContext.Provider value={{ selectedFarm, setSelectedFarm }}>
      {children}
    </FarmContext.Provider>
  );
}

export function useFarmContext() {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarmContext must be used within a FarmProvider');
  }
  return context;
}