'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-govbg py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8 shadow-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-12 h-12 bg-primary-900 rounded-full flex items-center justify-center text-white mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-heading font-black text-primary-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500 font-medium">Sign in to your TulaSetu account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" variant="primary" className="w-full mt-2 py-3" loading={loading}>Sign In to Portal</Button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-500 font-medium">
          Don't have an account? <Link href="/register" className="text-primary-900 font-bold hover:underline">Register here</Link>
        </p>
      </Card>
    </div>
  );
}
