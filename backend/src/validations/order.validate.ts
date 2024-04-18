import z, { array, number, object, string } from "zod";

export const createOrderSchema = z.object({
  foods: array(object({ food_id: number().min(1), quantity: number().min(1) })),
  location_url: string().url(),
});
