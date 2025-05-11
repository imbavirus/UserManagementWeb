import { z } from 'zod';

// Schema for fetching a single user profile by its ID
export const idOnlySchema = z.object({
  id: z.number().min(1, "ID must be a positive number."),
});