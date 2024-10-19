import WaterRateCollection from '../db/models/WaterRate.js';
import WaterCollection from '../db/models/Water.js';

export const updateWaterRate = async (data) => {
  const rawResult = await WaterRateCollection.updateOne({}, data, {
    upsert: true,
  });

  if (!rawResult) return null;

  return {
    data,
    isNew: Boolean(rawResult.upsertedCount),
  };
};

export const addWaterConsumption = (amount) => WaterCollection.create(amount);

export const updateWaterConsumption = async (filter, newAmount) => {
  const updatedRecord = await WaterCollection.findByIdAndUpdate(
    filter,
    { amount: newAmount },
    { new: true },
  );

  return updatedRecord;
};

export const deleteWaterConsumption = async (filter) =>
  WaterCollection.findByIdAndDelete(filter);
