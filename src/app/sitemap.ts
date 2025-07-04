import { createClient } from '@supabase/supabase-js';
import { navLinks } from '@/lib/config';
import type { Project, BlogPost } from '@/lib/types';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Use an anon client as this runs at build time.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch Projects
  const { data: projects } = await supabase.from('projects').select('slug, created_at');
  const projectUrls = (projects as Project[] || []).map(project => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project.created_at || Date.now()).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Fetch Blog Posts
  const { data: posts } = await supabase.from('blog_posts').select('link, pub_date');
  const postUrls = (posts as BlogPost[] || []).map(post => ({
    url: post.link, // External links to Substack
    lastModified: new Date(post.pub_date).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Static pages from navLinks
  const staticRoutes = navLinks
    .map(link => ({
      url: `${siteUrl}${link.href}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: link.href === '/' ? 1.0 : 0.9,
    }));

  return [
    ...staticRoutes,
    ...projectUrls,
    ...postUrls,
  ];
}
