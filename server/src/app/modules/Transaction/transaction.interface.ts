export interface TTransaction {
  senderId: string;
  receiverId: string;
  amount: number;
  type: 'sendMoney' | 'cashOut' | 'cashIn';
  fee: number;
  transactionId: string;
}