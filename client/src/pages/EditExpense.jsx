import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import Loading from '../components/Loading';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await api.get(`/expenses/${id}`);
        setExpense(response.data);
      } catch (err) {
        setError('Unable to load this expense.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError('');

    try {
      await api.put(`/expenses/${id}`, formData);
      showToast('success', 'Expense updated successfully');
      navigate('/expenses');
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to update expense.';
      setError(message);
      showToast('error', message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading message="Loading expense details..." />;
  }

  if (!expense) {
    return <div className="p-6 text-slate-600">Expense not found.</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Manage</p>
        <h1 className="mt-1 text-3xl font-bold text-[var(--text-primary)]">Edit Expense</h1>
      </div>

      {error && <p className="rounded-xl bg-[var(--error-bg)] px-3 py-2 text-sm text-[var(--error-text)]">{error}</p>}

      <ExpenseForm initialData={expense} onSubmit={handleSubmit} submitLabel="Update Expense" isSubmitting={submitting} />
    </div>
  );
};

export default EditExpense;
