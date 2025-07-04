
import { headers } from 'next/headers';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminShortcut from '@/components/AdminShortcut';
import './globals.css';
import { getSocialLinks } from '@/lib/data';
import type { SocialLink } from '@/lib/types';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get('x-next-pathname') || '';
  
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/login';

  const socialLinks = await getSocialLinks();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Inioluwa's Digital Atelier</title>
        <meta name="description" content="A creative visionary blending architecture, design, and innovation." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Belleza&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {isLoginRoute || isAdminRoute ? (
              <>{children}</>
            ) : (
              <AdminShortcut>
                <div className="relative flex min-h-screen flex-col">
                  <Header socialLinks={socialLinks} />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </AdminShortcut>
            )}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
