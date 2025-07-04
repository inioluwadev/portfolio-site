import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminAboutPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Update About Page</CardTitle>
        <CardDescription>Edit the content displayed on your 'About' page.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
         <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg">
          <p className="font-medium">About Page Editor Coming Soon</p>
          <p className="text-sm">You'll be able to edit the page content using a form here.</p>
        </div>
        <Button disabled>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
