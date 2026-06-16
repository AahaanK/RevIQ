export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <span className="text-xl font-black text-white tracking-wider">RevIQ</span>
          <p className="mt-2 text-slate-500">AI-Powered Sentiment Ingestion for Trishul Eco-Homestays.</p>
        </div>
        <div></div> {/* Spacer */}
        <div className="text-right text-xs text-slate-600 self-end">
          &copy; {new Date().getFullYear()} RevIQ Core Platforms. All rights reserved.
        </div>
      </div>
    </footer>
  );
}