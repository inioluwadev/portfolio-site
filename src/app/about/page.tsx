import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import SocialLinks from '@/components/layout/SocialLinks';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container max-w-5xl mx-auto py-16 md:py-24 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-1">
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <Image
                src="https://placehold.co/600x800.png"
                alt="Your Name"
                width={600}
                height={800}
                className="object-cover"
                data-ai-hint="portrait person"
              />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <h1 className="font-headline text-4xl md:text-5xl mb-6">
            Your Professional Headline
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 space-y-6">
            <p>
             This is where you can introduce yourself. Talk about your passion, your skills, and what drives your creative or professional work. Let your personality shine through.
            </p>
            <p>
              You can elaborate on your background, your experience, and the philosophies that guide your approach. This is a great place to connect with your audience on a personal level.
            </p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Button asChild size="lg">
              <a href="/cv-placeholder.pdf" download>
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
