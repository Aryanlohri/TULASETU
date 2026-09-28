'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { Scale, XCircle } from 'lucide-react';

import TulaLoader from '@/components/ui/TulaLoader';

interface VerifiedSealProps {
  status: 'valid' | 'invalid';
  className?: string;
}

export default function VerifiedSeal({ status, className = '' }: VerifiedSealProps) {
  return (
    <div className={`relative flex items-center justify-center w-24 h-24 ${className}`}>
      <TulaLoader size="seal" state={status === 'valid' ? 'success' : 'error'} caption="" />
    </div>
  );
}
