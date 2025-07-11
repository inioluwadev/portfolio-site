import { Separator } from '@/components/ui/separator';
import { getManifestoCoreBelief, getManifestoPrinciples } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manifesto',
  description: 'The guiding principles that shape my work and philosophy.',
};

export default async function ManifestoPage() {
  const [coreBelief, principles] = await Promise.all([
    getManifestoCoreBelief(),
    getManifestoPrinciples(),
  ]);

  return (
    <div className="container max-w-4xl mx-auto py-16 md:py-24 px-4">
      <header className="text-center mb-16 animate-fadeInUp">
        <h1 className="font-headline text-5xl md:text-6xl text-gradient">My Manifesto</h1>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/70 text-lg">
          The guiding principles that shape my work and philosophy.
        </p>
      </header>

      <div className="space-y-20">
        <section className="animate-fadeInUp animation-delay-200">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl text-primary">The Core Belief</h2>
            <blockquote className="mt-6 text-2xl md:text-3xl font-light italic text-foreground/90 max-w-3xl mx-auto">
              {coreBelief ? `"${coreBelief.core_belief}"` : '"Your core belief will appear here."'}
            </blockquote>
          </div>
        </section>

        {principles.length > 0 ? (
          <>
            <Separator className="my-16 bg-border/20" />
            <section className="space-y-12">
              {principles.map((principle, index) => (
                <div
                  key={principle.id}
                  className="grid md:grid-cols-3 gap-8 items-start animate-fadeInUp"
                  style={{ animationDelay: `${(index * 150) + 400}ms`}}
                >
                  <div className="md:col-span-1">
                    <h3 className="font-headline text-2xl text-primary sticky top-24">
                      {principle.title}
                    </h3>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </>
        ) : (
           <div className="text-center text-muted-foreground py-10 glass-card rounded-lg">
              <p className="font-medium">No principles defined yet.</p>
              <p className="text-sm">Add them in the admin dashboard to see them here.</p>
            </div>
        )}
      </div>
    </div>
  );
}
