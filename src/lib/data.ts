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

export const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { name: 'Instagram', url: 'https://instagram.com', icon: Instagram },
  { name: 'Twitter (X)', url: 'https://x.com', icon: Twitter },
  { name: 'Threads', url: 'https://threads.net', icon: Send },
  { name: 'Substack', url: 'https://substack.com', icon: BookOpen },
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

export const projects: Project[] = [
  {
    id: '1',
    slug: 'aether-pavilion',
    title: 'Aether Pavilion',
    category: 'Architecture',
    description: 'A parametric pavilion designed to interact with light and shadow, creating a dynamic public space.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'modern architecture',
    details: [
      { type: 'image', content: 'https://placehold.co/1200x800.png', imageHint: 'architectural detail' },
      { type: 'text', content: 'The Aether Pavilion explores the relationship between solid and void. Its algorithmically generated form is optimized for natural ventilation and light diffusion, offering a serene escape within the urban fabric. The structure is composed of 1,248 unique, interlocking components made from recycled aluminum.'},
      { type: 'quote', content: 'Design is not just what it looks like and feels like. Design is how it works.' },
      { type: 'image', content: 'https://placehold.co/1200x600.png', imageHint: 'building interior' },
    ]
  },
  {
    id: '2',
    slug: 'kinetic-facade',
    title: 'Kinetic Facade',
    category: 'Innovation',
    description: 'An innovative building facade that responds to environmental conditions to regulate temperature and light.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'modern facade',
    details: [
      { type: 'image', content: 'https://placehold.co/1200x800.png', imageHint: 'futuristic building' },
      { type: 'text', content: 'This project integrates smart materials and robotics to create a responsive building envelope. Each panel on the facade can independently rotate and shift, controlled by a network of sensors that monitor sun exposure, wind, and external temperature. This reduces the building\'s energy consumption by up to 40%.' },
      { type: 'image', content: 'https://placehold.co/1200x600.png', imageHint: 'building pattern' },
    ]
  },
  {
    id: '3',
    slug: 'ergo-chair',
    title: 'The Ergo-Chair',
    category: 'Design',
    description: 'A minimalist chair designed with ergonomic principles and sustainable materials.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'modern chair',
    details: [
      { type: 'image', content: 'https://placehold.co/1200x800.png', imageHint: 'designer furniture' },
      { type: 'text', content: 'The Ergo-Chair is a testament to the philosophy that form should follow function. Crafted from a single piece of molded plywood and finished with natural oils, it provides optimal support for the human body while minimizing its environmental footprint. Its simple aesthetic allows it to blend into any modern interior.' },
      { type: 'quote', content: 'The details are not the details. They make the design.' },
    ]
  },
  {
    id: '4',
    slug: 'urban-biomes',
    title: 'Urban Biomes',
    category: 'Architecture',
    description: 'A conceptual high-rise that integrates vertical farming and residential living.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'futuristic city',
    details: [
      { type: 'image', content: 'https://placehold.co/1200x800.png', imageHint: 'vertical farm' },
      { type: 'text', content: 'Urban Biomes re-imagines city living by creating a self-sufficient ecosystem in a skyscraper. The design incorporates modular residential units, communal spaces, and extensive vertical farms that can produce food for all its inhabitants. It aims to solve issues of food security and urban sprawl in a single, elegant solution.' },
      { type: 'image', content: 'https://placehold.co/1200x600.png', imageHint: 'green architecture' },
    ]
  }
];

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  preview: string;
  url: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Parametric Design',
    date: 'October 26, 2023',
    tags: ['Architecture', 'Innovation'],
    preview: 'Exploring how computational tools are pushing the boundaries of what is possible in structural and aesthetic design...',
    url: '#',
  },
  {
    id: '2',
    title: 'Sustainability is Not a Feature, It\'s a Principle',
    date: 'September 15, 2023',
    tags: ['Design', 'Sustainability'],
    preview: 'A deep dive into why sustainable practices should be at the core of every design decision, not just an afterthought...',
    url: '#',
  },
  {
    id: '3',
    title: 'The Psychology of Space: How Buildings Affect Our Mood',
    date: 'August 02, 2023',
    tags: ['Architecture', 'Well-being'],
    preview: 'An analysis of the profound impact that architectural environments have on our mental and emotional states...',
    url: '#',
  },
];
