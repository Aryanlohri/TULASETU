'use client';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/ui/Card';
import { ClipboardList, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OfficerDashboard() {
  const { user } = useAuth();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
        <h1 className="text-4xl font-heading font-black text-primary-900 tracking-tight">Officer Dashboard</h1>
        <p className="text-gray-500 font-medium mt-2">Welcome back, {user?.name || user?.full_name}. Manage pending verifications below.</p>
      </motion.div>
      
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={item}>
          <Card className="p-8 flex items-center gap-6" hover>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-saffron-50 to-saffron-100 text-saffron-600 shadow-sm border border-saffron-200/50">
              <ClipboardList className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Pending Inspections</p>
              <p className="text-4xl font-black text-gray-900 mt-1">5</p>
            </div>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="p-8 flex items-center gap-6" hover>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 text-green-700 shadow-sm border border-green-200/50">
              <CheckSquare className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Completed Today</p>
              <p className="text-4xl font-black text-gray-900 mt-1">12</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
