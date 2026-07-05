import { useState, useEffect } from 'react';
// 1. Import your newly created SubmissionPage component
import SubmissionPage from './SubmissionPage'; 

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Wrap your data fetch inside a reusable function so the form can trigger updates
  const refreshLogs = () => {
    setLoading(true);
    fetch('http://127.0.0.1:5000/api/v1/logs')
      .then((res) => {
        if (!res.ok) throw new Error("Backend connection failed");
        return res.json();
      })
      .then((payload) => {
        if (payload && payload.data && Array.isArray(payload.data)) {
          setLogs(payload.data);
        } else if (Array.isArray(payload)) {
          setLogs(payload);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Pipeline Sync Error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshLogs();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
      
      {/* Title Header Panel */}
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Review Ingestion Matrix</h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">Structured telemetry breakdown of incoming Trishul Eco-Homestay reviews.</p>
        </div>
        <button className="bg-rose-800 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-lg transition-all shadow-md shrink-0 active:translate-y-px">
          Bulk CSV Stream Ingestion
        </button>
      </div>

      {/* 3. Flex layout holding your Submission Panel and Data Table side-by-side on wide screens,
           or cleanly stacked on mobile viewports.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side Column: Form Ingestion Module */}
        <div className="lg:col-span-1">
          <SubmissionPage onLogAdded={refreshLogs} />
        </div>

        {/* Right Side Column: Modern High-Density Data Matrix Table */}
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-sm font-medium text-stone-500 font-mono animate-pulse">
                Synchronizing with Telemetry Kernel Engine...
              </div>
            ) : logs.length === 0 ? (
              <div className="p-12 text-center text-sm text-stone-400 font-mono">
                No live telemetry records located inside the active data buffer.
                <br />
                <span className="text-[11px] text-stone-400 block mt-1">
                  (Submit data via the ingestion panel to seed logs instantly)
                </span>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 text-[10px] font-bold uppercase tracking-widest font-mono">
                    <th className="p-4 sm:p-5">Log Token</th>
                    <th className="p-4 sm:p-5">Extracted Feedback String</th>
                    <th className="p-4 sm:p-5">Sentiment Label</th>
                    <th className="p-4 sm:p-5">Target Theme Node</th>
                    <th className="p-4 sm:p-5">Assigned Operations Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm divide-y divide-stone-100 text-stone-700 font-sans">
                  {logs.map((item) => (
                    <tr key={item.id || item._id} className="hover:bg-stone-50/40 transition-colors">
                      <td className="p-4 sm:p-5 font-mono font-bold text-emerald-950">
                        TX-{item.id || 'N/A'}
                      </td>
                      <td className="p-4 sm:p-5 max-w-xs truncate text-stone-600 font-medium" title={item.feedback || item.review}>
                        {item.feedback || item.review || "No data provided"}
                      </td>
                      <td className="p-4 sm:p-5 whitespace-nowrap">
                        <span className={`px-2.5 py-1 text-[9px] font-bold rounded-md uppercase tracking-wider border ${
                          (item.priority === 'High' || item.sentiment === 'Negative') 
                            ? 'bg-rose-50 text-rose-900 border-rose-200' :
                          (item.priority === 'Medium' || item.sentiment === 'Neutral') 
                            ? 'bg-amber-50 text-amber-800 border-amber-200' : 
                              'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {item.priority || item.sentiment || "Normal"}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5 font-mono text-xs text-stone-500 whitespace-nowrap">
                        {item.badge || item.theme || "System Stack"}
                      </td>
                      <td className="p-4 sm:p-5 text-rose-950 font-semibold italic whitespace-nowrap">
                        {/* Check for nested client object due to our new Supabase inner join relationship */}
                        {typeof item.client_id === 'object' && item.client_id !== null 
                          ? item.client_id.client_name 
                          : item.client || "Awaiting Analysis"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}