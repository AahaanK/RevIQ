/**
 * @typedef {Object} InputProps
 * @property {string} label - Contextual floating header text assigned above the field bounding box.
 * @property {string} [error] - Explicit system failure alert message string; colors input borders red when active.
 * @property {string} [helperText] - Inline text snippet giving users input context guidance.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} [props] - Traditional element text properties.
 */

/**
 * Structured Data Input Terminal Box.
 * @param {InputProps} param0
 */
export default function Input({ 
  label, 
  error, 
  helperText, 
  className = '', 
  id,
  ...props 
}) {
  return (
    <div className={`w-full text-left flex flex-col space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-white border text-sm px-4 py-3 rounded-md shadow-xs transition-colors focus:outline-none focus:ring-2 placeholder:text-slate-400 ${
          error 
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200 text-rose-900' 
            : 'border-slate-200 focus:border-emerald-800 focus:ring-emerald-100 text-slate-800'
        }`}
        {...props}
      />
      {error && (
        <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
          ⚠️ {error}
        </p>
      )}
      {!error && helperText && (
        <p className="text-[11px] text-slate-400 font-sans">{helperText}</p>
      )}
    </div>
  );
}