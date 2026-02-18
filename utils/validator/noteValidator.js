import {z} from "zod"

const noteSchema=z.object({
  title:z.string()
  .trim()
  .min(5,"title length is too small")
  .max(100,"title length is too long"),
  description:z.string()
  .trim()
  .min(5,"description length is too small")
  .max(100,"description length is too long"),
  tags:z.array(z.string())
  .optional(),
  isPinned:z.boolean()
  .optional(),
  isArchived:z.boolean()
  .optional()


}).strict();
export default noteSchema;