import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { AuthButton } from '@/components/auth-button';
import { LanguageSelector } from '@/components/language-selector';
import { SystemStatus } from '@/components/system-status';
import { Logo3D } from '@/components/logo-3d';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Banking Assistant',
  description: 'Your AI banking information assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/30 dark:to-background">
            <div className="fixed top-4 right-4 flex items-center gap-2">
              <AuthButton />
              <LanguageSelector />
              <ThemeToggle />
              <SystemStatus />
            </div>
            <div className="flex">
              <div className="fixed left-0 top-0 h-full bg-background/80 backdrop-blur-sm border-r">
                <div className="p-4">
                  <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-200">
                    RBL
                  </h1>
                </div>
                <MainNav />
              </div>
              <main className="flex-1 pl-16">
                <div className="container flex flex-col items-center justify-center gap-4 px-4 py-8 md:py-16">
                  <div className="w-32 h-32">
                    <Logo3D />
                  </div>
                  {children}
                </div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}