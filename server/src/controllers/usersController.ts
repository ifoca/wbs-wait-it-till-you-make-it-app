import type { RequestHandler } from 'express';
import { Users } from '#models';

export const getUsers: RequestHandler = async (req, res) => {
  const users = await Users.find();
  if (!users) {
    throw new Error('Something went wrong, could not get users', { cause: 404 });
  }
  return res.status(200).json(users);
};
