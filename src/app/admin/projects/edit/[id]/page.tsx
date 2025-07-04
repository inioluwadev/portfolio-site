import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectForm } from '@/components/forms/ProjectForm';
import { updateProject } from '@/lib/actions/projects';
import { getProjectById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, project.id!);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Edit Project</CardTitle>
        <CardDescription>Update the details for your project below.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectForm project={project} formAction={updateProjectWithId} />
      </CardContent>
    </Card>
  );
}
