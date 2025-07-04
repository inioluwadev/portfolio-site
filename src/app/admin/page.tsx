
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { BookCopy, ImageIcon, MessageSquare, PlusCircle, Edit, Eye } from "lucide-react";
import { getProjectsCount, getMessagesCount, getBlogPostsCount } from '@/lib/data';

export default async function AdminDashboardPage() {
  const [projectsCount, messagesCount, blogPostsCount] = await Promise.all([
    getProjectsCount(),
    getMessagesCount(),
    getBlogPostsCount(),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center animate-fadeInUp">
        <div>
          <h2 className="text-3xl font-bold font-headline">Welcome back, Inioluwa.</h2>
          <p className="text-muted-foreground">Here's a snapshot of your digital atelier.</p>
        </div>
        <Button asChild>
          <Link href="/" target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            Live Preview
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fadeInUp animation-delay-200">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsCount}</div>
            <p className="text-xs text-muted-foreground">
              Currently in your portfolio
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contact Submissions
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{messagesCount}</div>
            <p className="text-xs text-muted-foreground">
              Total messages received
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPostsCount}</div>
            <p className="text-xs text-muted-foreground">
              Synced from Substack
            </p>
          </CardContent>
        </Card>
      </div>
      
       <div className="animate-fadeInUp animation-delay-400">
        <h3 className="text-xl font-headline mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" asChild className="justify-start p-6 text-left h-auto">
              <Link href="/admin/projects/new">
                <div className="flex items-center">
                  <PlusCircle className="mr-4 h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Add New Project</p>
                    <p className="text-sm text-muted-foreground">Showcase your latest work.</p>
                  </div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start p-6 text-left h-auto">
              <Link href="/admin/blog">
                <div className="flex items-center">
                  <BookCopy className="mr-4 h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Sync Blog Posts</p>
                    <p className="text-sm text-muted-foreground">Update your feed from Substack.</p>
                  </div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start p-6 text-left h-auto">
              <Link href="/admin/about">
                <div className="flex items-center">
                  <Edit className="mr-4 h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Update Bio</p>
                    <p className="text-sm text-muted-foreground">Edit your about page content.</p>
                  </div>
                </div>
              </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
