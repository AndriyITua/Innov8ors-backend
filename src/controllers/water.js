import createHttpError from 'http-errors';
import {
  updateWaterRate,
  addWaterConsumption,
  updateWaterConsumption,
  deleteWaterConsumption,
} from '../services/water.js';

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
    message: 'Water rate upsert successfully!',
    data,
  });
};

export const addWaterConsumptionController = async (req, res) => {
  const record = await addWaterConsumption(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a water record!',
    data: record,
  });
};

export const updateWaterConsumptionController = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const data = await updateWaterConsumption({ _id: id }, amount);

  if (!data) throw createHttpError(404, `Water record with id=${id} not found`);

  res.json({
    status: 200,
    message: 'Successfully edited water record!',
    data,
  });
};

export const deleteWaterConsumptionController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteWaterConsumption({ _id: id });

  if (!data) throw createHttpError(404, `Water record with id=${id} not found`);

  res.status(204).send();
};
