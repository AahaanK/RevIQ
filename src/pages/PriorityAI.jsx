import { useState } from 'react';

export default function PriorityAI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(null);

  const processPipeline = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setOutput({
      priority: 'HIGH PRIORITY',
      issue: 'Eco-Cabin thermal retention metrics dropping beneath standard configuration criteria between 20:00 and 23:00 hours.',
      solution: 'Deploy solid fuel wood-pellet convection stoves into active zones to maintain standard thermal targets.'
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Top Breadcrumb Context Hero Panel */}
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Action Priority AI</h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">Isolates operational hazards, maps priority flags, and structures immediate recovery paths.</p>
        </div>
        <span className="bg-rose-900/60 border border-rose-800 text-rose-200 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md shrink-0">
          Module Node: Active
        </span>
      </div>

      {/* Workspace Interactive Row Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs Component Panel */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xs font-bold text-emerald-950 uppercase tracking-widest mb-4 border-b border-stone-100 pb-2">Data Ingestion Input</h2>
          <form onSubmit={processPipeline} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase text-stone-500 tracking-wider">Paste Raw OTA Text Buffer</label>
              <textarea 
                rows="8"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste copied feedback text string right here..."
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-4 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-900 font-sans resize-none transition-all"
              />
            </div>
            <button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg transition-all shadow-xs active:translate-y-px">
              Execute Priority Scan
            </button>
          </form>
        </div>

        {/* Telemetry Output Display Area */}
        <div className="lg:col-span-7 h-full">
          {!output ? (
            <div className="border-2 border-dashed border-stone-300 bg-white rounded-xl h-64 lg:h-full min-h-[300px] flex flex-col items-center justify-center text-stone-400 text-xs font-mono p-6 text-center">
              <span className="mb-2 text-lg">⏳</span>
              Awaiting transmission sequence run parameters...
            </div>
          ) : (
            <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono">Analysis Output Array</span>
                <span className="text-[10px] font-black text-rose-900 bg-rose-50 px-2.5 py-1 rounded border border-rose-200 tracking-wider">{output.priority}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">Critical Issue Pinpointed</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-stone-50 p-4 border border-stone-200 rounded-lg">{output.issue}</p>
              </div>
              <div className="space-y-2 bg-emerald-50 border border-emerald-200 p-4 sm:p-5 rounded-lg">
                <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider">Most Impactful Recommended Fix</h3>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">{output.solution}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}