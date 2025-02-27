import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AdminServices } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const approveAgent = catchAsync(async (req: Request, res: Response) => {
  const { agentId } = req.params;
  const result = await AdminServices.approveAgent(agentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Agent approved successfully',
    data: result,
  });
});

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await AdminServices.blockUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
    data: result,
  });
});

const addMoneyToAgent = catchAsync(async (req: Request, res: Response) => {
  const { agentId, amount } = req.body;
  const result = await AdminServices.addMoneyToAgent(agentId, amount);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Money added to agent successfully',
    data: result,
  });
});

const getTotalMoneyInSystem = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminServices.getTotalMoneyInSystem();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Total money in the system retrieved successfully',
      data: result,
    });
  },
);

export const AdminControllers = {
  approveAgent,
  blockUser,
  addMoneyToAgent,
  getTotalMoneyInSystem,
};