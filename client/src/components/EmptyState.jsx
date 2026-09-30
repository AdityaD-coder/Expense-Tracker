import { Link } from 'react-router-dom';

const EmptyState = ({ title, message, buttonText = 'Add Expense', buttonLink = '/add-expense' }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{message}</p>
      <Link
        to={buttonLink}
        className="mt-5 inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default EmptyState;
