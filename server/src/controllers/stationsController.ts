import type { RequestHandler } from 'express';
import { Stations } from '#models';
import { normalizeGermanText } from '#utils';

// Get all cities
export const getCities: RequestHandler = async (req, res) => {
  const cities = await Stations.distinct('cityName');

  if (!cities) {
    return res.status(404).json({ message: 'no city found' });
  }
  return res.status(200).json(cities);
};

// Get Stations for a city
export const getStationsByCity: RequestHandler = async (req, res) => {
  try {
    const { cityName } = req.params;
  } catch {}

  // Normalize the search query
  const normalizedSearch = normalizeGermanText(cityName); // "duesseldorf"

  // Search using the normalized text
  const stations = await Stations.find({
    cityNameNormalized: normalizedSearch,
  })
    .distinct('stationName') // returns only the station names, not everything
    .lean();
  // .sort({ searchCount: -1 })  Can be added in the future to sort for the most popular station
  // .limit(10);  Can be added in the future to limit the number of stations we get

  if (stations.length === 0) {
    return res.status(404).json({ message: `No stations found for city: ${cityName}` });
  }
  return res.status(200).json(stations);
};

// Create a station for a city
export const createStationForCity: RequestHandler = async (req, res) => {
  try {
    const { cityName, stationName } = req.body;
    // Check that city and station name are not empty
    if (!cityName || !stationName) {
      return res.status(400).json({
        message: 'Invalid request. cityName and stationName are required',
      });
    }
    // Normalize (to check for duplicates)
    const normalizedCity = normalizeGermanText(cityName);
    const normalizedStation = normalizeGermanText(stationName);

    // Check if this station already exists
    const existingStation = await Stations.findOne({
      cityNameNormalized: normalizedCity,
      stationNameNormalized: normalizedStation,
    });
    if (existingStation) {
      return res.status(409).json({
        // 409 = Conflict
        message: `Station "${stationName}" in "${cityName}" already exists`,
        station: existingStation,
      });
    }

    // Create new station (normalization happens automatically via middleware)
    const newLocation = await Stations.create({
      cityName,
      stationName,
      // cityNameNormalized and stationNameNormalized auto-set by middleware!
    });
    return res.status(201).json({
      message: 'Location added successfully',
      station: newLocation,
    });
  } catch (error) {
    console.error('Error creating station:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
