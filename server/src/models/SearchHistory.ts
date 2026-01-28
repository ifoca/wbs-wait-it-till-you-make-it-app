import { Schema, model } from 'mongoose';

const searchHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    searchedAt: {
      type: Date,
      default: Date.now,
    },
    successful: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('SearchHistory', searchHistorySchema);
