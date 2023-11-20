import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './controller.restaurant';
import { RestaurantService } from './service-restaurant';
import { KafkaModule } from './kafka.module';
import { RestaurantSchema } from './schema.restaurant';
import { RestaurantModel } from './model.restaurant';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { NEIGHBOUR_SERVICE_NAME } from './protos/neighbor';

@Module({
  imports: [
    ClientsModule.register([
      {
      name: NEIGHBOUR_SERVICE_NAME,
      transport: Transport.GRPC,
      options:{
        package:'neighbour',
        protoPath: '/home/admin2437/Desktop/restaurant.microservice/src/protos/neighbor.proto',
        url:'localhost:50051',
      },
    },
    ]),
    KafkaModule,
    MongooseModule.forFeature([{ name: 'restaurant', schema: RestaurantSchema}]),
    MongooseModule.forRoot('mongodb+srv://hritikchauhan:Appinventiv123@cluster0.8uqcptq.mongodb.net/sample_restaurants'),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService,RestaurantModel],
})
export class AppModule {}
