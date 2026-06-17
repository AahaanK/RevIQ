export default function About() {
  return (
    <div className="space-y-6">
      
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 sm:p-8 rounded-xl shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">System Parameters Matrix</h1>
        <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">Technical architectural background regarding the RevIQ analytics stack.</p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs max-w-4xl">
        <h2 className="text-sm font-bold text-emerald-950 uppercase tracking-widest mb-4 border-b border-stone-100 pb-2">Operational Guidelines</h2>
        <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-4 font-sans">
          <p>
            The <strong className="text-emerald-950">RevIQ Workspace Core</strong> runs as a secure, local system designed for internal Trishul Eco-Homestays administrative use. It minimizes analysis delay by automating the intake of customer text strings.
          </p>
          <p>
            By mapping textual sub-structures to unified theme tags, the pipeline isolates low-level operational bottlenecks—such as thermal water grid delays or late-night path illumination anomalies—allowing management to fix issues before they impact guest satisfaction indices.
          </p>
        </div>
        <div className="pt-6 mt-6 border-t border-stone-100 flex flex-col sm:flex-row justify-between gap-2 text-[10px] font-mono text-stone-400 uppercase tracking-wider">
          <span>Pipeline Node Version: 2.1.0-Vite-SPA</span>
          <span>Build Ref: REV-2026-X8</span>
        </div>
      </div>

    </div>
  );
}