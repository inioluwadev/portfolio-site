'use server';

import { createActionClient } from '@/lib/supabase/actions';
import { socialLinkSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const RLS_ERROR_MESSAGE = 'Database permission denied. This is likely due to a missing Row Level Security (RLS) policy. Please ensure a policy exists that allows authenticated users to insert/update the social_links table.';

export async function createSocialLink(prevState: any, formData: FormData) {
  const supabase = createActionClient();
  const values = Object.fromEntries(formData.entries());
  const validatedData = socialLinkSchema.safeParse(values);

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors };
  }

  const { error } = await supabase.from('social_links').insert(validatedData.data).select();

  if (error) {
    if (error.message.includes('violates row-level security policy')) {
        return { error: { _form: [RLS_ERROR_MESSAGE] } };
    }
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
    if (error.message.includes('violates row-level security policy')) {
        return { error: { _form: [RLS_ERROR_MESSAGE] } };
    }
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
    // Note: The UI for this action doesn't display detailed errors.
    console.error("Error deleting social link:", error.message);
    return { error: error.message };
  }

  revalidatePath('/admin/socials');
  revalidatePath('/', 'layout');
  redirect('/admin/socials');
}
