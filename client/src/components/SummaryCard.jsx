const SummaryCard = ({ title, value, accent = 'indigo' }) => {
  const accentStyles = {
    indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200',
    green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200',
    red: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200',
    blue: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200',
  };

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-[var(--text-muted)]">{title}</p>
        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${accentStyles[accent] || accentStyles.indigo}`}>
          •
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">{value}</p>
    </div>
  );
};

export default SummaryCard;
