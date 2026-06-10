import { IsNotEmptyObject, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateWebhookDto {
  @IsObject()
  @IsNotEmptyObject()
  payload!: Record<string, unknown>;

  @IsOptional()
  @IsString()
  eventType?: string;
}