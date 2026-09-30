import { useEffect, useState } from 'react';
import api from '../services/api';
import Loading from '../components/Loading';
import { formatMoney } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

const Budget = () => {
  const { showToast } = useToast();
  const [budget, setBudget] = useState({ monthlyBudget: 0, spent: 0, remaining: 0, progress: 0 });
  const [inputBudget, setInputBudget] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchBudget = async () => {
    try {
      const response = await api.get('/budget');
      setBudget(response.data);
      setInputBudget(String(response.data.monthlyBudget || ''));
    } catch (error) {
      console.error('Budget fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await api.put('/budget', { monthlyBudget: Number(inputBudget) });
      setBudget(response.data);
      setInputBudget(String(response.data.monthlyBudget));
      showToast('success', 'Budget updated successfully');
    } catch (error) {
      const message = error.response?.data?.message || 'Budget update failed';
      console.error(message);
      showToast('error', message);
    } finally {
      setSaving(false);
    }
  };

  const progressColor = budget.progress >= 100 ? 'bg-rose-500' : budget.progress >= 75 ? 'bg-amber-500' : 'bg-emerald-500';

  if (loading) {
    return <Loading message="Loading budget..." />;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Planning</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">Monthly Budget</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Budget Overview</h2>
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${budget.progress >= 100 ? 'bg-rose-100 text-rose-700' : budget.progress >= 75 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {budget.progress >= 100 ? 'Over budget' : budget.progress >= 75 ? 'Close to limit' : 'Healthy'}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <span className="text-sm text-slate-500">Monthly Budget</span>
              <strong className="text-2xl font-bold text-slate-800">{formatMoney(budget.monthlyBudget)}</strong>
            </div>

            <div className="flex items-end justify-between">
              <span className="text-sm text-slate-500">Spent</span>
              <strong className="text-xl font-semibold text-slate-800">{formatMoney(budget.spent)}</strong>
            </div>

            <div className="flex items-end justify-between">
              <span className="text-sm text-slate-500">Remaining</span>
              <strong className={`text-xl font-semibold ${budget.remaining >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{formatMoney(budget.remaining)}</strong>
            </div>

            <div className="overflow-hidden rounded-full bg-slate-200">
              <div className={`h-3 rounded-full ${progressColor}`} style={{ width: `${Math.min(budget.progress, 100)}%` }} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">Set Monthly Budget</h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Budget Amount</label>
              <input
                type="number"
                min="0"
                value={inputBudget}
                onChange={(e) => setInputBudget(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-indigo-400"
                placeholder="20000"
              />
            </div>

            <button type="submit" disabled={saving} className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:bg-indigo-400">
              {saving ? 'Updating...' : 'Save Budget'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Budget;
