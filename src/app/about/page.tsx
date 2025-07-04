import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Terminal } from 'lucide-react';
import SocialLinks from '@/components/layout/SocialLinks';
import { Card, CardContent } from '@/components/ui/card';
import { getAboutContent } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutContent();
  if (!content) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const title = content.seo_title || content.headline;
  const description = content.meta_description || content.paragraph1;
  const ogImage = content.og_image_url || content.image_url;

  return {
    title: 'About',
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `${siteUrl}/about`,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function AboutPage() {
  const content = await getAboutContent();

  if (!content) {
    return (
      <div className="container max-w-5xl mx-auto py-16 md:py-24 px-4">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Content Not Available</AlertTitle>
          <AlertDescription>
            The content for the about page has not been configured yet. Please set it up in the admin dashboard.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Inioluwa Oladipupo',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    image: content.image_url,
    jobTitle: 'Creative Visionary, Architect, Designer',
    description: content.paragraph1,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/about`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container max-w-5xl mx-auto py-16 md:py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-1 animate-fadeInUp">
            {content.image_url && (
              <Card className="overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <Image
                    src={content.image_url}
                    alt={content.headline}
                    width={600}
                    height={800}
                    className="object-cover"
                    priority
                  />
                </CardContent>
              </Card>
            )}
          </div>
          <div className="md:col-span-2 animate-fadeInUp animation-delay-200">
            <h1 className="font-headline text-4xl md:text-5xl mb-6">
              {content.headline}
            </h1>
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 space-y-6">
              <p>{content.paragraph1}</p>
              <p>{content.paragraph2}</p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button asChild size="lg">
                <a href={content.cv_url} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
              <div className="pt-2">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
