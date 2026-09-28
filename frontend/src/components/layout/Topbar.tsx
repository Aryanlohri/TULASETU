'use client';
import { useAuth } from '@/hooks/useAuth';
import { Bell, Search, UserCircle, LogOut, Loader2 } from 'lucide-react';

export default function Topbar() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="h-16 bg-white border-b hairline-border fixed top-[34px] right-0 left-64 z-10 flex items-center justify-between px-6 shadow-soft">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input 
            type="text" 
            placeholder="Search instruments or applications..." 
            className="w-full bg-slate-50 border hairline-border rounded-md pl-9 pr-4 py-1.5 text-sm focus-ring"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:text-ink-navy hover:bg-slate-100 rounded-full transition-colors focus-ring">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-saffron rounded-full border border-white" />
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-2" />
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-ink-navy leading-none">
              {loading ? 'Loading...' : (user?.name || user?.full_name || 'Officer')}
            </p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
              {user?.role || 'LMO'}
            </p>
          </div>
          <div className="w-9 h-9 bg-slate-100 hairline-border rounded-full flex items-center justify-center text-slate-500">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserCircle className="w-6 h-6" />}
          </div>
          
          <button 
            onClick={logout}
            className="ml-2 p-2 text-slate-400 hover:text-signalRed hover:bg-signalRed/5 rounded-md transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
