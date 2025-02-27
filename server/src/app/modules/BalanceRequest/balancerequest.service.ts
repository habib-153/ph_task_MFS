import mongoose from "mongoose";
import { TBalanceRequest } from "./balancerequest.interface";
import BalanceRequest from "./balancerequest.model";
import { User } from "../user/user.model";

const createBalanceRequest = async (payload: TBalanceRequest) => {
  const result = await BalanceRequest.create(payload);
  return result;
};

const getBalanceRequest = async () => {
  const balanceRequests = await BalanceRequest.find().populate('agentId');
  return balanceRequests;
};

const getBalanceRequestById = async (_id: string) => {
  const balanceRequests = await BalanceRequest
    .findOne({ _id })
    .populate('agentId');
  return balanceRequests;
};

const updateBalanceRequest = async (_id: string, payload: TBalanceRequest) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedBalanceRequest = await BalanceRequest.findOneAndUpdate(
      { _id },
      payload,
      { new: true, session }, 
    );

    if (!updatedBalanceRequest) {
      throw new Error('Balance request not found');
    }

    if (updatedBalanceRequest.status === 'approved') {
      const agent = await User.findById(
        updatedBalanceRequest.agentId,
      ).session(session);

      if (!agent) {
        throw new Error('Agent not found');
      }

      agent.balance += updatedBalanceRequest.amount;
      await agent.save();
    }

    await session.commitTransaction();
    return updatedBalanceRequest;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const deleteBalanceRequest = async (_id: string) => {
  const deleteBalanceRequest = await BalanceRequest.findOneAndDelete({
    _id,
  });
  return deleteBalanceRequest;
};

export const balanceRequestService = {
  createBalanceRequest,
  getBalanceRequest,
  updateBalanceRequest,
  deleteBalanceRequest,
  getBalanceRequestById,
};
