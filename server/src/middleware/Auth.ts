import type { RequestHandler } from "express";
import type { JwtPayload } from "jsonwebtoken";
import   Jwt  from "jsonwebtoken";
import { ACCESS_JWT_SECRET } from "#config";



export const Auth: RequestHandler =async(req, res, next) =>{
 const {token}=req.cookies;

 if (!token){
    return res.status(401).json({message: 'your are not authorized,try to login first'}); 
 }
 try{
 const payload  = Jwt.verify(token, ACCESS_JWT_SECRET)as JwtPayload;
    req.userId = payload.USER_ID;
    next();
 }catch(error){
   return  res.status(401).json({message: 'invalid token, try to login again'});
 }
};
export default Auth;