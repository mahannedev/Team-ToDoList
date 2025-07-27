import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().pipe(z.email("Please enter a valid email")),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(18, "Password is too long")
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
      "Password must include at least one uppercase letter and one special character",
    ),
});

export type SignupFormData = z.infer<typeof signupSchema>;
