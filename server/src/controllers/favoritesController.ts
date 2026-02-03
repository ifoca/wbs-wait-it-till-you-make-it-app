import type { RequestHandler } from 'express';
import { Favorites } from '#models';

// To Add a station to favorites
//Post the favorite station
export const addFavorite: RequestHandler = async (req, res) => {
  try {
    const { userId, stationId, nickName } = req.body;
    // if already on the favorites list
    const existingFavorite = await Favorites.findOne({ userId, stationId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Station already in the favorites list' });
    }
    // creating a new favorite
    const favorites = await Favorites.create({ userId, stationId, nickname: nickName });
    return res.status(201).json({ message: 'Station added to the favorite list' });
  } catch (error) {
    return res.status(500).json({ message: 'server error,please try again later' });
  }
};

// Get all favorite stations  for a user
export const getFavoritesByUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorites.find({ userId }).populate('stationId');
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ message: 'server error, please try again later' });
  }
};

//Delete a favorite station
export const deleteFavorite: RequestHandler = async (req, res) => {
  try {
    const { userId, stationId } = req.params;
    const favorite = await Favorites.findOneAndDelete({ userId, stationId });
    if (!favorite) {
      return res.status(404).json({ message: 'favorite station not found or already deleted' });
    }
    if (favorite) {
      return res.status(200).json({
        message:
          'you have remove the station from your favorites list and you can add it back again  whenever you want',
      });
    }
  } catch (error) {
    return res.status(500).json({ message: ' server error, failed to delete favorite station' });
  }
};
