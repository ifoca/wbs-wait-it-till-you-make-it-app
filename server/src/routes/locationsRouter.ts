import { Router } from 'express';
import { getCities, getStationsByCity } from '#controllers';


const locationsRouter= Router()
//stations
locationsRouter.get('/cities',getCities)
locationsRouter.get('/stations',getStationsByCity)

export default locationsRouter