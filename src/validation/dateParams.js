import createHttpError from 'http-errors';

export const validateDateParams = (req, res, next) => {
  const { year, month } = req.params;

  const yearNumber = Number(year);
  const monthNumber = Number(month);

  if (!/^\d{4}$/.test(year)) {
    return next(createHttpError(400, 'Year must be a 4-digit number'));
  }

  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return next(
      createHttpError(400, 'Month must be a number between 1 and 12'),
    );
  }

  next();
};
