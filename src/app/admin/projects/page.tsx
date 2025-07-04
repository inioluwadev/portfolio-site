import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminProjectsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-headline">Manage Projects</CardTitle>
            <CardDescription>Add, edit, or delete portfolio projects.</CardDescription>
          </div>
          <Button disabled>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg">
          <p className="font-medium">Project Management Coming Soon</p>
          <p className="text-sm">You'll be able to manage your projects from here.</p>
        </div>
      </CardContent>
    </Card>
  );
}
