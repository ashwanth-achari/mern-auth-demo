const { z } = require("zod");

const contactSchema = z.object({
  message: z
    .string()
    .min(7, "Message must be at least 7 characters"),
})
.strict(); // <-- prevents username/email tampering

module.exports = contactSchema;