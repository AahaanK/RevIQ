export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-slate-900">Project Parameters</h1>
        <p className="text-emerald-700 text-sm font-semibold uppercase tracking-wider">Trishul Eco-Homestays Intelligence Stack</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-4 text-slate-600 text-sm leading-relaxed">
        <p>
          The <strong>Guest Review Sentiment Classifier</strong> is engineered to serve as an operational optimization wrapper for eco-resort administration. By automating text ingestion analysis pipelines, the application reduces multi-hour evaluation processes to instantaneous metrics updates.
        </p>
        <p>
          Leveraging standard text vector tokenization models, the workspace classifies data feeds, flags experiential themes (Food, Host, Location, Cleanliness, Value, or Experience), and auto-formats conversational context templates to scale up overall digital guest service feedback metrics safely.
        </p>
      </div>
    </div>
  );
}