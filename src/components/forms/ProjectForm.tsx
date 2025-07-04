'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, type Project, type ProjectDetail } from '@/lib/types';
import { slugify } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, PlusCircle, Save } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ImageUpload } from '../ui/ImageUpload';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>{isEditing ? 'Saving...' : 'Creating...'}</>
      ) : (
        <>{isEditing ? 'Save Changes' : 'Create Project'}</>
      )}
      <Save className="ml-2 h-4 w-4" />
    </Button>
  );
}

type ProjectFormProps = {
  project?: Project;
  formAction: (prevState: any, formData: FormData) => Promise<void | { error?: any }>;
};

export function ProjectForm({ project, formAction }: ProjectFormProps) {
  const [state, action] = useFormState(formAction, undefined);
  const { toast } = useToast();
  const isEditing = !!project;

  const form = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: project || {
      title: '',
      slug: '',
      category: 'Architecture',
      description: '',
      image_url: null,
      details: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'details',
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    if (!form.formState.dirtyFields.slug) {
      form.setValue('slug', slugify(title));
    }
  };

  const addDetail = (type: ProjectDetail['type']) => {
    append({ type, content: '' });
  };
  
  const clientAction = useCallback((formData: FormData) => {
    const data = form.getValues();
    formData.set('details', JSON.stringify(data.details));
    action(formData);
  }, [action, form]);

  return (
    <Form {...form}>
      <form action={clientAction} className="space-y-8">
        <Card>
          <CardHeader><CardTitle>Core Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} onChange={handleTitleChange} placeholder="Project Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="project-slug" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Architecture">Architecture</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Innovation">Innovation</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="A brief summary of the project." />
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
                  <FormLabel>Main Image</FormLabel>
                  <FormControl>
                    <ImageUpload name="image_url" defaultValue={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Project Page Content</CardTitle></CardHeader>
          <CardContent>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 border p-4 rounded-md mb-4 relative">
                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
                <FormField
                  control={form.control}
                  name={`details.${index}.type`}
                  render={({ field: typeField }) => (
                    <FormItem>
                      <FormLabel>Content Type</FormLabel>
                      <Select onValueChange={typeField.onChange} defaultValue={typeField.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="quote">Quote</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {form.watch(`details.${index}.type`) === 'image' ? (
                  <FormField
                    control={form.control}
                    name={`details.${index}.content`}
                    render={({ field: contentField }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <ImageUpload name={`details_image_${index}`} defaultValue={contentField.value} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 ) : (
                  <FormField
                    control={form.control}
                    name={`details.${index}.content`}
                    render={({ field: contentField }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea {...contentField} placeholder="Enter content..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 )}
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => addDetail('text')}><PlusCircle className="mr-2" /> Add Text</Button>
              <Button type="button" variant="outline" onClick={() => addDetail('image')}><PlusCircle className="mr-2" /> Add Image</Button>
              <Button type="button" variant="outline" onClick={() => addDetail('quote')}><PlusCircle className="mr-2" /> Add Quote</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-4">
          <SubmitButton isEditing={isEditing} />
          <Button variant="outline" asChild>
            <Link href="/admin/projects">Cancel</Link>
          </Button>
        </div>
        {state?.error?._form && <p className="text-sm text-destructive">{state.error._form[0]}</p>}
      </form>
    </Form>
  );
}
