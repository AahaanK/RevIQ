/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - The text or elements to render inside the button.
 * @property {'primary' | 'secondary' | 'outline' | 'danger'} [variant='primary'] - The visual style variant.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The size tier of the button padding and typography.
 * @property {boolean} [isLoading=false] - If true, rendering transitions to a disabled loading state.
 * @property {React.ButtonHTMLAttributes<HTMLButtonElement>} [props] - Any valid standard HTML button attributes.
 */

/**
 * Premium design system Button component.
 * @param {ButtonProps} param0 
 */
export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  className = '', 
  disabled,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs';
  
  const variants = {
    primary: 'bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-600 focus:ring-emerald-500',
    secondary: 'bg-emerald-950 hover:bg-emerald-900 text-emerald-100 border border-emerald-900 focus:ring-emerald-800',
    outline: 'bg-transparent border border-slate-300 hover:border-emerald-700 text-slate-700 hover:text-emerald-800 focus:ring-emerald-700',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white border border-rose-600 focus:ring-rose-500',
  };

  const sizes = {
    sm: 'text-[10px] px-4 py-2 gap-1.5',
    md: 'text-xs px-6 py-3 gap-2',
    lg: 'text-sm px-8 py-4 gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
}