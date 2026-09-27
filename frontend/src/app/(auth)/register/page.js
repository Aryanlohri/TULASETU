'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import toast from 'react-hot-toast';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'TRADER'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.register(formData);
      toast.success('Registration successful! Please login.');
      router.push('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Create Account</h1>
        <p className="text-slate-400">Join the TulaSetu network</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 mb-4">
          {['TRADER', 'OFFICER'].map(r => (
            <div key={r} onClick={() => setFormData({...formData, role: r})} 
              className={`flex-1 text-center py-2 rounded-xl cursor-pointer border ${formData.role === r ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300' : 'border-white/10 glass text-slate-400'}`}>
              {r}
            </div>
          ))}
        </div>
        <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <Input label="Password" type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        
        <Button type="submit" variant="primary" className="w-full mt-4" loading={loading}>Register</Button>
      </form>
      <p className="text-center mt-6 text-sm text-slate-400">
        Already have an account? <Link href="/login" className="text-indigo-400 hover:underline">Log in</Link>
      </p>
    </Card>
  );
}
