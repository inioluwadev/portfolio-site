
import { headers } from 'next/headers';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminShortcut from '@/components/AdminShortcut';
import './globals.css';
import { getAboutContent, getSocialLinks, getSettings } from '@/lib/data';
import type { Metadata } from 'next';
import type { SocialLink, AboutContent } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  // Using a fallback URL to prevent crash, but user should set NEXT_PUBLIC_SITE_URL in .env.local
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const settings = await getSettings();
  const aboutContent = await getAboutContent();
  
  const siteTitle = settings?.site_title || "Inioluwa's Digital Atelier";
  const description = aboutContent?.meta_description || aboutContent?.paragraph1 || "A creative visionary blending architecture, design, and innovation.";
  const ogImage = aboutContent?.og_image_url || aboutContent?.image_url;

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
      icon: aboutContent?.favicon_url || '/favicon.ico',
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

  const [socialLinks, aboutContent] = await Promise.all([
    getSocialLinks(),
    getAboutContent()
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;700&family=Rajdhani:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {isLoginRoute || isAdminRoute ? (
              <>{children}</>
            ) : (
              <AdminShortcut>
                <div className="relative flex min-h-screen flex-col">
                  <Header socialLinks={socialLinks} />
                  <main className="flex-1">{children}</main>
                  <Footer socialLinks={socialLinks} aboutContent={aboutContent} />
                </div>
              </AdminShortcut>
            )}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
