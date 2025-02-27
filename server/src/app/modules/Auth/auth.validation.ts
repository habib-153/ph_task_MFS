import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required', }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
const registerValidationSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: 'First name is required' }),
      lastName: z.string({ required_error: 'Last name is required' }),
    }),
    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Invalid email',
    }),
    password: z.string({ required_error: 'PIN is required' }),
    accountType: z.string({ required_error: 'Account type is required' }),
    phoneNumber: z.string({ required_error: 'Phone number is required' }),
    nid: z.string({ required_error: 'NID is required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old PIN is required' }),
    newPassword: z.string({ required_error: 'New PIN is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  registerValidationSchema,
};
