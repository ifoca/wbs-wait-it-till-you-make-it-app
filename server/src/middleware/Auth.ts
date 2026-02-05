import type { RequestHandler } from "express";
import Jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET } from "#config";

declare global {
   namespace Express {
      interface Request {
         userId?: string;
      }
   }
}

export const Auth: RequestHandler = async (req, res, next) => {
   try {
      const token = req.cookies?.token;
      if (!token) {
         return res.status(401).json({ message: "Not authorized" });
      }

      const verified = Jwt.verify(token, ACCESS_JWT_SECRET) as { USER_ID?: string };
      if (!verified || !verified.USER_ID) {
         return res.status(401).json({ message: "Invalid token" });
      }

      req.userId = String(verified.USER_ID);
      return next();
   } catch (err) {
      return res.status(401).json({ message: "Authentication failed" });
   }
};