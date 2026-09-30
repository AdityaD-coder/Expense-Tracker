export const formatMoney = (value) => {
  const number = Number(value || 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(number);
};

export const formatDate = (value) => {
  if (!value) return 'N/A';
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateTime = (value) => {
  if (!value) return 'N/A';
  return new Date(value).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

export const categoryColors = {
  Food: '#4f46e5',
  Transport: '#0ea5e9',
  Shopping: '#f59e0b',
  Bills: '#ef4444',
  Entertainment: '#8b5cf6',
  Health: '#10b981',
  Education: '#14b8a6',
  Travel: '#ec4899',
  Other: '#64748b',
};
