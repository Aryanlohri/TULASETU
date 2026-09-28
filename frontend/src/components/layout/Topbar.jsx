import { useAuth } from '@/hooks/useAuth';
import { LogOut, User, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Topbar({ user }) {
  const { logout } = useAuth();
  
  return (
    <header className="sticky top-0 z-30 gov-glass mx-6 mt-4 mb-6 rounded-2xl overflow-hidden border-b-0">
      {/* Top small banner (Saffron/Green accents) */}
      <div className="h-1.5 bg-gradient-to-r from-saffron-500 via-primary-500 to-indiaGreen-500"></div>
      
      <div className="h-20 px-8 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl flex items-center justify-center text-white shadow-premium"
          >
            <ShieldCheck className="w-7 h-7" />
          </motion.div>
          <div>
            <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-900 to-primary-600 uppercase tracking-widest">Department of Legal Metrology</h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">Government of India</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-l-2 pl-6 border-gray-200/50">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center text-primary-900 border border-gray-300 shadow-sm cursor-pointer"
            >
              <User className="w-5 h-5" />
            </motion.div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-black text-gray-900">{user?.name || user?.full_name}</p>
              <p className="text-xs text-gray-500 font-bold bg-gray-100 rounded-full px-2 py-0.5 mt-1 inline-block w-max">{user?.email}</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: '#fee2e2' }}
            whileTap={{ scale: 0.9 }}
            onClick={logout} 
            className="p-3 text-gray-500 hover:text-red-600 bg-gray-50/50 rounded-xl transition shadow-sm border border-transparent hover:border-red-100" 
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
