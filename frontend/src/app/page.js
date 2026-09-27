'use client';
import Link from 'next/link';
import { Shield, Zap, Globe, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-violet-600/20 rounded-full blur-[100px]" />

      <header className="px-8 py-6 flex justify-between items-center z-10 glass m-4 rounded-2xl">
        <h1 className="text-2xl font-heading font-bold text-gradient">TulaSetu</h1>
        <div className="space-x-4">
          <Link href="/verify" className="text-sm font-medium hover:text-indigo-400 transition">Verify Certificate</Link>
          <Link href="/login" className="text-sm font-medium hover:text-indigo-400 transition">Login</Link>
          <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:scale-105 transition">Get Started</Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
            Blockchain-Verified <br/> <span className="text-gradient">Instrument Certification</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Secure, transparent, and tamper-proof legal metrology verification platform for traders, officers, and citizens.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl font-semibold text-lg shadow-xl shadow-indigo-500/20 hover:scale-105 transition">Start Applying</Link>
            <Link href="/verify" className="px-8 py-4 glass rounded-xl font-semibold text-lg hover:bg-white/10 transition">Verify Now</Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-24 max-w-6xl mx-auto w-full">
          {[
            { icon: Shield, title: 'Blockchain Secured', desc: 'Tamper-proof records on Hyperledger Fabric' },
            { icon: Zap, title: 'Instant Verification', desc: 'Scan QR to verify instantly' },
            { icon: Globe, title: 'Transparent Process', desc: 'Real-time tracking of applications' },
            { icon: Lock, title: 'Data Privacy', desc: 'Secure role-based access control' }
          ].map((feature, i) => (
            <div key={i} className="glass p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
      
      <footer className="py-8 text-center text-slate-500 text-sm z-10">
        © 2026 TulaSetu. Smart India Hackathon.
      </footer>
    </div>
  );
}
