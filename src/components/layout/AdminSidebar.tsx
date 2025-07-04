'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { logout } from '@/lib/actions/auth';
import { LayoutDashboard, FileText, PenSquare, MessageSquare, LogOut, Image as ImageIcon, Link2, Settings } from 'lucide-react';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: ImageIcon },
  { href: '/admin/about', label: 'About Page', icon: FileText },
  { href: '/admin/manifesto', label: 'Manifesto', icon: PenSquare },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/socials', label: 'Social Links', icon: Link2 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-background flex flex-col">
      <div className="p-4 border-b">
        <Link href="/" className="font-headline text-lg font-bold text-gradient">Inioluwa O. - Admin</Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {adminNavLinks.map((link) => {
          const isActive = pathname.startsWith(link.href) && (link.href !== '/admin' || pathname === '/admin');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                isActive
                  ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t mt-auto">
        <div className="text-sm text-muted-foreground truncate mb-2">
          {userEmail}
        </div>
        <form action={logout}>
          <Button variant="outline" className="w-full justify-start gap-3 transition-colors hover:border-destructive hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </form>
      </div>
    </aside>
  );
}
