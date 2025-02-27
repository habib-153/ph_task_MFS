/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from '../user/user.constant';
import AppError from '../../errors/AppError';
import { TUserName } from '../user/user.interface';

export const createToken = (
  jwtPayload: {
    _id?: string
    name: TUserName;
    email: string;
    role: keyof typeof USER_ROLE,
    phoneNumber: string;
    nid: string;
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (
  token: string,
  secret: string
): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(401, 'You are not authorized!');
  }
};