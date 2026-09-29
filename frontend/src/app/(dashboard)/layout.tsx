'use client';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { useEffect, Suspense } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const { user, loading } = useAuth();
  // const router = useRouter();
  
  // Dynamic mock for UI review phase
  const pathname = usePathname();
  const mockRole = pathname?.includes('/admin') ? 'ADMIN' : pathname?.includes('/officer') ? 'LMO' : 'TRADER';
  const user = { name: "Demo User", role: mockRole };
  const loading = false;
  
  /* 
  // Bypassed Auth for UI Review Phase
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
  */

  return (
    <div className="min-h-screen bg-paper flex">
      <Suspense fallback={<div className="w-64 fixed inset-y-0 left-0 bg-white border-r hairline-border" />}>
        <Sidebar role={user.role} />
      </Suspense>
      <div className="flex-1 ml-64 flex flex-col relative pt-[34px]">
        <Topbar />
        <main className="flex-1 p-8 mt-16 overflow-y-auto">
          <Suspense fallback={<div className="p-8 text-slate-500 font-semibold animate-pulse">Loading dashboard...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
