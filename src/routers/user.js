import { Router } from 'express';

import {
  getUserByIdController,
  patchUserController,
  changePasswordController,
  changeEmailController,
} from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/uploads.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import {
  patchUserSchema,
  changePasswordSchema,
  changeEmailSchema,
} from '../validation/users.js';

const userRouter = Router();

userRouter.use(authenticate);

userRouter.get('/userInfo', ctrlWrapper(getUserByIdController));

userRouter.patch(
  '/userInfo',
  validateBody(patchUserSchema),
  ctrlWrapper(patchUserController),
);

userRouter.patch(
  '/userInfo/avatar',
  upload.single('userphoto'),
  ctrlWrapper(patchUserController),
);

userRouter.patch(
  '/userInfo/change-password',
  validateBody(changePasswordSchema),
  ctrlWrapper(changePasswordController),
);

userRouter.patch(
  '/userInfo/change-email',
  validateBody(changeEmailSchema),
  ctrlWrapper(changeEmailController),
);

export default userRouter;
