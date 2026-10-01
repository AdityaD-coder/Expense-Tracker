const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-3 text-[var(--text-secondary)]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--loading-border)] border-t-[var(--loading-accent)]" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default Loading;
