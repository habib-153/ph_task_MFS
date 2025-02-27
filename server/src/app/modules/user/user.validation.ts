import { z } from "zod";
import { USER_STATUS } from "./user.constant";

const userValidationSchema = z.object({
    password: z.number({
        invalid_type_error:'PIN must be Digit'
    }).max(5, {message:"password can not be more than or less than 5 digit"}).optional(),
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