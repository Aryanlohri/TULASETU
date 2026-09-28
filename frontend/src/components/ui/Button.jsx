import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Button({ children, variant = 'primary', className, loading, ...props }) {
  const base = "inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-primary-900 text-white hover:bg-primary-800 shadow-sm",
    secondary: "bg-saffron-500 text-white hover:bg-saffron-600 shadow-sm",
    outline: "border-2 border-primary-900 text-primary-900 hover:bg-primary-50",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    ghost: "text-gray-600 hover:text-primary-900 hover:bg-gray-100",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button className={twMerge(clsx(base, variants[variant], sizes.md, className))} disabled={loading} {...props}>
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
}
