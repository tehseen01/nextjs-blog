import { z } from "zod";

export const editProfileData = z.object({
  name: z
    .string()
    .nonempty("Name can't be empty")
    .min(2, "Name is too sort (minimum is 2 character)"),
  email: z
    .string()
    .nonempty("Email is required!")
    .email("Invalid email address!"),
  username: z
    .string()
    .nonempty("Username can't be empty")
    .min(2, "Username is too sort (minimum is 2 character)"),
  file: z.any(),
  bio: z.union([z.string(), z.undefined()]),
  site: z.union([z.string(), z.undefined()]),
});

export type TEditProfileType = z.infer<typeof editProfileData>;
