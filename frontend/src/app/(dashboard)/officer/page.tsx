'use client';
import { useAuth } from '@/hooks/useAuth';
import { MapPin, CheckSquare, Clock, Map, List, CloudOff, CloudDrizzle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function OfficerDashboard() {
  const { user } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Inspection cryptographically signed & anchored to ledger!');
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-lg mx-auto space-y-6 pb-20">
      
      {/* Mobile-first Header */}
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-serif font-bold text-ink-navy">Inspections</h1>
        <p className="text-sm text-slate-500">Today, 28 Sep 2026</p>
      </div>
      
      {/* Sync Status Chip (First-class UI as requested) */}
      <div className="bg-white p-3 rounded-lg hairline-border shadow-soft flex items-center justify-between border-l-4 border-l-saffron">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-saffron/10 flex items-center justify-center">
            <CloudOff className="w-4 h-4 text-saffron" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink-navy">Offline Mode</p>
            <p className="text-xs text-slate-500">3 items pending sync</p>
          </div>
        </div>
        <button className="text-saffron hover:text-ink-navy transition-colors p-2">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Map / List Toggle */}
      <div className="flex bg-slate-100 p-1 rounded-md hairline-border">
        <button className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded bg-white shadow-sm text-ink-navy">
          <List className="w-4 h-4" /> Queue (5)
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded text-slate-500 hover:text-ink-navy transition-colors">
          <Map className="w-4 h-4" /> Map View
        </button>
      </div>

      {/* Inspection Queue */}
      <div className="space-y-4">
        
        <div className="bg-white rounded-lg hairline-border shadow-soft overflow-hidden">
          <div className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-signalRed/10 text-signalRed border border-signalRed/20 uppercase tracking-wider mb-2">
                  High Priority
                </span>
                <h3 className="font-bold text-ink-navy text-base leading-tight">Ayan Traders Pvt Ltd</h3>
                <p className="text-sm text-slate-500 mt-0.5">Platform Scale • 500 kg</p>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">APP-8921</span>
            </div>
            
            <div className="flex items-start gap-2 mt-2">
              <MapPin className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                Shop No 42, APMC Market Phase 2, Vashi, Navi Mumbai, 400703
              </p>
            </div>
          </div>
          <div className="bg-slate-50 p-3 border-t hairline-border flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5" /> Scheduled 10:00 AM
            </div>
            <Link 
              href="/officer/inspections/new" 
              className="bg-ink-navy text-white px-4 py-2 rounded text-sm font-semibold hover:bg-ink-navy/90 transition-colors shadow-sm"
            >
              Start Inspection
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg hairline-border shadow-soft overflow-hidden opacity-75">
          <div className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-ink-navy text-base leading-tight">Bharat Petroleum (COCO)</h3>
                <p className="text-sm text-slate-500 mt-0.5">Fuel Dispenser • 4 Nozzles</p>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">APP-8924</span>
            </div>
            
            <div className="flex items-start gap-2 mt-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                Highway NH-4, Near Toll Plaza, Pune, 411033
              </p>
            </div>
          </div>
          <div className="bg-slate-50 p-3 border-t hairline-border flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5" /> Scheduled 01:30 PM
            </div>
            <button className="bg-white border hairline-border text-ink-navy px-4 py-2 rounded text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
              View
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
