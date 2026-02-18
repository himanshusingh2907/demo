import {z} from "zod"

const registerSchema= z.object({
   username:z.string()
   .trim()
   .min(2,"Username is too small")
   .max(50,"Username is too large"),
   email:z.string()
   .trim()
   .email("invalid email format"),
   password:z.string()
   .min(8,"password length is too small")
   .regex(/[A-Z]/,"password must contain  uppercase lettter")
   .regex(/[a-z]/,"password must contain  lowercase letter")
   .regex(/[0-9]/,"password must contain Number")
   .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
}).strict();

export default registerSchema;