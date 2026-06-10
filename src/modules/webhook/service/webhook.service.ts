import { Injectable, Logger } from '@nestjs/common';

import { WebhookRepository } from '../repository/webhook.repository';
import { CreateWebhookEvent } from '../types/create-webhook-event.type';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    private readonly webhookRepository: WebhookRepository,
  ) {}

  async createEvent(data: CreateWebhookEvent) {
    this.logger.log(
      `Received webhook source=${data.source} eventType=${data.eventType ?? 'unknown'}`,
    );

    const result = await this.webhookRepository.create(data);

    this.logger.log(
      `Persisted webhook id=${result.id} source=${result.source}`,
    );

    return {
      message: 'Webhook received successfully',
      id: result.id,
      source: result.source,
      eventType: result.eventType,
      createdAt: result.createdAt,
    };
  }
}