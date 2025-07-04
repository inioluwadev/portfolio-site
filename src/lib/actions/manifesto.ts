'use server';

import { createActionClient } from '@/lib/supabase/actions';
import { manifestoCoreBeliefSchema, manifestoPrincipleSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Core Belief Actions
export async function updateManifestoCoreBelief(prevState: any, formData: FormData) {
  const supabase = createActionClient();
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
export async function createManifestoPrinciple(prevState: any, formData: FormData) {
  const supabase = createActionClient();
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

export async function updateManifestoPrinciple(id: string, prevState: any, formData: FormData) {
  const supabase = createActionClient();
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
  const supabase = createActionClient();
  const { error } = await supabase.from('manifesto_principles').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/manifesto');
  revalidatePath('/manifesto');
  redirect('/admin/manifesto');
}
