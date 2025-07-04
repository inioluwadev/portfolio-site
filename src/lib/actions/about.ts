'use server';

import { createActionClient } from '@/lib/supabase/actions';
import { aboutContentSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function updateAboutContent(prevState: any, formData: FormData) {
  const supabase = createActionClient();
  const values = Object.fromEntries(formData.entries());
  
  const validatedData = aboutContentSchema.safeParse(values);

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
}
