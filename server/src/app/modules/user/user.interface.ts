import { Model } from "mongoose";
import { TAcType, TUserRole, TUserStatus } from "./user.constant";

export type TUserName = {
  firstName: string;
  lastName: string;
};

export interface TUser {
  _id?: string;
  name: TUserName;
  password: string;
  email: string;
  accountType: TAcType;
  phoneNumber: string;
  nid: string;
  balance: number;
  passwordChangedAt?: Date;
  role: TUserRole;
  profileImg?: string;
  status: TUserStatus;
  isApproved?: boolean;
  isDeleted: boolean;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isUserExistsByPhoneNumber(phoneNumber: string): Promise<TUser>;
  isUserExistsByNid(nid: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}