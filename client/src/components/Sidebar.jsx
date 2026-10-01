import { NavLink } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', to: '/dashboard', icon: '🏠' },
  { label: 'Expenses', to: '/expenses', icon: '💸' },
  { label: 'Add Expense', to: '/add-expense', icon: '➕' },
  { label: 'Analytics', to: '/analytics', icon: '📊' },
  { label: 'Budget', to: '/budget', icon: '💰' },
  { label: 'Profile', to: '/profile', icon: '👤' },
];

const Sidebar = ({ mobileOpen, onClose }) => {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-[var(--border-subtle)] bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] shadow-lg transition duration-200 md:static md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xl font-bold">ExpenseTrack</p>
              <p className="text-xs text-[var(--sidebar-text-muted)]">Financial overview</p>
            </div>
            <button
              type="button"
              className="rounded-lg border border-[var(--sidebar-border)] px-2 py-1 text-xs text-[var(--sidebar-text-muted)] md:hidden"
              onClick={onClose}
            >
              Close
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)] shadow-sm'
                      : 'text-[var(--sidebar-text-muted)] hover:bg-[var(--sidebar-hover-bg)] hover:text-[var(--sidebar-text)]'
                  }`
                }
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {mobileOpen && <button type="button" onClick={onClose} className="fixed inset-0 z-30 bg-[var(--backdrop)] md:hidden" aria-label="Close menu" />}
    </>
  );
};

export default Sidebar;
