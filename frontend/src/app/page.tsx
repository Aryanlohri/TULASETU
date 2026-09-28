'use client';
import { useState } from 'react';
import { Search, QrCode, ArrowRight, ShieldCheck, Database, FileWarning, Scale } from 'lucide-react';
import DigitalCertificate from '@/components/verification/DigitalCertificate';
import TulaLoader from '@/components/ui/TulaLoader';
import Link from 'next/link';

export default function PublicVerify() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Mock API call
    setTimeout(() => {
      setResult({
        certNumber: searchQuery.toUpperCase(),
        instrumentType: 'Platform Scale, 500 kg',
        capacity: 'Class III',
        traderName: 'A***n Traders Pvt Ltd',
        issueDate: '15/03/2026',
        validUntil: '14/03/2027',
        officerId: 'LMO-MP-BPL-042',
        status: 'valid',
        txHash: '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
        blockTimestamp: '2026-03-15T09:42:11Z',
        blockNumber: 14205932
      });
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center w-full pb-20">
      {/* Public Header */}
      <header className="w-full bg-white border-b hairline-border h-16 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <img src="/brand/logo-horizontal.svg" alt="TulaSetu Logo" className="h-10" />
        </div>
        <Link href="/login" className="bg-ink-navy hover:bg-ink-navy/90 text-white px-5 py-2 rounded-md font-semibold text-sm transition-colors">
          Portal Login
        </Link>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto px-4 pt-16 md:pt-24 pb-12 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-ink-navy font-bold tracking-tight mb-4">
          Verify Instrument Certification
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl">
          Instantly check the legal metrology compliance of any weighing or measuring instrument in India. Backed by immutable blockchain records.
        </p>

        {/* Verification Input */}
        <form onSubmit={handleVerify} className="w-full max-w-2xl relative flex items-center shadow-elevated rounded-lg bg-white p-2">
          <Search className="w-6 h-6 text-slate-400 absolute left-6 pointer-events-none" />
          <input
            type="text"
            placeholder="Enter Certificate No. (e.g. MP-2026-8492)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-16 pr-32 text-lg text-ink-navy placeholder:text-slate-400 focus:outline-none rounded-md bg-transparent font-mono"
            required
            disabled={isSearching}
          />
          <div className="absolute right-2 flex items-center gap-2">
            <button 
              type="button" 
              className="p-3 text-slate-500 hover:text-ink-navy hover:bg-slate-100 rounded-md transition-colors"
              title="Scan QR Code"
              disabled={isSearching}
            >
              <QrCode className="w-6 h-6" />
            </button>
            <button 
              type="submit"
              disabled={isSearching}
              className="bg-ink-navy hover:bg-ink-navy/90 text-white px-6 h-12 rounded-md font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              Verify
            </button>
          </div>
        </form>
      </section>

      {/* Inline Verification Result / Loader */}
      <section className="w-full px-4 mb-20 min-h-[400px] flex justify-center">
        {isSearching && (
          <div className="animate-in fade-in duration-300">
            <TulaLoader state="verifying" size="full" caption="Querying Hyperledger Ledger..." />
          </div>
        )}
        {!isSearching && result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 w-full">
            <DigitalCertificate data={result} />
          </div>
        )}
      </section>

      {/* Trust & Stats Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-16 border-t hairline-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-ink-navy">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-ink-navy font-mono mb-2">4.2M+</h3>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Instruments Verified</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-ink-navy">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-ink-navy font-mono mb-2">18</h3>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">States Onboarded</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-ink-navy">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-ink-navy font-mono mb-2">12,400+</h3>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Fraud Attempts Blocked</p>
          </div>
        </div>
      </section>

      {/* Explainer & Report Section */}
      <section className="w-full bg-white border-y hairline-border py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-ink-navy mb-8">How Verification Works</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-ink-navy text-white flex items-center justify-center font-bold text-sm shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-ink-navy mb-1">Locate Certificate</h4>
                  <p className="text-sm text-slate-600">Find the QR code or Certificate Number printed on the verification sticker attached to the instrument.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-ink-navy text-white flex items-center justify-center font-bold text-sm shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-ink-navy mb-1">Enter Details</h4>
                  <p className="text-sm text-slate-600">Scan the QR code or manually type the certificate number into the search bar above.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-ink-navy text-white flex items-center justify-center font-bold text-sm shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-ink-navy mb-1">Ledger Query</h4>
                  <p className="text-sm text-slate-600">The system instantly queries the immutable Hyperledger Fabric blockchain to retrieve the original record.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-indiaGreen text-white flex items-center justify-center font-bold text-sm shrink-0">4</span>
                <div>
                  <h4 className="font-bold text-ink-navy mb-1">Confirm Validity</h4>
                  <p className="text-sm text-slate-600">If the record matches and is unexpired, the green Verified Seal guarantees the instrument is legally compliant.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-paper p-6 rounded-lg hairline-border flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileWarning className="w-6 h-6 text-saffron" />
                <h3 className="text-lg font-bold text-ink-navy">Report Suspicious Scale</h3>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                If you suspect a weighing machine has been tampered with or is missing a valid certificate, you can report it directly to the Legal Metrology department.
              </p>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-white hairline-border text-ink-navy hover:bg-slate-50 transition-colors py-3 rounded-md font-semibold text-sm focus-ring">
              File a Report <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
