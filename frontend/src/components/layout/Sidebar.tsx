'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Home, FileText, CheckSquare, ShieldCheck, Box } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');
  
  let links = [];
  if (role === 'TRADER') {
    links = [
      { href: '/trader', label: 'Dashboard', icon: Home },
      { href: '/trader?tab=instruments', label: 'Instruments', icon: Box },
      { href: '/trader?tab=applications', label: 'Applications', icon: FileText },
      { href: '/trader?tab=certificates', label: 'Certificates', icon: ShieldCheck },
    ];
  } else if (role === 'ADMIN') {
    links = [
      { href: '/admin', label: 'Command Center', icon: Home },
      { href: '/admin?tab=heatmap', label: 'GIS Heatmap', icon: Box },
      { href: '/admin?tab=reports', label: 'Ledger Reports', icon: FileText },
    ];
  } else {
    // Default to LMO / Officer
    links = [
      { href: '/officer', label: 'Inspections', icon: CheckSquare },
      { href: '/officer/inspections/new', label: 'Field Capture', icon: ShieldCheck },
    ];
  }

  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-white border-r hairline-border flex flex-col z-20 top-[34px] shadow-soft">
      <div className="p-6 border-b hairline-border flex flex-col items-center mt-4">
        <img src="/brand/logo-stacked.svg" alt="TulaSetu" className="h-[120px] mb-2" />
        <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-[0.2em] bg-slate-50 border hairline-border px-2 py-0.5 rounded-sm">{role} PORTAL</p>
      </div>
      
      <nav className="flex-1 px-3 py-6 space-y-1 relative">
        {links.map((link) => {
          const isBaseRoute = link.href === pathname;
          const linkTab = link.href.split('tab=')[1];
          const active = linkTab ? currentTab === linkTab : (!currentTab && isBaseRoute);
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="relative block group">
              {active && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute inset-0 bg-slate-100 rounded-md z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                />
              )}
              <div className={`relative z-10 flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors duration-200 ${active ? 'text-ink-navy' : 'text-slate-600 hover:text-ink-navy hover:bg-slate-50'}`}>
                <Icon className={`w-4 h-4 ${active ? 'text-saffron' : 'opacity-70 group-hover:opacity-100'}`} strokeWidth={active ? 2.5 : 2} /> 
                {link.label}
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t hairline-border bg-slate-50">
        <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest flex flex-col gap-1 items-center justify-center text-center">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-indiaGreen" />
            System Online
          </div>
          <span className="opacity-70">GIGW 3.0 Compliant</span>
        </div>
      </div>
    </aside>
  );
}
