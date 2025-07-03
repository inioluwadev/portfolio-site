'use client';

import { useState } from 'react';
import { projects, type Project } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCard from '@/components/ProjectCard';

const projectCategories = ['All', 'Architecture', 'Design', 'Innovation'];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = activeTab === 'All'
    ? projects
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="container mx-auto py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">My Portfolio</h1>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/60">
          A curated selection of my work, showcasing a commitment to pushing the boundaries of form and function.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col items-center">
        <TabsList className="mb-10">
          {projectCategories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
               <div key={project.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 100}ms`}}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
