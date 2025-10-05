import { z } from "zod";

const createEmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional(),
  category: z.string().min(1, "Category is required"),
  designation: z.string().min(1, "Designation is required"),
});

type CreateEmployeeFormType = z.infer<typeof createEmployeeSchema>;

export { createEmployeeSchema, type CreateEmployeeFormType };
