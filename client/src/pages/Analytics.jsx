import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Loading from '../components/Loading';
import api from '../services/api';
import { categoryColors, formatMoney } from '../utils/helpers';

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get('/expenses/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Analytics fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <Loading message="Loading analytics..." />;
  }

  if (!summary) {
    return <div className="p-6 text-slate-600">Unable to load analytics data.</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Insights</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">Analytics</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Category Distribution</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={summary.categoryBreakdown} dataKey="total" nameKey="category" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {summary.categoryBreakdown.map((entry) => (
                    <Cell key={entry.category} fill={categoryColors[entry.category] || '#64748b'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatMoney(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {summary.categoryBreakdown.map((item) => (
              <div key={item.category} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: categoryColors[item.category] || '#64748b' }} />
                  <span className="text-slate-600">{item.category}</span>
                </div>
                <span className="font-medium text-slate-700">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Monthly Expenses</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.monthlyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip formatter={(value) => formatMoney(value)} />
                <Bar dataKey="total" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
