'use server';

import { createActionClient } from '@/lib/supabase/actions';
import { aboutContentSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import type { SupabaseClient } from '@supabase/supabase-js';

async function uploadImage(imageFile: File, supabase: SupabaseClient): Promise<string | null> {
    if (!imageFile || imageFile.size === 0) return null;
    const bucket = 'images';
    const fileName = `${uuidv4()}-${imageFile.name}`;
    const { data, error } = await supabase.storage.from(bucket).upload(fileName, imageFile);

    if (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image.');
    }

    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return publicUrl;
}

export async function updateAboutContent(prevState: any, formData: FormData) {
  const supabase = createActionClient();
  const values = Object.fromEntries(formData.entries());

  try {
    const imageFile = formData.get('image_url') as File | null;
    const originalUrl = formData.get('image_url_original_url') as string | null;

    let finalImageUrl: string | null = null;
    if (imageFile && imageFile.size > 0) {
      finalImageUrl = await uploadImage(imageFile, supabase);
    } else if (originalUrl) {
      finalImageUrl = originalUrl;
    }

    const dataToValidate = {
      headline: values.headline,
      paragraph1: values.paragraph1,
      paragraph2: values.paragraph2,
      cv_url: values.cv_url,
      substack_url: values.substack_url,
      rss_url: values.rss_url,
      image_url: finalImageUrl,
    };
    
    const validatedData = aboutContentSchema.safeParse(dataToValidate);

    if (!validatedData.success) {
      return { error: validatedData.error.flatten().fieldErrors };
    }

    const { error } = await supabase
      .from('about_content')
      .update(validatedData.data)
      .eq('id', 1);

    if (error) {
      return { error: { _form: [error.message] } };
    }

    revalidatePath('/about');
    revalidatePath('/admin/about');
    revalidatePath('/'); // for footer
    revalidatePath('/blog'); // for blog sync RssInfo
    return { success: true };
  } catch (e: any) {
    return { error: { _form: [e.message] } };
  }
}
