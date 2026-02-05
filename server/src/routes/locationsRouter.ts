import { Router } from 'express';
import { getCities, getStationsByCity, createStationForCity, getDepartures } from '#controllers';

const locationsRouter = Router();

//stations
locationsRouter.get('/cities', getCities); // used for search suggestions
locationsRouter.get('/:cityName/stations', getStationsByCity); // used for search suggestions
locationsRouter.post('/add', createStationForCity);
locationsRouter.get('/:cityName/:stationName/departures', getDepartures);

// To do:
// ? endpoint to update the locations ?
export default locationsRouter;
