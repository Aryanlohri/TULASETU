'use client';
import { useState } from 'react';
import { Camera, MapPin, CheckCircle, XCircle, ArrowLeft, UploadCloud, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NewInspection() {
  const [photoTaken, setPhotoTaken] = useState(false);
  const [outcome, setOutcome] = useState<'pass' | 'fail' | null>(null);

  // In a real app, this would use navigator.mediaDevices.getUserMedia
  const handleTakePhoto = () => {
    setPhotoTaken(true);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white min-h-[calc(100vh-120px)] border-x hairline-border flex flex-col relative pb-24">
      
      {/* High-Contrast Mobile Header */}
      <div className="bg-ink-navy text-white p-4 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/officer" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="font-bold text-lg leading-tight">Field Inspection</h1>
          <p className="text-xs text-slate-300 font-mono">APP-8921 • Ayan Traders</p>
        </div>
      </div>

      <div className="p-4 space-y-6 flex-1">
        
        {/* Step 1: Instrument Details */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-ink-navy text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <h2 className="font-bold text-ink-navy">Verify Details</h2>
          </div>
          <div className="bg-slate-50 border hairline-border p-4 rounded-md space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Make & Model</span>
              <span className="text-sm font-semibold text-ink-navy">Essae DS-852</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Capacity</span>
              <span className="text-sm font-semibold text-ink-navy">500 kg (e=50g)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Serial No.</span>
              <span className="text-sm font-semibold text-ink-navy font-mono">SN-993821-XX</span>
            </div>
          </div>
        </section>

        {/* Step 2: Camera Capture */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-ink-navy text-white flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <h2 className="font-bold text-ink-navy">Photographic Evidence</h2>
          </div>
          
          {!photoTaken ? (
            <button 
              onClick={handleTakePhoto}
              className="w-full h-48 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-ink-navy hover:bg-slate-50 transition-colors focus-ring"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-ink-navy">
                <Camera className="w-8 h-8" />
              </div>
              <span className="font-bold text-slate-600">Tap to capture instrument</span>
            </button>
          ) : (
            <div className="relative w-full h-48 bg-slate-800 rounded-lg overflow-hidden border-2 border-indiaGreen">
              {/* Mock Photo View */}
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1590502160462-3c7c251430c5?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center mix-blend-luminosity" />
              
              {/* Forensic Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 backdrop-blur-sm flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-green-400 text-[10px] font-mono">
                  <MapPin className="w-3 h-3" /> 
                  19.0760° N, 72.8777° E (Acc: 4m)
                </div>
                <div className="text-white/90 text-[10px] font-mono pl-4.5">
                  2026-09-28 10:14:22 IST • LMO-MP-042
                </div>
              </div>

              <button 
                onClick={() => setPhotoTaken(false)}
                className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded text-xs font-semibold backdrop-blur-sm hover:bg-black/70 transition-colors"
              >
                Retake
              </button>
            </div>
          )}
        </section>

        {/* Step 3: Test Weights & Reading */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-ink-navy text-white flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <h2 className="font-bold text-ink-navy">Test Readings</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Applied Weight</label>
              <div className="relative">
                <input type="number" defaultValue={500} className="w-full bg-slate-50 border hairline-border rounded p-3 text-lg font-mono text-ink-navy focus-ring" />
                <span className="absolute right-3 top-3 text-slate-400 font-bold">kg</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Observed Error</label>
              <div className="relative">
                <input type="number" defaultValue={20} className="w-full bg-slate-50 border hairline-border rounded p-3 text-lg font-mono text-ink-navy focus-ring" />
                <span className="absolute right-3 top-3 text-slate-400 font-bold">g</span>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: Outcome */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-ink-navy text-white flex items-center justify-center text-xs font-bold shrink-0">4</span>
            <h2 className="font-bold text-ink-navy">Final Outcome</h2>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setOutcome('pass')}
              className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${outcome === 'pass' ? 'border-indiaGreen bg-indiaGreen/5' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <CheckCircle className={`w-8 h-8 ${outcome === 'pass' ? 'text-indiaGreen' : 'text-slate-300'}`} />
              <span className={`font-bold ${outcome === 'pass' ? 'text-indiaGreen' : 'text-slate-500'}`}>PASS / SEAL</span>
            </button>
            <button 
              onClick={() => setOutcome('fail')}
              className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${outcome === 'fail' ? 'border-signalRed bg-signalRed/5' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <XCircle className={`w-8 h-8 ${outcome === 'fail' ? 'text-signalRed' : 'text-slate-300'}`} />
              <span className={`font-bold ${outcome === 'fail' ? 'text-signalRed' : 'text-slate-500'}`}>FAIL / REJECT</span>
            </button>
          </div>

          {outcome === 'fail' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 mt-4">Reason for Rejection</label>
              <select className="w-full bg-slate-50 border hairline-border rounded p-3 text-sm text-ink-navy focus-ring">
                <option>Error exceeds MPE (Maximum Permissible Error)</option>
                <option>Physical damage / Tampering detected</option>
                <option>Model unapproved by GOI</option>
              </select>
            </div>
          )}
        </section>

      </div>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-0 p-4 bg-white border-t hairline-border z-20 flex gap-3">
        <button 
          onClick={() => {
            const btn = document.getElementById('save-btn');
            if (btn) btn.innerHTML = '<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Signing...';
            setTimeout(() => window.location.href = '/officer?success=true', 1500);
          }}
          id="save-btn"
          className="flex-1 bg-ink-navy text-white font-bold py-4 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all" 
          disabled={!photoTaken || !outcome}
        >
          <UploadCloud className="w-5 h-5" />
          Save & Cryptographic Sign
        </button>
      </div>

    </div>
  );
}
