import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NeighborhoodsService } from './service-neighborhoods';
import { KafkaModule } from './kafka.module';
import { NeighborhoodsController } from './controller-neighborhood';
import { NeighborhoodSchema } from './schema.neighborhood';
import { NeighborhoodModel } from './model.neighborhood';

@Module({
  imports: [
    KafkaModule,
    MongooseModule.forFeature([{ name: 'neighborhood', schema: NeighborhoodSchema }]),
    MongooseModule.forRoot('mongodb+srv://hritikchauhan:Appinventiv123@cluster0.8uqcptq.mongodb.net/sample_restaurants'),
    
    ],  
  controllers: [NeighborhoodsController],
  providers: [NeighborhoodsService, NeighborhoodModel],                  
})
export class AppModule {}