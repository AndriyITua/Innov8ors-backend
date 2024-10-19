import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      max: 5000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const WaterCollection = model('water', waterSchema);

export default WaterCollection;
