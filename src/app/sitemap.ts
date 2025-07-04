import { createClient } from '@supabase/supabase-js';
import { navLinks } from '@/lib/config';
import type { Project, BlogPost } from '@/lib/types';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Use an anon client as this runs at build time.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Static pages from navLinks are always included
  const staticRoutes = navLinks
    .map(link => ({
      url: `${siteUrl}${link.href}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: link.href === '/' ? 1.0 : 0.9,
    }));

  // If Supabase keys are not set, return only static routes to prevent build errors.
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase URL or Anon Key is missing. Sitemap will only contain static routes.");
    return staticRoutes;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

  return [
    ...staticRoutes,
    ...projectUrls,
    ...postUrls,
  ];
}
