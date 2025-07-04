
'use server';

import { createActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import Parser from 'rss-parser';
import { getAboutContent } from '@/lib/data';
import type { BlogPost } from '@/lib/types';

// Configure the parser to be less strict to handle variations in feed formats.
const parser = new Parser({
  xml2js: {
    strict: false,
    trim: true,
  }
});

function generatePreview(content: string, length = 200): string {
    if (!content) return '';
    const plainText = content.replace(/<[^>]+>/g, '');
    if (plainText.length <= length) return plainText;
    const trimmed = plainText.substring(0, length);
    // Trim to the last full word to avoid cutting words in half
    return trimmed.substring(0, Math.min(trimmed.length, trimmed.lastIndexOf(' '))) + '...';
}

export async function syncBlogPosts(prevState: any, formData: FormData) {
  const aboutContent = await getAboutContent();
  const RSS_URL = aboutContent?.rss_url;

  if (!RSS_URL) {
    return { error: 'RSS URL is not configured. Please set it in the Admin > About Page section.' };
  }
  
  console.log(`Fetching RSS feed from: ${RSS_URL}`);
  let feedText: string | undefined;
  
  try {
    const response = await fetch(RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml'
      }
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Request failed with status ${response.status}. Response from server: ${errorBody.substring(0, 200)}...`);
    }

    feedText = await response.text();
    
    if (!feedText || !feedText.trim().startsWith('<')) {
        throw new Error(`The response from the URL was not XML. Received: ${feedText.substring(0, 200)}...`);
    }

    const feed = await parser.parseString(feedText);

    if (!feed?.items) {
      return { error: 'Could not fetch or parse the RSS feed. The feed might be empty or unavailable.' };
    }

    const postsToUpsert: Omit<BlogPost, 'id' | 'created_at'>[] = feed.items
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
          preview: generatePreview(item.contentSnippet || item.content || ''),
          tags: item.categories || [],
          // Set SEO fields to null initially
          slug: null,
          seo_title: null,
          meta_description: null,
          og_image_url: null,
        };
      })
      .filter((post): post is NonNullable<typeof post> => post !== null);

    if (postsToUpsert.length === 0) {
      return { success: true, message: 'Blog is already up-to-date or no valid posts were found in the feed.' };
    }
    
    console.log(`Attempting to upsert ${postsToUpsert.length} posts...`);

    const supabase = createActionClient();
    const { error } = await supabase.from('blog_posts').upsert(postsToUpsert, { onConflict: 'guid' });

    if (error) {
      console.error('Supabase error while upserting blog posts:', error);
      return { error: `Failed to save posts to the database. Details: ${error.message}` };
    }

    console.log(`Successfully synced ${postsToUpsert.length} posts.`);
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    revalidatePath('/sitemap.xml');
    
    return { success: true, message: `Successfully synced ${postsToUpsert.length} posts.` };
  } catch (e) {
    console.error('Fatal error syncing Substack feed:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to fetch or parse the RSS feed. Please check the URL and feed format. Details: ${errorMessage}` };
  }
}
