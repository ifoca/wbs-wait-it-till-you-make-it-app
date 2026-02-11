import { type RequestHandler } from 'express';
import { Types } from 'mongoose';

export const validateObjectId = (paramName: string = 'id'): RequestHandler => {
  return (req, res, next) => {
    const value = req.params[paramName] || req.body[paramName];

    if (typeof value !== 'string') {
      return res.status(400).json({
        message: `Missing or invalid ${paramName}`,
      });
    }

    if (!Types.ObjectId.isValid(value)) {
      return res.status(400).json({
        message: `Invalid ${paramName} format`,
      });
    }

    next();
  };
};

export default validateObjectId;
