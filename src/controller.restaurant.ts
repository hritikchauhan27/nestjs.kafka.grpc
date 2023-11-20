import { Controller, Get, Post, Headers, Body, OnModuleInit, Inject, Response, Res, HttpStatus, Delete } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Coordinates, GetNeighbourRequest, GetNeighbourResponse, NEIGHBOUR_SERVICE_NAME, createNeighbourRequest, createNeighbourResponse, neighbourServiceClient } from './protos/neighbor';
import { Observable } from 'rxjs';
import { log } from 'console';
import { RestaurantService } from './service-restaurant';
import { Restaurant } from './schema.restaurant';

@Controller('restaurants')
export class RestaurantController implements OnModuleInit {
  private svc: neighbourServiceClient;

  @Inject(NEIGHBOUR_SERVICE_NAME)
  private readonly client: ClientGrpc

  constructor(private readonly restaurantService: RestaurantService) { }

  public onModuleInit(): void {
    this.svc = this.client.getService<neighbourServiceClient>(NEIGHBOUR_SERVICE_NAME);
  }



  @Post('createRes')
  async createRestaurant(@Body() restaurantData: any, @Res() response: any): Promise<void> {
    try {
      const createdRestaurant = await this.restaurantService.createRestaurant(restaurantData);
      response.status(201).json({
        message: 'Restaurant created successfully',
        restaurant: createdRestaurant,
      });
    } catch (error) {
      response.status(500).json({
        message: 'Error creating restaurant',
        error: error.message,
      });
    }
  }

  @Delete('deleteRes')
  async deleteRestaurant(@Headers('resId') resId: string, @Res() response: any): Promise<void> {
    try {
      await this.restaurantService.deleteRestaurant(resId);
      response.status(200).json({
        message: 'Restaurant deleted successfully',
      });
    } catch (error) {
      response.status(500).json({
        message: 'Error deleting restaurant',
        error: error.message,
      });
    }
  }

  @Get('getOneRes')
  async getOneRestaurant(@Headers('resId') resId: string, @Res() response: any): Promise<void> {
    try {
      const restaurant = await this.restaurantService.getRestaurantInfo(resId);
      response.status(200).json({
        message: 'Restaurant retrieved successfully',
        restaurant,
      });
    } catch (error) {
      response.status(404).json({
        message: 'Restaurant not found',
        error: error.message,
      });
    }
  }

  @Get()
  async findAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantService.findAllRestaurants();
  }

  @Get('neighbor')
  async getneighbor(
    @Headers('resId') resId: string,
    @Body() body: GetNeighbourRequest,
    @Res() Response
  ): Promise<GetNeighbourResponse> {
    const response: GetNeighbourResponse = await this.svc.getNeighbour(body).toPromise();

    const coordinates: Coordinates | undefined = response.coordinates;

    if (coordinates) {
      console.log('Latitude:', coordinates.latitude);
      const lat1 = coordinates.latitude;
      console.log('Longitude:', coordinates.longitude);
      const lon1 = coordinates.longitude;
      var restaurant: Restaurant = await this.restaurantService.getRestaurantInfo(resId);
      if (restaurant) {
        var distance = await this.restaurantService.calculateDistance(lat1, lon1, restaurant);
        distance = distance / 1000;
        console.log('Distance between restaurant and response:', distance, 'meters');
      } else {
        console.log('Restaurant not found.');
      }
    } else {
      console.log('No coordinates found in the response.');
    }


    return Response.status(200).json({
      message: `Neighbourhood ${response.name} is present at distance ${distance}km from restaurant ${restaurant.name}`,
      response
    });
  }


  // @GrpcMethod('RestaurantService', 'GetRestaurantCoordinates')
  // async getOneNeighborhoods(@Body() resID: any) {
  //   console.log("inside grpc get restaurant info method --------------")
  //   const neighborhoods = await this.restaurantService.getRestaurantInfo(resID);
  //   return neighborhoods;
  // }

}





