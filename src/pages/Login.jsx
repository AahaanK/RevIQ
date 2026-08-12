import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetail = typeof data.detail === "string" 
          ? data.detail 
          : "Invalid authentication credentials.";
        throw new Error(errorDetail);
      }

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        alert("🔒 Clearance Granted. Node access authorized!");
        // 🚀 SUCCESS REDIRECT: Push the interface straight into the secured Review Matrix Dashboard
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🌐 Handle GitHub OAuth Authentication Handshake Redirect
  const handleGitHubLogin = async () => {
    try {
      setErrorMessage("");
      const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API_BASE}/api/auth/oauth/github`);
      const data = await response.json();
      
      // If the response is not a 2xx success code, unpack the FastAPI custom detail message
      if (!response.ok) {
        const errorDetail = typeof data.detail === "string" 
          ? data.detail 
          : "OAuth route initialization rejected by server.";
        throw new Error(errorDetail);
      }
      
      if (data.url) {
        window.location.href = data.url; // Relocate browser path context to GitHub Consent page
      } else {
        throw new Error("Supabase response parsed successfully, but the redirect URL was missing.");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="text-center space-y-1">
          <div className="text-emerald-950 text-xl font-black tracking-tight">Staff Authentication</div>
          <p className="text-stone-500 text-xs">Enter credentials to connect to the secure Trishul database cluster.</p>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg font-mono whitespace-pre-wrap">
            ⚠️ Error: {errorMessage}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-stone-500 tracking-wider">Staff Access Email</label>
            <input 
              type="email" 
              required
              placeholder="ops-agent@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-stone-500 tracking-wider">Security Cipher Phrase</label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-900 hover:bg-emerald-800 disabled:bg-stone-400 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg shadow-xs transition-all active:translate-y-px mt-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Verifying Keys..." : "Authorize Node Access"}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-stone-200"></div>
          <span className="flex-shrink mx-4 text-stone-400 text-[10px] font-mono uppercase tracking-wider">Or System Single Sign-On</span>
          <div className="flex-grow border-t border-stone-200"></div>
        </div>

        {/* 🌐 GitHub Single Sign-On Action Layout Node */}
        <button
          type="button"
          onClick={handleGitHubLogin}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-950"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          Identity Verification via GitHub
        </button>

        <div className="text-center text-xs text-stone-500 pt-2">
          New terminal agent? <Link to="/register" className="text-emerald-900 underline font-semibold">Register Staff Account</Link>
        </div>
      </div>
    </div>
  );
}