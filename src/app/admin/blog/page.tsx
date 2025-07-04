import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogSyncForm } from "./BlogSyncForm";

export default async function AdminBlogPage() {
  const rssUrl = 'https://inioluwaoladipupo.substack.com/feed';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Sync Blog Posts</CardTitle>
        <CardDescription>Manage the RSS feed connection for your blog.</CardDescription>
      </CardHeader>
      <CardContent>
        <BlogSyncForm rssUrl={rssUrl} />
      </CardContent>
    </Card>
  );
}
