'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import toast from 'react-hot-toast';
import { Scale } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '', email: '', password: '', role: 'TRADER', phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.register(formData);
      toast.success('Registration successful! Please login.');
      router.push('/login');
    } catch (err) {
      if (err.response?.data && typeof err.response.data === 'object' && !err.response.data.message && !err.response.data.error) {
        // Parse DRF validation errors e.g. {"email": ["user with this email already exists."]}
        const firstErrorKey = Object.keys(err.response.data)[0];
        const firstErrorMessage = err.response.data[firstErrorKey][0];
        toast.error(`${firstErrorKey}: ${firstErrorMessage}`);
      } else {
        toast.error(err.response?.data?.error || err.response?.data?.message || 'Registration failed. Check your inputs.');
      }
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: 'TRADER', label: 'Trader / Business' },
    { id: 'LMO', label: 'Legal Metrology Officer' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-govbg py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-12 h-12 bg-primary-900 rounded-full flex items-center justify-center text-white mb-4">
            <Scale className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-heading font-black text-primary-900 mb-2">Create Account</h1>
          <p className="text-gray-500 font-medium">Join the TulaSetu network</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-4 mb-2">
            {roles.map(r => (
              <div key={r.id} onClick={() => setFormData({...formData, role: r.id})} 
                className={`flex-1 text-center py-2.5 rounded-md cursor-pointer border text-sm font-bold transition-all ${formData.role === r.id ? 'border-primary-900 bg-primary-50 text-primary-900 shadow-sm' : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'}`}>
                {r.label}
              </div>
            ))}
          </div>
          
          <Input label="Full Name" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} required />
          <Input label="Email Address" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <Input label="Phone Number" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <Input label="Password" type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          
          <Button type="submit" variant="primary" className="w-full mt-2 py-3" loading={loading}>Complete Registration</Button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-500 font-medium">
          Already have an account? <Link href="/login" className="text-primary-900 font-bold hover:underline">Log in</Link>
        </p>
      </Card>
    </div>
  );
}
