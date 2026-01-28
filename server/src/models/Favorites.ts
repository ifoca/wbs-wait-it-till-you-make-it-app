import { Schema, model } from 'mongoose';

const favoritesSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    stationId: {
      type: Schema.Types.ObjectId,
      ref: 'Stations',
      required: true,
    },
    nickname: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default model('Favorites', favoritesSchema);
