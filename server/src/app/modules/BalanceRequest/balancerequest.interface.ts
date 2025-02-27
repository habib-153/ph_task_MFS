import { Types } from "mongoose";

export interface TBalanceRequest {
  agentId: Types.ObjectId;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
}
