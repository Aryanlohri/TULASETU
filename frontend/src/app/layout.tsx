import type { Metadata } from 'next';
import { Inter, Noto_Sans_Devanagari, Source_Serif_4 } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const noto = Noto_Sans_Devanagari({ 
  subsets: ['devanagari'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({ 
  subsets: ['latin'], 
  variable: '--font-source-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TulaSetu | Legal Metrology Verification',
  description: 'Government of India - Department of Legal Metrology Instrument Verification System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.variable} ${noto.variable} ${sourceSerif.variable} font-sans pt-[34px]`}>
        {/* Government of India Strip - FIXED TO TOP */}
        <div className="w-full bg-ink-navy text-white text-xs py-1.5 px-4 md:px-8 flex justify-between items-center border-b-[3px] border-saffron fixed top-0 left-0 z-[100] h-[34px]">
          <div className="flex items-center gap-4">
            <span className="font-semibold tracking-wide">GOVERNMENT OF INDIA</span>
            <span className="hidden sm:inline opacity-70">|</span>
            <span className="hidden sm:inline">Department of Consumer Affairs</span>
            <span className="hidden md:inline opacity-70">|</span>
            <span className="hidden md:inline">Legal Metrology</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium opacity-90">
            <button className="hover:text-saffron transition-colors">Skip to content</button>
            <div className="flex gap-1.5 items-center bg-white/10 rounded px-2 py-0.5">
              <button className="hover:text-saffron">A-</button>
              <button className="hover:text-saffron">A</button>
              <button className="hover:text-saffron">A+</button>
            </div>
            <select className="bg-transparent border-none outline-none cursor-pointer hover:text-saffron">
              <option value="en" className="text-black">English</option>
              <option value="hi" className="text-black">हिन्दी</option>
            </select>
          </div>
        </div>

        <main className="min-h-[calc(100vh-34px)]">
          {children}
        </main>
        
        <Toaster position="top-right" toastOptions={{
          className: 'font-sans text-sm hairline-border rounded-lg shadow-elevated',
        }} />
      </body>
    </html>
  );
}
