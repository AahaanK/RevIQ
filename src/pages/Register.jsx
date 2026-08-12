import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetail = typeof data.detail === "string" ? data.detail : "Registration node deployment failed.";
        throw new Error(errorDetail);
      }

      setSuccessMessage("✅ Account successfully provisioned!");
      setTimeout(() => {
        navigate("/login"); // Auto redirect to login gate after 2 seconds
      }, 2000);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1">
          <div className="text-emerald-950 text-xl font-black tracking-tight">Create Staff Node</div>
          <p className="text-stone-500 text-xs">Provision a new terminal authorization key for the Trishul cluster.</p>
        </div>

        {errorMessage && <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg font-mono">⚠️ {errorMessage}</div>}
        {successMessage && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-3 rounded-lg font-mono">{successMessage}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-stone-500 tracking-wider">Staff Access Email</label>
            <input type="email" required placeholder="ops-agent@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-stone-500 tracking-wider">Security Cipher Phrase</label>
            <input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-emerald-900 hover:bg-emerald-800 disabled:bg-stone-400 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg shadow-xs transition-all active:translate-y-px mt-2 cursor-pointer disabled:cursor-not-allowed">
            {loading ? "Provisioning..." : "Deploy Node Account"}
          </button>
        </form>

        <div className="text-center text-xs text-stone-500">
          Already registered? <Link to="/login" className="text-emerald-900 underline font-semibold">Sign In Here</Link>
        </div>
      </div>
    </div>
  );
}