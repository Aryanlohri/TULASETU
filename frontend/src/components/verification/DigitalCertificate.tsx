'use client';
import { QrCode, PenTool } from 'lucide-react';
import VerifiedSeal from './VerifiedSeal';
import LedgerStrip from './LedgerStrip';

interface CertificateData {
  certNumber: string;
  instrumentType: string;
  capacity: string;
  traderName: string;
  issueDate: string;
  validUntil: string;
  officerId: string;
  status: 'valid' | 'invalid';
  txHash: string;
  blockTimestamp: string;
  blockNumber: number;
}

export default function DigitalCertificate({ data }: { data: CertificateData }) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* The Certificate Document */}
      <div className="relative bg-[#FFFAF0] p-8 md:p-12 shadow-elevated rounded border border-slate-200 overflow-hidden">
        {/* Guilloche/Fine line border effect (simulated with nested borders) */}
        <div className="absolute inset-2 border-[0.5px] border-ink-navy/20" />
        <div className="absolute inset-3 border border-ink-navy/10" />
        <div className="absolute inset-[14px] border-[0.5px] border-ink-navy/20" />

        {/* Watermark (Ashoka Chakra or similar symbol placeholder) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <div className="w-64 h-64 rounded-full border-[10px] border-ink-navy border-dashed" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-ink-navy/5 rounded-full mb-4 flex items-center justify-center border border-ink-navy/10">
            <span className="text-2xl font-serif text-ink-navy">LM</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl text-ink-navy font-bold tracking-tight mb-2">
            Certificate of Verification
          </h2>
          <p className="font-serif text-slate-600 italic mb-8">
            Department of Legal Metrology, Government of India
          </p>

          <div className="w-full text-left space-y-6 mb-10">
            <div className="flex flex-wrap items-end justify-between border-b border-ink-navy/10 pb-2">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Certificate No.</span>
              <span className="font-mono font-bold text-ink-navy text-lg">{data.certNumber}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Instrument</span>
                <span className="font-medium text-ink-navy">{data.instrumentType}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Capacity / Class</span>
                <span className="font-medium text-ink-navy">{data.capacity}</span>
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Registered Entity</span>
              <span className="font-medium text-ink-navy">{data.traderName}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Issue Date</span>
                <span className="font-mono text-ink-navy">{data.issueDate}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Valid Until</span>
                <span className="font-mono font-bold text-ink-navy">{data.validUntil}</span>
              </div>
            </div>
          </div>

          <div className="w-full flex items-end justify-between mt-8">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white hairline-border flex items-center justify-center shadow-sm">
                <QrCode className="w-16 h-16 text-ink-navy" strokeWidth={1} />
              </div>
              <span className="text-[10px] uppercase font-mono text-slate-500 mt-2">Scan to verify</span>
            </div>

            <div className="relative">
              {/* Verified Seal Absolute Placement */}
              <div className="absolute -top-12 -left-12 opacity-90">
                <VerifiedSeal status={data.status} />
              </div>
              
              <div className="flex flex-col items-end border-t border-ink-navy/20 pt-2 min-w-[200px]">
                <div className="flex items-center gap-2 mb-1 text-ink-navy">
                  <PenTool className="w-4 h-4" />
                  <span className="font-serif italic">Digitally Signed</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">Officer ID: {data.officerId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ledger Anchor */}
      <LedgerStrip 
        txHash={data.txHash} 
        timestamp={data.blockTimestamp} 
        blockNumber={data.blockNumber} 
      />
    </div>
  );
}
