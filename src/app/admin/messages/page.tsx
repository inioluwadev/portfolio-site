import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminMessagesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Contact Messages</CardTitle>
        <CardDescription>View messages sent through your contact form.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg">
          <p className="font-medium">Message Viewer Coming Soon</p>
          <p className="text-sm">You'll be able to see contact form submissions here.</p>
        </div>
      </CardContent>
    </Card>
  );
}
