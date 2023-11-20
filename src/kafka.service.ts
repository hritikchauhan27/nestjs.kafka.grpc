import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'neighbour-client',
        brokers: ['localhost:9092'], 
      },
      consumer: {
        groupId: 'neighborhood-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('neighborhood.created'); 
    await this.client.connect();
  }
}
