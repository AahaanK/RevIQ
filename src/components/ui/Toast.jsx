import { useEffect } from 'react';

/**
 * @typedef {Object} ToastProps
 * @property {string} message - Descriptive text payload describing structural event execution results.
 * @property {'success' | 'error' | 'info'} [type='success'] - Diagnostic signaling theme type.
 * @property {function} onClose - Automatically terminates notification node instances.
 * @property {number} [duration=4000] - Lifespan timeout count in milliseconds before exit loop triggers.
 */

/**
 * Auto-dismiss System Event Alert Banner.
 * @param {ToastProps} param0
 */
export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    const clockTimer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(clockTimer);
  }, [duration, onClose]);

  const skins = {
    success: 'bg-emerald-950 border-emerald-500 text-emerald-100',
    error: 'bg-rose-950 border-rose-500 text-rose-100',
    info: 'bg-slate-900 border-slate-600 text-slate-100'
  };

  const statusIcons = {
    success: '✨',
    error: '💥',
    info: '⚙️'
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 border-l-4 px-5 py-4 rounded-r-lg shadow-xl max-w-sm border ${skins[type]}`}>
      <span className="text-lg">{statusIcons[type]}</span>
      <p className="text-xs font-bold tracking-wide font-sans">{message}</p>
      <button 
        onClick={onClose} 
        className="ml-4 text-slate-400 hover:text-white transition-colors focus:outline-none"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}