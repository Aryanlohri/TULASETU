'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Store, ShieldCheck, Factory, Users, Fingerprint, Lock, Mail, User, Building, ArrowRight, CheckCircle2 } from 'lucide-react';

type Role = 'TRADER' | 'LMO' | 'TEST_CENTER' | 'CITIZEN';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    business_name: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleConsentAccept = () => {
    // In a real app, this would redirect to DigiLocker OAuth
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      const payload = {
        ...formData,
        role: selectedRole,
      };
      await register(payload);
      toast.success('Registration successful. Please login.');
      router.push('/login');
    } catch (err: any) {
      setErrors(err);
      toast.error('Registration failed. Please check the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-12 px-4 mt-8">
      <div className="w-full max-w-2xl bg-white p-8 md:p-10 rounded-lg hairline-border shadow-soft">
        
        {/* Stepper Header */}
        <div className="mb-10 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-ink-navy text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
            <div className={`h-1 w-12 rounded ${step >= 2 ? 'bg-ink-navy' : 'bg-slate-100'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-ink-navy text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
            <div className={`h-1 w-12 rounded ${step >= 3 ? 'bg-ink-navy' : 'bg-slate-100'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-ink-navy text-white' : 'bg-slate-100 text-slate-400'}`}>3</div>
          </div>
        </div>

        {/* STEP 1: ROLE SELECTION */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-serif font-bold text-ink-navy mb-2 text-center">Select your profile type</h1>
            <p className="text-sm text-slate-500 text-center mb-8">Identify your primary role to access the correct portal features.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => handleRoleSelect('TRADER')} className="text-left p-5 rounded-md border border-slate-200 hover:border-ink-navy hover:shadow-soft transition-all focus-ring group">
                <div className="w-10 h-10 bg-slate-100 group-hover:bg-ink-navy/10 rounded-full flex items-center justify-center mb-4 text-ink-navy">
                  <Store className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-ink-navy mb-1">Trader / Business</h3>
                <p className="text-xs text-slate-500">Owners of commercial weighing & measuring instruments.</p>
              </button>
              
              <button onClick={() => handleRoleSelect('LMO')} className="text-left p-5 rounded-md border border-slate-200 hover:border-ink-navy hover:shadow-soft transition-all focus-ring group">
                <div className="w-10 h-10 bg-slate-100 group-hover:bg-ink-navy/10 rounded-full flex items-center justify-center mb-4 text-ink-navy">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-ink-navy mb-1">Legal Metrology Officer</h3>
                <p className="text-xs text-slate-500">State officials conducting inspections and stamping.</p>
              </button>

              <button onClick={() => handleRoleSelect('TEST_CENTER')} className="text-left p-5 rounded-md border border-slate-200 hover:border-ink-navy hover:shadow-soft transition-all focus-ring group">
                <div className="w-10 h-10 bg-slate-100 group-hover:bg-ink-navy/10 rounded-full flex items-center justify-center mb-4 text-ink-navy">
                  <Factory className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-ink-navy mb-1">Testing Centre / RR</h3>
                <p className="text-xs text-slate-500">Authorized laboratories and repairers.</p>
              </button>

              <button onClick={() => handleRoleSelect('CITIZEN')} className="text-left p-5 rounded-md border border-slate-200 hover:border-ink-navy hover:shadow-soft transition-all focus-ring group">
                <div className="w-10 h-10 bg-slate-100 group-hover:bg-ink-navy/10 rounded-full flex items-center justify-center mb-4 text-ink-navy">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-ink-navy mb-1">Citizen</h3>
                <p className="text-xs text-slate-500">Consumers lodging complaints or verifying stamps.</p>
              </button>
            </div>
            
            <p className="mt-8 text-center text-sm text-slate-500">
              Already registered?{' '}
              <Link href="/login" className="font-semibold text-ink-navy hover:underline">
                Access Portal
              </Link>
            </p>
          </div>
        )}

        {/* STEP 2: e-KYC CONSENT */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-md mx-auto">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mb-4">
                <Fingerprint className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-ink-navy mb-2">Aadhaar e-KYC</h1>
              <p className="text-sm text-slate-500">
                To establish a high-trust verification ecosystem, {selectedRole === 'TRADER' ? 'businesses' : 'officers'} must authenticate via DigiLocker.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-md p-5 mb-8">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Data to be shared:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-indiaGreen shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-navy">Full Legal Name</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-indiaGreen shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-navy">Date of Birth & Gender</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-indiaGreen shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-navy">Registered Mobile Number</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-slate-300 text-slate-600 font-semibold rounded-md hover:bg-slate-50 transition-colors focus-ring"
              >
                Back
              </button>
              <button 
                onClick={handleConsentAccept}
                className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Continue with DigiLocker <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REGISTRATION DETAILS */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <h1 className="text-2xl font-serif font-bold text-ink-navy mb-2">Profile Details</h1>
            <p className="text-sm text-slate-500 mb-8">
              e-KYC verified successfully. Complete your profile to finalize registration.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Username</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className={`w-full bg-white border pl-9 pr-4 py-2.5 rounded-md text-ink-navy text-sm focus-ring ${errors.username ? 'border-signalRed' : 'border-slate-300'}`}
                      required
                    />
                  </div>
                  {errors.username && <p className="mt-1 text-xs text-signalRed">{errors.username[0]}</p>}
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Legal Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className={`w-full bg-white border pl-9 pr-4 py-2.5 rounded-md text-ink-navy text-sm focus-ring ${errors.full_name ? 'border-signalRed' : 'border-slate-300'}`}
                      required
                    />
                  </div>
                  {errors.full_name && <p className="mt-1 text-xs text-signalRed">{errors.full_name[0]}</p>}
                </div>
              </div>

              {selectedRole === 'TRADER' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Business / Entity Name</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.business_name}
                      onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                      className="w-full bg-white border pl-9 pr-4 py-2.5 rounded-md text-ink-navy text-sm focus-ring border-slate-300"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-white border pl-9 pr-4 py-2.5 rounded-md text-ink-navy text-sm focus-ring ${errors.email ? 'border-signalRed' : 'border-slate-300'}`}
                      required
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-signalRed">{errors.email[0]}</p>}
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Set Password / PIN</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full bg-white border pl-9 pr-4 py-2.5 rounded-md text-ink-navy text-sm focus-ring ${errors.password ? 'border-signalRed' : 'border-slate-300'}`}
                      required
                    />
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-signalRed">{errors.password[0]}</p>}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 mt-8 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-slate-300 text-slate-600 font-semibold rounded-md hover:bg-slate-50 transition-colors focus-ring"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-ink-navy hover:bg-ink-navy/90 text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Complete Registration <CheckCircle2 className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
