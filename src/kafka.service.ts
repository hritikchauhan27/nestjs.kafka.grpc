import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafka-client',
        brokers: ['localhost:9092'], 
      },
      consumer: {
        groupId: 'restaurant-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('neighborhood.created'); 
    await this.client.connect();
  }
}
