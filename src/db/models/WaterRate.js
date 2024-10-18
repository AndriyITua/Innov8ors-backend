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

const waterRateCollection = model('waterRate', waterRateSchema);

export default waterRateCollection;
