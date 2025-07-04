import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAboutContent, updateAboutContent } from "@/lib/actions/about";
import { AboutForm } from "@/components/forms/AboutForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default async function AdminAboutPage() {
  const aboutContent = await getAboutContent();

  if (!aboutContent) {
    return (
       <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Setup Required</AlertTitle>
        <AlertDescription>
          The 'about_content' table seems to be empty or could not be reached. Please run the initial setup SQL script in your Supabase dashboard to insert the first row of data.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Update About Page</CardTitle>
        <CardDescription>Edit the content displayed on your public 'About' page.</CardDescription>
      </CardHeader>
      <CardContent>
        <AboutForm aboutContent={aboutContent} formAction={updateAboutContent} />
      </CardContent>
    </Card>
  );
}
