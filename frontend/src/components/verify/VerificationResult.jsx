'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Shield, RefreshCcw, Clock, Hash } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function VerificationResult({ result, onReset }) {
  const { valid, data, error } = result;

  const statusColors = {
    ACTIVE: 'emerald',
    EXPIRED: 'amber',
    REVOKED: 'rose',
    SUSPENDED: 'amber',
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
      <Card className={`p-8 border-2 ${valid ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.2)]'}`}>
        {/* Status Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          {valid ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: 'spring', damping: 15 }}>
              <CheckCircle2 className="w-24 h-24 text-emerald-400 mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            </motion.div>
          ) : (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}>
              <XCircle className="w-24 h-24 text-rose-400 mb-4 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
            </motion.div>
          )}
          <h2 className={`text-3xl font-heading font-bold ${valid ? 'text-emerald-400' : 'text-rose-400'}`}>
            {valid ? 'Certificate Verified ✓' : 'Verification Failed'}
          </h2>
          <p className="text-slate-400 mt-2">
            {valid ? 'This instrument has a valid, blockchain-verified certificate' : (error || 'Certificate not found or is invalid')}
          </p>
        </div>

        {/* Certificate Details */}
        {valid && data && (
          <div className="space-y-3 text-left bg-slate-900/50 p-6 rounded-xl mb-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-slate-400 text-sm">Certificate No.</span>
              <span className="font-mono font-bold text-white">{data.certificate_number}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-slate-400 text-sm">Instrument Type</span>
              <Badge variant={data.instrument_type === 'WEIGHING' ? 'blue' : data.instrument_type === 'MEASURING' ? 'purple' : 'amber'}>
                {data.instrument_type}
              </Badge>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-slate-400 text-sm">Status</span>
              <Badge variant={statusColors[data.status] || 'slate'}>
                {data.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-slate-400 text-sm">Valid From</span>
              <span className="font-medium text-white">{data.valid_from}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-slate-400 text-sm">Valid Until</span>
              <span className="font-medium text-white">{data.valid_until}</span>
            </div>

            {/* Blockchain Proof Section */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Shield className={`w-5 h-5 ${data.blockchain_verified ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  {data.blockchain_verified ? 'Blockchain Verified' : 'Blockchain Pending'}
                </span>
              </div>
              {data.blockchain_verified && (
                <div className="space-y-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Hash className="w-3 h-3" />
                    <span>TX: </span>
                    <span className="font-mono text-emerald-300 break-all">{data.blockchain_tx_id}</span>
                  </div>
                  {data.blockchain_hash && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Shield className="w-3 h-3" />
                      <span>Hash: </span>
                      <span className="font-mono text-slate-300 break-all text-[10px]">{data.blockchain_hash}</span>
                    </div>
                  )}
                  {data.anchor_timestamp && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>Anchored: </span>
                      <span className="font-mono text-slate-300">{new Date(data.anchor_timestamp).toLocaleString()}</span>
                    </div>
                  )}
                  <p className="text-[10px] text-emerald-400/60 mt-2 uppercase tracking-widest font-semibold">
                    ✦ Verified on Hyperledger Fabric ✦
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <Button onClick={onReset} variant={valid ? 'secondary' : 'danger'} className="w-full flex items-center justify-center gap-2">
          <RefreshCcw className="w-4 h-4" /> Verify Another
        </Button>
      </Card>
    </motion.div>
  );
}
