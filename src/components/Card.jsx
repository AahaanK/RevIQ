export default function Card({ title, description, image, actionLabel }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition">
      {image && (
        <div className="h-48 w-full bg-slate-100">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
        </div>
        {actionLabel && (
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-400 self-start transition">
            {actionLabel} →
          </button>
        )}
      </div>
    </div>
  );
}