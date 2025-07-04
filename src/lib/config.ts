import { type LucideIcon } from 'lucide-react';

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
