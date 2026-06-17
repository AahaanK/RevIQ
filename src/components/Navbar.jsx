import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Console Home', path: '/' },
    { name: 'Priority AI', path: '/priority-ai' },
    { name: 'Dissatisfaction Tracker', path: '/dissatisfaction-tracker' },
    { name: 'Recovery Predictor', path: '/recovery-predictor' },
    { name: 'Review Matrix', path: '/dashboard' },
    { name: 'System Parameters', path: '/about' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50 w-full shadow-xs">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Frame Identity */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <span className="text-2xl font-black tracking-tight text-emerald-950 transition-colors group-hover:text-emerald-900">
              RevIQ
            </span>
            <span className="bg-rose-50 border border-rose-100 text-rose-900 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
              Trishul Staff Portal
            </span>
          </Link>

          {/* Symmetrical Links Desktop Spacer Arrangement */}
          <div className="hidden xl:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all ${
                  isActive(item.path) 
                    ? 'bg-emerald-950 text-white shadow-xs' 
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-950'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Gateway */}
          <div className="hidden xl:flex items-center shrink-0">
            <Link 
              to="/login" 
              className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg shadow-xs transition-all active:translate-y-0.5"
            >
              Portal Login
            </Link>
          </div>

          {/* Responsive Mobile Drawer Button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-emerald-950 p-2 rounded-md hover:bg-stone-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Drawer Panels */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-stone-200">
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-inner">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors ${
                  isActive(item.path) ? 'bg-emerald-950 text-white' : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-stone-200 mt-2 px-4">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-emerald-900 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-lg"
              >
                Portal Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}