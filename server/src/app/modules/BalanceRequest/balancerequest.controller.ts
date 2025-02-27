import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { balanceRequestService } from "./balancerequest.service";

const cerateBalanceRequest = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await balanceRequestService.createBalanceRequest(payload);

  sendResponse(res, {
    success: true,
    message: 'Balance Request  successful',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const getAllBalanceRequests = catchAsync(async (req, res) => {
  const result = await balanceRequestService.getBalanceRequest();

  sendResponse(res, {
    success: true,
    message: 'All Balance Requests fetched successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const deleteBalanceRequestById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await balanceRequestService.deleteBalanceRequest(id);
  
  sendResponse(res, {
    success: true,
    message: 'Balance Request Deleted successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const updateBalanceRequestById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await balanceRequestService.updateBalanceRequest(id, payload);
  sendResponse(res, {
    success: true,
    message: 'Balance Request updated successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const getBalanceRequestById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await balanceRequestService.getBalanceRequestById(id);
  sendResponse(res, {
    success: true,
    message: 'Balance Request fetched successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const balanceRequestController = {
  cerateBalanceRequest,
  getAllBalanceRequests,
  deleteBalanceRequestById,
  updateBalanceRequestById,
  getBalanceRequestById,
};
