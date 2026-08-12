import React, { useState } from 'react';

export default function AIFeature() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleAISubmit = async (e) => {
    e.preventDefault();
    const cleanPrompt = prompt.trim();

    if (cleanPrompt.length < 3) {
      setError('Please enter a prompt with at least 3 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API_BASE}/api/ai/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ prompt: cleanPrompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail?.[0]?.msg 
            ? `Validation Error: ${data.detail[0].msg}` 
            : data?.detail || `Server returned status code ${response.status}`
        );
      }

      setResult(data.output || 'Analysis completed successfully.');
    } catch (err) {
      console.error('AI Generation Error:', err);
      setError(err.message || 'Failed to generate AI insights. Check backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 shadow-2xl shadow-emerald-950/20 relative overflow-hidden">
        
        {/* Subtle Background Glow Accent */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Section */}
        <header className="mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            RevIQ Intelligence Engine
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
            AI Analytics Workspace
          </h1>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
            Generate real-time sentiment insights, classify telemetry feedback, and extract actionable operational metrics.
          </p>
        </header>

        {/* Input Form */}
        <form onSubmit={handleAISubmit} className="space-y-5 relative z-10">
          <div>
            <label htmlFor="ai-prompt" className="block text-sm font-semibold text-zinc-300 mb-2">
              Feedback Payload / Analytical Prompt
            </label>
            <textarea
              id="ai-prompt"
              rows="4"
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition duration-200 text-sm resize-none"
              placeholder="Paste guest reviews, customer feedback, or telemetry logs here (minimum 3 characters)..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || prompt.trim().length < 3}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:border-zinc-700/50 disabled:cursor-not-allowed text-zinc-950 font-bold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 flex items-center justify-center space-x-2 text-sm tracking-wide"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-zinc-950" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Processing Insight...</span>
              </>
            ) : (
              <span>Generate Analysis</span>
            )}
          </button>
        </form>

        {/* Error Feedback Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-300 text-sm flex items-start gap-3">
            <span className="text-red-400 font-bold text-base">⚠️</span>
            <div>
              <p className="font-semibold text-red-200">Execution Error</p>
              <p className="text-xs text-red-300/80 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Output Display Panel */}
        {result && (
          <div className="mt-6 p-6 bg-zinc-950/90 border border-emerald-500/30 rounded-xl shadow-inner relative z-10">
            <div className="flex items-center justify-between mb-3 border-b border-zinc-800/80 pb-3">
              <h3 className="text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Generated Analysis Output
              </h3>
              <span className="text-[10px] text-zinc-500 font-mono">STATUS: 200 OK</span>
            </div>
            <div className="text-zinc-200 whitespace-pre-wrap leading-relaxed text-sm font-normal">
              {result}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}