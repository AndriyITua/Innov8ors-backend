import { Schema, model } from 'mongoose';

const waterRateSchema = new Schema(
  {
    dailyRate: {
      type: Number,
      required: true,
      max: 15000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const WaterRateCollection = model('waterRate', waterRateSchema);

export default WaterRateCollection;
