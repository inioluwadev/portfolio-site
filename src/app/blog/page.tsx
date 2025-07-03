import { blogPosts } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="container max-w-4xl mx-auto py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">Thoughts & Insights</h1>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/60">
          A collection of articles and essays from my Substack, exploring the frontiers of creative work.
        </p>
      </div>

      <div className="space-y-8">
        {blogPosts.map((post, index) => (
          <div key={post.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 100}ms`}}>
            <Card className="group transition-shadow hover:shadow-lg">
              <Link href={post.url} target="_blank" rel="noopener noreferrer" className="block p-6">
                <CardHeader className="p-0">
                  <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
                    {post.title}
                    <ArrowUpRight className="inline-block ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription className="text-sm pt-2">{post.date}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <p className="text-foreground/80">{post.preview}</p>
                </CardContent>
                <CardFooter className="p-0 mt-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardFooter>
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
