'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { socialLinkSchema, type SocialLink, availableIcons } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import Link from 'next/link';
import { getIcon } from '@/lib/icons';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (isEditing ? 'Saving...' : 'Adding...') : (isEditing ? 'Save Link' : 'Add Link')}
      <Save className="ml-2 h-4 w-4" />
    </Button>
  );
}

type SocialLinkFormProps = {
  link?: SocialLink;
  formAction: (prevState: any, formData: FormData) => Promise<void | { error?: any; }>;
};

export function SocialLinkForm({ link, formAction }: SocialLinkFormProps) {
  const [state, action] = useFormState(formAction, undefined);
  const { toast } = useToast();
  const isEditing = !!link;

  const form = useForm<SocialLink>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: link || {
      name: '',
      url: '',
      icon: 'link',
      sort_order: 0,
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
  
  const selectedIcon = form.watch('icon');
  const IconComponent = getIcon(selectedIcon);

  return (
    <Form {...form}>
      <form action={action} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., LinkedIn" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://linkedin.com/in/yourprofile" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                       <IconComponent className="h-4 w-4" />
                       <SelectValue placeholder="Select an icon" />
                    </div>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableIcons.map((iconName) => {
                    const ListItemIcon = getIcon(iconName);
                    return (
                        <SelectItem key={iconName} value={iconName}>
                            <div className="flex items-center gap-2">
                                <ListItemIcon className="h-4 w-4" />
                                <span>{iconName}</span>
                            </div>
                        </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sort_order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sort Order</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <SubmitButton isEditing={isEditing} />
          <Button variant="outline" asChild>
            <Link href="/admin/socials">Cancel</Link>
          </Button>
        </div>
        {state?.error?._form && <p className="text-sm text-destructive">{state.error._form[0]}</p>}
      </form>
    </Form>
  );
}
