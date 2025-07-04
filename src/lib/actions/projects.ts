'use server';

import { createActionClient } from '@/lib/supabase/actions';
import { projectSchema, type ProjectDetail } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import type { SupabaseClient } from '@supabase/supabase-js';

async function uploadFile(file: File, supabase: SupabaseClient): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error('Cannot upload an empty file.');
  }
  const bucket = 'images';
  const fileName = `${uuidv4()}-${file.name}`;
  const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);

  if (error) {
    console.error('Error uploading file:', error);
    throw new Error(`Failed to upload file: ${error.message}`);
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

async function processProjectFormData(formData: FormData, supabase: SupabaseClient) {
  const values = Object.fromEntries(formData.entries());
  let parsedDetails: ProjectDetail[] = JSON.parse(values.details as string || '[]');

  // 1. Handle main image
  const mainImageFile = formData.get('image_url') as File | null;
  const mainImageOriginalUrl = formData.get('image_url_original_url') as string | null;
  
  let finalMainImageUrl: string | null = mainImageOriginalUrl || null;
  if (mainImageFile && mainImageFile.size > 0) {
    finalMainImageUrl = await uploadFile(mainImageFile, supabase);
  }

  // 2. Handle detail images
  for (let i = 0; i < parsedDetails.length; i++) {
    const detail = parsedDetails[i];
    if (detail.type === 'image') {
      const detailImageFile = formData.get(`details_image_${i}`) as File | null;
      const originalDetailUrl = formData.get(`details_image_${i}_original_url`) as string | null;

      let finalDetailUrl: string | null = originalDetailUrl || null;
      if (detailImageFile && detailImageFile.size > 0) {
          finalDetailUrl = await uploadFile(detailImageFile, supabase);
      }
      
      detail.content = finalDetailUrl || ''; // Assign the final URL, or an empty string if it was removed
    }
  }

  // Filter out any image details that no longer have content
  const finalDetails = parsedDetails.filter(d => {
    return d.type !== 'image' || (d.type === 'image' && d.content);
  });
  
  return projectSchema.safeParse({
    title: values.title,
    slug: values.slug,
    category: values.category,
    description: values.description,
    image_url: finalMainImageUrl,
    details: finalDetails,
  });
}

export async function createProject(prevState: any, formData: FormData) {
  const supabase = createActionClient();
  
  try {
    const validatedData = await processProjectFormData(formData, supabase);

    if (!validatedData.success) {
      return { error: validatedData.error.flatten().fieldErrors };
    }

    const { error } = await supabase.from('projects').insert(validatedData.data);

    if (error) {
      return { error: { _form: [error.message] } };
    }
  } catch(e: any) {
    return { error: { _form: [e.message] } };
  }

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  redirect('/admin/projects');
}

export async function updateProject(id: string, prevState: any, formData: FormData) {
  const supabase = createActionClient();

  try {
    const validatedData = await processProjectFormData(formData, supabase);

    if (!validatedData.success) {
      return { error: validatedData.error.flatten().fieldErrors };
    }

    const { error } = await supabase.from('projects').update(validatedData.data).eq('id', id);

    if (error) {
      return { error: { _form: [error.message] } };
    }
  } catch (e: any) {
    return { error: { _form: [e.message] } };
  }

  revalidatePath('/admin/projects');
  revalidatePath(`/projects`);
  revalidatePath(`/projects/${formData.get('slug')}`);
  redirect('/admin/projects');
}


export async function deleteProject(id: string) {
    const supabase = createActionClient();
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    redirect('/admin/projects');
}
