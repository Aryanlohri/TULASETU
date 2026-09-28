import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, CheckSquare, ShieldCheck, Box } from 'lucide-react';
import { clsx } from 'clsx';

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
    <aside className="w-64 fixed inset-y-0 left-0 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-heading font-black text-primary-900 tracking-tight">TulaSetu</h1>
        <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-widest">{role} PORTAL</p>
      </div>
      <nav className="flex-1 px-4 space-y-1 mt-6">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className={clsx(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200",
              active 
                ? "bg-saffron-50 text-saffron-600 border-l-4 border-saffron-500 shadow-sm" 
                : "text-gray-600 hover:text-primary-900 hover:bg-gray-50 border-l-4 border-transparent"
            )}>
              <Icon className="w-5 h-5" /> {link.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-center text-gray-500 font-medium">
          Digital India Initiative
        </div>
      </div>
    </aside>
  );
}
