'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { Scale, XCircle } from 'lucide-react';

interface VerifiedSealProps {
  status: 'valid' | 'invalid';
  className?: string;
}

export default function VerifiedSeal({ status, className = '' }: VerifiedSealProps) {
  const shouldReduceMotion = useReducedMotion();
  const isValid = status === 'valid';

  const color = isValid ? 'text-indiaGreen' : 'text-signalRed';
  const borderColor = isValid ? 'border-indiaGreen' : 'border-signalRed';
  
  const stampVariants = {
    hidden: { scale: 2, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 20, 
        duration: 0.3 
      }
    }
  };

  const inkSpreadVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1.1, 
      opacity: 0,
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        delay: 0.1
      }
    }
  };

  return (
    <div className={`relative flex items-center justify-center w-24 h-24 ${className}`}>
      {/* Ink Spread Effect */}
      {!shouldReduceMotion && (
        <motion.div
          variants={inkSpreadVariants}
          initial="hidden"
          animate="visible"
          className={`absolute inset-0 rounded-full border-2 ${borderColor} opacity-50`}
        />
      )}

      {/* Main Seal */}
      <motion.div
        variants={!shouldReduceMotion ? stampVariants : {}}
        initial={!shouldReduceMotion ? "hidden" : false}
        animate={!shouldReduceMotion ? "visible" : false}
        className={`relative z-10 flex items-center justify-center w-full h-full rounded-full border-[3px] ${borderColor} ${!isValid && 'border-dashed'}`}
      >
        <div className={`flex items-center justify-center w-[85%] h-[85%] rounded-full border ${borderColor}`}>
          {isValid ? (
            <Scale className={`w-8 h-8 ${color} opacity-90`} strokeWidth={1.5} />
          ) : (
            <XCircle className={`w-8 h-8 ${color} opacity-90`} strokeWidth={1.5} />
          )}
        </div>
        
        {/* Seal Text SVG overlay could go here in future */}
      </motion.div>
    </div>
  );
}
