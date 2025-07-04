'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import SocialLinks from './SocialLinks';
import type { SocialLink as SocialLinkType } from '@/lib/types';

export default function Header({ socialLinks }: { socialLinks: SocialLinkType[] }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode, className?: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          isActive ? 'text-primary' : 'text-foreground/60',
          className
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-lg text-gradient">Inioluwa O.</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background/90 backdrop-blur-lg">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="font-bold font-headline text-2xl text-gradient" onClick={() => setMobileMenuOpen(false)}>
                    Inioluwa O.
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-6 mt-12">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href} className="text-xl">
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between md:justify-end space-x-2">
          <Link href="/" className="md:hidden font-bold font-headline text-lg text-gradient">
            Inioluwa O.
          </Link>
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex">
              <SocialLinks links={socialLinks} />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
