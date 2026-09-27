'use client';
import { useState } from 'react';
import QRScanner from '@/components/verify/QRScanner';
import VerificationResult from '@/components/verify/VerificationResult';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { QrCode, Keyboard } from 'lucide-react';
import { verify } from '@/lib/api';
import toast from 'react-hot-toast';

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
    <div className="min-h-screen flex flex-col items-center pt-20 px-4 pb-10">
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]" />
      
      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold mb-2">Verify Certificate</h1>
          <p className="text-slate-400">Ensure authenticity via blockchain</p>
        </div>

        {!result ? (
          <div className="glass p-6 rounded-2xl">
            <div className="flex bg-white/5 rounded-xl p-1 mb-6">
              <button 
                onClick={() => setMode('scan')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition ${mode === 'scan' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <QrCode className="w-4 h-4" /> Scan QR
              </button>
              <button 
                onClick={() => setMode('type')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition ${mode === 'type' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <Keyboard className="w-4 h-4" /> Enter ID
              </button>
            </div>

            {mode === 'scan' ? (
              <QRScanner onScan={handleVerify} />
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleVerify(certId); }} className="space-y-4">
                <Input 
                  placeholder="e.g. CERT-1234-5678" 
                  value={certId} 
                  onChange={(e) => setCertId(e.target.value)} 
                />
                <Button type="submit" variant="primary" className="w-full" loading={loading}>
                  Verify Now
                </Button>
              </form>
            )}
          </div>
        ) : (
          <VerificationResult result={result} onReset={() => setResult(null)} />
        )}
      </div>
    </div>
  );
}
