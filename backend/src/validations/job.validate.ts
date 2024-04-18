import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().trim().optional(), // Make description optional
});

export const updateJobSchema = createJobSchema.partial(); // Allow updating only some fields
