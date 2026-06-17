export default function Login() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="text-center space-y-1">
          <div className="text-emerald-950 text-xl font-black tracking-tight">Staff Authentication</div>
          <p className="text-stone-500 text-xs">Enter credentials to connect to the secure Trishul database cluster.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-stone-500 tracking-wider">Staff Access Key</label>
            <input 
              type="text" 
              placeholder="ops-agent-id" 
              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-stone-500 tracking-wider">Security Cipher Phrase</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg shadow-xs transition-all active:translate-y-px mt-2"
          >
            Authorize Node Access
          </button>
        </form>

      </div>
    </div>
  );
}