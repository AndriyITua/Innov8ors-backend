import { UserCollection } from '../db/models/User.js';
import WaterCollection from '../db/models/Water.js';

export const updateWaterRate = async (filter, data) => {
  const rawResult = await UserCollection.findOneAndUpdate(filter, data, {
    returnDocument: 'after',
  });

  if (!rawResult) return null;

  return rawResult;
};

export const addWaterConsumption = async (data) => {
  const record = await WaterCollection.create(data);
  return WaterCollection.findById(record._id).select('-createdAt -updatedAt');
};

export const updateWaterConsumption = async (filter, data) => {
  const updatedRecord = await WaterCollection.findOneAndUpdate(filter, data, {
    new: true,
  }).select('-createdAt -updatedAt');

  return updatedRecord;
};

export const deleteWaterConsumption = async (filter) =>
  WaterCollection.findOneAndDelete(filter);
