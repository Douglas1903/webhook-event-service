import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
    HydratedDocument,
    Schema as MongooseSchema,
} from 'mongoose';

export type WebhookEventDocument = HydratedDocument<WebhookEvent & {
    createdAt: Date;
    updatedAt: Date;
}>;

@Schema({
    timestamps: true,
})
export class WebhookEvent {
    @Prop({
        required: true,
        index: true,
    })
    source!: string;

    @Prop({
        required: false,
        index: true,
    })
    eventType?: string;

    @Prop({
        type: MongooseSchema.Types.Mixed,
        required: true,
    })
    payload!: Record<string, unknown>;

    @Prop({
        type: MongooseSchema.Types.Mixed,
        required: false,
    })
    headers?: Record<string, unknown>;
}

export const WebhookEventSchema =
    SchemaFactory.createForClass(WebhookEvent);