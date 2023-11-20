import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schema.restaurant';

@Injectable()
export class RestaurantModel {
  constructor(@InjectModel('restaurant') private readonly model: Model<Restaurant>) {}

  async create(data: any): Promise<Restaurant> {
    const createdRestaurant = new this.model(data);
    return createdRestaurant.save();
  }

  async findAll(): Promise<Restaurant[]> {
    return this.model.find().exec();
  }

  async findOne(conditions: any): Promise<Restaurant | null> {
    return this.model.findOne(conditions).exec();
  }

  async delete(conditions: any): Promise<void> {
    await this.model.deleteOne(conditions).exec();
  }
}
