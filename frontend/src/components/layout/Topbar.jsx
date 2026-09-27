import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';

export default function Topbar({ user }) {
  const { logout } = useAuth();
  
  return (
    <header className="h-20 px-8 flex items-center justify-end glass border-t-0 border-x-0 sticky top-0 z-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>
        <button onClick={logout} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
