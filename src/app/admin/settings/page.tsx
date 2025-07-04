import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSettings } from "@/lib/data";
import { updateSettings } from "@/lib/actions/settings";
import { SettingsForm } from "@/components/forms/SettingsForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  if (!settings) {
     return (
       <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Setup Required</AlertTitle>
        <AlertDescription>
          The 'settings' table seems to be empty or could not be reached. Please run the initial setup SQL script in your Supabase dashboard.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Site Settings</CardTitle>
        <CardDescription>Manage global settings for your website.</CardDescription>
      </CardHeader>
      <CardContent>
        <SettingsForm settings={settings} formAction={updateSettings} />
      </CardContent>
    </Card>
  );
}
