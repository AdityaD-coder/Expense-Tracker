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
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : toast.type === 'error'
                ? 'border-rose-200 bg-rose-50 text-rose-700'
                : 'border-indigo-200 bg-indigo-50 text-indigo-700'
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
