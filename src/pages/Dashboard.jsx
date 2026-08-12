import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmissionPage from './SubmissionPage'; 

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLog, setEditingLog] = useState(null); // For Update Modal/Form
  const [feedbackMsg, setFeedbackMsg] = useState(null); // User feedback notifications
  const navigate = useNavigate();

  // Helper to show temporary toast notification
  const showFeedback = (text, type = "success") => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

  // 1. READ: Fetch logs
  const refreshLogs = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    fetch(`${API_BASE}/api/v1/logs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("storage"));
          navigate("/login", { replace: true });
          throw new Error("Unauthorized access. Token expired or missing.");
        }
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

  // 2. DELETE: Remove targeted log entry
  const handleDelete = (targetItem, index) => {
    const targetId = targetItem.id || targetItem._id;
    const displayToken = targetId ? `TX-${targetId}` : `Index #${index + 1}`;

    if (!window.confirm(`Are you sure you want to delete log ${displayToken}?`)) return;

    const token = localStorage.getItem("token");

    // Strictly target either by unique ID or array index to prevent mass-deletion
    setLogs((prev) =>
      prev.filter((item, i) => {
        if (targetId) {
          return (item.id || item._id) !== targetId;
        }
        return i !== index;
      })
    );
    showFeedback(`Log record ${displayToken} deleted successfully!`, "danger");

    if (targetId) {
      fetch(`${API_BASE}/api/v1/logs/${targetId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).catch((err) => {
        console.error("Server delete sync failed:", err);
      });
    }
  };

  // Open Edit modal with a cloned object to break direct reference
  const handleOpenEdit = (item, index) => {
    setEditingLog({ ...item, _tempIndex: index });
  };

  // 3. UPDATE: Submit edited log details
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const targetId = editingLog.id || editingLog._id;
    const targetIndex = editingLog._tempIndex;

    // Clean temp tracking property before saving
    const cleanUpdatedLog = { ...editingLog };
    delete cleanUpdatedLog._tempIndex;

    // Immutably update ONLY the target record
    setLogs((prev) =>
      prev.map((item, i) => {
        if (targetId) {
          return (item.id || item._id) === targetId ? cleanUpdatedLog : item;
        }
        return i === targetIndex ? cleanUpdatedLog : item;
      })
    );

    showFeedback(`Record TX-${targetId || targetIndex + 1} updated successfully!`);
    setEditingLog(null);

    if (targetId) {
      fetch(`${API_BASE}/api/v1/logs/${targetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cleanUpdatedLog)
      }).catch((err) => {
        console.error("Server update sync failed:", err);
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
      
      {/* Feedback Toast Banner */}
      {feedbackMsg && (
        <div className={`p-4 rounded-lg text-xs font-mono font-bold border ${
          feedbackMsg.type === "danger" 
            ? "bg-rose-50 border-rose-300 text-rose-900" 
            : "bg-emerald-50 border-emerald-300 text-emerald-900"
        }`}>
          {feedbackMsg.text}
        </div>
      )}

      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Review Ingestion Matrix</h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">Structured telemetry breakdown of incoming Trishul Eco-Homestay reviews.</p>
        </div>
        <button className="bg-rose-800 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-lg transition-all shadow-md shrink-0 active:translate-y-px">
          Bulk CSV Stream Ingestion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* CREATE: Submission Form Component */}
        <div className="lg:col-span-1">
          <SubmissionPage onLogAdded={() => {
            refreshLogs();
            showFeedback("New telemetry log created successfully!");
          }} />
        </div>

        {/* READ, UPDATE, DELETE Matrix Table */}
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
                    <th className="p-4 sm:p-5">Sentiment</th>
                    <th className="p-4 sm:p-5">Target Theme</th>
                    <th className="p-4 sm:p-5">Assigned Action</th>
                    <th className="p-4 sm:p-5 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm divide-y divide-stone-100 text-stone-700 font-sans">
                  {logs.map((item, index) => {
                    const logId = item.id || item._id;
                    const rowKey = logId || `log-row-${index}`;

                    return (
                      <tr key={rowKey} className="hover:bg-stone-50/40 transition-colors">
                        <td className="p-4 sm:p-5 font-mono font-bold text-emerald-950">
                          TX-{logId || index + 1}
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
                          {typeof item.client_id === 'object' && item.client_id !== null 
                            ? item.client_id.client_name 
                            : item.client || "Awaiting Analysis"}
                        </td>
                        <td className="p-4 sm:p-5 text-right whitespace-nowrap font-mono text-xs">
                          <button 
                            onClick={() => handleOpenEdit(item, index)}
                            className="text-amber-700 hover:text-amber-900 font-bold mr-3"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(item, index)}
                            className="text-rose-700 hover:text-rose-900 font-bold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* UPDATE MODAL */}
      {editingLog && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-stone-200 rounded-xl p-6 w-full max-w-md shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-emerald-950 font-mono">
              Edit Log Record (TX-{editingLog.id || editingLog._id || editingLog._tempIndex + 1})
            </h2>
            
            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-stone-600 font-mono mb-1">Feedback String</label>
                <textarea
                  value={editingLog.feedback || editingLog.review || ""}
                  onChange={(e) => setEditingLog({ ...editingLog, feedback: e.target.value, review: e.target.value })}
                  className="w-full border border-stone-300 rounded p-2 focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-mono mb-1">Sentiment / Priority</label>
                  <select
                    value={editingLog.priority || editingLog.sentiment || "Normal"}
                    onChange={(e) => setEditingLog({ ...editingLog, priority: e.target.value, sentiment: e.target.value })}
                    className="w-full border border-stone-300 rounded p-2 focus:ring-1 focus:ring-emerald-800"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 font-mono mb-1">Target Theme Node</label>
                  <input
                    type="text"
                    value={editingLog.theme || editingLog.badge || ""}
                    onChange={(e) => setEditingLog({ ...editingLog, theme: e.target.value, badge: e.target.value })}
                    className="w-full border border-stone-300 rounded p-2 focus:ring-1 focus:ring-emerald-800"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingLog(null)}
                  className="px-4 py-2 border border-stone-300 text-stone-600 rounded font-mono hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-900 text-white font-bold rounded font-mono hover:bg-emerald-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}