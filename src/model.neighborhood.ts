import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Neighborhood } from './schema.neighborhood';

@Injectable()
export class NeighborhoodModel {
  constructor(@InjectModel('neighborhood') private readonly model: Model<Neighborhood>) {}

  async create(data: any): Promise<Neighborhood> {
    const createdNeighborhood = new this.model(data);
    return createdNeighborhood.save();
  }

  async findAll(): Promise<Neighborhood[]> {
    return this.model.find().exec();
  }

  async findOne(conditions: any): Promise<Neighborhood | null> {
    return this.model.findOne(conditions).exec();
  }

  async deleteMany(conditions: any): Promise<void> {
    await this.model.deleteMany(conditions).exec();
  }
}
