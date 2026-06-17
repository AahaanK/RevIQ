import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 text-xs border-t border-stone-800 pt-16 pb-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        {/* Meta Unit */}
        <div className="space-y-4">
          <div className="text-white font-black text-lg tracking-tight">RevIQ Hub</div>
          <p className="text-stone-400 leading-relaxed text-[11px]">
            Enterprise intelligence layer engineered specifically for Trishul Eco-Homestays internal administration and response optimization mapping.
          </p>
          <div className="flex items-center space-x-2 pt-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-stone-500 text-[10px] uppercase font-mono tracking-wider">System Node: Secure Active</span>
          </div>
        </div>

        {/* Modules Links Grid */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-widest text-[10px] text-rose-400">Analysis Modules</h4>
          <ul className="space-y-2.5">
            <li><Link to="/priority-ai" className="hover:text-white transition-colors">Priority Core AI</Link></li>
            <li><Link to="/dissatisfaction-tracker" className="hover:text-white transition-colors">Subtext Friction Analysis</Link></li>
            <li><Link to="/recovery-predictor" className="hover:text-white transition-colors">Experience Retention Gauge</Link></li>
          </ul>
        </div>

        {/* Controls Links Grid */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-widest text-[10px] text-rose-400">Management Controls</h4>
          <ul className="space-y-2.5">
            <li><Link to="/dashboard" className="hover:text-white transition-colors">Review Ingestion Matrix</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">System Parameter Matrix</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">Staff Multi-Factor Portal</Link></li>
          </ul>
        </div>

        {/* Address Location Info Unit */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-widest text-[10px] text-rose-400">Trishul Contact Wire</h4>
          <p className="leading-relaxed text-[11px] text-stone-400">
            HQ Node Operations Room<br />
            LMS-TBI Grid Interface Room, GEU<br />
            Dehradun, Uttarakhand, India
          </p>
          <div className="text-[10px] font-mono text-emerald-400/70 pt-1">
            internal-ops-support@reviq.local
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-stone-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-stone-500 font-mono">
        <div>&copy; {new Date().getFullYear()} RevIQ Core Ingestion Platforms. All rights reserved.</div>
        <div className="uppercase tracking-widest text-[10px] bg-stone-800 px-2.5 py-1 rounded text-stone-400">Confidential Internal Asset</div>
      </div>
    </footer>
  );
}