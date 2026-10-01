import { formatDate, formatMoney } from '../utils/helpers';

const ExpenseTable = ({ expenses, onView, onEdit, onDelete }) => {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-[var(--shadow-soft)] md:block">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--border-subtle)]">
          <thead className="bg-[var(--bg-muted)]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Payment</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-card)]">
            {expenses.map((expense) => (
              <tr key={expense._id} className="hover:bg-[var(--bg-surface-elevated)]">
                <td className="px-4 py-3 text-sm font-medium text-[var(--text-primary)]">{expense.title}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{formatMoney(expense.amount)}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{expense.category}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{formatDate(expense.date)}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{expense.paymentMethod}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <button onClick={() => onView(expense)} className="rounded-lg border border-[var(--border-subtle)] px-2 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]">View</button>
                    <button onClick={() => onEdit(expense._id)} className="rounded-lg border border-indigo-300 bg-[var(--tag-bg)] px-2 py-1.5 text-xs font-medium text-[var(--tag-text)] hover:opacity-90">Edit</button>
                    <button onClick={() => onDelete(expense)} className="rounded-lg border border-rose-300 bg-[var(--error-bg)] px-2 py-1.5 text-xs font-medium text-[var(--error-text)] hover:opacity-90">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
