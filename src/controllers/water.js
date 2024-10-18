import createHttpError from 'http-errors';
import { updateWaterRate } from '../services/water.js';

export const updateWaterRateController = async (req, res) => {
  let { dailyRate } = req.body;

  dailyRate = Number(dailyRate);

  if (isNaN(dailyRate)) {
    throw createHttpError(400, 'Daily water rate must be a number');
  }

  if (dailyRate > 15000 || dailyRate < 0) {
    throw createHttpError(
      400,
      'Daily water rate must be between 0 and 15000 ml.',
    );
  }

  const { isNew, data } = await updateWaterRate(req.body);

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Water upsert successfully!',
    data,
  });
};
