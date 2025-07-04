
import { createClient } from '@/lib/supabase/server';
import type { AboutContent, ContactMessage, ManifestoCoreBelief, ManifestoPrinciple, Project, Settings, SocialLink } from '@/lib/types';

// The standard supabase-js client is used for functions that run at build time or for public data
// because they don't have access to the request cookies and should not depend on a user session.
import { createClient as createAnonClient } from '@supabase/supabase-js';

const getAnonClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key is missing. Please check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
  }
  
  return createAnonClient(supabaseUrl, supabaseAnonKey);
}

const RLS_HINT = "This might be due to missing RLS policies. Please ensure public users have SELECT access on the corresponding table.";

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
    console.error(`Error fetching about content: ${error.message}. ${RLS_HINT}`);
    return null;
  }
  return data;
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
    console.error(`Error fetching manifesto core belief: ${error.message}. ${RLS_HINT}`);
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
    console.error(`Error fetching manifesto principles: ${error.message}. ${RLS_HINT}`);
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
    console.error(`Error fetching projects: ${error.message}. ${RLS_HINT}`);
    return [];
  }
  return data || [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = getAnonClient();
    const { data, error } = await supabase.from('projects').select('*, seo_title, meta_description, og_image_url').eq('slug', slug).single();
    if (error) {
      console.error(`Error fetching project by slug: ${error.message}. ${RLS_HINT}`);
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
    console.error(`Error fetching settings: ${error.message}. ${RLS_HINT}`);
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
    console.error(`[DATABASE PERMISSION ERROR] Error fetching social links: ${error.message}. This is most likely because the 'social_links' table is missing a Row Level Security (RLS) policy for public access. Please run the required SQL script in your Supabase dashboard.`);
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
