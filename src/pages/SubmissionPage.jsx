import React, { useState } from 'react';

export default function SubmissionPage({ onLogAdded }) {
  // Setup React states to capture input values
  const [feedback, setFeedback] = useState('');
  const [priority, setPriority] = useState('Low');
  const [badge, setBadge] = useState('Central Ledger');
  const [clientId, setClientId] = useState(1); // Hardcoded default matching our valid DB entry
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const logPayload = {
      client_id: parseInt(clientId), 
      feedback: feedback,
      priority: priority,
      badge: badge
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logPayload),
      });

      if (response.ok) {
        alert('Telemetry log ingested successfully!');
        setFeedback(''); // Clear form input fields
        if (onLogAdded) onLogAdded(); // Refresh your dashboard matrix view instantly!
      } else {
        alert('Failed to save log. Verify backend is active.');
      }
    } catch (error) {
      console.error('Error submitting payload:', error);
      alert('Network error connecting to FastAPI server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 rounded-xl p-5 text-white shadow-md">
      <h3 className="text-sm font-bold uppercase tracking-widest font-mono text-emerald-400 border-b border-stone-800 pb-3 flex items-center gap-2">
        <span>📟</span> Ingest Telemetry Log
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 text-xs font-sans">
        
        {/* Feedback String Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-stone-400 font-mono uppercase tracking-wider text-[10px]">
            Extracted Feedback String
          </label>
          <textarea 
            required
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter extraction telemetry payload..."
            className="w-full h-24 bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-stone-200 placeholder-stone-600 focus:outline-hidden focus:border-emerald-700 text-xs font-medium resize-none transition-colors"
          />
        </div>

        {/* Priority & Badge Side-by-Side Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-stone-400 font-mono uppercase tracking-wider text-[10px]">
              Priority
            </label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)} 
              className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-stone-200 focus:outline-hidden focus:border-emerald-700 font-medium transition-colors appearance-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-stone-400 font-mono uppercase tracking-wider text-[10px]">
              Target Theme Node
            </label>
            <input 
              type="text" 
              value={badge} 
              onChange={(e) => setBadge(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2.5 text-stone-200 placeholder-stone-600 focus:outline-hidden focus:border-emerald-700 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Action Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="bg-emerald-800 hover:bg-emerald-700 disabled:bg-stone-800 disabled:text-stone-600 text-white font-bold uppercase tracking-widest p-3 rounded-lg mt-2 transition-all shadow-md active:translate-y-px cursor-pointer disabled:cursor-not-allowed font-mono text-[11px]"
        >
          {loading ? 'Transmitting Payload...' : 'Execute Ingestion'}
        </button>
      </form>
    </div>
  );
}