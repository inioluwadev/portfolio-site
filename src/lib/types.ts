import { z } from 'zod';

export const projectDetailSchema = z.object({
  type: z.enum(['text', 'image', 'quote']),
  content: z.string(),
});

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  slug: z.string().min(3, 'Slug must be at least 3 characters.'),
  category: z.enum(['Architecture', 'Design', 'Innovation']),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  image_url: z.string().url('Must be a valid URL.').optional().nullable(),
  details: z.array(projectDetailSchema).optional().nullable().default([]),
  tags: z.string().optional(), // Form will use a string, action will convert to array
  year: z.coerce.number().optional().nullable(),
  is_featured: z.boolean().optional().default(false),
  seo_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  og_image_url: z.string().url().optional().nullable(),
});

export type Project = z.infer<typeof projectSchema> & {
    tags: string[]; // Actual type from DB
};
export type ProjectDetail = z.infer<typeof projectDetailSchema>;

export const aboutContentSchema = z.object({
  headline: z.string().min(3, 'Headline must be at least 3 characters.'),
  paragraph1: z.string().min(10, 'First paragraph is required.'),
  paragraph2: z.string().min(10, 'Second paragraph is required.'),
  image_url: z.string({ required_error: "An image is required." }).url('A valid image URL is required.').min(1, 'An image is required.'),
  cv_url: z.string({ required_error: "A CV document is required." }).url('A valid CV URL is required.').min(1, 'A CV document is required.'),
  favicon_url: z.string().url().optional().nullable(),
  seo_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  og_image_url: z.string().url().optional().nullable(),
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

export const contactMessageSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  status: z.enum(['unread', 'read', 'archived']).default('unread'),
});
export type ContactMessage = z.infer<typeof contactMessageSchema>;

export const settingsSchema = z.object({
  site_title: z.string().min(3, 'Site title must be at least 3 characters.'),
  site_mode: z.enum(['live', 'coming_soon', 'maintenance']).default('live'),
});
export type Settings = z.infer<typeof settingsSchema>;

export const availableIcons = [
  'linkedin',
  'instagram',
  'twitter',
  'send',
  'bookOpen',
  'atSign',
  'link',
] as const;

export const socialLinkSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  url: z.string().url('Please enter a valid URL.'),
  icon: z.enum(availableIcons, {
    errorMap: () => ({ message: 'Please select a valid icon.' }),
  }),
  sort_order: z.coerce.number().int().default(0),
});
export type SocialLink = z.infer<typeof socialLinkSchema>;
