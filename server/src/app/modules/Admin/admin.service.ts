import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";

const approveAgent = async (agentId: string) => {
  const agent = await User.findById(agentId);

  if (!agent) {
    throw new AppError(httpStatus.NOT_FOUND, 'Agent not found');
  }

  agent.isApproved = true;
  await agent.save();

  return agent;
};

const blockUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  user.status = 'blocked';
  await user.save();

  return user;
};

const addMoneyToAgent = async (agentId: string, amount: number) => {
  const agent = await User.findById(agentId);

  if (!agent) {
    throw new AppError(httpStatus.NOT_FOUND, 'Agent not found');
  }

  agent.balance += amount;
  await agent.save();

  return agent;
};

const getTotalMoneyInSystem = async () => {
  const users = await User.find();
  const totalMoney = users.reduce((acc, user) => acc + user.balance, 0);
  return totalMoney;
};

export const AdminServices = {
  approveAgent,
  blockUser,
  addMoneyToAgent,
  getTotalMoneyInSystem,
};