import { Link } from 'react-router-dom';

const EmptyState = ({ title, message, buttonText = 'Add Expense', buttonLink = '/add-expense' }) => {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--empty-border)] bg-[var(--bg-card)] p-8 text-center shadow-[var(--shadow-soft)]">
      <h3 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{message}</p>
      <Link
        to={buttonLink}
        className="mt-5 inline-flex items-center rounded-xl bg-[var(--button-primary-bg)] px-4 py-2 text-sm font-medium text-[var(--button-primary-text)] transition hover:bg-[var(--button-primary-hover)]"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default EmptyState;
