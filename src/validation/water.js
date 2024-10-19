import Joi from 'joi';

export const waterAddSchema = Joi.object({
  amount: Joi.number().min(0).max(5000).required(),
});

export const waterUpdateSchema = Joi.object({
  amount: Joi.number().min(0).max(5000),
});
