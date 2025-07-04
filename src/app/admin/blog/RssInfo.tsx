import { getAboutContent } from '@/lib/data';
import Link from 'next/link';

export async function RssInfo() {
  const aboutContent = await getAboutContent();
  return (
    <div>
      <h3 className="font-medium">Substack Sync</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Current Feed URL: <code className="bg-muted px-1 py-0.5 rounded text-xs">{aboutContent?.rss_url || 'Not set'}</code>
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        You can change this URL in the <Link href="/admin/about" className="underline hover:text-primary">About Page settings</Link>.
      </p>
    </div>
  )
}
