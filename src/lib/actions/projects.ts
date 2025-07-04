'use server';

import { createActionClient } from '@/lib/supabase/actions';
import { projectSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
  const supabase = createActionClient();
  const values = Object.fromEntries(formData.entries());
  const parsedDetails = JSON.parse(values.details as string);
  
  const validatedData = projectSchema.safeParse({
    title: values.title,
    slug: values.slug,
    category: values.category,
    description: values.description,
    image_url: values.image_url,
    image_hint: values.image_hint,
    details: parsedDetails,
  });

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors };
  }

  const { error } = await supabase.from('projects').insert(validatedData.data);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = createActionClient();
  const values = Object.fromEntries(formData.entries());
  const parsedDetails = JSON.parse(values.details as string);

  const validatedData = projectSchema.safeParse({
    title: values.title,
    slug: values.slug,
    category: values.category,
    description: values.description,
    image_url: values.image_url,
    image_hint: values.image_hint,
    details: parsedDetails,
  });

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors };
  }

  const { error } = await supabase.from('projects').update(validatedData.data).eq('id', id);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath('/admin/projects');
  revalidatePath(`/projects/${validatedData.data.slug}`);
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
