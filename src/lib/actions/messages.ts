'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { ContactMessage } from '@/lib/types';

const supabase = createClient();

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export async function createContactMessage(prevState: any, formData: FormData) {
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


export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  return data || [];
}

export async function deleteContactMessage(id: string) {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/messages');
}
