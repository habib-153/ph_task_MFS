import express from 'express';
import validateRequest, { validateRequestCookies } from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyparser';

const router = express.Router();

router.post(
  '/register', multerUpload.single('image'), parseBody,
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.registerUser
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

router.post(
  '/change-password',
  auth('admin', 'user'),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword
);

router.post('/reset-password', AuthControllers.resetPassword);

router.post(
  '/refresh-token',
  validateRequestCookies(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);
export const AuthRoutes = router;