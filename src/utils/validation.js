import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Enter a valid email'),
  role: z.enum(['seeker', 'employer'], {
    required_error: 'Choose a role',
  }),
});

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
});

export const jobSchema = z.object({
  title: z.string().min(3, 'Title is too short'),
  company: z.string().min(2, 'Company is required'),
  location: z.string().min(2, 'Location is required'),
  type: z.enum(['Full-time', 'Part-time', 'Remote', 'Internship'], {
    required_error: 'Select a job type',
  }),
  salary: z.string().min(2, 'Salary range is required'),
  description: z.string().min(40, 'Please write a longer description'),
  requirementsText: z.string().min(10, 'Add at least one requirement (one per line)'),
});

export const applySchema = z.object({
  coverLetter: z
    .string()
    .min(40, 'Cover letter should be at least 40 characters')
    .max(2000, 'Keep it under 2000 characters'),
});

const httpUrl = z
  .string()
  .trim()
  .refine((value) => !value || /^https?:\/\//i.test(value), 'Use a full URL starting with http');

export const portfolioSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  title: z.string().min(2, 'Headline is required'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers, and hyphens'),
  email: z.string().email('Enter a valid email'),
  location: z.string().optional(),
  bio: z.string().min(40, 'Bio should be at least 40 characters'),
  skills: z.array(z.string().min(1)).min(1, 'Add at least one skill'),
  projects: z
    .array(
      z.object({
        title: z.string().min(2, 'Project title is required'),
        description: z.string().min(10, 'Add a short description'),
        link: httpUrl.or(z.literal('')),
      }),
    )
    .min(1, 'Add at least one project'),
  experience: z
    .array(
      z.object({
        company: z.string().min(2, 'Company is required'),
        role: z.string().min(2, 'Role is required'),
        period: z.string().min(2, 'Dates are required'),
        description: z.string().min(10, 'Add a short description'),
      }),
    )
    .min(1, 'Add at least one experience'),
  socials: z.object({
    github: httpUrl.or(z.literal('')),
    linkedin: httpUrl.or(z.literal('')),
    website: httpUrl.or(z.literal('')),
    twitter: httpUrl.or(z.literal('')),
  }),
});
