'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, CheckCircle2, Link as LinkIcon, Clock, ChevronDown } from 'lucide-react';

interface LedgerStripProps {
  txHash: string;
  timestamp: string;
  blockNumber: number;
}

export default function LedgerStrip({ txHash, timestamp, blockNumber }: LedgerStripProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncatedHash = `${txHash.substring(0, 6)}...${txHash.substring(txHash.length - 4)}`;

  return (
    <div className="w-full hairline-border rounded-lg bg-white overflow-hidden shadow-soft">
      {/* Compact Strip */}
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors focus-ring"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indiaGreen opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indiaGreen"></span>
            </span>
            <span className="text-xs font-semibold text-ink-navy uppercase tracking-wide">
              Anchored on Hyperledger Fabric
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono border border-slate-200">
            <LinkIcon className="w-3 h-3 opacity-60" />
            {truncatedHash}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
          <span className="hidden sm:inline">Verified just now</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-200 bg-slate-50"
          >
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">Transaction Hash</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-ink-navy break-all bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">{txHash}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleCopy(); }}
                    className="p-1.5 text-slate-400 hover:text-ink-navy transition-colors bg-white border border-slate-200 rounded shadow-sm"
                    title="Copy full hash"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-indiaGreen" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">Block Timestamp</p>
                  <div className="flex items-center gap-2 text-ink-navy font-mono">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {timestamp}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">Block Number</p>
                  <p className="text-ink-navy font-mono">#{blockNumber}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
