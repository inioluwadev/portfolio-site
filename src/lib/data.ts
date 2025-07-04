import { createClient } from '@/lib/supabase/server';
import type { AboutContent, BlogPost, ContactMessage, ManifestoCoreBelief, ManifestoPrinciple, Project, Settings, SocialLink } from '@/lib/types';

// The standard supabase-js client is used for functions that run at build time (like generateStaticParams)
// because they don't have access to the request cookies.
import { createClient as createAnonClient } from '@supabase/supabase-js';

// --- Data Fetching Functions ---

// About
export async function getAboutContent(): Promise<AboutContent | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
  return data;
}

// Blog
export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('pub_date', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  return data.map(post => ({
    ...post,
    pub_date: new Date(post.pub_date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    })
  }));
}

// Manifesto
export async function getManifestoCoreBelief(): Promise<ManifestoCoreBelief | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('manifesto_content')
    .select('core_belief')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching manifesto core belief:', error);
    return null;
  }
  return data;
}

export async function getManifestoPrinciples(): Promise<ManifestoPrinciple[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('manifesto_principles')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching manifesto principles:', error);
    return [];
  }
  return data || [];
}

export async function getManifestoPrincipleById(id: string): Promise<ManifestoPrinciple | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('manifesto_principles').select('*').eq('id', id).single();
  if (error) {
    console.error('Error fetching principle by ID:', error);
    return null;
  }
  return data;
}

// Messages
export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  return data || [];
}

// Projects
export async function getProjects(filters?: { category?: string }): Promise<Project[]> {
  // This function is called from generateStaticParams, which runs at build time.
  // It cannot use the cookie-based server client, so we use a public, anonymous client.
  const supabase = createAnonClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  let query = supabase.from('projects').select('*').order('created_at', { ascending: false });

  if (filters?.category && filters.category !== 'All') {
    query = query.eq('category', filters.category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data || [];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error) {
    console.error('Error fetching project by ID:', error);
    return null;
  }
  return data;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = createClient();
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
    if (error) {
      console.error('Error fetching project by slug:', error);
      return null;
    }
    return data;
}

// Settings
export async function getSettings(): Promise<Settings | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('settings')
    .select('site_title, site_mode')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching settings:', error);
    // Return default settings if none are found
    return {
      site_title: "Inioluwa's Digital Atelier",
      site_mode: 'live',
    };
  }
  return data;
}

// Social Links
export async function getSocialLinks(): Promise<SocialLink[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching social links:', error);
    return [];
  }
  return data || [];
}

export async function getSocialLinkById(id: string): Promise<SocialLink | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('social_links').select('*').eq('id', id).single();
  if (error) {
    console.error('Error fetching social link by ID:', error);
    return null;
  }
  return data;
}

// --- Count Functions for Dashboard ---
export async function getProjectsCount(): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching projects count:', error);
    return 0;
  }
  return count || 0;
}

export async function getMessagesCount(): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching messages count:', error);
    return 0;
  }
  return count || 0;
}

export async function getBlogPostsCount(): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching blog posts count:', error);
    return 0;
  }
  return count || 0;
}
