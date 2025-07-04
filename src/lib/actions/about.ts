'use server';

import { createActionClient } from '@/lib/supabase/actions';
import { aboutContentSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import type { SupabaseClient } from '@supabase/supabase-js';

async function uploadFile(file: File, supabase: SupabaseClient, bucket: 'images' | 'cv'): Promise<string> {
    if (!file || file.size === 0) {
        throw new Error('Cannot upload an empty file.');
    }
    
    const fileName = `${uuidv4()}-${file.name}`;
    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);

    if (error) {
        console.error(`Error uploading file to bucket ${bucket}:`, error);
        throw new Error(`Failed to upload file to ${bucket}: ${error.message}`);
    }

    if (!data?.path) {
        throw new Error(`Upload to ${bucket} succeeded but did not return a path.`);
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);

    if (!urlData?.publicUrl) {
        throw new Error(`Could not get public URL for the uploaded file in ${bucket}. The file may have been uploaded, but it is not accessible.`);
    }

    return urlData.publicUrl;
}

export async function updateAboutContent(prevState: any, formData: FormData): Promise<{ error?: any; success?: boolean; }> {
  const supabase = createActionClient();
  
  try {
    const values = Object.fromEntries(formData.entries());
    
    const imageFile = formData.get('image_url') as File | null;
    const originalImageUrl = formData.get('image_url_original_url') as string | null;
    
    const cvFile = formData.get('cv_url') as File | null;
    const originalCvUrl = formData.get('cv_url_original_url') as string | null;

    let finalImageUrl: string | null = originalImageUrl || null;
    if (imageFile && imageFile.size > 0) {
      finalImageUrl = await uploadFile(imageFile, supabase, 'images');
    }

    let finalCvUrl: string | null = originalCvUrl || null;
    if (cvFile && cvFile.size > 0) {
      finalCvUrl = await uploadFile(cvFile, supabase, 'cv');
    }

    const dataToValidate = {
      headline: values.headline,
      paragraph1: values.paragraph1,
      paragraph2: values.paragraph2,
      cv_url: finalCvUrl,
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
    revalidatePath('/', 'layout'); // for footer
    revalidatePath('/admin/blog'); // for blog sync RssInfo
    return { success: true };
  } catch (e: any) {
    return { error: { _form: [e.message] } };
  }
}
