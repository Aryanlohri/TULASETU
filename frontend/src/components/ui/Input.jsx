import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className="w-full relative group">
      {label && <label className="block text-sm font-bold text-gray-700 mb-1.5 transition-colors group-focus-within:text-primary-900">{label}</label>}
      <input 
        ref={ref}
        className={twMerge(
          "w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200/80 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 shadow-sm hover:border-gray-300",
          error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-600 font-bold">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
