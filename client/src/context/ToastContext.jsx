import { createContext, useContext, useMemo, useState } from 'react';

const ToastContext = createContext();

const ToastContainer = ({ toasts }) => {
  if (!toasts.length) return null;

  return (
    <div className="fixed right-4 top-4 z-50 flex w-[min(90vw,360px)] flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-xl border px-4 py-3 text-sm shadow-lg ${
            toast.type === 'success'
              ? 'border-[var(--success-border)] bg-[var(--success-bg)] text-[var(--success-text)]'
              : toast.type === 'error'
                ? 'border-[var(--error-border)] bg-[var(--error-bg)] text-[var(--error-text)]'
                : 'border-[var(--info-border)] bg-[var(--info-bg)] text-[var(--info-text)]'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
