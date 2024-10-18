import { HttpError } from 'http-errors';

export default function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    const errorResponse = {
      status: err.status,
      message: err.message,
    };

    if (err.errors) {
      errorResponse.errors = err.errors.map((error) => ({
        message: error.message,
        path: error.path,
        type: error.type,
      }));
    }

    res.status(err.status).json(errorResponse);
  } else {
    res.status(500).json({
      status: 500,
      message: err.message || 'Something went wrong',
    });
  }
}
