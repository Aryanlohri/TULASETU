'use client';
import React from 'react';

// Reusable SVG Component for Variants
const LogoSvg = ({ variant = 'full-light', type = 'horizontal', size = 128 }) => {
  const isLight = variant === 'full-light';
  const isDark = variant === 'full-dark';
  const isNavy = variant === 'single-navy';
  const isWhite = variant === 'single-white';

  const navyColor = isDark || isWhite ? '#F7F6F2' : '#0B2A4A';
  const saffronColor = isWhite ? '#F7F6F2' : isNavy ? '#0B2A4A' : '#C85F00';
  const textColor = isDark || isWhite ? '#F7F6F2' : '#0B2A4A';
  const subTextColor = isDark || isWhite ? '#94A3B8' : '#5B6B7B';

  const strokeWidth = size <= 32 ? 6 : 4;
  const hideStrings = size <= 32;

  const mark = (
    <g>
      {/* Pillar & Base */}
      <path d="M 80 42 L 80 120 M 60 120 L 100 120" stroke={navyColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Beam (Bridge Arch) */}
      <path d="M 30 60 Q 80 24 130 60" stroke={navyColor} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
      
      {/* Pan Strings */}
      {!hideStrings && (
        <path d="M 30 60 L 8 100 M 30 60 L 52 100 M 130 60 L 108 100 M 130 60 L 152 100" stroke={navyColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}
      
      {/* Pans */}
      <path d={hideStrings ? "M 12 85 L 48 85 M 112 85 L 148 85" : "M 8 100 L 52 100 M 108 100 L 152 100"} stroke={saffronColor} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
      
      {/* Pivot */}
      <circle cx="80" cy="42" r={hideStrings ? 7 : 5} fill={saffronColor} />
    </g>
  );

  if (type === 'mark') {
    return (
      <svg viewBox="0 0 160 160" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <title>TulaSetu Mark</title>
        {mark}
      </svg>
    );
  }

  if (type === 'horizontal') {
    return (
      <svg viewBox="0 0 540 160" width={size * 3.375} height={size} xmlns="http://www.w3.org/2000/svg">
        <title>TulaSetu Logo Horizontal</title>
        <g transform="translate(10, 10) scale(0.875)">{mark}</g>
        <g transform="translate(160, 92)">
          <text fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="52" letterSpacing="-0.02em">
            <tspan fill={textColor}>Tula</tspan><tspan fill={saffronColor}>Setu</tspan>
          </text>
          <text y="28" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="14" fill={subTextColor} letterSpacing="0.3em">
            LEGAL METROLOGY
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 280" width={size * 1.5} height={size * 1.75} xmlns="http://www.w3.org/2000/svg">
      <title>TulaSetu Logo Stacked</title>
      <g transform="translate(40, 20)">{mark}</g>
      <g transform="translate(120, 215)" textAnchor="middle">
        <text fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="48" letterSpacing="-0.02em">
          <tspan fill={textColor}>Tula</tspan><tspan fill={saffronColor}>Setu</tspan>
        </text>
        <text y="30" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="13" fill={subTextColor} letterSpacing="0.3em">
          LEGAL METROLOGY
        </text>
      </g>
    </svg>
  );
};

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 pb-32">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <header className="border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-serif font-bold text-ink-navy">Brand Assets</h1>
          <p className="text-slate-500 mt-2">Production-ready scalable vector graphics for TulaSetu.</p>
        </header>

        {/* Clear Space Rule */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-ink-navy">Clear Space & Minimum Size</h2>
          <div className="flex flex-wrap gap-8">
            <div className="bg-white p-12 rounded-lg border border-slate-200 relative inline-flex">
               <div className="absolute inset-4 border border-dashed border-indiaGreen/30 bg-indiaGreen/5" />
               <LogoSvg variant="full-light" type="horizontal" size={80} />
               <div className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-full text-xs text-indiaGreen font-mono font-bold pt-2">
                 CLEAR SPACE = PIVOT RADIUS × 4
               </div>
            </div>
            <div className="bg-white p-12 rounded-lg border border-slate-200 flex flex-col items-center justify-center gap-4">
               <LogoSvg variant="full-light" type="mark" size={32} />
               <LogoSvg variant="full-light" type="mark" size={16} />
               <p className="text-xs text-slate-500 max-w-[200px] text-center mt-4">
                 At 32px and below, strings are dropped and strokes are thickened to 5px for legibility.
               </p>
            </div>
          </div>
        </section>

        {/* Variants Matrix */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-ink-navy">Color Variants</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            
            {/* Light Background */}
            <div className="bg-[#F7F6F2] p-10 flex flex-col items-center gap-12">
              <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Paper Light</h3>
              <LogoSvg variant="full-light" type="stacked" size={120} />
              <LogoSvg variant="full-light" type="horizontal" size={80} />
              <LogoSvg variant="single-navy" type="mark" size={64} />
            </div>

            {/* Dark Background */}
            <div className="bg-slate-900 p-10 flex flex-col items-center gap-12">
              <h3 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">Slate Dark</h3>
              <LogoSvg variant="full-dark" type="stacked" size={120} />
              <LogoSvg variant="full-dark" type="horizontal" size={80} />
              <LogoSvg variant="single-white" type="mark" size={64} />
            </div>

            {/* Navy Background */}
            <div className="bg-[#0B2A4A] p-10 flex flex-col items-center gap-12">
              <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Brand Navy</h3>
              <LogoSvg variant="full-dark" type="stacked" size={120} />
              <LogoSvg variant="full-dark" type="horizontal" size={80} />
              <LogoSvg variant="single-white" type="mark" size={64} />
            </div>
          </div>
        </section>

        {/* Size Scale */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-ink-navy">Scale Matrix (Mark)</h2>
          <div className="flex items-end gap-8 bg-white p-12 rounded-xl border border-slate-200">
            {[128, 64, 32, 16].map(size => (
              <div key={size} className="flex flex-col items-center gap-4">
                <LogoSvg variant="full-light" type="mark" size={size} />
                <span className="text-xs font-mono text-slate-400">{size}px</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
