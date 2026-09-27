import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>}
      <input 
        ref={ref}
        className={twMerge(
          "w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all",
          error && "border-rose-500 focus:ring-rose-500/50 focus:border-rose-500",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-rose-400">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
