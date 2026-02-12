import { Router } from 'express';
import {
  getCities,
  getStationsByCity,
  createStationForCity,
  getDepartures,
  getAllLocations,
} from '#controllers';
import { zodValidation } from '#middleware';
import { stationInputSchema } from '#schemas';

const locationsRouter = Router();

//stations
locationsRouter.get('/all', getAllLocations);
locationsRouter.get('/cities', getCities); // used for search suggestions
locationsRouter.get('/:cityName/stations', getStationsByCity); // used for search suggestions
locationsRouter.post('/add', zodValidation(stationInputSchema), createStationForCity);
locationsRouter.get('/:cityName/:stationName/departures', getDepartures);

// To do:
// ? endpoint to update the locations ?
export default locationsRouter;
