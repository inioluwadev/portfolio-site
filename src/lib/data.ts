import { createClient } from '@/lib/supabase/server';
import type { AboutContent, BlogPost, ContactMessage, ManifestoCoreBelief, ManifestoPrinciple, Project } from '@/lib/types';
import { Linkedin, Instagram, Twitter, Send, BookOpen, AtSign, type LucideIcon } from 'lucide-react';

type NavLink = {
  href: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

type SocialLink = {
  name: string;
  url: string;
  icon: LucideIcon;
};

const substackUrl = 'https://inioluwa.substack.com';

export const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { name: 'Instagram', url: 'https://instagram.com', icon: Instagram },
  { name: 'Twitter (X)', url: 'https://x.com', icon: Twitter },
  { name: 'Threads', url: 'https://threads.net', icon: Send },
  { name: 'Substack', url: substackUrl, icon: BookOpen },
  { name: 'Mastodon', url: 'https://mastodon.social', icon: AtSign },
];

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
  const supabase = createClient();
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
