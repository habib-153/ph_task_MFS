import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { balanceRequestController } from './balancerequest.controller';

const BalanceRequestRoutes = Router();

BalanceRequestRoutes.post(
  '/cerate-balanceRequest',
  auth(USER_ROLE.agent),
  balanceRequestController.cerateBalanceRequest,
);

BalanceRequestRoutes.get(
  '/',
  auth(USER_ROLE.agent, USER_ROLE.admin),
  balanceRequestController.getAllBalanceRequests,
);

BalanceRequestRoutes.get(
  '/:id',
  auth(USER_ROLE.agent, USER_ROLE.admin),
  balanceRequestController.getBalanceRequestById,
);

BalanceRequestRoutes.patch(
  '/:id',
  auth(USER_ROLE.admin),
  balanceRequestController.updateBalanceRequestById,
);

BalanceRequestRoutes.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.agent),
  balanceRequestController.deleteBalanceRequestById,
);

export default BalanceRequestRoutes;
