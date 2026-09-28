'use client';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="w-8 h-8 border-4 border-ink-navy/20 border-t-ink-navy rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-paper flex">
      <Sidebar role={user.role} />
      <div className="flex-1 ml-64 flex flex-col relative pt-[38px]">
        <Topbar />
        <main className="flex-1 p-8 mt-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
