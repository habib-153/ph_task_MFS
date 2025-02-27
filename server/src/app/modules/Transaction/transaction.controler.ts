import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TransactionServices } from "./transaction.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const sendMoney = catchAsync(async (req: Request, res: Response) => {
  const { senderId, receiverPhone, amount, pin } = req.body;
  const result = await TransactionServices.sendMoney(
    senderId,
    receiverPhone,
    amount,
    pin
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Money sent successfully',
    data: result,
  });
});

const cashOut = catchAsync(async (req: Request, res: Response) => {
  const { userId, agentId, amount, pin } = req.body;
  const result = await TransactionServices.cashOut(userId, agentId, amount, pin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cash out successful',
    data: result,
  });
});

const cashIn = catchAsync(async (req: Request, res: Response) => {
  const { userId, agentId, amount, pin } = req.body;
  const result = await TransactionServices.cashIn(userId, agentId, amount, pin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cash in successful',
    data: result,
  });
});

export const TransactionControllers = {
  sendMoney,
  cashOut,
  cashIn,
};
