import { formatDate, formatMoney } from '../utils/helpers';

const ExpenseCard = ({ expense, onView, onEdit, onDelete }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:hidden">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-800">{expense.title}</h3>
          <p className="mt-1 text-xs text-slate-500">{formatDate(expense.date)}</p>
        </div>
        <span className="text-base font-bold text-slate-800">{formatMoney(expense.amount)}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
        <span className="rounded-full bg-indigo-50 px-2 py-1 text-indigo-700">{expense.category}</span>
        <span className="rounded-full bg-slate-100 px-2 py-1">{expense.paymentMethod}</span>
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={() => onView(expense)} className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">View</button>
        <button onClick={() => onEdit(expense._id)} className="flex-1 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white">Edit</button>
        <button onClick={() => onDelete(expense)} className="flex-1 rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">Delete</button>
      </div>
    </div>
  );
};

export default ExpenseCard;
