'use client';
import { useState } from 'react';
import QRScanner from '@/components/verify/QRScanner';
import VerificationResult from '@/components/verify/VerificationResult';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { QrCode, Keyboard, ShieldCheck } from 'lucide-react';
import { verify } from '@/lib/api';
import Link from 'next/link';

export default function VerifyPage() {
  const [mode, setMode] = useState('scan'); // scan or type
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // null, {valid: true/false, data: ...}

  const handleVerify = async (id) => {
    if (!id) return;
    setLoading(true);
    setResult(null);
    try {
      // Extract certificate ID from QR URL if needed
      let lookupId = id;
      if (id.includes('/verify/')) {
        lookupId = id.split('/verify/').pop().replace(/\/$/, '');
      }
      
      const res = await verify.verifyCertificate(lookupId);
      setResult({
        valid: res.data.is_valid,
        data: {
          certificate_number: res.data.certificate_number,
          status: res.data.status,
          instrument_type: res.data.instrument_type,
          valid_from: res.data.valid_from,
          valid_until: res.data.valid_until,
          is_valid: res.data.is_valid,
          blockchain_verified: res.data.blockchain_verified,
          blockchain_tx_id: res.data.blockchain_tx_id,
          blockchain_hash: res.data.blockchain_hash,
          anchor_timestamp: res.data.anchor_timestamp,
        }
      });
    } catch (error) {
      setResult({ valid: false, error: error.response?.data?.error || 'Certificate not found or invalid' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-govbg">
      {/* Formal Header */}
      <header className="bg-primary-900 text-white px-8 py-4 flex items-center gap-4 shadow-md">
        <ShieldCheck className="w-8 h-8 text-saffron-500" />
        <div>
          <h1 className="text-xl font-bold tracking-wide">Document Verification Portal</h1>
          <p className="text-xs text-primary-100">Department of Legal Metrology</p>
        </div>
        <div className="ml-auto">
          <Link href="/" className="text-sm font-semibold hover:text-saffron-400">Back to Home</Link>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col items-center pt-12 px-4 pb-10">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-black text-gray-900 mb-2">Verify Certificate</h2>
            <p className="text-gray-600 font-medium">Verify authenticity instantly against the Hyperledger blockchain.</p>
          </div>

          {!result ? (
            <div className="bg-white border border-gray-200 shadow-sm p-8 rounded-lg">
              <div className="flex bg-gray-100 rounded-md p-1 mb-8">
                <button 
                  onClick={() => setMode('scan')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition ${mode === 'scan' ? 'bg-white text-primary-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <QrCode className="w-4 h-4" /> Scan QR
                </button>
                <button 
                  onClick={() => setMode('type')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition ${mode === 'type' ? 'bg-white text-primary-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <Keyboard className="w-4 h-4" /> Enter ID
                </button>
              </div>

              {mode === 'scan' ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50">
                  <QRScanner onScan={handleVerify} />
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleVerify(certId); }} className="space-y-6">
                  <Input 
                    label="Certificate Number"
                    placeholder="e.g. TS-MP-2026-C0001" 
                    value={certId} 
                    onChange={(e) => setCertId(e.target.value)} 
                  />
                  <Button type="submit" variant="primary" className="w-full py-3" loading={loading}>
                    Search & Verify
                  </Button>
                </form>
              )}
              
              <div className="mt-8 text-center text-xs text-gray-500 font-medium bg-gray-50 p-4 rounded-md">
                This verification queries the immutable ledger to ensure the certificate was officially issued and has not been revoked.
              </div>
            </div>
          ) : (
            <VerificationResult result={result} onReset={() => setResult(null)} />
          )}
        </div>
      </div>
    </div>
  );
}
