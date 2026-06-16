import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-tight text-emerald-700">RevIQ</span>
            <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">Trishul AI Engine</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-600 hover:text-emerald-700 text-sm font-medium transition">Intelligence Engine</Link>
            <Link to="/dashboard" className="text-slate-600 hover:text-emerald-700 text-sm font-medium transition">Review Matrix</Link>
            <Link to="/about" className="text-slate-600 hover:text-emerald-700 text-sm font-medium transition">About Console</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-emerald-700 transition">Portal Login</Link>
            <div className="h-8 w-8 rounded-full bg-emerald-700 flex items-center justify-center cursor-pointer text-white font-bold text-xs shadow-sm">
              RI
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}