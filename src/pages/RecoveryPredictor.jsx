import { useState } from 'react';

export default function RecoveryPredictor() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(null);

  const processPipeline = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setOutput({
      retentionRate: '76%',
      verdict: 'HIGH RECOVERY PROBABILITY',
      logic: 'Friction was purely infrastructure-centric rather than staff-centric. Timely dispatch of automated management response vectors guarantees customer recovery.'
    });
  };

  return (
    <div className="space-y-8">
      
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Experience Recovery Predictor</h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">Calculates retention metrics and maps returning guest probabilities automatically.</p>
        </div>
        <span className="bg-rose-900/60 border border-rose-800 text-rose-200 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md shrink-0">
          Predictive Model Online
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xs font-bold text-emerald-950 uppercase tracking-widest mb-4 border-b border-stone-100 pb-2">Predictive Processing Hub</h2>
          <form onSubmit={processPipeline} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase text-stone-500 tracking-wider">Input Target Guest Text Content</label>
              <textarea 
                rows="8"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste negative or frustrated user experience inputs here..."
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-4 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-900 font-sans resize-none transition-all"
              />
            </div>
            <button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg transition-all shadow-xs active:translate-y-px">
              Calculate Retention Probability
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 h-full">
          {!output ? (
            <div className="border-2 border-dashed border-stone-300 bg-white rounded-xl h-64 lg:h-full min-h-[300px] flex flex-col items-center justify-center text-stone-400 text-xs font-mono p-6 text-center">
              <span className="mb-2 text-lg">⏳</span>
              Awaiting predictive computation matrix logs...
            </div>
          ) : (
            <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-stone-200 p-5 rounded-xl bg-stone-50/50">
                  <span className="text-[10px] uppercase font-bold text-stone-400 font-mono tracking-wider block mb-1">Retention Probability</span>
                  <div className="text-4xl font-black text-emerald-900">{output.retentionRate}</div>
                </div>
                <div className="border border-stone-200 p-5 rounded-xl bg-stone-50/50 flex flex-col justify-center">
                  <span className="text-[10px] uppercase font-bold text-stone-400 font-mono tracking-wider block mb-1">Recovery Outlook</span>
                  <div className="text-xs font-black text-rose-900 uppercase tracking-wide">{output.verdict}</div>
                </div>
              </div>
              <div className="space-y-2 border-t border-stone-100 pt-4">
                <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">Algorithmic Base Resolution Logic</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans bg-stone-50 p-4 rounded-lg border border-stone-200">{output.logic}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}