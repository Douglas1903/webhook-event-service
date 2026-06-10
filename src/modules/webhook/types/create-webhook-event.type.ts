export type CreateWebhookEvent = {
  source: string;
  eventType?: string;
  payload: Record<string, unknown>;
  headers?: Record<string, unknown>;
};