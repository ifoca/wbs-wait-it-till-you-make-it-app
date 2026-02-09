import {z} from "zod/v4"

 const usernameSchema = z.string({error: ' username must be a string'})
 const emailSchema = z.string({error: 'please input a valid  email'});
 const passwordSchema = z.string({error: 'must be a string'})
                         .min(6,{error: 'must be at least 6 characters'})
                         .max(20,{error: 'the password must not exceed 20 characters'});


 export  const registrationSchema = z.object({
    username:usernameSchema,
    email: emailSchema,
    password:passwordSchema

 })
 .strict();


 export const loginSchema = z.object({
    email:emailSchema,
    password:passwordSchema
 })
 .strict()