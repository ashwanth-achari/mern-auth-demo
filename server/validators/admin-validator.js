const { z } = require("zod");

const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .optional(),

  email: z.string().email("Invalid email format").optional(),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional(),

  isAdmin: z
    .boolean({
      required_error: "isAdmin is required when sent",
      invalid_type_error: "isAdmin must be a boolean",
    })
    .optional(),
});

module.exports = updateUserSchema;
