'use client';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <motion.div 
      whileHover={hover ? { y: -5, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={twMerge(
        "gov-glass", 
        hover && "hover:shadow-premium-hover hover:border-primary-100 transition-all duration-300",
        className
      )} 
      {...props}
    >
      {children}
    </motion.div>
  );
}
