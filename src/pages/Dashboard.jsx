export default function Dashboard() {
  const sampleMatrixData = [
    { id: 1, review: "The food at Trishul was locally sourced and incredible! The host was super warm.", sentiment: "Positive", theme: "Food & Host", response: "Thank you! We take pride in serving organic, local delicacies." },
    { id: 2, review: "Room cleanliness was amazing, but the eco-cabin was quite far from the main city roads.", sentiment: "Neutral", theme: "Cleanliness & Location", response: "Glad you enjoyed our pristine cabins! Our remote location preserves peace." },
    { id: 3, review: "Water heating system took almost 20 minutes to kick on in the eco-shower.", sentiment: "Negative", theme: "Experience", response: "Apologies for the delay; our solar power optimization grids are being tuned." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Insight Dashboard & Review Matrix</h1>
          <p className="text-slate-500 text-sm mt-1">Structured telemetry breakdown of incoming Trishul Eco-Homestay reviews.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition">
          Bulk Upload CSV
        </button>
      </div>

      {/* Review Matrix Interactive Table Mockup */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Raw Review Content</th>
                <th className="p-4">Sentiment</th>
                <th className="p-4">Extracted Theme</th>
                <th className="p-4">Suggested Management Action Response</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-slate-100 text-slate-700">
              {sampleMatrixData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 max-w-xs font-medium truncate">{item.review}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 font-bold rounded-full text-[10px] ${
                      item.sentiment === "Positive" ? "bg-green-100 text-green-800" :
                      item.sentiment === "Neutral" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                    }`}>
                      {item.sentiment}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-500">{item.theme}</td>
                  <td className="p-4 italic text-slate-600">"{item.response}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}