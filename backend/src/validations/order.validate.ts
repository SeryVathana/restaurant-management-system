import z, { array, number, object, string } from "zod";

export const createOrderSchema = z.object({
  foods: array(object({ food_id: string(), quantity: number().min(1), comment: string().optional() })),
  comment: string().optional(),
  location_url: string().url(),
});
