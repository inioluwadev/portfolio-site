import Link from 'next/link';
import { getProjects } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A curated selection of my work, showcasing a commitment to pushing the boundaries of form and function.',
};

const projectCategories = ['All', 'Architecture', 'Design', 'Innovation'];

export default async function ProjectsPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const activeTab = (searchParams?.category as string) || 'All';
  const projects: Project[] = await getProjects({ category: activeTab });

  return (
    <div className="container mx-auto py-16 md:py-24 px-4">
      <div className="text-center mb-12 animate-fadeInUp">
        <h1 className="font-headline text-4xl md:text-5xl text-gradient">My Portfolio</h1>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/70">
          A curated selection of my work, showcasing a commitment to pushing the boundaries of form and function.
        </p>
      </div>

      <div className="w-full flex flex-col items-center animate-fadeInUp animation-delay-200">
        <div className="mb-10 inline-flex h-10 items-center justify-center rounded-lg bg-secondary/40 p-1 text-muted-foreground border border-border">
          {projectCategories.map(category => (
            <Link
              key={category}
              href={category === 'All' ? '/projects' : `/projects?category=${category}`}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                activeTab === category ? "bg-gradient-to-r from-primary/50 to-accent/50 text-foreground shadow-sm" : "hover:bg-white/5"
              )}
            >
              {category}
            </Link>
          ))}
        </div>

        <div className="w-full">
           {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                 <div key={project.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 100}ms`}}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
           ) : (
             <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg col-span-full glass-card">
              <p className="font-medium">No projects yet in this category.</p>
              <p className="text-sm">Your new projects will appear here once you add them in the admin dashboard.</p>
            </div>
           )}
        </div>
      </div>
    </div>
  );
}
