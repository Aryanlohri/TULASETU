'use client';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ShieldCheck, Download } from 'lucide-react';

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold">My Certificates</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition"><ShieldCheck size={100} /></div>
          <div className="flex justify-between items-start mb-4">
            <Badge type="VERIFIED">Active</Badge>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold bg-emerald-500/10 px-2 py-1 rounded-full">
              <ShieldCheck className="w-3 h-3" /> Blockchain Verified
            </div>
          </div>
          <h3 className="font-bold text-xl mb-1 font-mono">CERT-8923-441</h3>
          <p className="text-sm text-slate-400 mb-6">Electronic Weighing Scale</p>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Valid From</span>
              <span>Oct 10, 2026</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Valid Until</span>
              <span>Oct 09, 2027</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-emerald-400 h-full w-[10%]" />
            </div>
          </div>
          
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Download QR
          </Button>
        </Card>
      </div>
    </div>
  );
}
