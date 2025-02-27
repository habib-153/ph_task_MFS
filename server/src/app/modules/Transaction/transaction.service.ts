import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { Transaction } from './transaction.model';
import config from '../../config';

const sendMoney = async (
  senderId: string,
  receiverPhone: string,
  amount: number,
  pin: string,
) => {
  const sender = await User.findById(senderId);
  const receiver = await User.findOne({ phoneNumber: receiverPhone });
  const admin = await User.findOne({
    role: 'admin',
    phoneNumber: config.ADMIN_PHONE,
  });

  if (!sender) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sender not found');
  }
  if (!receiver) {
    throw new AppError(httpStatus.NOT_FOUND, 'Receiver not found');
  }
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  if (!(await User.isPasswordMatched(pin.toString(), sender.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'PIN do not matched');

  if (amount < 50) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Minimum amount to send is 50 taka',
    );
  }

  const fee = amount > 100 ? 5 : 0;
  const totalAmount = amount + fee;

  if (sender.balance < totalAmount) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient balance');
  }

  sender.balance -= totalAmount;
  receiver.balance += amount;
  admin.balance += 5; // Admin earns 5 taka for every transaction

  await sender.save();
  await receiver.save();
  await admin.save();

  const transaction = await Transaction.create({
    senderId: sender._id,
    receiverId: receiver._id,
    amount,
    type: 'sendMoney',
    fee,
    transactionId: `TXN-${Date.now()}`,
  });

  return transaction;
};

const cashOut = async (
  userId: string,
  agentId: string,
  amount: number,
  pin: string,
) => {
  const user = await User.findById(userId);
  const agent = await User.findById(agentId);
  const admin = await User.findOne({
    role: 'admin',
    phoneNumber: config.ADMIN_PHONE,
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!agent) {
    throw new AppError(httpStatus.NOT_FOUND, 'Agent not found');
  }
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  if (!(await User.isPasswordMatched(pin, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'PIN do not matched');

  const fee = amount * 0.015;
  const totalAmount = amount + fee;

  if (user.balance < totalAmount) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient balance');
  }

  user.balance -= totalAmount;
  agent.balance -= amount; // Deduct the amount from the agent's balance
  agent.income = (agent.income || 0) + amount * 0.01; // Agent earns 1% of the transaction amount
  admin.income = (admin.income || 0) + amount * 0.005; // Admin earns 0.50% of the transaction amount
  admin.balance += 5; // Admin earns 5 taka for every transaction

  await user.save();
  await agent.save();
  await admin.save();

  const transaction = await Transaction.create({
    senderId: user._id,
    receiverId: agent._id,
    amount,
    type: 'cashOut',
    fee,
    transactionId: `TXN-${Date.now()}`,
  });

  return transaction;
};

const cashIn = async (
  userId: string,
  agentId: string,
  amount: number,
  pin: string,
) => {
  const user = await User.findById(userId);
  const agent = await User.findById(agentId);
  const admin = await User.findOne({
    role: 'admin',
    phoneNumber: config.ADMIN_PHONE,
  });

  if (!user || !agent) {
    throw new AppError(httpStatus.NOT_FOUND, 'User or Agent not found');
  }
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  if (!(await User.isPasswordMatched(pin, agent?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'PIN do not matched');

  user.balance += amount;
  agent.balance -= amount; // Deduct the amount from the agent's balance
  admin.balance += 5; // Admin earns 5 taka for every transaction

  await user.save();
  await agent.save();
  await admin.save();

  const transaction = await Transaction.create({
    senderId: agent._id,
    receiverId: user._id,
    amount,
    type: 'cashIn',
    fee: 0,
    transactionId: `TXN-${Date.now()}`,
  });

  return transaction;
};

const getMyTransactions = async (userId: string) => {
  const transactions = await Transaction.find({ $or: [{ senderId: userId }, { receiverId: userId }] }).sort({ createdAt: -1 });
  return transactions;    
}

export const TransactionServices = {
  sendMoney,
  cashOut,
  cashIn,
  getMyTransactions,
};