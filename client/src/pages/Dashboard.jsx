import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import SummaryCard from '../components/SummaryCard';
import EmptyState from '../components/EmptyState';
import Loading from '../components/Loading';
import api from '../services/api';
import { formatDate, formatMoney } from '../utils/helpers';
import { categoryColors } from '../utils/helpers';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get('/expenses/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Dashboard data error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  if (!summary) {
    return <div className="p-6 text-slate-600">Unable to load dashboard data.</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Overview</p>
          <h1 className="mt-1 text-3xl font-bold text-[var(--text-primary)]">Dashboard</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Total Expenses" value={formatMoney(summary.totalExpenses)} accent="indigo" />
        <SummaryCard title="This Month" value={formatMoney(summary.monthlyExpenses)} accent="green" />
        <SummaryCard title="Today" value={formatMoney(summary.todayExpenses)} accent="amber" />
        <SummaryCard title="Transactions" value={String(summary.transactionCount)} accent="blue" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-soft)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Recent Transactions</h2>
          </div>

          {summary.recentExpenses && summary.recentExpenses.length > 0 ? (
            <div className="space-y-3">
              {summary.recentExpenses.map((expense) => (
                <div key={expense._id} className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3">
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{expense.title}</p>
                    <p className="text-xs text-[var(--text-muted)]">{expense.category} • {formatDate(expense.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--text-primary)]">-{formatMoney(expense.amount)}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">{expense.paymentMethod}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No transactions yet" message="Start tracking your spending by adding your first expense." />
          )}
        </div>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-soft)]">
          <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Category Breakdown</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={summary.categoryBreakdown} dataKey="total" nameKey="category" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {summary.categoryBreakdown.map((entry) => (
                    <Cell key={entry.category} fill={categoryColors[entry.category] || '#64748b'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatMoney(value)} contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', color: 'var(--text-primary)' }} labelStyle={{ color: 'var(--text-primary)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {summary.categoryBreakdown.map((item) => (
              <div key={item.category} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: categoryColors[item.category] || '#64748b' }} />
                  <span className="text-[var(--text-secondary)]">{item.category}</span>
                </div>
                <span className="font-medium text-[var(--text-primary)]">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-soft)]">
        <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Monthly Expense Summary</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summary.monthlyBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" stroke="var(--chart-text)" tick={{ fill: 'var(--chart-text)' }} />
              <YAxis stroke="var(--chart-text)" tick={{ fill: 'var(--chart-text)' }} />
              <Tooltip formatter={(value) => formatMoney(value)} contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', color: 'var(--text-primary)' }} labelStyle={{ color: 'var(--text-primary)' }} />
              <Bar dataKey="total" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
