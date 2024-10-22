import { Router } from 'express';

import {
  getUserByIdController,
  patchUserController,
  changePasswordController,
} from '../controllers/user.js';
import { isValidIdUser } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/uploads.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { patchUserSchema, changePasswordSchema } from '../validation/users.js';

const userRouter = Router();

userRouter.use(authenticate);

userRouter.get('/:id', isValidIdUser, ctrlWrapper(getUserByIdController));

userRouter.patch(
  '/:id',
  isValidIdUser,
  validateBody(patchUserSchema),
  ctrlWrapper(patchUserController),
);

userRouter.patch(
  '/:id/avatar',
  upload.single('userphoto'),
  isValidIdUser,
  ctrlWrapper(patchUserController),
);

userRouter.patch(
  '/:id/change-password',
  validateBody(changePasswordSchema),
  ctrlWrapper(changePasswordController),
);

export default userRouter;
