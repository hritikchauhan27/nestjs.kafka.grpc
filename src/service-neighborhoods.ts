import { Injectable } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { NeighborhoodModel } from './model.neighborhood';
import { GetNeighbourResponse } from './protos/neighbor';
import { Neighborhood } from './schema.neighborhood';

@Injectable()
export class NeighborhoodsService {
  constructor(
    private neighborhoodModel: NeighborhoodModel,
  ) { }


  async deleteNeighborhood(conditions: any): Promise<void> {
    try {
      const deleteResult: any = await this.neighborhoodModel.deleteMany(conditions);

      if (deleteResult.deletedCount === 0) {
        throw new Error("No neighborhoods matched the given conditions for deletion.");
      }
    } catch (error) {
      throw new Error(`Error deleting neighborhoods: ${error.message}`);
    }
  }


  async getOneNeighbour(conditions: any): Promise<any> {
    try {
      console.log('inside the getOneNeigh')
      const neighborhood = await this.neighborhoodModel.findOne(conditions);

      if (!neighborhood) {
        throw new Error("Neighborhood not found");
      }

      return neighborhood;
    } catch (error) {
      throw new Error(`Error getting neighborhood: ${error.message}`);
    }
  }

  async getAllNeighbourhoods(): Promise<any[]> {
    try {
      return this.neighborhoodModel.findAll();
    } catch (error) {
      throw new Error(`Error getting all neighborhoods: ${error.message}`);
    }
  }

  async createNeighborhood(data: any): Promise<Neighborhood> {
    try {
      const createdNeighborhood = await this.neighborhoodModel.create(data);
      return createdNeighborhood;
    } catch (error) {
      throw new Error(`Error creating neighborhood: ${error.message}`);
    }
  }
  
}



