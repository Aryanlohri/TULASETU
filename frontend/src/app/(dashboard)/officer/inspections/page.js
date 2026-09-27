'use client';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function InspectionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold">Assigned Inspections</h1>
      <div className="grid gap-4">
        <Card className="p-6 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">APP-2026-002</h3>
            <p className="text-sm text-slate-400">Trader: ABC Corp • Instrument: Fuel Dispenser</p>
          </div>
          <Button variant="primary">Start Inspection</Button>
        </Card>
      </div>
    </div>
  );
}
