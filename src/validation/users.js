import Joi from 'joi';

import { emailRegexp } from '../constants/users.js';

export const userRegisterAndLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
  repeatNewPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
});

export const patchUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().pattern(emailRegexp),
  gender: Joi.string().valid('woman', 'man'),
  dailynormwater: Joi.number().min(0).max(15000),
});
