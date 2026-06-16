export default function Login() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8 max-w-sm w-full space-y-6">
        <h2 className="text-2xl font-black text-center text-slate-900">Secure Access Portal</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">User Identifier</label>
            <input type="text" placeholder="user@reviq.local" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg transition">
            Execute Authorization
          </button>
        </form>
      </div>
    </div>
  );
}