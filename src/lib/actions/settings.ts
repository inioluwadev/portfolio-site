'use server';

import { createActionClient } from '@/lib/supabase/actions';
import { settingsSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function updateSettings(prevState: any, formData: FormData) {
  const supabase = createActionClient();
  const values = Object.fromEntries(formData.entries());
  const validatedData = settingsSchema.safeParse(values);

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors };
  }

  const { error } = await supabase
    .from('settings')
    .update(validatedData.data)
    .eq('id', 1);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/settings');
  return { success: true };
}
