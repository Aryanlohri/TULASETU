import { twMerge } from 'tailwind-merge';

export default function Badge({ children, type = 'default', className }) {
  const types = {
    VERIFIED: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    PENDING: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    REJECTED: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    WEIGHING: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    default: 'bg-slate-500/10 text-slate-300 border border-slate-500/20'
  };
  
  return (
    <span className={twMerge("px-2.5 py-0.5 rounded-full text-xs font-semibold", types[type] || types.default, className)}>
      {children}
    </span>
  );
}
