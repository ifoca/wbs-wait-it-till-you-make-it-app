import type { Request,Response,NextFunction } from "express";
import  { z } from "zod";

export const zodValidation =(schema:z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message:'validation failed', 
        detail:result.error});
    }

    req.body = result.data;
    next();
  };
};
export default zodValidation;
