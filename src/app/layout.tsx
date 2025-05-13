import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navBar';
import { SnackbarProvider } from '@/lib/snackbarContext';
import { Snackbar } from '@/components/snackbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata : Metadata = {
  title: 'User Management',
  description: 'Web app for user management',
};

export default function RootLayout({
  children,
} : Readonly<{
  children : React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SnackbarProvider>
          <Navbar />
          <main className='container mx-auto p-4' suppressHydrationWarning>
            {children}
          </main>
          <Snackbar />
        </SnackbarProvider>
      </body>
    </html>
  );
}
