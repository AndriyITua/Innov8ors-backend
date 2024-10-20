import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { dayId } = req.params;
  if (!isValidObjectId(dayId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};

export const isValidIdUser = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
