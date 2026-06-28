import { Link } from 'react-router-dom';

export default function Home({ isDarkMode }) {
  const allFeatures = [
    {
      title: 'Action Priority AI',
      desc: 'Isolates high-criticality system and infrastructure vulnerabilities within unstructured text fragments instantly to calculate real-time operational risks.',
      path: '/priority-ai',
      icon: '🎯',
      badge: 'Core Processing'
    },
    {
      title: 'Silent Dissatisfaction Detector',
      desc: 'Unearths masked passive friction metrics and hidden systemic customer complaints buried beneath polite or highly rated commentary strings.',
      path: '/dissatisfaction-tracker',
      icon: '🔍',
      badge: 'NLP Engine'
    },
    {
      title: 'Experience Recovery Predictor',
      desc: 'Formulates probabilistic churn vectors to assess guest retention margins and automates tailored post-incident recovery workflow layouts.',
      path: '/recovery-predictor',
      icon: '📈',
      badge: 'Predictive Analytics'
    },
    {
      title: 'Review Ingestion Matrix',
      desc: 'Access the central operational ledger containing full aggregated historical text logs, assigned action tickets, and sentiment tags.',
      path: '/dashboard',
      icon: '📋',
      badge: 'Central Ledger'
    },
    {
      title: 'System Parameters',
      desc: 'Configure administrative guidelines, baseline telemetry thresholds, and manage overarching enterprise environmental targets.',
      path: '/about',
      icon: '⚙️',
      badge: 'System Settings'
    },
    {
      title: 'Portal Gateway Access',
      desc: 'Secure authentication terminal for verified administrative managers to update active tokens and authorize cross-department tasks.',
      path: '/login',
      icon: '🔒',
      badge: 'Security Infrastructure'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Source Extraction',
      source: 'OTA Channels',
      desc: 'Raw textual content and unstructured guest logs are retrieved from booking platforms and external hospitality channels.',
      icon: '🌐'
    },
    {
      step: '02',
      title: 'Staff Collection',
      source: 'Manual Copy/Paste',
      desc: 'Operational personnel copy raw feedback fragments directly into the secure RevIQ terminal entry points.',
      icon: '📋'
    },
    {
      step: '03',
      title: 'Telemetry Pipeline',
      source: 'Platform Ingestion',
      desc: 'Data flows through localized endpoints to strip diagnostic delays and isolate key semantic strings.',
      icon: '⚡'
    },
    {
      step: '04',
      title: 'AI Processing Switch',
      source: 'Algorithmic Engines',
      desc: 'The string is parallel-processed across Priority AI, Dissatisfaction, and Recovery modules to calculate structural risk vectors.',
      icon: '⚙️'
    },
    {
      step: '05',
      title: 'System Resolution',
      source: 'Actionable Matrix',
      desc: 'Generates concise summaries, retention percentages, and immediate fix templates dispatched directly onto the central ledger.',
      icon: '📊'
    }
  ];

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0d0d12] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* 1. HERO BANNER */}
      <div className={`w-full py-16 lg:py-24 px-6 md:px-12 border-b transition-all duration-300 text-white shadow-sm bg-gradient-to-b ${
        isDarkMode 
          ? 'from-[#170e2b] via-[#0f0a1c] to-[#0d0d12] border-purple-950/40' 
          : 'from-emerald-950 via-emerald-900 to-emerald-950 border-emerald-800'
      }`}>
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <span className={`inline-block border text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm transition-colors ${
            isDarkMode ? 'bg-purple-950/60 border-purple-900 text-purple-300' : 'bg-emerald-800/60 border-emerald-700 text-emerald-300'
          }`}>
            Operational Infrastructure Console
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-slate-100 max-w-4xl mx-auto">
            Transforming Unstructured Feedback Into <span className={isDarkMode ? 'text-purple-400' : 'text-emerald-300'}>Operational Precision</span>
          </h1>
          <p className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-emerald-100/80'}`}>
            The core administrative baseline engine for Trishul Eco-Homestays. Neutralize operational delay, map subtle user friction, and isolate actionable system recovery tracks instantly.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <a 
              href="#platform-features" 
              className={`text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-md shadow-md transition-colors ${
                isDarkMode ? 'bg-purple-700 hover:bg-purple-600' : 'bg-emerald-700 hover:bg-emerald-600'
              }`}
            >
              Explore Core Modules
            </a>
            <a 
              href="#system-workflow" 
              className={`border text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-md transition-colors ${
                isDarkMode 
                  ? 'bg-[#130c24] border-purple-900 text-purple-200 hover:border-purple-700' 
                  : 'bg-emerald-950 border-emerald-800 text-emerald-200 hover:border-emerald-700'
              }`}
            >
              View System Pipeline
            </a>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE WORKSPACE WITH SHINY GRADIENT CHARCOAL BACKGROUND */}
      <div className={`w-full transition-all duration-300 ${
        isDarkMode ? 'bg-gradient-to-tr from-[#0b0b0f] via-[#1b1b24] to-[#0b0b0f]' : 'bg-transparent'
      }`}>
        <div id="platform-features" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-12 scroll-mt-12">
          <div className={`border-l-4 pl-4 text-left transition-colors ${isDarkMode ? 'border-purple-600' : 'border-emerald-800'}`}>
            <span className={`text-xs font-bold uppercase tracking-widest block mb-1 ${
              isDarkMode ? 'text-purple-400' : 'text-emerald-800'
            }`}>
              System Architecture Matrix
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Active Platform Terminals
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Select an active workspace environment below to process telemetry strings or monitor active historical parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {allFeatures.map((feat) => (
              <Link 
                key={feat.title}
                to={feat.path}
                className={`premium-card border rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-md transition-all duration-200 hover:-translate-y-1 group ${
                  isDarkMode 
                    ? 'bg-[#111116]/90 border-slate-800 hover:border-purple-500 hover:bg-[#15151c]' 
                    : 'bg-white border-slate-200/80 hover:border-emerald-800 hover:shadow-xl'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`text-2xl h-12 w-12 rounded-lg flex items-center justify-center border transition-colors ${
                      isDarkMode ? 'bg-[#0b0b0f] border-slate-800 group-hover:bg-purple-950' : 'bg-slate-50 border-slate-100 group-hover:bg-emerald-50'
                    }`}>
                      {feat.icon}
                    </div>
                    <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-sm transition-colors ${
                      isDarkMode ? 'text-purple-300 bg-purple-950/80' : 'text-emerald-800 bg-emerald-50'
                    }`}>
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className={`text-base font-bold tracking-tight transition-colors ${
                    isDarkMode ? 'text-slate-100 group-hover:text-purple-300' : 'text-slate-900 group-hover:text-emerald-800'
                  }`}>
                    {feat.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {feat.desc}
                  </p>
                </div>
                
                <div className={`pt-6 mt-6 border-t flex items-center justify-between text-xs font-bold uppercase tracking-widest transition-colors ${
                  isDarkMode ? 'border-slate-800/60 text-purple-400 group-hover:text-purple-300' : 'border-slate-100 text-emerald-800 group-hover:text-emerald-600'
                }`}>
                  <span>Access Workspace</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3. PLATFORM WORKFLOW SYSTEM TIMELINE (SHINY CHARCOAL CONTAINER SHIFT) */}
      <div id="system-workflow" className={`w-full border-y py-20 scroll-mt-12 transition-colors duration-300 ${
        isDarkMode ? 'bg-gradient-to-br from-[#0d0d12] via-[#16161f] to-[#0d0d12] border-slate-900' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center space-y-2">
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isDarkMode ? 'text-purple-400' : 'text-emerald-800'
            }`}>
              Operational Dataflow Roadmap
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              How Information Moves Through RevIQ
            </h2>
            <div className={`h-1 w-20 mx-auto mt-4 rounded-full transition-colors ${isDarkMode ? 'bg-purple-600' : 'bg-emerald-800'}`}></div>
          </div>

          <div className="relative xl:flex xl:justify-between xl:items-start gap-4 space-y-8 xl:space-y-0">
            <div className={`hidden xl:block absolute top-1/4 left-6 right-6 h-0.5 -z-0 pointer-events-none ${
              isDarkMode ? 'bg-slate-800/80' : 'bg-slate-300'
            }`}></div>

            {workflowSteps.map((flow, idx) => (
              <div 
                key={flow.step} 
                className={`relative border rounded-xl p-6 shadow-md flex flex-col items-center text-center max-w-md mx-auto xl:mx-0 xl:w-1/5 z-10 group transition-all ${
                  isDarkMode 
                    ? 'bg-[#111116]/90 border-slate-800 hover:border-purple-500' 
                    : 'bg-white border-slate-200 hover:border-emerald-700'
                }`}
              >
                <div className={`absolute -top-4 text-white font-mono text-xs font-bold px-3 py-0.5 rounded-full shadow-sm transition-colors ${
                  isDarkMode ? 'bg-purple-600' : 'bg-emerald-800'
                }`}>
                  {flow.step}
                </div>
                
                <div className={`text-3xl mt-2 mb-4 h-14 w-14 rounded-full flex items-center justify-center border transition-colors ${
                  isDarkMode ? 'bg-[#0b0b0f] border-slate-800' : 'bg-slate-50 border-slate-100 group-hover:bg-emerald-50'
                }`}>
                  {flow.icon}
                </div>
                
                <div className="space-y-1">
                  <h4 className={`text-sm font-bold tracking-tight ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {flow.title}
                  </h4>
                  <span className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                    isDarkMode ? 'bg-purple-950 text-purple-300' : 'bg-emerald-50 text-emerald-800'
                  }`}>
                    {flow.source}
                  </span>
                </div>

                <p className={`text-xs leading-relaxed font-sans mt-4 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {flow.desc}
                </p>

                {idx !== workflowSteps.length - 1 && (
                  <div className="xl:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 text-slate-300 font-bold text-lg">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}