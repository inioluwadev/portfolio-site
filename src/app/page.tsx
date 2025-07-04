import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-background text-center">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.3),rgba(255,255,255,0)),radial-gradient(ellipse_80%_50%_at_50%_120%,hsl(var(--accent)/0.3),rgba(255,255,255,0))]"></div>
      
      <div className="absolute inset-0 z-10 animate-aurora bg-[linear-gradient(90deg,hsl(var(--primary)/0.1)_0%,hsl(var(--accent)/0.1)_50%,hsl(var(--primary)/0.1)_100%)] bg-[length:200%_100%]"></div>

      <div className="relative z-20 mx-auto max-w-5xl p-4">
        <h1 className="text-gradient font-headline text-5xl md:text-7xl lg:text-8xl animate-fadeInUp">
          Inioluwa Oladipupo
        </h1>
        <p className="mt-6 text-lg md:text-xl text-foreground/80 animate-fadeInUp animation-delay-200">
          A creative visionary blending architecture, design, and innovation.
        </p>
        <div className="mt-10 animate-fadeInUp animation-delay-400">
          <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-glow transition-shadow duration-300">
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
