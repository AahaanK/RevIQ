import { Link } from 'react-router-dom';

export default function Home() {
  const featureSummaries = [
    {
      title: 'Action Priority AI',
      desc: 'Isolates high-criticality vulnerabilities inside feedback strings instantly, calculating risk tiers and outputting structural solutions.',
      path: '/priority-ai',
      icon: '🎯'
    },
    {
      title: 'Silent Dissatisfaction Detector',
      desc: 'Unearths masked passive friction metrics buried deep inside structurally polite or glowing customer commentary strings.',
      path: '/dissatisfaction-tracker',
      icon: '🔍'
    },
    {
      title: 'Experience Recovery Predictor',
      desc: 'Formulates probabilistic churn vectors to assess guest retention margins and automate systemic recovery layouts.',
      path: '/recovery-predictor',
      icon: '📈'
    }
  ];

  return (
    <div className="w-full bg-stone-50">
      
      {/* 1. HERO SECTION: Spans cleanly from edge-to-edge to correct "zoomed out" margins */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 text-white w-full py-20 lg:py-28 px-6 md:px-12 lg:px-24 border-b-4 border-rose-900 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none hidden xl:block">
          <span className="text-[260px] font-black tracking-tighter select-none">REVIQ</span>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6 text-left">
            <span className="inline-block bg-rose-900/50 border border-rose-800 text-rose-200 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
              Hospitality Analytics Automation
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              Transforming Customer Review Data Into <span className="text-emerald-400">Operational Precision</span>
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              RevIQ functions as Trishul Eco-Homestays administrative automation baseline. Process unstructured feedback strings, neutralize churn probabilities, and automate text templates instantly.
            </p>
            
            <div className="p-4 border-l-4 border-rose-800 bg-stone-950/40 rounded-r-lg max-w-2xl">
              <p className="text-stone-200 italic text-xs sm:text-sm font-serif leading-relaxed">
                "Our reputation rests on our agility. RevIQ strips away diagnostic delay, giving our staff immediate clarity on core systemic feedback loops."
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link 
                to="/priority-ai" 
                className="bg-rose-800 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-lg shadow-lg shadow-rose-950/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Launch Analysis Stack
              </Link>
              <Link 
                to="/dashboard" 
                className="bg-emerald-950 border border-emerald-800 hover:border-emerald-700 text-stone-200 hover:text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-lg transition-colors shadow-inner"
              >
                View Historical Log Matrix
              </Link>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4 justify-self-center w-full">
            <div className="bg-emerald-900/20 p-4 border border-emerald-800/40 rounded-2xl backdrop-blur-xs">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80" 
                alt="System Mesh Visualizer Architecture" 
                className="rounded-xl shadow-2xl object-cover h-64 w-full mix-blend-luminosity brightness-110"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 2. CAPABILITIES GRID: Uses optimal multi-column flex ratios to sit balanced on large screens */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-8 py-20 space-y-12">
        
        <div className="border-b border-stone-200 pb-4 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-900 block mb-1">System Processing Segments</span>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight">Active Analytics Architectures</h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">Select an isolated telemetry terminal workspace below to begin processing copied guest logs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featureSummaries.map((feat) => (
            <div 
              key={feat.title} 
              className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group border-t-4 border-t-stone-300 hover:border-t-emerald-900 relative"
            >
              <div className="space-y-4">
                <div className="text-2xl bg-stone-50 h-12 w-12 rounded-lg flex items-center justify-center border border-stone-200 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-emerald-950 tracking-tight group-hover:text-emerald-900 transition-colors">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">{feat.desc}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-stone-100">
                <Link 
                  to={feat.path} 
                  className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-rose-900 group-hover:text-emerald-900 transition-colors"
                >
                  Access Terminal Core <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}