import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy, ImageIcon, MessageSquare } from "lucide-react";

export default function AdminDashboardPage() {
  // In a real app, you'd fetch stats from Supabase here.
  const stats = {
    projects: 0,
    messages: 0,
    posts: 0,
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-8">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects}</div>
            <p className="text-xs text-muted-foreground">
              Currently in your portfolio
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contact Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.messages}</div>
            <p className="text-xs text-muted-foreground">
              Unread messages
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posts}</div>
            <p className="text-xs text-muted-foreground">
              Synced from Substack
            </p>
          </CardContent>
        </Card>
      </div>
       <div className="mt-8 p-6 bg-card border rounded-lg">
          <h2 className="text-xl font-headline mb-4">Welcome, Admin!</h2>
          <p className="text-muted-foreground">
            This is your control center. From here, you can manage all the content on your digital atelier. Use the navigation on the left to get started.
          </p>
        </div>
    </div>
  );
}
