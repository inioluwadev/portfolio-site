import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminManifestoPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-headline">Manage Manifesto Points</CardTitle>
            <CardDescription>Add, edit, or remove principles from your manifesto.</CardDescription>
          </div>
          <Button disabled>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Principle
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg">
          <p className="font-medium">Manifesto Editor Coming Soon</p>
          <p className="text-sm">You'll be able to manage your manifesto points from here.</p>
        </div>
      </CardContent>
    </Card>
  );
}
