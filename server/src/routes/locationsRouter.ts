import { Router } from 'express';
import { getCities, getStationsByCity, createStationForCity } from '#controllers';

const locationsRouter = Router();

//stations
locationsRouter.get('/cities', getCities); // used for search suggestions
locationsRouter.get('/:cityName/stations', getStationsByCity); // used for search suggestions

// To do:
locationsRouter.post('/', createStationForCity);

export default locationsRouter;
