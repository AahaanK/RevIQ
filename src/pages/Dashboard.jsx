export default function Dashboard() {
  const sampleDataMatrix = [
    { id: 'TX-104', review: "The hot water system inside the cabin took 15 minutes to warm up.", sentiment: "Negative", theme: "Experience", action: "Booster stove dispatch ordered" },
    { id: 'TX-105', review: "Stunning forest environment! The organic dishes were highly incredible.", sentiment: "Positive", theme: "Food & Location", action: "Standard thank-you draft sent" },
    { id: 'TX-106', review: "The wilderness cabin was lovely, but trails were slightly dark at midnight.", sentiment: "Neutral", theme: "Security / Trails", action: "Solar marker deployment flagged" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title Header Panel */}
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Review Ingestion Matrix</h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">Structured telemetry breakdown of incoming Trishul Eco-Homestay reviews.</p>
        </div>
        <button className="bg-rose-800 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-lg transition-all shadow-md shrink-0 active:translate-y-px">
          Bulk CSV Stream Ingestion
        </button>
      </div>

      {/* Modern High-Density Table Component Grid */}
      <div className="bg-white border border-stone-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 text-[10px] font-bold uppercase tracking-widest font-mono">
                <th className="p-4 sm:p-5">Log Token</th>
                <th className="p-4 sm:p-5">Extracted Feedback String</th>
                <th className="p-4 sm:p-5">Sentiment Label</th>
                <th className="p-4 sm:p-5">Target Theme Node</th>
                <th className="p-4 sm:p-5">Assigned Operations Action</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm divide-y divide-stone-100 text-stone-700 font-sans">
              {sampleDataMatrix.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/40 transition-colors">
                  <td className="p-4 sm:p-5 font-mono font-bold text-emerald-950">{item.id}</td>
                  <td className="p-4 sm:p-5 max-w-xs truncate text-stone-600 font-medium">{item.review}</td>
                  <td className="p-4 sm:p-5 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-[9px] font-bold rounded-md uppercase tracking-wider border ${
                      item.sentiment === 'Positive' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                      item.sentiment === 'Neutral' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-rose-50 text-rose-900 border-rose-200'
                    }`}>
                      {item.sentiment}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs text-stone-500 whitespace-nowrap">{item.theme}</td>
                  <td className="p-4 sm:p-5 text-rose-950 font-semibold italic whitespace-nowrap">{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}