import type { RequestHandler } from 'express';
import { Stations } from '#models';
import { normalizeGermanText, replaceUmlauts } from '#utils';
import { DEPARTURES_API } from '#config';
import type { DeparturesResponse } from '#types';
// import type { StationsSchema } from '#schemas';

// Get all locations
export const getAllLocations: RequestHandler = async (req, res) => {
  const locations = await Stations.find({});

  if (locations.length === 0) {
    return res.status(404).json({ message: 'No locations found' });
  }
  return res.status(200).json(locations);
};

// Get all cities
export const getCities: RequestHandler = async (req, res) => {
  const cities = await Stations.distinct('cityName');

  if (cities.length === 0) {
    return res.status(404).json({ message: 'no city found' });
  }
  return res.status(200).json(cities);
};

// Get Stations for a city
export const getStationsByCity: RequestHandler<{ cityName: string }> = async (req, res) => {
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
    // Normalize text to check for duplicates
    const normalizedCity = normalizeGermanText(cityName);
    const normalizedStation = normalizeGermanText(stationName);

    // Check if this station already exists
    const existingStation = await Stations.findOne({
      cityNameNormalized: normalizedCity,
      stationNameNormalized: normalizedStation,
    });
    if (existingStation) {
      return res.status(409).json({
        message: `Station ${stationName} in ${cityName} already exists`,
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

export const getDepartures: RequestHandler<{ cityName: string; stationName: string }> = async (
  req,
  res,
) => {
  const departuresApi = DEPARTURES_API;
  let apiRequest;
  const { cityName, stationName } = req.params;

  if (!cityName || !stationName) {
    return res.status(400).json({
      message: 'Invalid request. cityName and stationName are required',
    });
  }

  const normalizedCity = normalizeGermanText(cityName);
  const normalizedStation = normalizeGermanText(stationName);
  const cityNameNoUmlauts = replaceUmlauts(cityName);
  const stationNameNoUmlauts = replaceUmlauts(stationName);

  const exists = await Stations.findOne({ cityNameNoUmlauts, stationNameNoUmlauts });
  if (exists) {
    // city and station without umlauts exists in the database
    // so we make the request with the normalized names
    apiRequest = await fetch(
      `${departuresApi}/${exists.cityNameNormalized}/${exists.stationNameNormalized}.json`,
    );
  } else {
    // city and station without umlauts does not exists in the database
    // so we normalized the user's input and perform a search
    apiRequest = await fetch(`${departuresApi}/${normalizedCity}/${normalizedStation}.json`);
  }

  if (!apiRequest.ok) {
    throw new Error('Could not get departures from the external API');
  }

  const departures = (await apiRequest.json()) as DeparturesResponse;

  if (departures.error !== null) {
    return res.status(404).json({ error: departures.error });
  }
  if (departures.raw.length === 0) {
    return res.status(404).json({ error: `No departures found for ${cityName}, ${stationName}.` });
  }

  // Filter out past departures
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const futureDepartures = departures.raw.filter((dep: any) => {
    const [hours, minutes] = dep.sched_time.split(':').map(Number);
    const depMinutes = hours * 60 + minutes;
    return depMinutes >= currentMinutes;
  });

  return res.status(200).json(futureDepartures);
};

// TO DO: add logic to hit the endpoint to make sure it is up and running
// check that GET https://vrrf.finalrewind.org/ is returning a 200 OK
// try {
//   if (!externalDeparturesApi) throw new Error('Missing link to the external API');
// } catch (error) {
//   console.error('External API connection error:', error);
//   process.exit(1);
// }

/*
Case 1
  user searches Düsseldorf
    text is normalized to duesseldorf
      api request made for duesseldorf
        response is returned with results

    ! name saved without umlaut Dusseldorf in the database

Case 2
  user searches duesseldorf
    text is normalized to duesseldorf (no change)
      api request made to duesseldorf
        response is returned with results

Case 3
  user searches for Dusseldorf
    text is normalized to dusseldorf
      api request made to dusseldorf
        response is returned with No results
        ! but error === null
    
    i need to check if we have dusseldorf in the database as no umlauts


*/
