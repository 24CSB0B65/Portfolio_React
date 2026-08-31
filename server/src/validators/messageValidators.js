const { z } = require("zod");

const createMessageSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  email: z.string().trim().email("Enter a valid email address."),
  message: z.string().trim().min(5, "Message must be at least 5 characters.").max(2000),
});

const idParamSchema = z.object({
  id: z.coerce.number().int().positive("id must be a positive integer."),
});

const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

module.exports = { createMessageSchema, idParamSchema, listQuerySchema };
