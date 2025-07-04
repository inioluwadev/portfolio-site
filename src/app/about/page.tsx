import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Terminal } from 'lucide-react';
import SocialLinks from '@/components/layout/SocialLinks';
import { Card, CardContent } from '@/components/ui/card';
import { getAboutContent } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

  return (
    <div className="container max-w-5xl mx-auto py-16 md:py-24 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-1">
          {content.image_url && (
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <Image
                  src={content.image_url}
                  alt="Your Name"
                  width={600}
                  height={800}
                  className="object-cover"
                />
              </CardContent>
            </Card>
          )}
        </div>
        <div className="md:col-span-2">
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
  );
}
