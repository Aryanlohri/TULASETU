'use client';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/ui/Card';
import { Activity, FileText, CheckCircle } from 'lucide-react';

export default function TraderDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-heading font-bold">Welcome, {user?.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center gap-4">
          <div className="p-4 rounded-xl bg-indigo-500/20 text-indigo-400"><Activity /></div>
          <div>
            <p className="text-sm text-slate-400">Total Instruments</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="p-4 rounded-xl bg-amber-500/20 text-amber-400"><FileText /></div>
          <div>
            <p className="text-sm text-slate-400">Pending Applications</p>
            <p className="text-2xl font-bold">3</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-400"><CheckCircle /></div>
          <div>
            <p className="text-sm text-slate-400">Active Certificates</p>
            <p className="text-2xl font-bold">8</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
