import Link from 'next/link';
import Image from 'next/image';
import { type Project } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardContent className="p-0">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={project.imageHint}
          />
        </CardContent>
        <div className="p-6">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
          </CardHeader>
          <CardDescription className="mb-4 text-sm h-10">{project.description}</CardDescription>
          <div className="flex justify-between items-center">
             <Badge variant="secondary">{project.category}</Badge>
            <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              View Project <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
