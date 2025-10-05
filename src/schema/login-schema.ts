import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(2, "Username is required"),
  password: z.string().min(4, "Password is required"),
});

type LoginFormType = z.infer<typeof loginSchema>;

export { loginSchema, type LoginFormType };
