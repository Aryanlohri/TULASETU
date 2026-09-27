'use client';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Plus } from 'lucide-react';

export default function InstrumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold">My Instruments</h1>
        <Button variant="primary" className="flex items-center gap-2"><Plus className="w-4 h-4"/> Add Instrument</Button>
      </div>
      
      <Card className="overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-medium text-slate-300">Name</th>
              <th className="p-4 font-medium text-slate-300">Type</th>
              <th className="p-4 font-medium text-slate-300">Serial No.</th>
              <th className="p-4 font-medium text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            <tr>
              <td className="p-4">Electronic Weighing Scale</td>
              <td className="p-4"><Badge type="WEIGHING">Weighing</Badge></td>
              <td className="p-4 font-mono text-sm text-slate-400">SN-928374</td>
              <td className="p-4"><Button variant="ghost" className="text-sm">Edit</Button></td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
