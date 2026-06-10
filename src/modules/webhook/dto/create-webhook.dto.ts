import { IsObject } from 'class-validator';

export class CreateWebhookDto {
  @IsObject()
  payload!: Record<string, unknown>;
}