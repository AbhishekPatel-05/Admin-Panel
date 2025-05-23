import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <WelcomePage onEnter={() => setShowWelcome(false)} />;
  }

  return <AdminPanel />;
}

export default App;