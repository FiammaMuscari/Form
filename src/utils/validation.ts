import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least one number and one special character"
    ),
});

export const validateSignup = (data: { email: string; password: string }) => {
  schema.parse(data);
};
