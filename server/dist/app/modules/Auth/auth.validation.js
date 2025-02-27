"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required', }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const registerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: 'First name is required' }),
            lastName: zod_1.z.string({ required_error: 'Last name is required' }),
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
            invalid_type_error: 'Invalid email',
        }),
        password: zod_1.z.string({ required_error: 'PIN is required' }),
        accountType: zod_1.z.string({ required_error: 'Account type is required' }),
        phoneNumber: zod_1.z.string({ required_error: 'Phone number is required' }),
        nid: zod_1.z.string({ required_error: 'NID is required' }),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: 'Old PIN is required' }),
        newPassword: zod_1.z.string({ required_error: 'New PIN is required' }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'Refresh token is required' }),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
    registerValidationSchema,
};
