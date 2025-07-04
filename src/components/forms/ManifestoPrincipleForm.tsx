'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manifestoPrincipleSchema, type ManifestoPrinciple } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import Link from 'next/link';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (isEditing ? 'Saving...' : 'Adding...') : (isEditing ? 'Save Principle' : 'Add Principle')}
      <Save className="ml-2 h-4 w-4" />
    </Button>
  );
}

type ManifestoPrincipleFormProps = {
  principle?: ManifestoPrinciple;
  formAction: (payload: FormData) => void;
};

export function ManifestoPrincipleForm({ principle, formAction }: ManifestoPrincipleFormProps) {
  const [state, action] = useFormState(formAction, undefined);
  const { toast } = useToast();
  const isEditing = !!principle;

  const form = useForm<ManifestoPrinciple>({
    resolver: zodResolver(manifestoPrincipleSchema),
    defaultValues: principle || {
      title: '',
      description: '',
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
  }, [state, toast]);

  return (
    <Form {...form}>
      <form action={action} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Principle Title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Describe the principle..." rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <SubmitButton isEditing={isEditing} />
          <Button variant="outline" asChild>
            <Link href="/admin/manifesto">Cancel</Link>
          </Button>
        </div>
        {state?.error?._form && <p className="text-sm text-destructive">{state.error._form[0]}</p>}
      </form>
    </Form>
  );
}
