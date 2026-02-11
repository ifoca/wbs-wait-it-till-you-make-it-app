import type { RequestHandler } from 'express';

const notFoundHandler: RequestHandler = (req, res, next) => {
  next(new Error('Path not found', { cause: 404 }));
};

export default notFoundHandler;
