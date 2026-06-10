import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class HealthService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  getHealth() {
    const mongoUp = this.connection.readyState === 1;

    return {
      status: mongoUp ? 'ok' : 'error',
      service: 'webhook-event-service',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: mongoUp ? 'up' : 'down',
      },
    };
  }
}