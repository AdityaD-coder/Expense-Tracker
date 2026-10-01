import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatDateTime } from '../utils/helpers';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to update profile');
      }

      setUser((prev) => ({ ...prev, name: data.name }));
      showToast('success', 'Profile updated successfully');
    } catch (error) {
      const message = error.message || 'Unable to update profile';
      console.error(message);
      showToast('error', message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Account</p>
        <h1 className="mt-1 text-3xl font-bold text-[var(--text-primary)]">Profile</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Account Information</h2>
          <div className="mt-5 space-y-4 text-sm text-[var(--text-secondary)]">
            <div className="flex items-center justify-between rounded-xl bg-[var(--bg-muted)] p-3">
              <span>Name</span>
              <strong className="text-[var(--text-primary)]">{user?.name}</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-[var(--bg-muted)] p-3">
              <span>Email</span>
              <strong className="text-[var(--text-primary)]">{user?.email}</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-[var(--bg-muted)] p-3">
              <span>Account Created</span>
              <strong className="text-[var(--text-primary)]">{formatDateTime(user?.createdAt)}</strong>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Update Name</h2>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">Your Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-input)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--border-emphasis)]"
              placeholder="Enter your name"
            />
          </div>
          <button type="submit" disabled={saving} className="mt-5 rounded-xl bg-[var(--button-primary-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--button-primary-text)] hover:bg-[var(--button-primary-hover)] disabled:opacity-70">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
