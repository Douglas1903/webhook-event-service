import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('WebhookController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
                forbidNonWhitelisted: true,
            }),
        );

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should accept webhook successfully', async () => {
        const response = await request(app.getHttpServer())
            .post('/webhooks/github')
            .send({
                payload: {
                    eventType: 'push.created',
                    data: { repo: 'test' },
                },
            })
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Webhook received successfully');
        expect(response.body.source).toBe('github');
    });

    it('should return 400 when payload is missing', async () => {
        await request(app.getHttpServer())
            .post('/webhooks/github')
            .send({})
            .expect(400);
    });

    it('should return 400 when payload is not an object', async () => {
        const response = await request(app.getHttpServer())
            .post('/webhooks/github')
            .send({
                payload: 'invalid',
            });

        expect(response.status).toBe(400);
    });
});