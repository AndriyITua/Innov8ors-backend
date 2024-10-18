import waterRateCollection from '../db/models/WaterRate.js';

export const updateWaterRate = async (data) => {
  const rawResult = await waterRateCollection.updateOne({}, data, {
    upsert: true,
  });

  if (!rawResult) return null;

  return {
    data,
    isNew: Boolean(rawResult.upsertedCount),
  };
};
