'use client';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold">Applications</h1>
        <Button variant="primary">New Application</Button>
      </div>
      
      <div className="grid gap-4">
        <Card className="p-6 flex justify-between items-center hover:border-indigo-500/50 transition cursor-pointer">
          <div>
            <h3 className="font-semibold text-lg mb-1">APP-2026-001</h3>
            <p className="text-sm text-slate-400">Electronic Weighing Scale • Submitted on Oct 12, 2026</p>
          </div>
          <Badge type="PENDING">Pending</Badge>
        </Card>
      </div>
    </div>
  );
}
