import { Module } from '@nestjs/common';
import { HealthService } from './service/health.service';
import { HealthController } from './controller/health.controler';

@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}