import createHttpError from 'http-errors';

const handleUniqueError = (err, req, res, next) => {
  if (err.code === 11000) {
    return next(createHttpError(409, 'Email already exists'));
  }

  next(err);
};

export default handleUniqueError;
