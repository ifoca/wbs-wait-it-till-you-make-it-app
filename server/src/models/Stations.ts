import { Schema, model } from 'mongoose';
import { normalizeGermanText, capitalizeCity } from '#utils';

const stationsSchema = new Schema(
  {
    cityName: {
      type: String,
      required: true,
    },
    cityNameNormalized: {
      type: String,
    },
    stationName: {
      type: String,
      required: true,
    },
    stationNameNormalized: {
      type: String,
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

// Pre-save middleware, to automatically normalize the text
// and save the normalized city and station names
stationsSchema.pre('save', function () {
  // Only normalize if cityName or stationName changed
  if (this.isModified('cityName')) {
    this.cityName = capitalizeCity(this.cityName);
    this.cityNameNormalized = normalizeGermanText(this.cityName);
  }
  if (this.isModified('stationName')) {
    this.stationName = capitalizeCity(this.stationName);
    this.stationNameNormalized = normalizeGermanText(this.stationName);
  }
});

stationsSchema.pre('findOneAndUpdate', function () {
  const update = this.getUpdate() as any;

  if (update.cityName) {
    update.cityNameNormalized = normalizeGermanText(update.cityName);
  }
  if (update.stationName) {
    update.stationNameNormalized = normalizeGermanText(update.stationName);
  }
});

stationsSchema.index({ cityNameNormalized: 1, stationNameNormalized: 1 }, { unique: true });

export default model('Stations', stationsSchema);

/*

interface IStation {
  cityName: string;              // "Düsseldorf" - canonical version
  cityNameNormalized: string;    // "Dusseldorf" - for searching
  stationName: string;           // "Spichernplatz" - canonical
  stationNameNormalized: string; // "Spichernplatz" - for searching
}
*/
