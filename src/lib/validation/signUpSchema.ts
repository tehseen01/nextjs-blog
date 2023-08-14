import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must me at least 2 characters"),
  username: z
    .string()
    .nonempty("Username is required")
    .min(2, "username must me at least 2 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;
