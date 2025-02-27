import { z } from "zod";
import { USER_STATUS } from "./user.constant";

const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error:'Password must be a string'
    }).max(20, {message:"password can not be more than 20 char"}).optional(),
})

const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum(Object.values(USER_STATUS) as [string, ...string[]])
    })
})

export const userValidation =  {
    userValidationSchema,
    changeStatusValidationSchema
}