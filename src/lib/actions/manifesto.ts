'use server';

import { createClient } from '@/lib/supabase/server';
import { manifestoCoreBeliefSchema, manifestoPrincipleSchema, type ManifestoCoreBelief, type ManifestoPrinciple } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const supabase = createClient();

// Core Belief Actions
export async function getManifestoCoreBelief(): Promise<ManifestoCoreBelief | null> {
  const { data, error } = await supabase
    .from('manifesto_content')
    .select('core_belief')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching manifesto core belief:', error);
    return null;
  }
  return data;
}

export async function updateManifestoCoreBelief(prevState: any, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedData = manifestoCoreBeliefSchema.safeParse(values);

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors };
  }

  const { error } = await supabase
    .from('manifesto_content')
    .update(validatedData.data)
    .eq('id', 1);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath('/manifesto');
  revalidatePath('/admin/manifesto');
  return { success: true };
}

// Principles Actions
export async function getManifestoPrinciples(): Promise<ManifestoPrinciple[]> {
  const { data, error } = await supabase
    .from('manifesto_principles')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching manifesto principles:', error);
    return [];
  }
  return data || [];
}

export async function getManifestoPrincipleById(id: string): Promise<ManifestoPrinciple | null> {
  const { data, error } = await supabase.from('manifesto_principles').select('*').eq('id', id).single();
  if (error) {
    console.error('Error fetching principle by ID:', error);
    return null;
  }
  return data;
}

export async function createManifestoPrinciple(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedData = manifestoPrincipleSchema.safeParse(values);

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors };
  }

  const { error } = await supabase.from('manifesto_principles').insert(validatedData.data);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath('/admin/manifesto');
  revalidatePath('/manifesto');
  redirect('/admin/manifesto');
}

export async function updateManifestoPrinciple(id: string, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const validatedData = manifestoPrincipleSchema.safeParse(values);

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors };
  }

  const { error } = await supabase.from('manifesto_principles').update(validatedData.data).eq('id', id);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath('/admin/manifesto');
  revalidatePath('/manifesto');
  redirect('/admin/manifesto');
}

export async function deleteManifestoPrinciple(id: string) {
  const { error } = await supabase.from('manifesto_principles').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/manifesto');
  revalidatePath('/manifesto');
  redirect('/admin/manifesto');
}
