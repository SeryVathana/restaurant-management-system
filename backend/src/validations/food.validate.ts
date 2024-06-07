import { array, number, string, z } from "zod";

export const createFoodSchema = z.object({
  title: string().min(1).max(45),
  title_kh: string().optional(),
  description: string().min(1).max(255),
  img_url: string().url(),
  price: number().min(0),
  categories: array(string()),
});

export const updateFoodSchema = createFoodSchema.partial();
