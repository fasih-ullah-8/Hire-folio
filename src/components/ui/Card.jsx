export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900 ${
        hover
          ? 'transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
