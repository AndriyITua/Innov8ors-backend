import { UserCollection } from '../db/models/User.js';
import WaterCollection from '../db/models/Water.js';

export const updateWaterRate = async (filter, data) => {
  const rawResult = await UserCollection.findOneAndUpdate(filter, data, {
    includeResultMetadata: true,
    upsert: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
  };
};

export const addWaterConsumption = (amount) => WaterCollection.create(amount);

export const updateWaterConsumption = async (filter, newAmount) => {
  const updatedRecord = await WaterCollection.findOneAndUpdate(
    filter,
    { amount: newAmount },
    { new: true },
  );

  return updatedRecord;
};

export const deleteWaterConsumption = async (filter) =>
  WaterCollection.findOneAndDelete(filter);
