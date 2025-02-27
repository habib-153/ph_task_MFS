import { Schema, model } from 'mongoose';
import { IUserModel, TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { AC_TYPE, USER_ROLE, USER_STATUS } from './user.constant';

const userSchema = new Schema<TUser, IUserModel>(
  {
    email: {
      type: String,
      required: true,
      match: [
        /^([\w.-]+@([\w-]+\.)+[\w-]{2,4})?$/,
        'Please fill a valid email address',
      ],
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    password: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },
    accountType: {
      type: String,
      required: true,
      enum: AC_TYPE
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [
        /^(\+88)?(01[3-9]{1}\d{8})$/,
        'Please fill a valid phone number', 
      ],
      unique: true,
    },
    nid: {
      type: String,
      required: true,
      match: [
        /^([0-9]{10,13})$/,
        'Please fill a valid NID number',
      ],
      unique: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: USER_ROLE,
      default: 'user',
    },
    profileImg: {
      type: String,
    },
    status: {
      type: String,
      enum: USER_STATUS,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    '' +
    this?.name?.lastName
  );
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isUserExistsByPhoneNumber = async function (
  phoneNumber: string,
) {
  return await User.findOne({ phoneNumber }).select('+password');
};

userSchema.statics.isUserExistsByNid = async function (nid: string) {
  return await User.findOne({ nid }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: number,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, IUserModel>('User', userSchema);