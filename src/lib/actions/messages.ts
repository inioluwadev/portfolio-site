'use server';

import { createActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export async function createContactMessage(prevState: any, formData: FormData) {
  const supabase = createActionClient();
  const values = Object.fromEntries(formData.entries());
  const validatedData = contactFormSchema.safeParse(values);

  if (!validatedData.success) {
    return { error: validatedData.error.flatten().fieldErrors };
  }

  const { error } = await supabase.from('contact_messages').insert(validatedData.data);

  if (error) {
    return { error: { _form: ['There was an error sending your message. Please try again.'] } };
  }
  
  revalidatePath('/admin/messages');
  return { success: true };
}

export async function deleteContactMessage(id: string) {
  const supabase = createActionClient();
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/messages');
}
