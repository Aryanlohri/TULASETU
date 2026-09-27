'use client';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function IssueCertificatesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold">Issue Certificates</h1>
      <div className="grid gap-4">
        <Card className="p-6 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">APP-2026-003</h3>
            <p className="text-sm text-slate-400">Status: Inspection Passed</p>
          </div>
          <Button variant="primary">Issue & Anchor to Blockchain</Button>
        </Card>
      </div>
    </div>
  );
}
