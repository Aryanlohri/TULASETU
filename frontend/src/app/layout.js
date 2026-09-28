import { Inter, Outfit } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata = {
  title: 'TulaSetu - Blockchain-Verified Instrument Certification',
  description: 'Legal Metrology instrument verification system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-govbg text-slate-900 min-h-screen antialiased selection:bg-saffron-500/30`}>
        {children}
        <Toaster position="top-right" toastOptions={{
          style: { background: '#fff', color: '#1e293b', border: '1px solid #e2e8f0' }
        }} />
      </body>
    </html>
  );
}
