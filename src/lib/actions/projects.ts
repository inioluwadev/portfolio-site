import { createClient } from '@/lib/supabase/server';
import { projectSchema, type Project } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getProjects(filters?: { category?: string }): Promise<Project[]> {
  const supabase = createClient();
  let query = supabase.from('projects').select('*').order('created_at', { ascending: false });

  if (filters?.category && filters.category !== 'All') {
    query = query.eq('category', filters.category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data || [];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error) {
    console.error('Error fetching project by ID:', error);
    return null;
  }
  return data;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = createClient();
    const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
    if (error) {
      console.error('Error fetching project by slug:', error);
      return null;
    }
    return data;
}


export async function createProject(formData: FormData) {
  'use server';

  const supabase = createClient();
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
  'use server';

  const supabase = createClient();
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
    'use server';

    const supabase = createClient();
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    redirect('/admin/projects');
}
