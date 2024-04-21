import { date, number, string, z } from "zod";

export const createStaffSchema = z.object({
  first_name: string()
    .min(1, "last name must contain at least 1 characters")
    .trim(),
  last_name: string()
    .min(1, "last name must contain at least 1 characters")
    .trim(),
  email: string().email(),
  phone_number: string().min(6, "invalid phone number"),
  job: number({ invalid_type_error: "job id must be integer" }).min(1),
  salary: number({ invalid_type_error: "job id must be integer" }).min(0),
  work_shift: string(),
});

export const updateStaffSchema = createStaffSchema.partial(); // Allow updating only some fields
