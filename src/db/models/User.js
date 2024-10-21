import { Schema, model } from 'mongoose';

import { emailRegexp } from '../../constants/users.js';

import { handleSaveError, setUpdateOptions } from './hooks.js';

export const userSchema = new Schema(
  {
    username: {
      type: String,
      // required: true,
    },
    gender: {
      type: String,
      enum: ['woman', 'man'],
      default: 'woman',
      // required: true,
    },
    email: {
      type: String,
      unique: true,
      match: emailRegexp,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 64,
    },
    dailynormwater: {
      type: Number,
      default: 15000,
      min: 0,
    },
    userphoto: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateOptions);

userSchema.post('findOneAndUpdate', handleSaveError);

export const UserCollection = model('user', userSchema);
