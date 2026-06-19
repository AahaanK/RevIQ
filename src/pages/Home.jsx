import { Link } from 'react-router-dom';

export default function Home() {
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
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* 1. PROFESSIONAL HERO BANNER */}
      <div className="w-full bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white py-16 lg:py-24 px-6 md:px-12 border-b-4 border-emerald-800 shadow-sm">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <span className="inline-block bg-emerald-800/60 border border-emerald-700 text-emerald-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
            Operational Infrastructure Console
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-slate-100 max-w-4xl mx-auto">
            Transforming Unstructured Feedback Into <span className="text-emerald-300">Operational Precision</span>
          </h1>
          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            The core administrative baseline engine for Trishul Eco-Homestays. Neutralize operational delay, map subtle user friction, and isolate actionable system recovery tracks instantly.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <a 
              href="#platform-features" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-md shadow-md transition-colors"
            >
              Explore Core Modules
            </a>
            <a 
              href="#system-workflow" 
              className="bg-emerald-950 border border-emerald-800 hover:border-emerald-700 text-emerald-200 text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-md transition-colors"
            >
              View System Pipeline
            </a>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC ARCHITECTURE FEATURES SECTION */}
      <div id="platform-features" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-12 scroll-mt-12">
        <div className="border-l-4 border-emerald-800 pl-4 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block mb-1">System Architecture Matrix</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Active Platform Terminals</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">Select an active workspace environment below to process telemetry strings or monitor active historical parameters.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {allFeatures.map((feat) => (
            <Link 
              key={feat.title}
              to={feat.path}
              className="premium-card bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-emerald-800 hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-2xl bg-slate-50 h-12 w-12 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                    {feat.icon}
                  </div>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm group-hover:text-emerald-800 group-hover:bg-emerald-50 transition-colors">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {feat.desc}
                </p>
              </div>
              
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-emerald-800 group-hover:text-emerald-600">
                <span>Access Workspace</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. PLATFORM WORKFLOW SYSTEM TIMELINE */}
      <div id="system-workflow" className="w-full bg-slate-100 border-y border-slate-200 py-20 scroll-mt-12">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">Operational Dataflow Roadmap</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">How Information Moves Through RevIQ</h2>
            <div className="h-1 w-20 bg-emerald-800 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* VISUAL CONNECTIVE PIPELINE TIMELINE */}
          <div className="relative xl:flex xl:justify-between xl:items-start gap-4 space-y-8 xl:space-y-0">
            {/* Horizontal connection bar helper line for desktop viewports */}
            <div className="hidden xl:block absolute top-1/4 left-6 right-6 h-0.5 bg-slate-300 -z-0 pointer-events-none"></div>

            {workflowSteps.map((flow, idx) => (
              <div key={flow.step} className="relative bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col items-center text-center max-w-md mx-auto xl:mx-0 xl:w-1/5 z-10 group hover:border-emerald-700 transition-colors">
                <div className="absolute -top-4 bg-emerald-800 text-white font-mono text-xs font-bold px-3 py-0.5 rounded-full shadow-sm">
                  {flow.step}
                </div>
                
                <div className="text-3xl mt-2 mb-4 bg-slate-50 h-14 w-14 rounded-full flex items-center justify-center border border-slate-100 group-hover:bg-emerald-50 transition-colors">
                  {flow.icon}
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">{flow.title}</h4>
                  <span className="inline-block text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-sm">
                    {flow.source}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-sans mt-4">
                  {flow.desc}
                </p>

                {/* Vertical visual block connectors for mobile viewport spacing contexts */}
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