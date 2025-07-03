import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type ProjectDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <header className="relative h-[60vh] w-full">
        <Image
          src={project.details[0].content}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint={project.details[0].imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-end pb-12">
          <Badge variant="default" className="mb-4 w-fit">{project.category}</Badge>
          <h1 className="font-headline text-5xl md:text-7xl text-foreground">
            {project.title}
          </h1>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl py-16 md:py-24">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {project.details.map((detail, index) => {
            if (detail.type === 'text') {
              return <p key={index}>{detail.content}</p>;
            }
            if (detail.type === 'image') {
              return (
                <div key={index} className="my-12">
                  <Image
                    src={detail.content}
                    alt={`${project.title} detail image ${index + 1}`}
                    width={1200}
                    height={800}
                    className="rounded-lg shadow-lg"
                    data-ai-hint={detail.imageHint}
                  />
                </div>
              );
            }
            if (detail.type === 'quote') {
              return (
                <blockquote key={index} className="my-12 border-l-4 border-primary pl-6 italic text-xl">
                  {detail.content}
                </blockquote>
              );
            }
            return null;
          })}
        </div>
      </div>
    </article>
  );
}
