const { z } = require("zod");

const createProjectSchema = z.object({
  title: z.string().trim().min(2).max(150),
  description: z.string().trim().min(5).max(2000),
  tech: z.array(z.string().trim().min(1)).default([]),
  link: z.string().trim().url("Link must be a valid URL.").optional().or(z.literal("")),
  image: z.string().trim().optional().or(z.literal("")),
});

// Same shape but every field optional, for PATCH-style partial updates.
const updateProjectSchema = createProjectSchema.partial();

const idParamSchema = z.object({
  id: z.coerce.number().int().positive("id must be a positive integer."),
});

const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

module.exports = {
  createProjectSchema,
  updateProjectSchema,
  idParamSchema,
  listQuerySchema,
};
