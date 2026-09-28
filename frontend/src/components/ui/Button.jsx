'use client';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className, loading, ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";
  const variants = {
    primary: "bg-gradient-to-r from-primary-800 to-primary-900 text-white shadow-premium hover:shadow-premium-hover border border-primary-700/50",
    secondary: "bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-premium hover:shadow-glow border border-saffron-400/50",
    outline: "border-2 border-primary-900/20 text-primary-900 hover:bg-primary-50/50 hover:border-primary-900/40 backdrop-blur-sm",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:shadow-lg border border-red-400/50",
    ghost: "text-gray-600 hover:text-primary-900 hover:bg-gray-100/50",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={twMerge(clsx(base, variants[variant], sizes.md, className))} 
      disabled={loading} 
      {...props}
    >
      {/* Subtle shine effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      
      <span className="relative z-10 flex items-center justify-center">
        {loading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {children}
      </span>
    </motion.button>
  );
}
