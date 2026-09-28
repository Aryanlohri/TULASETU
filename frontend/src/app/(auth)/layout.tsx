export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-100px)] w-full flex flex-col bg-paper relative">
      {/* Auth Specific Branding Header */}
      <div className="w-full absolute top-0 left-0 p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-ink-navy/5 border border-ink-navy/10 rounded-full flex items-center justify-center">
             {/* Placeholder for State Emblem */}
             <span className="text-sm font-serif font-bold text-ink-navy">LM</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-ink-navy text-xl leading-none">TulaSetu</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Verification Portal</span>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex w-full">
        {children}
      </div>
    </div>
  );
}
