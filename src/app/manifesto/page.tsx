import { Separator } from '@/components/ui/separator';

const principles = [
  {
    title: '1. Purpose-Driven Aesthetics',
    description: "Beauty is not arbitrary. We believe that the most compelling forms arise from a deep understanding of purpose. Our designs are not merely decorated; they are imbued with meaning, where every curve, line, and material serves a functional and emotional role. We craft experiences that are as intelligent as they are beautiful."
  },
  {
    title: '2. Human-Centric Innovation',
    description: "Technology should amplify humanity, not replace it. We place the human experience at the nucleus of all innovation, designing systems and spaces that are intuitive, responsive, and enriching. We leverage cutting-edge tools to create solutions that feel less like technology and more like a natural extension of ourselves."
  },
  {
    title: '3. Sustainable Futures',
    description: "We are not just building for today; we are designing for generations to come. Sustainability is a fundamental principle, not an add-on. This means a relentless pursuit of ecological harmony through circular economies, renewable materials, and energy-efficient systems that respect our planet's finite resources."
  },
  {
    title: '4. The Synthesis of Disciplines',
    description: "The most profound breakthroughs happen at the intersection of fields. We reject silos, choosing instead to weave together architecture, digital fabrication, material science, and strategic design. This interdisciplinary approach allows us to solve complex problems with holistic, resilient, and unexpected solutions."
  }
];

export default function ManifestoPage() {
  return (
    <div className="container max-w-4xl mx-auto py-16 md:py-24 px-4">
      <header className="text-center mb-16 animate-fadeInUp">
        <h1 className="font-headline text-5xl md:text-6xl">My Manifesto</h1>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/60 text-lg">
          The guiding principles that shape my work and philosophy.
        </p>
      </header>

      <div className="space-y-20">
        <section className="animate-fadeInUp animation-delay-200">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl text-primary">The Core Belief</h2>
            <blockquote className="mt-6 text-2xl md:text-3xl font-light italic text-foreground/90 max-w-3xl mx-auto">
              "We design not just objects and spaces, but the silent, fluid interactions that define our experience of the world. True innovation lies in making the complex feel simple, and the technological feel human."
            </blockquote>
          </div>
        </section>

        <Separator className="my-16" />

        <section className="space-y-12">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
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
      </div>
    </div>
  );
}
