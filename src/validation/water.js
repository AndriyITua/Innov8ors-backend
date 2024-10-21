import Joi from 'joi';

export const waterRateSchema = Joi.object({
  dailynormwater: Joi.number().min(0).max(15000).required(),
});

export const waterConsumptionRecordSchema = Joi.object({
  amount: Joi.number().min(0).max(5000).required(),
});
