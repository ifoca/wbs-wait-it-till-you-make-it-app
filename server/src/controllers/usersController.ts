import type { RequestHandler } from 'express';
import { Users } from '#models';

export const getUsers: RequestHandler = async (req, res) => {
  const users = await Users.find();
  if (!users) {
    throw new Error('Something went wrong, could not get users', { cause: 404 });
  }
  return res.status(200).json(users);
};
// get user by id 


export const getUserById: RequestHandler =async(req,res)=>{
  const user = await Users.findById(req.params.id);
  if (!user){
    throw new Error('user not found', { cause: 404 });

  }
  return res.status(200).json(user);
};

//post register user

export const registerUser:RequestHandler= async(req, res)=>{
  const user =await Users.create(req.body);
  if (!user){
    throw new Error('User registration failed', {cause:400});
  }
  return res.status(201).json({message:'User registered successfully'});
};


//post login user

export const loginUser:RequestHandler = async(req,res)=>{
  const {email, password}=req.body;
  const user =await Users.findOne({email, password});
  if (!user || user.password !== password){
    throw new Error( 'invalid email or password',{cause:401});
    // we all need to handle token here 
  }
  return res.status(200).json({message:'login successfully'});
}

//post logout user

export const logoutUser:RequestHandler = async(req ,res)=>{
  // we need to hand token here
  return res.status(200).json({message:'logged out successfully'})
}

// delete user
 
export const deleteUser:RequestHandler = async(req,res)=>{
  const user =await Users.findByIdAndDelete(req.params.id);
  if (!user){
    throw new Error ('user not registered or found',{cause:404});
  }
  return  res.status(200).json({message:'account deleted successfully'})
};