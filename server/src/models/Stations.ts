import { Schema, model } from 'mongoose';
import { normalizeGermanText } from '#utils';

const stationsSchema = new Schema(
  {
    cityName: {
      type: String,
      required: true,
    },
    cityNameNormalized: {
      type: String,
      required: false,
    },
    stationName: {
      type: String,
      required: true,
    },
    stationNameNormalized: {
      type: String,
      required: false,
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
    this.cityNameNormalized = normalizeGermanText(this.cityName);
  }
  if (this.isModified('stationName')) {
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

export default model('Stations', stationsSchema);

/*

interface IStation {
  cityName: string;              // "Düsseldorf" - canonical version
  cityNameNormalized: string;    // "dusseldorf" - for searching
  stationName: string;           // "Spichernplatz" - canonical
  stationNameNormalized: string; // "spichernplatz" - for searching
}
*/
