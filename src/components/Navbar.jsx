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
    <nav className="bg-[#041c10] border-b border-[#143d25] sticky top-0 z-50 w-full shadow-md">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Identity */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <span className="text-2xl font-black tracking-tight text-[#F5F5DC] transition-colors group-hover:text-[#D0E7D2]">
              RevIQ
            </span>
            <span className="bg-[#143d25] border border-[#235839] text-[#D0E7D2] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
              Trishul Staff Portal
            </span>
          </Link>

          {/* Symmetrical Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-md transition-all ${
                  isActive(item.path) 
                    ? 'bg-[#143d25] text-[#F5F5DC] border border-[#235839]' 
                    : 'text-[#c2c2aa] hover:bg-[#082d1b] hover:text-[#F5F5DC]'
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
              className="bg-[#1e4620] border border-[#2d5a27] hover:bg-[#2d5a27] text-[#F5F5DC] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-md transition-colors"
            >
              Portal Login
            </Link>
          </div>

          {/* Responsive Mobile Trigger */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#F5F5DC] hover:text-[#D0E7D2] p-2 rounded-md hover:bg-[#082d1b] focus:outline-none"
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

      {/* Drawer Panels Mobile */}
      {isOpen && (
        <div className="xl:hidden bg-[#041c10] border-b border-[#143d25]">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md text-xs font-bold uppercase tracking-wide transition-colors ${
                  isActive(item.path) ? 'bg-[#143d25] text-[#F5F5DC]' : 'text-[#c2c2aa] hover:bg-[#082d1b]'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#143d25] mt-2 px-4">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-[#1e4620] text-[#F5F5DC] text-xs font-bold uppercase tracking-widest py-3 rounded-md"
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