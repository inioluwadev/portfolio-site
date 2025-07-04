'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { createContactMessage } from '@/lib/actions/messages';
import { useActionState, useEffect, useRef } from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-glow transition-shadow duration-300" disabled={pending}>
            {pending ? 'Sending...' : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
        </Button>
    )
}

export default function ContactForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(createContactMessage, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    if (state?.error) {
        toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: 'Please check the form for errors.',
        });
    }
    if (state?.success) {
        toast({
            title: 'Message Sent!',
            description: "Thanks for reaching out. I'll get back to you shortly.",
        });
        formRef.current?.reset();
    }
  }, [state, toast, form]);


  return (
    <Form {...form}>
      <form ref={formRef} action={formAction} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} name="name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} name="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell me about your project or inquiry..." className="min-h-[120px]" {...field} name="message" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
        {state?.error?._form && <p className="text-sm text-destructive">{state.error._form[0]}</p>}
      </form>
    </Form>
  );
}
