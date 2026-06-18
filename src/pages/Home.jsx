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
    <div className="w-full bg-[#052214]">
      
      {/* HERO SECTION: Fully integrated with the rich dark canvas layout */}
      <div className="w-full py-20 lg:py-28 px-6 md:px-12 lg:px-24 border-b border-[#143d25] relative overflow-hidden bg-gradient-to-b from-[#041c10] to-[#052214]">
        <div className="absolute right-0 bottom-0 opacity-[0.02] pointer-events-none hidden xl:block">
          <span className="text-[260px] font-black tracking-tighter select-none text-[#F5F5DC]">REVIQ</span>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6 text-left">
            <span className="inline-block bg-[#143d25] border border-[#235839] text-[#D0E7D2] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
              Hospitality Analytics Automation
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-[#F5F5DC]">
              Transforming Customer Review Data Into <span className="text-[#D0E7D2]">Operational Precision</span>
            </h1>
            <p className="text-[#c2c2aa] text-sm sm:text-base leading-relaxed max-w-3xl">
              RevIQ functions as Trishul Eco-Homestays administrative automation baseline. Process unstructured feedback strings, neutralize churn probabilities, and automate text templates instantly.
            </p>
            
            <div className="p-4 border-l-4 border-[#1e4620] bg-[#041c10]/60 rounded-r-lg max-w-2xl">
              <p className="text-[#b0b095] italic text-xs sm:text-sm font-serif leading-relaxed">
                "Our reputation rests on our agility. RevIQ strips away diagnostic delay, giving our staff immediate clarity on core systemic feedback loops."
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link 
                to="/priority-ai" 
                className="bg-[#1e4620] border border-[#2d5a27] hover:bg-[#2d5a27] text-[#F5F5DC] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-md shadow-md transition-colors"
              >
                Launch Analysis Stack
              </Link>
              <Link 
                to="/dashboard" 
                className="bg-[#041c10] border border-[#143d25] hover:bg-[#082d1b] text-[#c2c2aa] hover:text-[#F5F5DC] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-md transition-colors"
              >
                View Historical Log Matrix
              </Link>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4 justify-self-center w-full">
            <div className="bg-[#041c10] p-4 border border-[#143d25] rounded-xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80" 
                alt="System Mesh Visualizer" 
                className="rounded-lg object-cover h-64 w-full opacity-60 mix-blend-luminosity hover:opacity-80 transition-opacity duration-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* CORE CAPABILITIES: Features beautiful transformational hover transitions */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-8 py-20 space-y-12">
        
        <div className="border-b border-[#143d25] pb-6 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D0E7D2] block mb-1">System Processing Segments</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F5F5DC] tracking-tight">Active Analytics Architectures</h2>
          <p className="text-[#c2c2aa] text-xs sm:text-sm mt-1">Select an isolated telemetry terminal workspace below to begin processing copied guest logs.</p>
        </div>

        {/* Dynamic Responsive Flex Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featureSummaries.map((feat) => (
            <div 
              key={feat.title} 
              className="premium-card-transition bg-[#041c10] border border-[#143d25] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-md hover:bg-[#D0E7D2] hover:text-[#052214] group"
            >
              <div className="space-y-4">
                {/* Icon Box Context */}
                <div className="premium-card-transition text-2xl bg-[#052214] h-12 w-12 rounded-lg flex items-center justify-center border border-[#143d25] group-hover:bg-[#b8d8ba] group-hover:border-[#96bd99]">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold tracking-tight text-[#F5F5DC] group-hover:text-[#052214] premium-card-transition">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#c2c2aa] group-hover:text-[#1c3a2b] leading-relaxed font-sans premium-card-transition">
                  {feat.desc}
                </p>
              </div>
              
              <div className="pt-6 mt-6 border-t border-[#143d25]/60 group-hover:border-[#1c3a2b]/20 premium-card-transition">
                <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#D0E7D2] group-hover:text-[#052214] premium-card-transition">
                  Access Terminal Core <span className="ml-2 transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}