import { model, Schema, Types } from 'mongoose';
import { TBalanceRequest } from './balancerequest.interface';

const balanceRequestSchema = new Schema(
  {
    agentId: { type: Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, min: 50 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      required: true,
    },
    isBalanceRequest: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const BalanceRequest = model<TBalanceRequest>(
  'BalanceRequest',
  balanceRequestSchema,
);

export default BalanceRequest;