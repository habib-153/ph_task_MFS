export type TUser = {
  _id: string;
  phoneNumber: string;
  email: string;
  fullName?: string
  name: TName
  needsPasswordChange?: boolean;
  role: string;
  status?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
};

export type TName = {
  firstName: string;
  lastName: string;
  _id: string;
};

export type TTransaction = {
  _id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  type: "sendMoney" | "cashOut" | "cashIn";
  fee: number;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
};

export type TBalanceRequest = {
  _id: string;
  agentId: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  isBalanceRequest: boolean;
  createdAt: string;
  updatedAt: string;
};