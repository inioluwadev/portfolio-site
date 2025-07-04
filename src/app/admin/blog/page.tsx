import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function AdminBlogPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Sync Blog Posts</CardTitle>
        <CardDescription>Sync your latest posts from your Substack feed.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 p-4 border rounded-lg">
          <div className="flex-1">
            <h3 className="font-medium">Substack Sync</h3>
            <p className="text-sm text-muted-foreground">
              Fetch the latest articles to display on your blog page.
            </p>
          </div>
          <Button disabled>
            <RefreshCw className="mr-2 h-4 w-4" /> Sync Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
