import { Rocket } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'Our new site is under construction. Stay tuned!',
};

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center p-4">
      <Rocket className="w-16 h-16 mb-6 text-primary" />
      <h1 className="text-5xl font-headline mb-4">Launching Soon</h1>
      <p className="text-lg text-muted-foreground max-w-md">
        We're working hard to bring you something amazing. Stay tuned for our official launch!
      </p>
    </div>
  );
}
