import createHttpError from 'http-errors';
import {
  updateWaterRate,
  addWaterConsumption,
  updateWaterConsumption,
  deleteWaterConsumption,
} from '../services/water.js';

import WaterCollection from '../db/models/Water.js';
import WaterRateCollection from '../db/models/WaterRate.js';

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

export const getTodayWaterController = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const waterRecords = await WaterCollection.find({
      createdAt: { $gte: today },
    });

    if (waterRecords.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No water consumption records for today',
      });
    }

    const waterRate = await WaterRateCollection.findOne();
    const dailyRate = waterRate ? waterRate.dailyRate : 1500;

    // count total + %
    const totalConsumed = waterRecords.reduce(
      (acc, record) => acc + record.amount,
      0,
    );
    const percentage = Math.round((totalConsumed / dailyRate) * 100);

    res.status(200).json({
      status: 200,
      message: 'Water consumption for today',
      data: {
        totalConsumed,
        dailyRate,
        percentage,
        records: waterRecords,
      },
    });
  } catch (error) {
    throw createHttpError(500, 'Internal server error');
  }
};

export const getMonthWaterController = async (req, res) => {
  try {
    const { year, month } = req.params;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const waterRecords = await WaterCollection.find({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    if (waterRecords.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No water consumption records for the selected month',
      });
    }

    const waterRate = await WaterRateCollection.findOne();
    const dailyRate = waterRate ? waterRate.dailyRate : 1500;

    // Group data per day
    const dailyData = {};
    waterRecords.forEach((record) => {
      const day = record.createdAt.getDate();
      if (!dailyData[day]) dailyData[day] = { totalConsumed: 0, count: 0 };
      dailyData[day].totalConsumed += record.amount;
      dailyData[day].count += 1;
    });

    const result = Object.entries(dailyData).map(([day, data]) => ({
      date: `${day}, ${startDate.toLocaleString('default', { month: 'long' })}`,
      dailyRate,
      percentage: Math.round((data.totalConsumed / dailyRate) * 100),
      consumptionCount: data.count,
    }));

    res.status(200).json({
      status: 200,
      message: `Water consumption for ${startDate.toLocaleString('default', {
        month: 'long',
      })}`,
      data: result,
    });
  } catch (error) {
    throw createHttpError(500, 'Internal server error');
  }
};
