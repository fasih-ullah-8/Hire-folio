export default function Select({
  id,
  label,
  error,
  children,
  className = '',
  ...props
}) {
  return (
    <label className="block space-y-1.5" htmlFor={id}>
      {label && (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      )}
      <select
        id={id}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 dark:bg-slate-900 dark:text-slate-100 ${
          error
            ? 'border-rose-400 focus:border-rose-500'
            : 'border-slate-200 dark:border-slate-700'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>}
    </label>
  );
}
