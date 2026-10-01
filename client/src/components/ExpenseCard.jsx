import { formatDate, formatMoney } from '../utils/helpers';

const ExpenseCard = ({ expense, onView, onEdit, onDelete }) => {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-soft)] md:hidden">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">{expense.title}</h3>
          <p className="mt-1 text-xs text-[var(--text-muted)]">{formatDate(expense.date)}</p>
        </div>
        <span className="text-base font-bold text-[var(--text-primary)]">{formatMoney(expense.amount)}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--text-secondary)]">
        <span className="rounded-full bg-[var(--tag-bg)] px-2 py-1 text-[var(--tag-text)]">{expense.category}</span>
        <span className="rounded-full bg-[var(--bg-muted)] px-2 py-1">{expense.paymentMethod}</span>
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={() => onView(expense)} className="flex-1 rounded-xl border border-[var(--border-subtle)] px-3 py-2 text-sm font-medium text-[var(--text-secondary)]">View</button>
        <button onClick={() => onEdit(expense._id)} className="flex-1 rounded-xl bg-[var(--button-primary-bg)] px-3 py-2 text-sm font-medium text-[var(--button-primary-text)]">Edit</button>
        <button onClick={() => onDelete(expense)} className="flex-1 rounded-xl bg-[var(--error-bg)] px-3 py-2 text-sm font-medium text-[var(--error-text)]">Delete</button>
      </div>
    </div>
  );
};

export default ExpenseCard;
