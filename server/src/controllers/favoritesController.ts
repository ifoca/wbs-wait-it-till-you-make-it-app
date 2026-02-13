import type { RequestHandler } from 'express';
import { Favorites, Stations, Users } from '#models';
import { normalizeGermanText } from '#utils';

// Get all favorite stations for a user
export const getFavoritesByUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;

  const user = await Users.findById(userId);
  if (!user) {
    throw new Error('User not found.', { cause: 404 });
  }
  const favorites = await Favorites.find({ userId }).populate('stationId');
  if (favorites.length === 0) {
    throw new Error(`No favorites found for user: ${user.username}`, { cause: 404 });
  }
  return res.status(200).json(favorites);
};

// Add a favorite station to a user
export const addFavorite: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const { cityName, stationName, nickname } = req.body;

  const user = await Users.findById(userId);
  if (!user) {
    throw new Error('User not found.', { cause: 404 });
  }

  // Normalize text to check for duplicates
  const normalizedCity = normalizeGermanText(cityName);
  const normalizedStation = normalizeGermanText(stationName);

  // Check if station is valid
  const station = await Stations.findOne({
    cityNameNormalized: normalizedCity,
    stationNameNormalized: normalizedStation,
  });

  if (!station) {
    throw new Error('Station not found.', { cause: 404 });
  }

  // Check if favorite already exists
  const existingFavorite = await Favorites.findOne({
    userId,
    stationId: station._id,
  });

  if (existingFavorite) {
    return res.status(409).json({
      message: 'Station already in favorites',
    });
  }

  // Create favorite
  const newFavorite = await Favorites.create({
    userId: userId,
    stationId: station._id,
    nickname: nickname?.trim() || station?.stationName,
  });

  // Return with populated station
  const populatedFavorite = await Favorites.findById(newFavorite._id).populate('stationId');

  return res.status(201).json(populatedFavorite);
};

// TO DO create PUT function to update station nickname

// Delete a favorite for a user
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
