import { createClient } from '@/lib/supabase/server';
import { aboutContentSchema, type AboutContent } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getAboutContent(): Promise<AboutContent | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching about content:', error);
    // This will happen if the table is empty, which is fine on first setup.
    return null;
  }
  return data;
}

export async function updateAboutContent(prevState: any, formData: FormData) {
  'use server';
  
  const supabase = createClient();
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
  // We don't redirect here, so the user sees a success message on the same page.
  // We will show a success toast.
  return { success: true };
}
