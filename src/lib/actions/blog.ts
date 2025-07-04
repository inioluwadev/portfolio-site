'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import Parser from 'rss-parser';
import type { BlogPost } from '@/lib/types';

const supabase = createClient();
const parser = new Parser();

// The Substack URL from your newsletter form
const substackUrl = 'https://inioluwa.substack.com';
const RSS_URL = `${substackUrl}/feed`;

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('pub_date', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  // Format date for display
  return data.map(post => ({
    ...post,
    pub_date: new Date(post.pub_date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    })
  }));
}

export async function syncBlogPosts() {
  console.log(`Fetching RSS feed from: ${RSS_URL}`);
  try {
    const feed = await parser.parseURL(RSS_URL);
    if (!feed?.items) {
      return { error: 'Could not fetch or parse the RSS feed.' };
    }

    const postsToUpsert = feed.items.map(item => ({
      guid: item.guid!,
      title: item.title!,
      link: item.link!,
      pub_date: new Date(item.pubDate!).toISOString(),
      preview: item.contentSnippet ? item.contentSnippet.substring(0, 200) + '...' : '',
      tags: item.categories || [],
    }));

    if (postsToUpsert.length === 0) {
      return { success: true, message: 'Blog is already up-to-date.' };
    }

    const { error } = await supabase.from('blog_posts').upsert(postsToUpsert, { onConflict: 'guid' });

    if (error) {
      console.error('Error upserting blog posts:', error);
      return { error: 'Failed to save posts to the database.' };
    }

    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    
    return { success: true, message: `Synced ${postsToUpsert.length} posts.` };
  } catch (e) {
    console.error('Error syncing Substack feed:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to fetch from the RSS feed. Please check the URL. Details: ${errorMessage}` };
  }
}
