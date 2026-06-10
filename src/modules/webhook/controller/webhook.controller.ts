import {
  Body,
  Controller,
  Headers,
  Param,
  Post,
} from '@nestjs/common';
import { WebhookService } from '../service/webhook.service';
import { CreateWebhookDto } from '../dto/create-webhook.dto';



@Controller('webhooks')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
  ) {}

  @Post(':source')
  async receiveWebhook(
    @Param('source') source: string,
    @Body() body: CreateWebhookDto,
    @Headers() headers: Record<string, unknown>,
  ) {
    return this.webhookService.createEvent({
      source,
      payload: body.payload,
      headers,
    });
  }
}