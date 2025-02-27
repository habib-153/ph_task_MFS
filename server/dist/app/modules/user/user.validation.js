"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const userValidationSchema = zod_1.z.object({
    password: zod_1.z.number({
        invalid_type_error: 'PIN must be Digit'
    }).max(5, { message: "password can not be more than or less than 5 digit" }).optional(),
});
const changeStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(Object.values(user_constant_1.USER_STATUS))
    })
});
exports.userValidation = {
    userValidationSchema,
    changeStatusValidationSchema
};
