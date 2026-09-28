'use client';
import Link from 'next/link';
import { ShieldCheck, FileSearch, Scale, Building2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-govbg text-gray-900">
      
      {/* Top Govt Header */}
      <div className="bg-primary-900 text-white py-1 px-8 text-xs font-semibold flex justify-between">
        <span>Government of India</span>
        <span>Digital India Initiative</span>
      </div>
      
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary-900 rounded-full flex items-center justify-center text-white">
            <Scale className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-black text-primary-900 uppercase tracking-wide">TulaSetu</h1>
            <p className="text-xs text-gray-500 font-bold uppercase">Department of Legal Metrology</p>
          </div>
        </div>
        <div className="space-x-4">
          <Link href="/verify" className="text-sm font-bold text-gray-600 hover:text-primary-900 transition">Verify Certificate</Link>
          <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-primary-900 transition">Login</Link>
          <Link href="/register" className="px-5 py-2.5 bg-saffron-500 rounded-md text-white text-sm font-bold shadow-sm hover:bg-saffron-600 transition">Trader Registration</Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <div className="w-full bg-white border-b border-gray-200 py-20 px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 text-primary-900">
            Blockchain-Secured <br/> Instrument Verification
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 font-medium">
            The official portal for traders to register and verify weighing and measuring instruments, ensuring transparency and consumer protection across India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="px-8 py-3 bg-primary-900 rounded-md font-bold text-white shadow-sm hover:bg-primary-800 transition">Apply for Verification</Link>
            <Link href="/verify" className="px-8 py-3 bg-white border-2 border-primary-900 rounded-md font-bold text-primary-900 hover:bg-gray-50 transition">Public Search</Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto w-full px-4 mb-20">
          {[
            { icon: ShieldCheck, title: 'Blockchain Secured', desc: 'All certificates are anchored to Hyperledger Fabric for immutable proof.' },
            { icon: FileSearch, title: 'Instant Verification', desc: 'Citizens can scan the QR code on any scale to instantly verify its authenticity.' },
            { icon: Building2, title: 'Unified Platform', desc: 'A single, transparent portal for traders, GATC centers, and Legal Metrology Officers.' }
          ].map((feature, i) => (
            <div key={i} className="bg-white border border-gray-200 shadow-sm p-8 rounded-lg flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-primary-900" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600 font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 py-8 text-center text-gray-500 text-sm font-semibold">
        <p>Department of Legal Metrology, Government of India</p>
        <p className="mt-2 text-xs">Developed for Smart India Hackathon 2026</p>
      </footer>
    </div>
  );
}
