import { Stations } from '#models';
import { normalizeGermanText } from '#utils';

export const saveStation = async (cityName: string, stationName: string) => {
  const normalizedCity = normalizeGermanText(cityName);
  const normalizedStation = normalizeGermanText(stationName);

  const existingStation = await Stations.findOne({
    cityNameNormalized: normalizedCity,
    stationNameNormalized: normalizedStation,
  });

  if (existingStation) {
    return existingStation;
  }

  const newStation = await Stations.create({
    cityName,
    stationName,
  });

  return newStation;
};
