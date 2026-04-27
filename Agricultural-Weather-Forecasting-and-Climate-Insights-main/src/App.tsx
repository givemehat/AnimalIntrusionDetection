import React from 'react';
import Dashboard from './components/Dashboard';
import { FarmProvider } from './context/FarmContext';

function App() {
  return (
    <FarmProvider>
      <Dashboard />
    </FarmProvider>
  );
}

export default App;