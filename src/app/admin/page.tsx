
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { BookCopy, ImageIcon, MessageSquare, PlusCircle, Edit, Eye } from "lucide-react";
import { getProjectsCount, getMessagesCount } from '@/lib/data';

export default async function AdminDashboardPage() {
  const [projectsCount, messagesCount] = await Promise.all([
    getProjectsCount(),
    getMessagesCount(),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center animate-fadeInUp">
        <div>
          <h2 className="text-3xl font-bold font-headline text-gradient">Welcome back, Inioluwa.</h2>
          <p className="text-muted-foreground">Here's a snapshot of your digital atelier.</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-glow transition-shadow duration-300">
          <Link href="/" target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            Live Preview
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fadeInUp animation-delay-200">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <ImageIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsCount}</div>
            <p className="text-xs text-muted-foreground">
              Currently in your portfolio
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contact Submissions
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{messagesCount}</div>
            <p className="text-xs text-muted-foreground">
              Total messages received
            </p>
          </CardContent>
        </Card>
      </div>
      
       <div className="animate-fadeInUp animation-delay-400">
        <h3 className="text-xl font-headline mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" asChild className="justify-start p-6 text-left h-auto glow-border-hover">
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
            <Button variant="outline" asChild className="justify-start p-6 text-left h-auto glow-border-hover">
              <Link href="/admin/manifesto">
                <div className="flex items-center">
                  <BookCopy className="mr-4 h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Update Manifesto</p>
                    <p className="text-sm text-muted-foreground">Edit your core principles.</p>
                  </div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start p-6 text-left h-auto glow-border-hover">
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
