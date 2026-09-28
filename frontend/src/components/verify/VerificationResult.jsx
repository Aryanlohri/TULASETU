'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Shield, RefreshCcw, Clock, Hash } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function VerificationResult({ result, onReset }) {
  const { valid, data, error } = result;

  const statusColors = {
    ACTIVE: 'VERIFIED',
    EXPIRED: 'PENDING',
    REVOKED: 'REJECTED',
    SUSPENDED: 'PENDING',
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
      <Card className={`p-8 border-2 ${valid ? 'border-green-500 shadow-sm' : 'border-red-500 shadow-sm'}`}>
        {/* Status Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          {valid ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: 'spring', damping: 15 }}>
              <CheckCircle2 className="w-24 h-24 text-green-600 mb-4" />
            </motion.div>
          ) : (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}>
              <XCircle className="w-24 h-24 text-red-600 mb-4" />
            </motion.div>
          )}
          <h2 className={`text-3xl font-heading font-black ${valid ? 'text-green-700' : 'text-red-700'}`}>
            {valid ? 'Certificate Verified' : 'Verification Failed'}
          </h2>
          <p className="text-gray-600 font-medium mt-2">
            {valid ? 'This instrument has a valid, officially issued certificate' : (error || 'Certificate not found or is invalid')}
          </p>
        </div>

        {/* Certificate Details */}
        {valid && data && (
          <div className="space-y-3 text-left bg-gray-50 border border-gray-200 p-6 rounded-md mb-6">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 text-sm font-semibold">Certificate No.</span>
              <span className="font-mono font-bold text-gray-900">{data.certificate_number}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 text-sm font-semibold">Instrument Type</span>
              <Badge type={data.instrument_type === 'WEIGHING' ? 'WEIGHING' : 'default'}>
                {data.instrument_type}
              </Badge>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 text-sm font-semibold">Status</span>
              <Badge type={statusColors[data.status] || 'default'}>
                {data.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 text-sm font-semibold">Valid From</span>
              <span className="font-bold text-gray-900">{data.valid_from}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500 text-sm font-semibold">Valid Until</span>
              <span className="font-bold text-gray-900">{data.valid_until}</span>
            </div>

            {/* Blockchain Proof Section */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Shield className={`w-5 h-5 ${data.blockchain_verified ? 'text-green-600' : 'text-yellow-600'}`} />
                <span className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  {data.blockchain_verified ? 'Blockchain Secured' : 'Blockchain Pending'}
                </span>
              </div>
              {data.blockchain_verified && (
                <div className="space-y-2 bg-green-50 border border-green-200 rounded-md p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                    <Hash className="w-3 h-3 text-green-700" />
                    <span>TX ID: </span>
                    <span className="font-mono text-gray-900 break-all">{data.blockchain_tx_id}</span>
                  </div>
                  {data.blockchain_hash && (
                    <div className="flex items-center gap-2 text-xs text-gray-600 font-medium mt-1">
                      <Shield className="w-3 h-3 text-green-700" />
                      <span>Hash: </span>
                      <span className="font-mono text-gray-900 break-all">{data.blockchain_hash}</span>
                    </div>
                  )}
                  {data.anchor_timestamp && (
                    <div className="flex items-center gap-2 text-xs text-gray-600 font-medium mt-1">
                      <Clock className="w-3 h-3 text-green-700" />
                      <span>Timestamp: </span>
                      <span className="font-mono text-gray-900">{new Date(data.anchor_timestamp).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="mt-3 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded uppercase tracking-widest border border-green-200">
                      Immutable Ledger Verification
                    </span>
                  </div>
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
