import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative flex h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-background text-center">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(196,179,151,0.3),rgba(255,255,255,0))]"></div>
      <div className="relative z-10 mx-auto max-w-4xl p-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl animate-fadeInUp">
          Inioluwa Oladipupo
        </h1>
        <p className="mt-6 text-lg md:text-xl text-foreground/80 animate-fadeInUp animation-delay-200">
          A creative visionary blending architecture, design, and innovation.
        </p>
        <div className="mt-10 animate-fadeInUp animation-delay-400">
          <Button asChild size="lg" className="group">
            <Link href="/projects">
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
