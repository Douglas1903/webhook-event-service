import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  WebhookEvent,
  WebhookEventSchema,
} from './schema/webhook-event.schema';

import { WebhookRepository } from './repository/webhook.repository';
import { WebhookService } from './service/webhook.service';
import { WebhookController } from './controller/webhook.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: WebhookEvent.name,
        schema: WebhookEventSchema,
      },
    ]),
  ],
  controllers: [WebhookController],
  providers: [
    WebhookRepository,
    WebhookService,
  ],
})
export class WebhookModule {}