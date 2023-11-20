import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantModel } from './model.restaurant';
import { Restaurant } from './schema.restaurant';
import { KafkaService } from './kafka.service'; // Import KafkaService from the neighborhoods-service
import { MessagePattern } from '@nestjs/microservices';
import * as geolib from 'geolib';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly restaurantModel: RestaurantModel,
    private readonly kafkaService: KafkaService, // Inject KafkaService
  ) {}

  async createRestaurant(restaurantData: any): Promise<Restaurant> {
    return this.restaurantModel.create(restaurantData);  }

  async findAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantModel.findAll();
  }       
  
  
  
  async calculateDistance(lat1: number, lon1: number, restaurant: Restaurant): Promise<number> {
    const lon2: number = restaurant.address.coord[0];
    const lat2: number = restaurant.address.coord[1];

    const point1 = { latitude: lat1, longitude: lon1 };
    const point2 = { latitude: lat2, longitude: lon2 };

    const distance = geolib.getDistance(point1, point2);

    return distance;
  }
  

  async getRestaurantInfo(resID:any): Promise<Restaurant>{
    return this.restaurantModel.findOne({restaurant_id:resID});
  }

  async deleteRestaurant(resID: any): Promise<void> {
    const restaurant = await this.restaurantModel.findOne({ restaurant_id: resID });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    await this.restaurantModel.delete({ restaurant_id: resID });
  }

  @MessagePattern('neighborhood.created') // Listen for 'neighborhood.created' Kafka messages
  updateRestaurantOnNeighborhoodCreated(neighborhood: any) {
    // Implement your logic to update the restaurant when a new neighborhood is created
    console.log('Received neighborhood created event:', neighborhood);
    // Example: Update a restaurant when a new neighborhood is created
    this.updateRestaurant(neighborhood);
  }


  // Implement your logic to update the restaurant when a new neighborhood is created
  async updateRestaurant(neighborhood: any) {    // Your update logic here
  }
}
