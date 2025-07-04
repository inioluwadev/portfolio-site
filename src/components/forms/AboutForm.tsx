'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { aboutContentSchema, type AboutContent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { FileUpload } from '@/components/ui/FileUpload';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Changes'}
      <Save className="ml-2 h-4 w-4" />
    </Button>
  );
}

type AboutFormProps = {
  aboutContent: AboutContent;
  formAction: (prevState: any, formData: FormData) => Promise<{ error?: any; success?: boolean; }>;
};

export function AboutForm({ aboutContent, formAction }: AboutFormProps) {
  const [state, action] = useFormState(formAction, undefined);
  const { toast } = useToast();

  const form = useForm<AboutContent>({
    resolver: zodResolver(aboutContentSchema),
    defaultValues: aboutContent,
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
            title: 'Success!',
            description: 'Your "About" page has been updated.',
        });
    }
  }, [state, toast]);

  return (
    <Form {...form}>
      <form action={action} className="space-y-8">
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headline</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your Professional Headline" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paragraph1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Introduction Paragraph</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Introduce yourself here..." rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paragraph2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Elaboration Paragraph</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Elaborate on your background and experience..." rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <ImageUpload name={field.name} defaultValue={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cv_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CV Document (PDF)</FormLabel>
              <FormControl>
                <FileUpload
                  name={field.name}
                  defaultValue={field.value}
                  accept={{ 'application/pdf': ['.pdf'] }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="substack_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Substack URL</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} placeholder="https://yourname.substack.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rss_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Substack RSS Feed URL</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} placeholder="https://yourname.substack.com/feed" />
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
