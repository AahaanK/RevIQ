import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 py-12 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black tracking-tight text-white">RevIQ</span>
            <span className="bg-emerald-900 text-emerald-300 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
              v1.4.2
            </span>
          </div>
          <p className="text-xs text-emerald-200/60 leading-relaxed max-w-sm">
            Administrative terminal automation for Trishul Eco-Homestays. Managing distributed review processing pipelines with secure telemetry endpoints.
          </p>
        </div>

        <div className="space-y-3 text-left">
          <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-300">Terminal Modules</h4>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <Link to="/priority-ai" className="hover:text-white transition-colors">🎯 Action Priority AI</Link>
            <Link to="/dissatisfaction-tracker" className="hover:text-white transition-colors">🔍 Silent Dissatisfaction Detector</Link>
            <Link to="/recovery-predictor" className="hover:text-white transition-colors">📈 Experience Recovery Predictor</Link>
          </div>
        </div>

        <div className="space-y-3 text-left">
          <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-300">System Directory</h4>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <Link to="/dashboard" className="hover:text-white transition-colors">📋 Review Ingestion Matrix</Link>
            <Link to="/about" className="hover:text-white transition-colors">⚙️ System Parameters</Link>
            <Link to="/login" className="hover:text-white transition-colors">🔒 Portal Security Gateway</Link>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10 pt-6 border-t border-emerald-900/60 text-center text-[11px] text-emerald-200/40">
        © 2026 RevIQ Platform Interface Matrix. All administrative permissions logged securely.
      </div>
    </footer>
  );
}