import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, CheckSquare, ShieldCheck, Box } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ role }) {
  const pathname = usePathname();
  
  const links = role === 'TRADER' ? [
    { href: '/trader', label: 'Dashboard', icon: Home },
    { href: '/trader/instruments', label: 'Instruments', icon: Box },
    { href: '/trader/applications', label: 'Applications', icon: FileText },
    { href: '/trader/certificates', label: 'Certificates', icon: ShieldCheck },
  ] : [
    { href: '/officer', label: 'Dashboard', icon: Home },
    { href: '/officer/inspections', label: 'Inspections', icon: CheckSquare },
    { href: '/officer/certificates', label: 'Issue Certs', icon: ShieldCheck },
  ];

  return (
    <aside className="w-72 fixed inset-y-0 left-0 gov-glass m-6 flex flex-col z-20">
      <div className="p-8 border-b border-gray-100/50 flex flex-col items-center">
        <div className="w-16 h-16 bg-gradient-to-tr from-primary-800 to-saffron-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-glow">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-900 to-primary-700 tracking-tight">TulaSetu</h1>
        <p className="text-[10px] text-gray-400 mt-2 uppercase font-black tracking-[0.3em] bg-gray-100 px-3 py-1 rounded-full">{role} PORTAL</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-8 relative">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="relative block">
              {active && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute inset-0 bg-white shadow-sm border border-gray-200 rounded-xl z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className={`relative z-10 flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-bold transition-colors duration-300 ${active ? 'text-primary-900' : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'}`}>
                <Icon className={`w-5 h-5 ${active ? 'text-saffron-500' : ''}`} /> 
                {link.label}
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-gray-100/50">
        <div className="text-xs text-center text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indiaGreen-500 shadow-[0_0_8px_#138808]" />
          Digital India
        </div>
      </div>
    </aside>
  );
}
