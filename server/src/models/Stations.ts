import { Schema, model } from 'mongoose';

const stationsSchema = new Schema(
  {
    cityName: {
      type: String,
      required: true,
    },
    stationName: {
      type: String,
      required: true,
    },
    searchCount: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    aliasNames: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default model('Stations', stationsSchema);

/*

interface IStation {
  cityName: string;              // "Düsseldorf" - canonical version
  cityNameNormalized: string;    // "dusseldorf" - for searching
  stationName: string;           // "Spichernplatz" - canonical
  stationNameNormalized: string; // "spichernplatz" - for searching
}
*/
