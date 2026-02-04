import type { RequestHandler } from 'express';
import { Users } from '#models';
import { ACCESS_JWT_SECRET, SALT_ROUNDS } from '#config';
import bcrypt from 'bcryptjs';

export const getUsers: RequestHandler = async (req, res) => {
  const users = await Users.find();
  if (!users) {
    throw new Error('Something went wrong, could not get users', { cause: 404 });
  }
  return res.status(200).json(users);
};

// get user by id
export const getUserById: RequestHandler = async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    throw new Error('User not found', { cause: 404 });
  }
  return res.status(200).json(user);
};

//post register user

export const registerUser: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if email is used already
  const userAlreadyExists = await Users.exists({ email });
  if (userAlreadyExists) {
    throw new Error('User already exists', { cause: 409 });
  }

  const theSaltRounds = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, theSaltRounds);

  const user = await Users.create({
    username,
    email,
    password: hashedPassword,
  });
  return res.status(201).json({ message: 'User registered successfully' });
  //if (!user){
  // throw new Error('User registration failed', {cause:400});
  //}
};

//post login user
export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email, password }).select('+password');
  if (!user || user.password !== password) {
    //throw new Error( 'invalid email or password',{cause:401});
    return res.status(401).json({ message: 'Invalid email or password' });

    // we all need to handle token here
  }
  return res.status(200).json({ message: 'Logged in successfully' });
};

//post logout user
export const logoutUser: RequestHandler = async (req, res) => {
  //res.clearCookie
  // we need to hand token here
  return res.status(200).json({ message: 'Logged out successfully' });
};

// delete user
export const deleteUser: RequestHandler = async (req, res) => {
  const user = await Users.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new Error('User not registered or found', { cause: 404 });
  }
  return res.status(200).json({ message: 'Account deleted successfully' });
};
