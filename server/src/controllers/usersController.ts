import type { RequestHandler, CookieOptions } from 'express';
import { Users } from '#models';
import { ACCESS_JWT_SECRET, SALT_ROUNDS } from '#config';
import bcrypt from 'bcryptjs';
import jwt, { type JwtPayload } from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: isProduction ? 'none' : 'lax',
};

// get all users
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
  // email check using exist
  const userAlreadyExists = await Users.exists({ email });
  if (userAlreadyExists) {
    throw new Error('User already all have an account', { cause: 409 });
  }
  const theSaltRounds = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, theSaltRounds);

  const user = await Users.create({
    username,
    email,
    password: hashedPassword,
  });
  const theUserToken = jwt.sign({ USER_ID: user._id }, ACCESS_JWT_SECRET, { expiresIn: '10d' });

  // we need to to remove password from the response.
  // and we will use 'const userObj = user.toObject() as Partial<UserType>
  //delete userObj.password;

  res.cookie('token', theUserToken, cookieOptions);

  return res
    .status(201)
    .json({ message: 'your account was successfully created', token: theUserToken });
};

//post login user
export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const userAlreadyExists = await Users.exists({ email });
  if (Users.length === 0) {
    throw new Error('email is not registered', { cause: 404 });
  }
  const user = await Users.findOne({ email }).select('+password');
  if (!user) {
    return res
      .status(401)
      .json({ message: 'invalid email or password, please create and account' });
  }
  const isTheLoginPasswordValid = await bcrypt.compare(password, user.password);
  if (!isTheLoginPasswordValid) {
    return res.status(400).json({ message: 'incorrect credentials ' });
  }
  const theUserToken = jwt.sign({ USER_ID: user._id }, ACCESS_JWT_SECRET, { expiresIn: '10d' });

  res.cookie('token', theUserToken, cookieOptions);
  return res.status(200).json({ message: 'login successfully', token: theUserToken });
};

//post logout user
export const logoutUser: RequestHandler = async (req, res) => {
  res.clearCookie('token', cookieOptions);
  return res.status(200).json({ message: 'Logged out successfully' });
};

// delete user
export const deleteUser: RequestHandler = async (req, res) => {
  const userWithToken = req.userId;
  const userWithParams = req.params.id;
  if (userWithToken !== userWithParams) {
    return res.status(403).json({ message: 'unauthorize user' });
  }
  const user = await Users.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new Error('User not registered or found', { cause: 404 });
  }
  return res.status(200).json({ message: 'Account deleted successfully' });
};

export const getCurrentUser: RequestHandler = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const payload = jwt.verify(token, ACCESS_JWT_SECRET) as JwtPayload;
    const user = await Users.findById(payload.USER_ID).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
