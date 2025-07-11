import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { ImageIcon } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out glow-border-hover glass-card">
        <CardContent className="p-0">
          <div className="relative w-full h-48 overflow-hidden">
            {project.image_url ? (
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </CardContent>
        <div className="p-6">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="font-headline text-xl group-hover:text-gradient">{project.title}</CardTitle>
          </CardHeader>
          <CardDescription className="mb-4 text-sm h-10 text-foreground/70">{project.description}</CardDescription>
          <div className="flex justify-between items-center">
             <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">{project.category}</Badge>
            <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              View Project <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
