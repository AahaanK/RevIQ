/**
 * @typedef {Object} ModalProps
 * @property {boolean} isOpen - Conditional toggle checking if layout panel visibility status is live.
 * @property {function} onClose - Execution handler clearing visibility back to false.
 * @property {string} [title] - Clear contextual structural header label rendered at the top layout bar.
 * @property {React.ReactNode} children - Core configuration layouts rendered into the container panel.
 */

/**
 * Dialog Box overlay canvas.
 * @param {ModalProps} param0
 */
export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dynamic Blurred Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Surface Frame */}
      <div className="relative bg-white border border-slate-200 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden z-10 transition-transform duration-300 scale-100">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
            {title || 'System Operation'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 transition-colors rounded-lg p-1 hover:bg-slate-200/60 focus:outline-none"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 text-slate-600 text-sm leading-relaxed max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}