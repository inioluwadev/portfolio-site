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
                alt="Inioluwa Oladipupo"
                width={600}
                height={800}
                className="object-cover"
                data-ai-hint="man portrait"
              />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <h1 className="font-headline text-4xl md:text-5xl mb-6">
            Blending Vision with Precision
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 space-y-6">
            <p>
              I am Inioluwa Oladipupo, a creative visionary operating at the intersection of architecture, design, and technological innovation. My work is driven by a passion for crafting spaces and objects that are not only aesthetically compelling but also deeply functional and sustainable.
            </p>
            <p>
              With a foundation in architectural principles and a constant curiosity for emerging technologies, I explore how computational design, smart materials, and user-centric strategies can create more responsive, efficient, and inspiring environments.
            </p>
            <p>
              From parametric pavilions that dance with light to intelligent building systems that adapt to their surroundings, my portfolio is a testament to a single belief: that great design is a dialogue between human need and technological possibility. This digital atelier is a curated look into my process, projects, and philosophies.
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
