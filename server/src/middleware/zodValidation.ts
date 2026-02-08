import type { Request,Response,NextFunction } from "express";
import type { ZodSchema } from "zod/v4";

export const zodValidation =(schema:ZodSchema) => {
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
