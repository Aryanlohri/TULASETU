'use client';
import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

export type TulaLoaderState = 'loading' | 'verifying' | 'success' | 'error';
export type TulaLoaderSize = 'button' | 'overlay' | 'full';

interface TulaLoaderProps {
  state?: TulaLoaderState;
  size?: TulaLoaderSize;
  caption?: string;
}

export default function TulaLoader({ 
  state = 'loading', 
  size = 'overlay',
  caption 
}: TulaLoaderProps) {
  const beamControls = useAnimation();
  const panControls = useAnimation();
  const pivotControls = useAnimation();
  const sealControls = useAnimation();
  const [show, setShow] = useState(false);

  // Prevent flicker for very fast operations (wait 400ms before showing)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const runLoadingLoop = async () => {
      while (isMounted && (state === 'loading' || state === 'verifying')) {
        // Add tiny random kick
        const kick = -8 + (Math.random() * 2 - 1);
        
        // Beam swing sequence
        beamControls.set({ rotate: kick });
        panControls.set({ rotate: -kick });
        pivotControls.set({ fill: '#C85F00', opacity: 1 });
        
        await Promise.all([
          beamControls.start({ 
            rotate: [kick, 6, -3, 1.5, 0, 0], 
            transition: { duration: 1.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: "easeInOut" } 
          }),
          panControls.start({ 
            rotate: [-kick, -6, 3, -1.5, 0, 0], 
            transition: { duration: 1.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: "easeInOut" } 
          })
        ]);

        if (!isMounted || (state !== 'loading' && state !== 'verifying')) break;

        // Flash green when settled
        await pivotControls.start({ fill: '#138808', opacity: [0.4, 1, 0.4] }, { duration: 0.2 });
        await pivotControls.start({ fill: '#C85F00', opacity: 1 }, { duration: 0.2 });
        
        // Hold before looping
        await new Promise(r => setTimeout(r, 400));
      }
    };

    if (state === 'loading' || state === 'verifying') {
      sealControls.set({ pathLength: 0, opacity: 0 });
      runLoadingLoop();
    } else if (state === 'success') {
      beamControls.start({ rotate: 0, transition: { type: "spring", stiffness: 200, damping: 20 } });
      panControls.start({ rotate: 0, transition: { type: "spring", stiffness: 200, damping: 20 } });
      pivotControls.start({ fill: '#138808' });
      sealControls.start({ pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } });
    } else if (state === 'error') {
      beamControls.start({ rotate: 10, transition: { type: "spring", stiffness: 200, damping: 20 } });
      panControls.start({ rotate: -10, transition: { type: "spring", stiffness: 200, damping: 20 } });
      pivotControls.start({ fill: '#C62828' });
      sealControls.start({ pathLength: 0.8, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } });
    }

    return () => { isMounted = false; };
  }, [state, beamControls, panControls, pivotControls, sealControls]);

  if (!show) return <div className="hidden" aria-hidden="true" />;

  // Dynamic Captions
  const [captionText, setCaptionText] = useState(caption || 'Weighing the details');
  useEffect(() => {
    if (caption) {
      setCaptionText(caption);
      return;
    }
    if (state === 'success') { setCaptionText('Verified'); return; }
    if (state === 'error') { setCaptionText('Verification Failed'); return; }
    
    const phrases = ['Weighing the details', 'Checking the ledger', 'Nearly done'];
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % phrases.length;
      setCaptionText(phrases[i]);
    }, 2000);
    return () => clearInterval(t);
  }, [state, caption]);

  const pxSizes = { button: 16, overlay: 48, full: 96 };
  const hidePans = size === 'button';
  const strokeWidth = size === 'button' ? 8 : 4;
  const markColor = '#0B2A4A';
  const panColor = state === 'error' ? '#C62828' : '#C85F00';

  return (
    <div 
      className={`flex flex-col items-center justify-center ${size === 'full' ? 'min-h-[400px] w-full' : ''}`}
      role="status" 
      aria-live="polite"
    >
      <motion.svg 
        viewBox="-10 -10 180 180" 
        width={pxSizes[size]} 
        height={pxSizes[size]} 
        className="overflow-visible"
        initial={state === 'success' ? { scale: 0.95 } : { scale: 1 }}
        animate={state === 'success' ? { scale: 1 } : { scale: 1 }}
        transition={{ type: "spring" }}
      >
        {/* Seal Ring */}
        <motion.circle 
          cx="80" cy="80" r="76" 
          fill="none" 
          stroke={state === 'success' ? '#138808' : '#C62828'} 
          strokeWidth="3" 
          strokeDasharray="477"
          animate={sealControls}
          initial={{ pathLength: 0, opacity: 0 }}
          style={{ rotate: -90, transformOrigin: '80px 80px' }}
        />

        {/* Pillar & Base */}
        <path d="M 80 42 L 80 120 M 60 120 L 100 120" stroke={markColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        
        {/* Animated Beam Group */}
        <motion.g animate={beamControls} style={{ transformOrigin: '80px 42px' }}>
          <path d="M 30 60 Q 80 24 130 60" stroke={markColor} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
          
          {/* Left Pan Group (Counter-rotates) */}
          {!hidePans && (
            <motion.g animate={panControls} style={{ transformOrigin: '30px 60px' }}>
              <path d="M 30 60 L 8 100 M 30 60 L 52 100" stroke={markColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 8 100 L 52 100" stroke={panColor} strokeWidth={4} strokeLinecap="round" fill="none" />
            </motion.g>
          )}

          {/* Right Pan Group (Counter-rotates) */}
          {!hidePans && (
            <motion.g animate={panControls} style={{ transformOrigin: '130px 60px' }}>
              <path d="M 130 60 L 108 100 M 130 60 L 152 100" stroke={markColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 108 100 L 152 100" stroke={state === 'error' ? markColor : panColor} strokeWidth={4} strokeLinecap="round" fill="none" />
            </motion.g>
          )}
        </motion.g>

        {/* Pivot */}
        <motion.circle cx="80" cy="42" r={hidePans ? 8 : 5} animate={pivotControls} initial={{ fill: '#C85F00' }} />
      </motion.svg>

      {/* Progress Hash Line for 'verifying' */}
      {state === 'verifying' && size !== 'button' && (
        <div className="w-32 mt-6 h-1 bg-slate-200 overflow-hidden relative">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-ink-navy" 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Caption */}
      {size === 'full' && (
        <motion.p 
          className={`mt-4 text-sm font-semibold font-mono uppercase tracking-wider ${state === 'success' ? 'text-indiaGreen' : state === 'error' ? 'text-signalRed' : 'text-slate-500'}`}
          key={captionText}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {captionText}
        </motion.p>
      )}
    </div>
  );
}
