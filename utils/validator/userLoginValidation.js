import {z} from "zod";

const LoginSchema=z.object({
  email:z.string()
  .trim()
  .email("email is invalid"),
  password:z.string()
  .trim()
  .min(8,"password must be at least 8 characters")

}).strict();

export default LoginSchema;