import type { RequestHandler, CookieOptions } from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Users } from '#models';
import {ACCESS_JWT_SECRET, SALT_ROUNDS,} from '#config';


const isProduction =process.env.NODE_ENV === 'production';
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'none'
};
// get all users
export const getUsers: RequestHandler = async (req, res) => {
  const users = await Users.find();
  if (!users) {
    throw new Error('Something went wrong, could not get users', { cause: 404 });
  };
  return res.status(200).json(users);
};
// get user by id 
export const getUserById: RequestHandler =async(req,res)=>{
  const user = await Users.findById(req.params.id);
  if (!user){
    throw new Error('user not found', { cause: 404 });
  };
  return res.status(200).json(user);
};
//post register user
export const registerUser:RequestHandler= async(req, res)=>{
 const {username,email,password}=req.body
 const userAlreadyExists = await Users.exists({email});
 if (userAlreadyExists){
  throw new Error ('user already have an account',{cause:409});
 }
 const theSaltRounds = await bcrypt.genSalt(SALT_ROUNDS);
 const hashedPassword = await bcrypt.hash(password,theSaltRounds);
const user = await Users.create({
  username,
  email,
  password:hashedPassword
});
const theUserToken = jwt.sign({USER_ID: user._id}, ACCESS_JWT_SECRET, { expiresIn: '10d' });

// we need to to remove password from the response.
// and we will use 'const userObj = user.toObject() as Partial<UserType>
//delete userObj.password;

res.cookie('token', theUserToken, cookieOptions);

 return res.status(201).json({ message: 'your account was successfully created', token: theUserToken});
};

//post login user
export const loginUser:RequestHandler = async(req,res)=>{
  const {email,password} = req.body;
  const userAlreadyExists = await Users.exists({email});
 if (!userAlreadyExists){
  throw new Error ('email is not registered' ,{cause :404});
 }
  const user = await Users.findOne({email}).select('+password');
  if (!user){
    return res.status(401).json({message: 'invalid email or password, please create and account'});
  }
  const isTheLoginPasswordValid = await bcrypt.compare(password, user.password);
  if (!isTheLoginPasswordValid) {
    return res.status(400).json({message: 'incorrect credentials '});
  }
  const theUserToken = jwt.sign({USER_ID: user._id}, ACCESS_JWT_SECRET, { expiresIn: '10d' });

  res.cookie('token', theUserToken, cookieOptions)
  return res.status(200).json({message: 'login successfully', token: theUserToken});
};

//post logout user

export const logoutUser:RequestHandler = async(req ,res)=>{

  res.clearCookie('token', cookieOptions);
  return res.status(200).json({message:'logged out successfully'})
}
 // delete user
 
export const deleteUser:RequestHandler = async(req,res)=>{

  const userWithToken = req.userId;
  const userWithParams = req.params.id;
  if (userWithToken !== userWithParams){
    return res.status(403).json({message: 'unauthorize user'})
  }
  const user = await Users.findByIdAndDelete(req.params.id);
  if (!user){
    return res.status(404).json ({message:'user not registered or found'});
  }
  res.clearCookie('token', cookieOptions);
  return  res.status(200).json({message:'account deleted successfully'})
};