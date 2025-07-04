'use server';

import { createActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import Parser from 'rss-parser';
import { getAboutContent } from '@/lib/data';

const parser = new Parser();

export async function syncBlogPosts() {
  const aboutContent = await getAboutContent();
  const RSS_URL = aboutContent?.rss_url;

  if (!RSS_URL) {
    return { error: 'RSS URL is not configured. Please set it in the Admin > About Page section.' };
  }
  
  console.log(`Fetching RSS feed from: ${RSS_URL}`);
  try {
    const feed = await parser.parseURL(RSS_URL);
    if (!feed?.items) {
      return { error: 'Could not fetch or parse the RSS feed. The feed might be empty or unavailable.' };
    }

    const postsToUpsert = feed.items
      .map(item => {
        if (!item.guid || !item.title || !item.link || !item.pubDate) {
          console.warn('Skipping invalid RSS item:', item);
          return null;
        }
        return {
          guid: item.guid,
          title: item.title,
          link: item.link,
          pub_date: new Date(item.pubDate).toISOString(),
          preview: item.contentSnippet ? item.contentSnippet.substring(0, 200) + '...' : '',
          tags: item.categories || [],
        };
      })
      .filter((post): post is NonNullable<typeof post> => post !== null);

    if (postsToUpsert.length === 0) {
      return { success: true, message: 'Blog is already up-to-date or no valid posts were found in the feed.' };
    }
    
    const supabase = createActionClient();
    const { error } = await supabase.from('blog_posts').upsert(postsToUpsert, { onConflict: 'guid' });

    if (error) {
      console.error('Error upserting blog posts:', error);
      return { error: `Failed to save posts to the database. Details: ${error.message}` };
    }

    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    
    return { success: true, message: `Successfully synced ${postsToUpsert.length} posts.` };
  } catch (e) {
    console.error('Error syncing Substack feed:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to fetch or parse the RSS feed. Please check the URL and feed format. Details: ${errorMessage}` };
  }
}
