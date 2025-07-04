'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, type Project, type ProjectDetail } from '@/lib/types';
import { slugify } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash2, PlusCircle, Save } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ImageUpload } from '../ui/ImageUpload';
import { Switch } from '@/components/ui/switch';
import { Separator } from '../ui/separator';

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
    defaultValues: project ? {
      ...project,
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
    } : {
      title: '',
      slug: '',
      category: 'Architecture',
      description: '',
      image_url: null,
      details: [],
      tags: '',
      year: new Date().getFullYear(),
      is_featured: false,
      seo_title: '',
      meta_description: '',
      og_image_url: null,
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
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value ?? ''} placeholder="e.g., 2024" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="design, architecture, featured" />
                  </FormControl>
                  <FormDescription>
                    Enter tags separated by commas.
                  </FormDescription>
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
            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Feature this project?</FormLabel>
                    <FormDescription>
                      Featured projects may be displayed more prominently.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Configure Search Engine Optimization settings for this project page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="seo_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="A specific title for search engine results." />
                  </FormControl>
                  <FormDescription>If empty, the project title will be used.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ''} placeholder="A short description for search engines (about 160 characters)." />
                  </FormControl>
                  <FormDescription>If empty, the project's short description will be used.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="og_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Graph Image</FormLabel>
                  <FormControl>
                    <ImageUpload name="og_image_url" defaultValue={field.value} />
                  </FormControl>
                  <FormDescription>The image used when sharing on social media. If empty, the project's main image will be used. (1200x630px recommended)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
