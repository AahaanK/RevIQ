import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar({ isDarkMode, onToggleTheme }) {
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
    <nav className={`sticky top-0 z-50 w-full shadow-md transition-all duration-300 border-b ${
      isDarkMode 
        ? 'bg-[#130c24] border-purple-950 text-slate-100' 
        : 'bg-emerald-950 border-emerald-900 text-white'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between h-20 items-center">
          
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <span className={`text-2xl font-black tracking-tight transition-colors ${
              isDarkMode ? 'text-purple-300 group-hover:text-purple-400' : 'text-amber-50 group-hover:text-emerald-300'
            }`}>
              RevIQ
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border transition-all ${
              isDarkMode 
                ? 'bg-[#1c1236] border-purple-900 text-purple-300' 
                : 'bg-emerald-900 border-emerald-800 text-emerald-200'
            }`}>
              Trishul Staff Portal
            </span>
          </Link>

          {/* Desktop Nav Items Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-md transition-all ${
                  isActive(item.path) 
                    ? isDarkMode 
                      ? 'bg-purple-900 text-white border border-purple-800 shadow-xs' 
                      : 'bg-emerald-800 text-white border border-emerald-700 shadow-sm'
                    : isDarkMode 
                      ? 'text-purple-200/80 hover:bg-[#1c1236] hover:text-white' 
                      : 'text-emerald-200 hover:bg-emerald-900 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Utility Core Button Trays */}
          <div className="hidden xl:flex items-center space-x-4 shrink-0">
            <button
              onClick={onToggleTheme}
              className={`p-2.5 rounded-md border transition-all focus:outline-none text-sm font-medium ${
                isDarkMode 
                  ? 'bg-[#1c1236] border-purple-900 text-purple-300 hover:text-white' 
                  : 'bg-emerald-900 border-emerald-800 text-emerald-200 hover:text-white'
              }`}
              title="Switch Core System Palette"
            >
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>

            <Link 
              to="/login" 
              className={`text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-md transition-colors shadow-sm ${
                isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-emerald-700 hover:bg-emerald-600'
              }`}
            >
              Portal Login
            </Link>
          </div>

          {/* Mobile Responsiveness Menu Control */}
          <div className="xl:hidden flex items-center space-x-3">
            <button
              onClick={onToggleTheme}
              className={`p-2 font-bold text-xs uppercase ${isDarkMode ? 'text-purple-300' : 'text-emerald-200'}`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md focus:outline-none"
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

      {/* Drawer Mobile Dropdown Layout */}
      {isOpen && (
        <div className={`xl:hidden border-t ${isDarkMode ? 'bg-[#130c24] border-purple-950' : 'bg-emerald-950 border-emerald-900'}`}>
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md text-xs font-bold uppercase tracking-wide transition-colors ${
                  isActive(item.path) 
                    ? isDarkMode ? 'bg-purple-900 text-white' : 'bg-emerald-800 text-white'
                    : isDarkMode ? 'text-purple-200 hover:bg-[#1c1236]' : 'text-emerald-200 hover:bg-emerald-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-opacity-20 mt-2 px-4 flex flex-col space-y-2">
              <button
                onClick={() => { onToggleTheme(); setIsOpen(false); }}
                className={`w-full py-2 text-xs font-bold uppercase rounded-md ${
                  isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-emerald-900 text-emerald-200'
                }`}
              >
                {isDarkMode ? 'Toggle Light Console' : 'Toggle Dark Console'}
              </button>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className={`block w-full text-center text-white text-xs font-bold uppercase tracking-widest py-3 rounded-md ${
                  isDarkMode ? 'bg-purple-700' : 'bg-emerald-700'
                }`}
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