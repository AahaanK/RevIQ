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

export default function App() {
  return (
    <Router>
      {/* Lavish Dark Forest Green Base Layer */}
      <div className="min-h-screen bg-[#052214] text-[#F5F5DC] flex flex-col font-sans antialiased selection:bg-[#2d5a27] selection:text-[#F5F5DC]">
        <Navbar />
        
        {/* Full-width container allowing components to sit elegantly on the canvas */}
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/priority-ai" element={<PriorityAI />} />
            <Route path="/dissatisfaction-tracker" element={<DissatisfactionTracker />} />
            <Route path="/recovery-predictor" element={<RecoveryPredictor />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}