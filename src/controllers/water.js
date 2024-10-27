import createHttpError from 'http-errors';
import {
  updateWaterRate,
  addWaterConsumption,
  updateWaterConsumption,
  deleteWaterConsumption,
} from '../services/water.js';

import WaterCollection from '../db/models/Water.js';

import { UserCollection } from '../db/models/User.js';

export const updateWaterRateController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await updateWaterRate({ _id: userId }, req.body);

  res.json({
    status: 200,
    message: 'Water rate upsert successfully!',
    data: { dailynormwater: data.dailynormwater },
  });
};

export const addWaterConsumptionController = async (req, res) => {
  const { _id: userId } = req.user;
  const record = await addWaterConsumption({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a water record!',
    data: record,
  });
};

export const updateWaterConsumptionController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { amount, consumptionTime } = req.body;
  const data = await updateWaterConsumption(
    { _id: id, userId },
    { amount, consumptionTime },
  );

  if (!data) throw createHttpError(404, `Water record with id=${id} not found`);

  res.json({
    status: 200,
    message: 'Successfully edited water record!',
    data,
  });
};

export const deleteWaterConsumptionController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteWaterConsumption({ _id: id, userId });

  if (!data) throw createHttpError(404, `Water record with id=${id} not found`);

  res.status(204).send();
};

export const getTodayWaterController = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const waterRecords = await WaterCollection.find({
      userId: userId,
      createdAt: { $gte: today },
    });

    if (waterRecords.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No water consumption records for today',
      });
    }

    const user = await UserCollection.findById(userId);
    const dailyRate = user.dailynormwater || 1500;

    const totalConsumed = waterRecords.reduce(
      (acc, record) => acc + record.amount,
      0,
    );
    let percentage = Math.round((totalConsumed / dailyRate) * 100);

    if (percentage > 100) percentage = 100;

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
  } catch {
    throw createHttpError(500, 'Internal server error');
  }
};

export const getMonthWaterController = async (req, res) => {
  try {
    const { year, month } = req.params;
    const { _id: userId } = req.user;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const waterRecords = await WaterCollection.find({
      userId,
      createdAt: { $gte: startDate, $lt: endDate },
    });

    if (waterRecords.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'No water consumption records for the selected month',
      });
    }

    const user = await UserCollection.findById(userId);
    const dailyRate = user.dailynormwater || 1500;

    const dailyData = {};
    waterRecords.forEach((record) => {
      const day = record.createdAt.getDate();
      if (!dailyData[day]) dailyData[day] = { totalConsumed: 0, count: 0 };
      dailyData[day].totalConsumed += record.amount;
      dailyData[day].count += 1;
    });

    const result = Object.entries(dailyData).map(([day, data]) => {
      let percentage = Math.round((data.totalConsumed / dailyRate) * 100);
      if (percentage > 100) percentage = 100;

      return {
        date: `${day}, ${startDate.toLocaleString('default', {
          month: 'long',
        })}`,
        dailyRate,
        percentage,
        consumptionCount: data.count,
      };
    });

    res.status(200).json({
      status: 200,
      message: `Water consumption for ${startDate.toLocaleString('default', {
        month: 'long',
      })}`,
      data: result,
    });
  } catch {
    throw createHttpError(500, 'Internal server error');
  }
};
