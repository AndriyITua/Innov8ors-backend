import Joi from 'joi';

export const waterRateSchema = Joi.object({
  dailynormwater: Joi.number().min(0).max(15000).required(),
});

export const waterConsumptionRecordSchema = Joi.object({
  amount: Joi.number().min(0).max(5000).required(),
  consumptionTime: Joi.string()
    .pattern(/^(1[0-2]|0?[1-9]):([0-5][0-9]) (AM|PM)$/i)
    .required()
    .messages({
      'string.pattern.base': 'Time must be in the format HH:MM AM/PM',
    }),
});
