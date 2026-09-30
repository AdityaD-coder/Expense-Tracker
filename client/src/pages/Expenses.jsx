import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseCard from '../components/ExpenseCard';
import EmptyState from '../components/EmptyState';
import Loading from '../components/Loading';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const categories = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Education', 'Travel', 'Other'];
const paymentMethods = ['All', 'Cash', 'UPI', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Other'];

const Expenses = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [paymentMethod, setPaymentMethod] = useState('All');
  const [sort, setSort] = useState('date-desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await api.get('/expenses', {
        params: { search, category, paymentMethod, sort, page, limit: 10 },
      });
      setExpenses(response.data.expenses);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Expense fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [search, category, paymentMethod, sort, page]);

  const handleDelete = async (expense) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this expense?\n\n${expense.title}`);

    if (!confirmDelete) return;

    try {
      await api.delete(`/expenses/${expense._id}`);
      showToast('success', 'Expense deleted successfully');
      fetchExpenses();
    } catch (error) {
      const message = error.response?.data?.message || 'Delete failed';
      console.error(message);
      showToast('error', message);
    }
  };

  const handleView = (expense) => {
    setSelectedExpense(expense);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Transactions</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Expenses</h1>
        </div>
        <button
          onClick={() => navigate('/add-expense')}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          + Add Expense
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title..."
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-indigo-400"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-indigo-400">
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-indigo-400">
            {paymentMethods.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-indigo-400">
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
          <button onClick={() => { setSearch(''); setCategory('All'); setPaymentMethod('All'); setSort('date-desc'); setPage(1); }} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Reset filters
          </button>
        </div>
      </div>

      {loading ? (
        <Loading message="Loading expenses..." />
      ) : expenses.length === 0 ? (
        <EmptyState title="No expenses yet" message="Start tracking your spending by adding your first expense." />
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {expenses.map((expense) => (
              <ExpenseCard key={expense._id} expense={expense} onView={handleView} onEdit={(id) => navigate(`/edit-expense/${id}`)} onDelete={handleDelete} />
            ))}
          </div>

          <ExpenseTable expenses={expenses} onView={handleView} onEdit={(id) => navigate(`/edit-expense/${id}`)} onDelete={handleDelete} />

          <div className="flex items-center justify-between">
            <button disabled={page === 1} onClick={() => setPage((current) => current - 1)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
            <span className="text-sm text-slate-600">Page {page} of {totalPages}</span>
            <button disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">Next</button>
          </div>
        </>
      )}

      {selectedExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Expense Details</h2>
              <button onClick={() => setSelectedExpense(null)} className="text-slate-500">Close</button>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between"><span>Title</span><strong className="text-slate-800">{selectedExpense.title}</strong></div>
              <div className="flex justify-between"><span>Amount</span><strong className="text-slate-800">₹{selectedExpense.amount}</strong></div>
              <div className="flex justify-between"><span>Category</span><strong className="text-slate-800">{selectedExpense.category}</strong></div>
              <div className="flex justify-between"><span>Date</span><strong className="text-slate-800">{new Date(selectedExpense.date).toLocaleDateString()}</strong></div>
              <div className="flex justify-between"><span>Payment Method</span><strong className="text-slate-800">{selectedExpense.paymentMethod}</strong></div>
              <div className="rounded-xl bg-slate-50 p-3 text-slate-700">
                <p className="mb-1 font-medium">Description</p>
                <p>{selectedExpense.description || 'No description provided.'}</p>
              </div>
              <div className="flex justify-between"><span>Created At</span><strong className="text-slate-800">{new Date(selectedExpense.createdAt).toLocaleString()}</strong></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
