
import { headers } from 'next/headers';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminShortcut from '@/components/AdminShortcut';
import './globals.css';
import { getAboutContent, getSettings, getSocialLinks } from '@/lib/data';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  // const aboutContent = await getAboutContent(); // Temporarily disabled to prevent crash
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  const siteTitle = settings?.site_title || "Inioluwa's Digital Atelier";
  const description = "A creative visionary blending architecture, design, and innovation."; // Fallback description
  const ogImage = undefined; // Fallback

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: description,
    openGraph: {
      title: siteTitle,
      description: description,
      url: siteUrl,
      siteName: siteTitle,
      images: ogImage ? [ogImage] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: description,
      images: ogImage ? [ogImage] : [],
    },
    icons: {
      icon: '/favicon.ico', // Fallback icon
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get('x-next-pathname') || '';
  
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/login';

  // Temporarily removed getAboutContent to prevent site crash from DB permission errors.
  const [settings, socialLinks] = await Promise.all([
    getSettings(),
    getSocialLinks()
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
                  <Footer socialLinks={socialLinks} />
                </div>
              </AdminShortcut>
            )}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
