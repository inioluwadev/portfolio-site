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

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: 'All' | 'Architecture' | 'Design' | 'Innovation';
  description: string;
  imageUrl: string;
  imageHint: string;
  details: {
    type: 'image' | 'text' | 'quote';
    content: string;
    imageHint?: string;
  }[];
};

export const projects: Project[] = [];

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  preview: string;
  url:string;
};

export const blogPosts: BlogPost[] = [];
