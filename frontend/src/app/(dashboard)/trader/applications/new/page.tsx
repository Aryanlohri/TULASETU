'use client';
import { useState } from 'react';
import { ArrowLeft, Save, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewApplication() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock network delay for video demo
    setTimeout(() => {
      router.push('/trader?success=true');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4 border-b hairline-border pb-6">
        <Link href="/trader" className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-ink-navy">New Verification Application</h1>
          <p className="text-sm text-slate-500 mt-1">Register a new instrument for Legal Metrology certification.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg hairline-border shadow-soft space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instrument Category</label>
            <select required className="w-full h-11 px-4 border hairline-border rounded-md bg-white text-ink-navy focus-ring">
              <option value="">Select Category...</option>
              <option>Weights & Measures</option>
              <option>Weighing Instruments</option>
              <option>Measuring Instruments</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instrument Type</label>
            <select required className="w-full h-11 px-4 border hairline-border rounded-md bg-white text-ink-navy focus-ring">
              <option value="">Select Type...</option>
              <option>Platform Scale</option>
              <option>Fuel Dispenser</option>
              <option>Weighbridge</option>
              <option>Taxi Meter</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Make / Brand</label>
            <input type="text" required placeholder="e.g. Avery India" className="w-full h-11 px-4 border hairline-border rounded-md bg-white text-ink-navy focus-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Model No.</label>
            <input type="text" required placeholder="e.g. AX-500" className="w-full h-11 px-4 border hairline-border rounded-md bg-white text-ink-navy focus-ring" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t hairline-border pt-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Capacity</label>
            <input type="text" required placeholder="e.g. 500 kg" className="w-full h-11 px-4 border hairline-border rounded-md bg-white text-ink-navy focus-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Class</label>
            <select required className="w-full h-11 px-4 border hairline-border rounded-md bg-white text-ink-navy focus-ring">
              <option value="">Select Class...</option>
              <option>Class I (Special)</option>
              <option>Class II (High)</option>
              <option>Class III (Medium)</option>
              <option>Class IIII (Ordinary)</option>
            </select>
          </div>
        </div>

        <div className="bg-ink-navy/5 border border-ink-navy/10 rounded-md p-4 flex items-start gap-3 mt-4">
          <ShieldCheck className="w-5 h-5 text-ink-navy shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600 leading-relaxed">
            By submitting this application, you declare that the instrument has been installed correctly and is ready for physical verification by a Legal Metrology Officer. A nominal fee will be generated upon approval.
          </p>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <Link href="/trader" className="px-6 py-2.5 text-sm font-semibold text-slate-500 hover:text-ink-navy transition-colors">
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-ink-navy hover:bg-ink-navy/90 text-white px-8 py-2.5 rounded-md font-semibold text-sm transition-colors flex items-center gap-2 min-w-[160px] justify-center"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
