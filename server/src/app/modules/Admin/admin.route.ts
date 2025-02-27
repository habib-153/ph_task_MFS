import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/approve-agent/:agentId',
  auth(USER_ROLE.admin),
  AdminControllers.approveAgent,
);
router.post(
  '/block-user/:userId',
  auth(USER_ROLE.admin),
  AdminControllers.blockUser,
);
router.post(
  '/add-money-to-agent',
  auth(USER_ROLE.admin),
  AdminControllers.addMoneyToAgent,
);

router.get(
  '/total-money',
  auth(USER_ROLE.admin),
  AdminControllers.getTotalMoneyInSystem,
);

export const AdminRoutes = router;