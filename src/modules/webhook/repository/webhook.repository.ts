import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  WebhookEvent,
  WebhookEventDocument,
} from '../schema/webhook-event.schema';

import { CreateWebhookEvent } from '../types/create-webhook-event.type';

@Injectable()
export class WebhookRepository {
  constructor(
    @InjectModel(WebhookEvent.name)
    private readonly webhookModel: Model<WebhookEventDocument>,
  ) { }

  async create(
    data: CreateWebhookEvent,
  ): Promise<WebhookEventDocument> {

    return this.webhookModel.create(data);
  }
}