'use client';
import { useAuth } from '@/hooks/useAuth';
import { BarChart3, AlertTriangle, ShieldCheck, Activity, Users, Map as MapIcon, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ink-navy tracking-tight">State Command Center</h1>
          <p className="text-sm text-slate-600 mt-2">Madhya Pradesh Directorate • Legal Metrology Division</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border hairline-border text-ink-navy px-4 py-2 rounded-md font-semibold text-sm hover:bg-slate-50 transition-colors">
            Export Report
          </button>
        </div>
      </div>
      
      {/* High-Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg hairline-border shadow-soft">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-ink-navy/10 text-ink-navy flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-indiaGreen bg-indiaGreen/10 px-2 py-0.5 rounded">
              <ArrowUpRight className="w-3 h-3" /> 12%
            </span>
          </div>
          <p className="text-3xl font-bold text-ink-navy font-mono">14,293</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Total Verified</p>
        </div>

        <div className="bg-white p-5 rounded-lg hairline-border shadow-soft">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-saffron/10 text-saffron flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-signalRed bg-signalRed/10 px-2 py-0.5 rounded">
              <ArrowUpRight className="w-3 h-3" /> 4%
            </span>
          </div>
          <p className="text-3xl font-bold text-ink-navy font-mono">342</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Pending Renewals</p>
        </div>

        <div className="bg-white p-5 rounded-lg hairline-border shadow-soft">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-ink-navy font-mono">89</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Active Officers (LMO)</p>
        </div>

        <div className="bg-white p-5 rounded-lg hairline-border shadow-soft">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-indiaGreen/10 text-indiaGreen flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-ink-navy font-mono">98.4%</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">SLA Compliance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Heatmap Section */}
        <div className="lg:col-span-2 bg-white rounded-lg hairline-border shadow-soft overflow-hidden flex flex-col">
          <div className="p-5 border-b hairline-border flex justify-between items-center">
            <h2 className="font-bold text-ink-navy flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-slate-400" /> Compliance Heatmap
            </h2>
            <select className="text-xs font-bold bg-slate-50 border hairline-border rounded px-2 py-1 text-ink-navy outline-none">
              <option>Madhya Pradesh</option>
              <option>Maharashtra</option>
              <option>Gujarat</option>
            </select>
          </div>
          <div className="flex-1 bg-slate-100 relative min-h-[400px] overflow-hidden">
             {/* Realistic GIS Integration via OpenStreetMap */}
             <iframe 
               width="100%" 
               height="100%" 
               frameBorder="0" 
               scrolling="no" 
               marginHeight={0} 
               marginWidth={0} 
               src="https://www.openstreetmap.org/export/embed.html?bbox=73.5000%2C21.0000%2C82.5000%2C27.0000&amp;layer=mapnik" 
               style={{ border: 0, filter: 'grayscale(0.6) contrast(1.1) sepia(0.2)' }}
               className="absolute inset-0 pointer-events-none"
             />
             <div className="absolute inset-0 bg-ink-navy/10 pointer-events-none" />

             {/* Heatmap overlay clusters */}
             {/* Indore / Ujjain Region - High Compliance */}
             <div className="absolute top-[45%] left-[30%] w-48 h-48 bg-indiaGreen/40 rounded-full blur-2xl animate-pulse pointer-events-none" />
             <div className="absolute top-[48%] left-[32%] w-24 h-24 bg-indiaGreen/60 rounded-full blur-xl pointer-events-none" />

             {/* Bhopal Region - Mixed */}
             <div className="absolute top-[40%] left-[45%] w-40 h-40 bg-saffron/40 rounded-full blur-2xl animate-pulse pointer-events-none" />
             <div className="absolute top-[42%] left-[47%] w-16 h-16 bg-saffron/60 rounded-full blur-xl pointer-events-none" />

             {/* Jabalpur Region - High Risk / Fraudulent */}
             <div className="absolute top-[35%] left-[65%] w-32 h-32 bg-signalRed/40 rounded-full blur-2xl animate-pulse pointer-events-none" />
             <div className="absolute top-[37%] left-[67%] w-12 h-12 bg-signalRed/70 rounded-full blur-lg pointer-events-none" />
          </div>
        </div>

        {/* Live Ledger Feed */}
        <div className="bg-white rounded-lg hairline-border shadow-soft flex flex-col">
          <div className="p-5 border-b hairline-border flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-ink-navy">Live Ledger Commits</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indiaGreen animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Syncing</span>
            </div>
          </div>
          
          <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[400px]">
            {[
              { id: 'tx-89a1', time: 'Just now', action: 'Certificate Issued', officer: 'LMO-MP-042', status: 'success' },
              { id: 'tx-2b4f', time: '2 min ago', action: 'Inspection Failed', officer: 'LMO-MP-118', status: 'rejected' },
              { id: 'tx-9c22', time: '14 min ago', action: 'New Registration', officer: 'System', status: 'success' },
              { id: 'tx-1d44', time: '28 min ago', action: 'Certificate Renewed', officer: 'LMO-MP-005', status: 'success' },
              { id: 'tx-7e99', time: '1 hr ago', action: 'Penalty Imposed', officer: 'LMO-MP-042', status: 'rejected' },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 items-start pb-4 border-b hairline-border last:border-0">
                <div className="mt-0.5">
                  {log.status === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-indiaGreen" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-signalRed" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-ink-navy">{log.action}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-slate-500 font-mono">{log.id} • {log.officer}</p>
                    <span className="text-xs font-semibold text-slate-400">{log.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
