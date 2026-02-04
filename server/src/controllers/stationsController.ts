import type { RequestHandler } from 'express';
import { Stations } from '#models';
import { normalizeGermanText } from '#utils';

// Get all cities
export const getCities: RequestHandler = async (req, res) => {
  const cities = await Stations.distinct('cityName');

  if (cities.length === 0) {
    return res.status(404).json({ message: 'no city found' });
  }
  return res.status(200).json(cities);
};

// Get Stations for a city
export const getStationsByCity: RequestHandler = async (req, res) => {
  const { cityName } = req.params;

  // Normalize the search query
  const normalizedSearch = normalizeGermanText(cityName);

  // Search using the normalized text and return canonical text
  const stations = await Stations.distinct('stationName', {
    cityNameNormalized: normalizedSearch,
  });
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
    // Normalize text to to check for duplicates
    const normalizedCity = normalizeGermanText(cityName);
    const normalizedStation = normalizeGermanText(stationName);

    // Check if this station already exists
    const existingStation = await Stations.findOne({
      cityNameNormalized: normalizedCity,
      stationNameNormalized: normalizedStation,
    });
    if (existingStation) {
      return res.status(409).json({
        message: `Station "${stationName}" in "${cityName}" already exists`,
        station: existingStation,
      });
    }

    // Create new station (normalization happens automatically
    // via middleware in the Stations Model)
    const newLocation = await Stations.create({
      cityName,
      stationName,
      // cityNameNormalized and stationNameNormalized auto-set saved
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
