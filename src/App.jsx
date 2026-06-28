import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PriorityAI from './pages/PriorityAI';
import DissatisfactionTracker from './pages/DissatisfactionTracker';
import RecoveryPredictor from './pages/RecoveryPredictor';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Login from './pages/Login';
import UiSandbox from './pages/UiSandbox';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col font-sans antialiased transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#0b0b0f] text-slate-100 selection:bg-purple-800 selection:text-white' 
          : 'bg-slate-50 text-slate-800 selection:bg-emerald-800 selection:text-white'
      }`}>
        
        <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
        
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/priority-ai" element={<PriorityAI isDarkMode={isDarkMode} />} />
            <Route path="/dissatisfaction-tracker" element={<DissatisfactionTracker isDarkMode={isDarkMode} />} />
            <Route path="/recovery-predictor" element={<RecoveryPredictor isDarkMode={isDarkMode} />} />
            <Route path="/dashboard" element={<Dashboard isDarkMode={isDarkMode} />} />
            <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
            <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
            <Route path="/sandbox" element={<UiSandbox isDarkMode={isDarkMode} />} />
          </Routes>
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}