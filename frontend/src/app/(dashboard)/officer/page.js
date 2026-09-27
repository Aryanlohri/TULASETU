'use client';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/ui/Card';
import { ClipboardList, CheckSquare } from 'lucide-react';

export default function OfficerDashboard() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-heading font-bold">Officer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 flex items-center gap-4">
          <div className="p-4 rounded-xl bg-amber-500/20 text-amber-400"><ClipboardList /></div>
          <div>
            <p className="text-sm text-slate-400">Pending Inspections</p>
            <p className="text-2xl font-bold">5</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-400"><CheckSquare /></div>
          <div>
            <p className="text-sm text-slate-400">Completed Today</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
