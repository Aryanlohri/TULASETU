'use client';
import React, { useState } from 'react';
import TulaLoader, { TulaLoaderState } from '@/components/ui/TulaLoader';

export default function LoadersDemo() {
  const [demoState, setDemoState] = useState<TulaLoaderState>('loading');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 pb-32">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <header className="border-b border-slate-200 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-serif font-bold text-ink-navy">Loader System</h1>
            <p className="text-slate-500 mt-2 font-mono text-sm">src/components/ui/TulaLoader.tsx</p>
          </div>
          
          <div className="flex bg-white rounded-md border hairline-border shadow-sm overflow-hidden text-sm font-semibold">
            {(['loading', 'verifying', 'success', 'error'] as TulaLoaderState[]).map(s => (
              <button 
                key={s}
                onClick={() => setDemoState(s)}
                className={`px-4 py-2 capitalize transition-colors ${demoState === s ? 'bg-ink-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink-navy">1. Full Page Loader (96px + Caption)</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-8 flex items-center justify-center">
             <TulaLoader state={demoState} size="full" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink-navy">2. Overlay / Skeleton Loader (48px)</h2>
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-12 flex items-center justify-center relative overflow-hidden">
             {/* Mock skeleton background */}
             <div className="absolute inset-0 p-8 space-y-4 opacity-10 pointer-events-none">
               <div className="h-8 bg-white w-1/3 rounded" />
               <div className="h-32 bg-white w-full rounded" />
               <div className="h-32 bg-white w-full rounded" />
             </div>
             
             {/* The Loader */}
             <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
               <TulaLoader state={demoState} size="overlay" />
             </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink-navy">3. Inline Button Loader (16px, Pans Removed)</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-8 flex items-center gap-4">
             <button className="bg-ink-navy text-white px-6 py-2.5 rounded-md font-semibold text-sm flex items-center gap-3">
               <TulaLoader state={demoState} size="button" />
               Process Payment
             </button>
             
             <button className="bg-white text-ink-navy border hairline-border px-6 py-2.5 rounded-md font-semibold text-sm flex items-center gap-3 hover:bg-slate-50">
               <TulaLoader state={demoState} size="button" />
               Verify Identity
             </button>
          </div>
        </section>

      </div>
    </div>
  );
}
