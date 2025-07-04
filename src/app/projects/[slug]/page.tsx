import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { getProjects, getProjectBySlug } from '@/lib/data';

type ProjectDetailPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }
  
  const details = project.details || [];
  const headerImageContent = project.image_url;

  return (
    <article className="animate-fadeInUp">
      <header className="relative h-[60vh] w-full">
        {headerImageContent ? (
            <Image
            src={headerImageContent}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
        ) : (
          <div className="absolute inset-0 bg-muted z-0"></div>
        )}
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
          {details.map((detail, index) => {
            const animationStyle = { animationDelay: `${index * 150}ms` };
            if (detail.type === 'text') {
              return <p key={index} className="animate-fadeInUp" style={animationStyle}>{detail.content}</p>;
            }
            if (detail.type === 'image' && detail.content) {
              return (
                <div key={index} className="my-12 animate-fadeInUp" style={animationStyle}>
                  <Image
                    src={detail.content}
                    alt={`${project.title} detail image ${index + 1}`}
                    width={1200}
                    height={800}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              );
            }
            if (detail.type === 'quote') {
              return (
                <blockquote key={index} className="my-12 border-l-4 border-primary pl-6 italic text-xl animate-fadeInUp" style={animationStyle}>
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
