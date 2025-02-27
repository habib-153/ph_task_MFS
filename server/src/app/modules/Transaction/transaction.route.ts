import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { TransactionControllers } from './transaction.controler';

const router = express.Router();

router.post(
  '/send-money',
  auth(USER_ROLE.user, USER_ROLE.agent, USER_ROLE.admin),
  TransactionControllers.sendMoney,
);
router.post('/cash-out', auth(USER_ROLE.user, USER_ROLE.agent, USER_ROLE.admin), TransactionControllers.cashOut);
router.post('/cash-in', auth(USER_ROLE.agent, USER_ROLE.admin), TransactionControllers.cashIn);
router.get('/my-transactions', auth(USER_ROLE.user, USER_ROLE.agent, USER_ROLE.admin), TransactionControllers.getMyTransactions);

export const TransactionRoutes = router;
