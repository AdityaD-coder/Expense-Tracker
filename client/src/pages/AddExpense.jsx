import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const AddExpense = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError('');

    try {
      await api.post('/expenses', formData);
      showToast('success', 'Expense added successfully');
      navigate('/expenses');
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to create expense.';
      setError(message);
      showToast('error', message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Manage</p>
        <h1 className="mt-1 text-3xl font-bold text-[var(--text-primary)]">Add Expense</h1>
      </div>

      {error && <p className="rounded-xl bg-[var(--error-bg)] px-3 py-2 text-sm text-[var(--error-text)]">{error}</p>}

      <ExpenseForm onSubmit={handleSubmit} submitLabel="Add Expense" isSubmitting={submitting} />
    </div>
  );
};

export default AddExpense;
