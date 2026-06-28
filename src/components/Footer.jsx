import { Link } from 'react-router-dom';

export default function Footer({ isDarkMode }) {
  return (
    <footer className={`w-full py-12 px-6 md:px-12 border-t font-sans transition-all duration-300 ${
      isDarkMode 
        ? 'bg-[#130c24] border-purple-950/60 text-slate-400' 
        : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center space-x-3">
          <span className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-purple-300' : 'text-emerald-950'}`}>
            RevIQ
          </span>
          <p className="text-xs">
            © {new Date().getFullYear()} Trishul Eco-Homestays. Internal Telemetry Engine.
          </p>
        </div>

        <div className="flex gap-6 text-xs font-bold uppercase tracking-wider">
          <Link to="/about" className={`transition-colors ${isDarkMode ? 'hover:text-purple-400' : 'hover:text-emerald-800'}`}>
            System Guidelines
          </Link>
          <a href="#platform-features" className={`transition-colors ${isDarkMode ? 'hover:text-purple-400' : 'hover:text-emerald-800'}`}>
            Core Terminal
          </a>
          <Link to="/sandbox" className={`transition-colors ${isDarkMode ? 'hover:text-purple-400' : 'hover:text-emerald-800'}`}>
            UI Sandbox
          </Link>
        </div>

      </div>
    </footer>
  );
}