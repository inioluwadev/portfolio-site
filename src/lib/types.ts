import { z } from 'zod';

export const projectDetailSchema = z.object({
  type: z.enum(['text', 'image', 'quote']),
  content: z.string().min(1, 'Content cannot be empty'),
  imageHint: z.string().optional().nullable(),
});

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  slug: z.string().min(3, 'Slug must be at least 3 characters.'),
  category: z.enum(['Architecture', 'Design', 'Innovation']),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  image_url: z.string().url('Must be a valid URL.'),
  image_hint: z.string().optional().nullable(),
  details: z.array(projectDetailSchema).optional().nullable().default([]),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectDetail = z.infer<typeof projectDetailSchema>;
