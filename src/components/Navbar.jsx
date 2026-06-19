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
    <nav className="bg-emerald-950 border-b border-emerald-900 sticky top-0 z-50 w-full shadow-md">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between h-20 items-center">
          
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <span className="text-2xl font-black tracking-tight text-amber-50 transition-colors group-hover:text-emerald-300">
              RevIQ
            </span>
            <span className="bg-emerald-900 border border-emerald-800 text-emerald-200 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
              Trishul Staff Portal
            </span>
          </Link>

          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-md transition-all ${
                  isActive(item.path) 
                    ? 'bg-emerald-800 text-white border border-emerald-700 shadow-sm' 
                    : 'text-emerald-200 hover:bg-emerald-900 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center shrink-0">
            <Link 
              to="/login" 
              className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-md transition-colors shadow-sm"
            >
              Portal Login
            </Link>
          </div>

          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-emerald-100 hover:text-white p-2 rounded-md hover:bg-emerald-900 focus:outline-none"
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

      {isOpen && (
        <div className="xl:hidden bg-emerald-950 border-b border-emerald-900">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md text-xs font-bold uppercase tracking-wide transition-colors ${
                  isActive(item.path) ? 'bg-emerald-800 text-white' : 'text-emerald-200 hover:bg-emerald-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-emerald-900 mt-2 px-4">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-md"
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