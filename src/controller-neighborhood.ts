import { Controller, Post, Body, Get, Inject, Delete, Res, HttpCode, HttpException } from '@nestjs/common';
import { NeighborhoodsService } from './service-neighborhoods';
import { GrpcMethod } from '@nestjs/microservices';
import { Coordinates, GetNeighbourResponse, NEIGHBOUR_SERVICE_NAME, createNeighbourRequest, createNeighbourResponse, neighbourServiceController } from './protos/neighbor';
import { log } from 'console';

@Controller('neighborhoods')
export class NeighborhoodsController {
  constructor(
    @Inject(NeighborhoodsService)
    private readonly service: NeighborhoodsService) { }

  @Post('createNeighbourhood')
  async createNeighbourhood(@Body() neighborhoodData: any, @Res() response: any): Promise<void> {
    try {
      const createdNeighbourhood = await this.service.createNeighborhood(neighborhoodData);
      response.status(201).json({
        message: 'Neighborhood created successfully',
        neighborhood: createdNeighbourhood,
      });
    } catch (error) {
      response.status(500).json({
        message: 'Error creating neighborhood',
        error: error.message,
      });
    }
  }

  @Delete('deleteNeighbour')
  @HttpCode(200)
  async deleteNeighborhood(payload: any) {
    try {
      await this.service.deleteNeighborhood(payload);
      return { message: 'Neighborhood deleted successfully' };
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          error: `Error deleting neighborhood: ${error.message}`,
        },
        500,
      );
    }
  }

  @Get('getAllNeighbourhoods')
  async getAllNeighbourhoods(): Promise<any[]> {
    try {
      return this.service.getAllNeighbourhoods();
    } catch (error) {
      throw new Error(`Error getting all neighborhoods: ${error.message}`);
    }
  }

  @GrpcMethod(NEIGHBOUR_SERVICE_NAME, 'getNeighbour')
  async getOneNeighbour(conditions: any): Promise<GetNeighbourResponse> {
    try {
      console.log('inside the getOneNeigh');
      const neighborhood = await this.service.getOneNeighbour(conditions);

      if (!neighborhood) {
        throw new Error('Neighborhood not found');
      }

      const coordinates: Coordinates = {
        latitude: neighborhood.geometry.coordinates[1],
        longitude: neighborhood.geometry.coordinates[0],
      };

      const response: GetNeighbourResponse = {
        id: neighborhood.id,
        name: neighborhood.name,
        coordinates: coordinates,
      };
      log(response, "inside neighbour grpc method-----------")
      return response;
    } catch (error) {
      throw new Error(`Error getting neighborhood: ${error.message}`);
    }
  }
}

