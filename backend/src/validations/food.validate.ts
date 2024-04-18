import { number, string, z } from "zod";

export const createFoodSchema = z.object({
  title: string().min(1).max(45),
  description: string().min(1).max(255),
  category_id: number({ invalid_type_error: "category id must be number" }).min(
    1
  ),
});

export const updateFoodSchema = z.object({
  title: string().min(1).max(45).optional(),
  description: string().min(1).max(255).optional(),
  category_id: number({ invalid_type_error: "category id must be number" })
    .min(1)
    .optional(),
});
