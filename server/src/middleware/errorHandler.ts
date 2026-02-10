import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.cause || 500;
  const message = err.message || 'An unexpected error occurred';

  res.status(statusCode).json({ message });
};
export default errorHandler;
