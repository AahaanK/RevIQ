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
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-emerald-800 selection:text-white">
        <Navbar />
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