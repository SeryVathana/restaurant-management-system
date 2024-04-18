import { string, z } from "zod";

export const customerRegisterScehma = z.object({
  first_name: string()
    .min(1, "last name must contain at least 1 characters")
    .trim(),
  last_name: string()
    .min(1, "last name must contain at least 1 characters")
    .trim(),
  email: string().email(),
  phone_number: string().min(6, "Invalid phone number"),
  password: string().min(8, "password must contain at least 8 characters"),
});

export const customerLoginSchema = z.object({
  email_phone: string(),
  password: string(),
});

export const adminRegisterScehma = z.object({
  first_name: string()
    .min(1, "last name must contain at least 1 characters")
    .trim(),
  last_name: string()
    .min(1, "last name must contain at least 1 characters")
    .trim(),
  email: string().email(),
  password: string().min(8, "password must contain at least 8 characters"),
});

export const adminLoginSchema = z.object({
  email: string().email(),
  password: string(),
});
