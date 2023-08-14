import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required!")
    .email("Invalid email address!"),
  password: z
    .string()
    .nonempty("Password is required!")
    .min(6, "Password must be at least 6 characters"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
