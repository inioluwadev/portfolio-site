'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manifestoCoreBeliefSchema, type ManifestoCoreBelief } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { useActionState, useEffect } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Core Belief'}
      <Save className="ml-2 h-4 w-4" />
    </Button>
  );
}

type CoreBeliefFormProps = {
  coreBelief: ManifestoCoreBelief;
  formAction: (prevState: any, formData: FormData) => Promise<{ error?: any; success?: boolean; }>;
};

export function CoreBeliefForm({ coreBelief, formAction }: CoreBeliefFormProps) {
  const [state, action] = useActionState(formAction, undefined);
  const { toast } = useToast();

  const form = useForm<ManifestoCoreBelief>({
    resolver: zodResolver(manifestoCoreBeliefSchema),
    defaultValues: coreBelief,
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
            description: 'Your manifesto core belief has been updated.',
        });
    }
  }, [state, toast]);

  return (
    <Form {...form}>
      <form action={action} className="space-y-8">
        <FormField
          control={form.control}
          name="core_belief"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Core Belief</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Your core belief..." rows={4} />
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
