
import { createClient } from '@/lib/supabase/server';
import type { AboutContent, BlogPost, ContactMessage, ManifestoCoreBelief, ManifestoPrinciple, Project, Settings, SocialLink } from '@/lib/types';

// The standard supabase-js client is used for functions that run at build time or for public data
// because they don't have access to the request cookies and should not depend on a user session.
import { createClient as createAnonClient } from '@supabase/supabase-js';

const getAnonClient = () => createAnonClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


// --- Public Data Fetching Functions ---

// About
export async function getAboutContent(): Promise<AboutContent | null> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching about content:', error.message);
    return null;
  }
  return data;
}

// Blog
export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('pub_date', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error.message);
    return [];
  }
  
  if (!data) {
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
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('manifesto_content')
    .select('core_belief')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching manifesto core belief:', error.message);
    return null;
  }
  return data;
}

export async function getManifestoPrinciples(): Promise<ManifestoPrinciple[]> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('manifesto_principles')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching manifesto principles:', error.message);
    return [];
  }
  return data || [];
}

// Projects
export async function getProjects(filters?: { category?: string }): Promise<Project[]> {
  const supabase = getAnonClient();
  let query = supabase.from('projects').select('*').order('created_at', { ascending: false });

  if (filters?.category && filters.category !== 'All') {
    query = query.eq('category', filters.category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching projects:', error.message);
    return [];
  }
  return data || [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = getAnonClient();
    const { data, error } = await supabase.from('projects').select('*, seo_title, meta_description, og_image_url').eq('slug', slug).single();
    if (error) {
      console.error('Error fetching project by slug:', error.message);
      return null;
    }
    return data;
}

// Settings
export async function getSettings(): Promise<Settings | null> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('settings')
    .select('site_title, site_mode')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching settings:', error.message);
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
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching social links:', error.message);
    return [];
  }
  return data || [];
}


// --- Admin-Only Data Fetching Functions ---
// These functions use the cookie-based client because they require an authenticated user.

export async function getManifestoPrincipleById(id: string): Promise<ManifestoPrinciple | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('manifesto_principles').select('*').eq('id', id).single();
  if (error) {
    console.error('Error fetching principle by ID:', error.message);
    return null;
  }
  return data;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error.message);
    return [];
  }
  return data || [];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error) {
    console.error('Error fetching project by ID:', error.message);
    return null;
  }
  return data;
}

export async function getSocialLinkById(id: string): Promise<SocialLink | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('social_links').select('*').eq('id', id).single();
  if (error) {
    console.error('Error fetching social link by ID:', error.message);
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
    console.error('Error fetching projects count:', error.message);
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
    console.error('Error fetching messages count:', error.message);
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
    console.error('Error fetching blog posts count:', error.message);
    return 0;
  }
  return count || 0;
}
