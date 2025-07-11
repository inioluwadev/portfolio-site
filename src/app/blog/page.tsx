import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'A collection of articles and essays, exploring the frontiers of creative work.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Blog | Inioluwa Oladipupo',
    'url': `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    'description': 'A collection of articles and essays from my Substack, exploring the frontiers of creative work.',
    'blogPost': posts.map(post => ({
      '@type': 'BlogPosting',
      'mainEntityOfPage': post.link,
      'headline': post.title,
      'datePublished': post.pub_date,
      'author': {
        '@type': 'Person',
        'name': 'Inioluwa Oladipupo',
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Inioluwa Oladipupo',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container max-w-4xl mx-auto py-16 md:py-24 px-4">
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="font-headline text-4xl md:text-5xl text-gradient">Thoughts & Insights</h1>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70">
            A collection of articles and essays from my Substack, exploring the frontiers of creative work.
          </p>
        </div>

        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={post.guid} className="animate-fadeInUp" style={{ animationDelay: `${index * 100}ms`}}>
                <Card className="group glass-card glow-border-hover">
                  <Link href={post.link} target="_blank" rel="noopener noreferrer" className="block p-6">
                    <CardHeader className="p-0">
                      <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
                        {post.title}
                        <ArrowUpRight className="inline-block ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </CardTitle>
                      <CardDescription className="text-sm pt-2">{post.pub_date}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <p className="text-foreground/80">{post.preview}</p>
                    </CardContent>
                    <CardFooter className="p-0 mt-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary border-primary/30">{tag}</Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Link>
                </Card>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg glass-card">
              <p className="font-medium">No blog posts yet.</p>
              <p className="text-sm">New posts from your Substack feed will appear here once synced.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
