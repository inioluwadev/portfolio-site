import Link from 'next/link';
import { navLinks } from '@/lib/config';
import SocialLinks from './SocialLinks';
import type { SocialLink } from '@/lib/types';

export default function Footer({ socialLinks }: { socialLinks: SocialLink[] }) {

  return (
    <footer className="border-t border-border/20 bg-background/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-headline text-lg mb-4">Navigate</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg mb-4">Connect</h3>
            <SocialLinks links={socialLinks} />
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Inioluwa Oladipupo. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Designed with vision, built with code.
          </p>
        </div>
      </div>
    </footer>
  );
}
