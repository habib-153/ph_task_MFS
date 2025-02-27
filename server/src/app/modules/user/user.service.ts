/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';

const getMe = async (userId: string, role: string, nid: string) => {
  const result = await User.findOne({ _id: userId, role: role, nid: nid }).select('+password');

  return result;
};

const changeStatus = async(id: string, payload: { status: string}) => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true
  })

  return result
}

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const { name, ...remainingUserData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingUserData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await User.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserFromDB = async (id: string) => {
    const deletedUser = await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    return deletedUser;
};

export const UserServices = {
  getMe,
  changeStatus,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB
};
