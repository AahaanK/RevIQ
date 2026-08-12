import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PriorityAI from './pages/PriorityAI';
import AIFeature from './pages/AIFeature';
import DissatisfactionTracker from './pages/DissatisfactionTracker';
import RecoveryPredictor from './pages/RecoveryPredictor';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import UiSandbox from './pages/UiSandbox';
import ProtectedRoute from './components/ProtectedRoute';

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    const errorDesc = params.get("error_description");
    const code = params.get("code");
    const queryToken = params.get("access_token");

    console.log("[AuthCallback] search:", location.search);
    console.log("[AuthCallback] hash:", location.hash);
    console.log("[AuthCallback] parsed -> error:", error, "code:", code, "queryToken:", queryToken);

    if (error) {
      console.error("OAuth Authorization Error:", errorDesc || error);
      alert(`Authentication Failed: ${errorDesc || error}`);
      navigate("/login", { replace: true });
      return;
    }

    const hash = location.hash;
    let hashToken = null;
    if (hash && hash.includes("access_token")) {
      const hashParams = new URLSearchParams(hash.replace("#", "?"));
      hashToken = hashParams.get("access_token");
    }

    const tokenToSave = queryToken || hashToken;

    if (tokenToSave) {
      localStorage.setItem("token", tokenToSave);
      window.dispatchEvent(new Event("storage"));
      navigate("/dashboard", { replace: true });
      return;
    }

    const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
    if (code) {
      fetch(`${API_BASE}/api/auth/exchange`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code }),
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            const detail = typeof data.detail === "string" ? data.detail : "Backend code exchange failed";
            throw new Error(detail);
          }
          return data;
        })
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("token", data.access_token);
            window.dispatchEvent(new Event("storage"));
            navigate("/dashboard", { replace: true });
          } else {
            throw new Error("No access_token returned from server");
          }
        })
        .catch((err) => {
          console.error("OAuth Exchange Error:", err);
          alert(`Could not complete single sign-on: ${err.message}`);
          navigate("/login", { replace: true });
        });
      return;
    }

    console.warn("[AuthCallback] No code, token, or error present in the redirect. Check Supabase Auth > URL Configuration > Redirect URLs, and confirm the redirect_to used in /api/auth/oauth/github is allow-listed there.");
    navigate("/login", { replace: true });
  }, [location, navigate]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-stone-600 font-mono text-sm space-y-3">
      <div className="w-6 h-6 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin"></div>
      <div>Authenticating node clearance via GitHub...</div>
    </div>
  );
}

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
            <Route path="/dissatisfaction-tracker" element={<DissatisfactionTracker isDarkMode={isDarkMode} />} />
            <Route path="/recovery-predictor" element={<RecoveryPredictor isDarkMode={isDarkMode} />} />
            <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
            <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
            <Route path="/register" element={<Register isDarkMode={isDarkMode} />} />
            
            {/* Dedicated OAuth redirect callback endpoint */}
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/sandbox" element={<UiSandbox isDarkMode={isDarkMode} />} />
            <Route path="/ai-feature" element={<AIFeature isDarkMode={isDarkMode} />} />

            <Route 
              path="/priority-ai" 
              element={
                <ProtectedRoute>
                  <PriorityAI isDarkMode={isDarkMode} />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard isDarkMode={isDarkMode} />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}
