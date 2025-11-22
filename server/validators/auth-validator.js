const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .max(120, { message: "Email must not exceed 120 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be more than 7 characters" })
    .max(120, { message: "Password must not exceed 120 characters" }),
});

const signUpSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(120, { message: "Name must not exceed 120 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .regex(/^\d{10,20}$/, "Phone number must contain 10–20 digits only"),
});

module.exports = { signUpSchema, loginSchema };
