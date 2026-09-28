import { useAuth } from '@/hooks/useAuth';
import { LogOut, User, ShieldCheck } from 'lucide-react';

export default function Topbar({ user }) {
  const { logout } = useAuth();
  
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      {/* Top small banner (Saffron/Green accents) */}
      <div className="h-1 bg-gradient-to-r from-saffron-500 via-white to-indiaGreen-500"></div>
      
      <div className="h-20 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-900 rounded-full flex items-center justify-center text-white">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary-900 uppercase tracking-wide">Department of Legal Metrology</h1>
            <p className="text-xs text-gray-500 font-medium">Government of India</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary-900 border border-gray-200">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 font-medium">{user?.email}</p>
            </div>
          </div>
          <button onClick={logout} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Logout">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
