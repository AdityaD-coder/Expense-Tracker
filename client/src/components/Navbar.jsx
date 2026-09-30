import { Menu, LogOut } from 'lucide-react';

const Navbar = ({ user, onLogout, onToggleSidebar, mobileMenuOpen }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden"
          >
            <Menu size={18} />
          </button>
          <div>
            <p className="text-lg font-bold text-slate-800">ExpenseTrack</p>
            <p className="text-xs text-slate-500">Personal expense dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 md:block">
            {user?.name || 'User'}
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
