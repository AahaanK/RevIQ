export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Automated Sentiment Analytics Engine
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Welcome to <span className="text-emerald-400">RevIQ</span>
          </h1>
          <p className="text-base text-slate-300 max-w-md leading-relaxed">
            The intelligent review processing stack engineered for Trishul Eco-Homestays. Instantly extract sentiment vectors, categorize feedback core themes, and generate management action responses.
          </p>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-emerald-900/40 transition">
            Launch Ingestion Engine
          </button>
        </div>
        <div className="hidden lg:block justify-self-center">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" 
            alt="Eco Resort Space" 
            className="rounded-2xl shadow-2xl border border-slate-800 object-cover h-72 w-96 transform rotate-1 hover:rotate-0 transition duration-300"
          />
        </div>
      </div>
    </div>
  );
}