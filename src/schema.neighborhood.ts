import * as mongoose from 'mongoose';

export const NeighborhoodSchema = new mongoose.Schema({
  geometry: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  name: String,
});

export interface Neighborhood extends mongoose.Document {
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  name: string;
}
