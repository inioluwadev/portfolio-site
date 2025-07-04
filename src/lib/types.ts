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

export const aboutContentSchema = z.object({
  headline: z.string().min(3, 'Headline must be at least 3 characters.'),
  paragraph1: z.string().min(10, 'First paragraph is required.'),
  paragraph2: z.string().min(10, 'Second paragraph is required.'),
  image_url: z.string().url('Must be a valid URL.'),
  image_hint: z.string().optional().nullable(),
  cv_url: z.string().min(1, "CV URL cannot be empty."),
  substack_url: z.string().url({ message: "Must be a valid Substack URL." }).min(1, "Substack URL cannot be empty."),
  rss_url: z.string().url({ message: "Must be a valid RSS Feed URL." }).min(1, "RSS Feed URL cannot be empty."),
});

export type AboutContent = z.infer<typeof aboutContentSchema>;

export const manifestoPrincipleSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
});
export type ManifestoPrinciple = z.infer<typeof manifestoPrincipleSchema>;

export const manifestoCoreBeliefSchema = z.object({
  core_belief: z.string().min(10, 'Core belief must be at least 10 characters.'),
});
export type ManifestoCoreBelief = z.infer<typeof manifestoCoreBeliefSchema>;

export const blogPostSchema = z.object({
  guid: z.string(),
  title: z.string(),
  link: z.string().url(),
  pub_date: z.string(),
  preview: z.string(),
  tags: z.array(z.string()),
});

export type BlogPost = z.infer<typeof blogPostSchema>;

export const contactMessageSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});
export type ContactMessage = z.infer<typeof contactMessageSchema>;
