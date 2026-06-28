/**
 * @typedef {Object} LoaderProps
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Dimensional pixel thickness parameters.
 * @property {boolean} [fullScreen=false] - When true, transforms structural canvas to map an entire viewport cover layout block.
 */

/**
 * High-performance System Telemetry Processing Spinner.
 * @param {LoaderProps} param0
 */
export default function Loader({ size = 'md', fullScreen = false }) {
  const dimensions = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4'
  };

  const structure = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div 
        className={`animate-spin rounded-full border-t-emerald-700 border-slate-200 ${dimensions[size]}`}
        style={{ borderStyle: 'solid' }}
      />
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 animate-pulse">
        Syncing Matrix Pipeline
      </span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-50/80 backdrop-blur-xs flex items-center justify-center">
        {structure}
      </div>
    );
  }

  return <div className="py-6 flex items-center justify-center w-full">{structure}</div>;
}