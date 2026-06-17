import { useState } from 'react';

export default function DissatisfactionTracker() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(null);

  const processPipeline = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setOutput({
      status: 'SUBTEXT ANOMALY DETECTED',
      details: 'Review text says "the remote scenery was majestic," but sentence pattern vectors match anxiety metrics regarding navigation path dark-zones between outlying properties and the main facility after hours.'
    });
  };

  return (
    <div className="space-y-8">
      
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Silent Dissatisfaction Detector</h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">Examines contextual anomalies to identify hidden complaints inside polite review statements.</p>
        </div>
        <span className="bg-rose-900/60 border border-rose-800 text-rose-200 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md shrink-0">
          Sub-Text Core Online
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xs font-bold text-emerald-950 uppercase tracking-widest mb-4 border-b border-stone-100 pb-2">Anomaly Scrutiny Interface</h2>
          <form onSubmit={processPipeline} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase text-stone-500 tracking-wider">Input Copy-Pasted Review Text</label>
              <textarea 
                rows="8"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste polite or positive looking text logs right here..."
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-4 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-900 font-sans resize-none transition-all"
              />
            </div>
            <button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg transition-all shadow-xs active:translate-y-px">
              Scan Subtext Vectors
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 h-full">
          {!output ? (
            <div className="border-2 border-dashed border-stone-300 bg-white rounded-xl h-64 lg:h-full min-h-[300px] flex flex-col items-center justify-center text-stone-400 text-xs font-mono p-6 text-center">
              <span className="mb-2 text-lg">⏳</span>
              Awaiting textual semantic analysis transmission parameters...
            </div>
          ) : (
            <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase font-mono bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-md w-fit">
                <span className="inline-block h-2 w-2 rounded-full bg-rose-800 animate-pulse"></span>
                {output.status}
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">Pattern Diagnostic</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans bg-stone-50 p-4 rounded-lg border border-stone-200">
                  {output.details}
                </p>
              </div>
              <div className="text-xs font-semibold text-emerald-950 bg-emerald-50 border border-emerald-200 p-4 rounded-lg flex items-start gap-2.5">
                <span className="text-base mt-px">💡</span>
                <div>
                  <span className="font-bold text-emerald-900 block uppercase text-[10px] tracking-wider mb-0.5">Operational Fix Variant</span>
                  Install low-impact solar luminescent guideposts along connecting trail parameters.
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}