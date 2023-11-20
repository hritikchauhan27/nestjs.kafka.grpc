import * as mongoose from 'mongoose';

export const RestaurantSchema = new mongoose.Schema({
  address: {
    building: String,
    coord: [Number, Number],
    street: String,
    zipcode: String,
  },
  borough: String,
  cuisine: String,
  grades: [
    {
      date: Date,
      grade: String,
      score: Number,
    },
  ],
  name: String,
  restaurant_id: String,
});

export interface Restaurant extends mongoose.Document {
  address: {
    building: string;
    coord: [number, number];
    street: string;
    zipcode: string;
  };
  borough: string;
  cuisine: string;
  grades: IGrade[];
  name: string;
  restaurant_id: string;
}

export interface IGrade {
  date: Date;
  grade: string;
  score: number;
}
