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
    <aside className="w-64 fixed inset-y-0 left-0 glass border-l-0 border-t-0 border-b-0 flex flex-col z-20">
      <div className="p-6">
        <h1 className="text-2xl font-heading font-bold text-gradient">TulaSetu</h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{role} PORTAL</p>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className={clsx(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              active ? "bg-indigo-500/10 text-indigo-400 shadow-[inset_2px_0_0_#6366f1]" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            )}>
              <Icon className="w-5 h-5" /> {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
