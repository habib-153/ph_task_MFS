import { model, Schema } from "mongoose";
import { TTransaction } from "./transaction.interface";

const transactionSchema = new Schema<TTransaction>(
  {
    senderId: {
      type: Schema.Types.String,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: Schema.Types.String,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['sendMoney', 'cashOut', 'cashIn'],
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Transaction = model<TTransaction>(
  'Transaction',
  transactionSchema,
);
