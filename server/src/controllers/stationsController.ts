import type { RequestHandler } from 'express';
import { Stations } from '#models';

// Get all cities
export const getCities: RequestHandler = async (req, res) => {
  const cities = await Stations.find({}).select('cityName');

  if (!cities) {
    return res.status(404).json({ message: 'no city found' });
  }
  return res.status(200).json(cities);
};

// Get Stations for a city
export const getStationsByCity: RequestHandler = async (req, res) => {
  const { cityName } = req.params;
  const stations = await Stations.find({ cityName })
    .select('stationName') // returns only the station names, not everything
    .lean();
  // .sort({ searchCount: -1 })  Can be added in the future to sort for the most popular station
  // .limit(10);  Can be added in the future to limit the number of stations we get
  if (stations.length === 0) {
    return res.status(404).json({ message: `No stations found for city: ${cityName}` });
  }
  return res.status(200).json(stations);
};

// Create a station for a city
export const createStationForCity: RequestHandler = async (req, res) => {};
