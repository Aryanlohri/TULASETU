'use client';
import { useAuth } from '@/hooks/useAuth';
import { Activity, FileText, CheckCircle, AlertTriangle, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TraderDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ink-navy tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-600 mt-2">Welcome back, {user?.name || user?.full_name}. Here is the status of your registered instruments.</p>
        </div>
        <Link 
          href="/trader/applications/new" 
          className="bg-ink-navy hover:bg-ink-navy/90 text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm focus-ring inline-flex w-fit"
        >
          <Plus className="w-4 h-4" />
          Apply for Verification
        </Link>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg hairline-border shadow-soft flex items-center justify-between group">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Active Certificates</p>
            <p className="text-3xl font-bold text-ink-navy font-mono">12</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-indiaGreen/10 text-indiaGreen flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg hairline-border shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Pending Renewals</p>
            <p className="text-3xl font-bold text-saffron font-mono">3</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-saffron/10 text-saffron flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg hairline-border shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Pending Applications</p>
            <p className="text-3xl font-bold text-ink-navy font-mono">1</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Instruments List */}
      <div className="bg-white rounded-lg hairline-border shadow-soft overflow-hidden mt-8">
        <div className="p-5 border-b hairline-border flex items-center justify-between bg-slate-50">
          <h2 className="font-bold text-ink-navy">My Instruments</h2>
          <Link href="/trader/instruments" className="text-xs font-semibold text-saffron hover:text-ink-navy transition-colors flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b hairline-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Instrument Type</th>
                <th className="px-6 py-4 font-semibold">Capacity/Class</th>
                <th className="px-6 py-4 font-semibold">Cert. No.</th>
                <th className="px-6 py-4 font-semibold">Valid Until</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-ink-navy">Platform Scale</td>
                <td className="px-6 py-4 text-slate-600">500 kg (Class III)</td>
                <td className="px-6 py-4 font-mono text-xs">MP-2026-8492</td>
                <td className="px-6 py-4 text-slate-600">14/03/2027</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indiaGreen/10 text-indiaGreen text-xs font-semibold border border-indiaGreen/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-indiaGreen" /> Verified
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-saffron hover:text-ink-navy font-semibold text-xs">Download</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors bg-saffron/5">
                <td className="px-6 py-4 font-medium text-ink-navy">Fuel Dispenser</td>
                <td className="px-6 py-4 text-slate-600">2 Nozzle</td>
                <td className="px-6 py-4 font-mono text-xs">MP-2025-1102</td>
                <td className="px-6 py-4 text-saffron font-bold">12/10/2026</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-saffron/10 text-saffron text-xs font-semibold border border-saffron/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" /> Renew in 14 days
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="bg-saffron text-white hover:bg-ink-navy px-3 py-1.5 rounded text-xs font-semibold transition-colors">Renew</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-ink-navy">Weighbridge</td>
                <td className="px-6 py-4 text-slate-600">60 T</td>
                <td className="px-6 py-4 font-mono text-xs">MP-2026-9932</td>
                <td className="px-6 py-4 text-slate-600">05/08/2027</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indiaGreen/10 text-indiaGreen text-xs font-semibold border border-indiaGreen/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-indiaGreen" /> Verified
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-saffron hover:text-ink-navy font-semibold text-xs">Download</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
