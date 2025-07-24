import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().pipe(z.email("Please enter a valid email")),
  password: z.string()
  .min(6, "Password must be at least 6 characters")
  .max(18,"Password is too long")
});

export type LoginFormData = z.infer<typeof loginSchema>;
