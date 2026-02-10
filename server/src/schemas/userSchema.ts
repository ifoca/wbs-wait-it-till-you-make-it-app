import { z } from 'zod/v4';

const usernameSchema = z.string({ error: ' username must be a string' });
const emailSchema = z.string({ error: 'please input a valid  email' });
const passwordSchema = z
  .string({ error: 'must be a string' })
  .min(6, { error: 'must be at least 6 characters' });

export const registrationSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export const loginSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

<<<<<<< HEAD

 export const loginSchema = z.object({
    email:emailSchema,
    password:passwordSchema
 })
 .strict()

 /*export const updateUserSchema = z
    .object({
       username: usernameSchema.optional(),
       email: emailSchema.optional(),
       password: passwordSchema.optional(),
    })
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
       message: 'At least one field must be provided',
    });*/
=======
export type RegistrationSchema = z.infer<typeof registrationSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
>>>>>>> 416a4e244cd373574f571f05d8f86ba9711f4fdd
