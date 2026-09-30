const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-3 text-slate-600">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default Loading;
