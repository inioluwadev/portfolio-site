import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectForm } from '@/components/forms/ProjectForm';
import { createProject } from '@/lib/actions/projects';

export default function NewProjectPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Add New Project</CardTitle>
        <CardDescription>Fill out the form below to add a new project to your portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectForm formAction={createProject} />
      </CardContent>
    </Card>
  );
}
