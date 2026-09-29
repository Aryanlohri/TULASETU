'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isOfficerLogin, setIsOfficerLogin] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock login delay for video demo
    setTimeout(() => {
      toast.success('Successfully authenticated');
      if (isOfficerLogin) {
        // Defaulting to admin for the impressive dashboard demo
        router.push('/admin');
      } else {
        router.push('/trader');
      }
    }, 800);
  };

  return (
    <div className="w-full flex">
      {/* Left side: Split Screen Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 mt-16 lg:mt-0">
        <div className="w-full max-w-md bg-white p-8 rounded-lg hairline-border shadow-soft">
          
          <div className="mb-8">
            <img src="/brand/logo-horizontal.svg" alt="TulaSetu Logo" className="h-10 mb-6" />
            <h1 className="text-2xl font-serif font-bold text-ink-navy mb-2">Access Portal</h1>
            <p className="text-sm text-slate-500">Sign in to manage your Legal Metrology compliances or conduct inspections.</p>
          </div>

          {/* Role Toggle for realism */}
          <div className="flex bg-slate-100 p-1 rounded-md mb-8 hairline-border">
            <button 
              onClick={() => setIsOfficerLogin(false)}
              className={`flex-1 text-xs font-semibold py-2 rounded ${!isOfficerLogin ? 'bg-white shadow-sm text-ink-navy' : 'text-slate-500 hover:text-ink-navy'} transition-all`}
            >
              Citizen / Entity
            </button>
            <button 
              onClick={() => setIsOfficerLogin(true)}
              className={`flex-1 text-xs font-semibold py-2 rounded ${isOfficerLogin ? 'bg-white shadow-sm text-ink-navy' : 'text-slate-500 hover:text-ink-navy'} transition-all`}
            >
              Officer / Admin
            </button>
          </div>

          {errors.detail && (
            <div className="mb-6 p-3 bg-signalRed/5 border border-signalRed/20 rounded-md flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-signalRed shrink-0 mt-0.5" />
              <p className="text-sm text-signalRed font-medium">{errors.detail}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Username or ID</label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className={`w-full bg-white border pl-10 pr-4 py-2.5 rounded-md text-ink-navy focus-ring ${errors.username ? 'border-signalRed' : 'border-slate-300'}`}
                  placeholder={isOfficerLogin ? "LMO ID (e.g. LMO-MP-001)" : "Registered Username"}
                  required
                />
              </div>
              {errors.username && <p className="mt-1.5 text-xs text-signalRed">{errors.username[0]}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Password / PIN</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full bg-white border pl-10 pr-4 py-2.5 rounded-md text-ink-navy focus-ring ${errors.password ? 'border-signalRed' : 'border-slate-300'}`}
                  placeholder="••••••••"
                  required
                />
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-signalRed">{errors.password[0]}</p>}
            </div>

            <div className="flex items-center justify-between mt-2 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-ink-navy focus:ring-ink-navy" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-ink-navy font-semibold hover:underline">Forgot access?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink-navy hover:bg-ink-navy/90 text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Secure Login <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {!isOfficerLogin && (
            <p className="mt-8 text-center text-sm text-slate-500">
              Not registered on the portal?{' '}
              <Link href="/register" className="font-semibold text-ink-navy hover:underline">
                Complete Onboarding
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Right Side: Visual / Brand */}
      <div className="hidden lg:flex w-1/2 bg-ink-navy relative overflow-hidden items-center justify-center p-12">
        {/* Subtle grid pattern and watermark over navy */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <img src="/brand/mark-only.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] opacity-[0.03] invert" />
        
        <div className="relative z-10 max-w-md text-white">
          <h2 className="text-3xl font-serif font-bold mb-4 leading-tight">Trust, made visible.</h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            The national single-window system for legal metrology. Immutable verification, streamlined applications, and real-time ledger tracking for all commercial measuring instruments.
          </p>
          
          <div className="flex flex-col gap-4">
             <div className="bg-white/5 border border-white/10 p-4 rounded-md backdrop-blur-sm">
                <span className="block text-xs font-semibold text-saffron uppercase tracking-widest mb-1">Scale Owners</span>
                <span className="text-sm text-slate-200">Register once to track all your compliance certificates nationwide.</span>
             </div>
             <div className="bg-white/5 border border-white/10 p-4 rounded-md backdrop-blur-sm">
                <span className="block text-xs font-semibold text-saffron uppercase tracking-widest mb-1">State Officials</span>
                <span className="text-sm text-slate-200">Conduct inspections and cryptographically anchor results to the ledger.</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
