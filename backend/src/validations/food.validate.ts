import { number, string, z } from "zod";

export const createFoodSchema = z.object({
  title: string().min(1).max(45),
  description: string().min(1).max(255),
  category: number({ invalid_type_error: "category id must be number" }).min(1),
  price: number().min(0),
  img_url: string().url(),
});

export const updateFoodSchema = z.object({
  title: string().min(1).max(45).optional(),
  description: string().min(1).max(255).optional(),
  category: number({ invalid_type_error: "category id must be number" })
    .min(1)
    .optional(),
  price: number().min(0).optional(),
  img_url: string().url().optional(),
});
