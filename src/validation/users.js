import Joi from 'joi';

import { emailRegexp } from '../constants/users.js';

export const userRegisterSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});

export const patchUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().pattern(emailRegexp),
  gender: Joi.string().valid('woman', 'man'),
  dailynormwater: Joi.number().min(0).max(15000),
});

export const userPhotoSchema = Joi.object({
  userphoto: Joi.string().uri().required(),
});
