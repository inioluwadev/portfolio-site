'use server';

import { createActionClient } from '@/lib/supabase/actions';
import { socialLinkSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createSocialLink(prevState: any, formData: FormData) {
  const supabase = createActionClient();
  const values = Object.fromEntries(formData.entries());
  const validatedData = socialLinkSchema.safeParse(values);

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors };
  }

  const { error } = await supabase.from('social_links').insert(validatedData.data).select();

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath('/admin/socials');
  revalidatePath('/', 'layout');
  redirect('/admin/socials');
}

export async function updateSocialLink(id: string, prevState: any, formData: FormData) {
  const supabase = createActionClient();
  const values = Object.fromEntries(formData.entries());
  const validatedData = socialLinkSchema.safeParse(values);

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors };
  }

  const { error } = await supabase.from('social_links').update(validatedData.data).eq('id', id);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath('/admin/socials');
  revalidatePath('/', 'layout');
  redirect('/admin/socials');
}

export async function deleteSocialLink(id: string) {
  const supabase = createActionClient();
  const { error } = await supabase.from('social_links').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/socials');
  revalidatePath('/', 'layout');
}
