const SummaryCard = ({ title, value, accent = 'indigo' }) => {
  const accentStyles = {
    indigo: 'bg-indigo-50 text-indigo-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    red: 'bg-rose-50 text-rose-700',
    blue: 'bg-sky-50 text-sky-700',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${accentStyles[accent] || accentStyles.indigo}`}>
          •
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
};

export default SummaryCard;
