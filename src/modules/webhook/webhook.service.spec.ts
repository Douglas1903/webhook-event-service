import { Test, TestingModule } from '@nestjs/testing';
import { WebhookService } from './service/webhook.service';
import { WebhookRepository } from './repository/webhook.repository';

describe('WebhookService', () => {
    let service: WebhookService;

    const repositoryMock = {
        create: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WebhookService,
                {
                    provide: WebhookRepository,
                    useValue: repositoryMock,
                },
            ],
        }).compile();

        service = module.get<WebhookService>(WebhookService);

        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a webhook event', async () => {
        const payload = {
            eventType: 'user.created',
            data: { id: 1 },
        };

        const input = {
            source: 'github',
            eventType: payload.eventType,
            payload,
        };

        repositoryMock.create.mockResolvedValue({
            id: '123',
            source: 'github',
            eventType: payload.eventType,
            payload,
            createdAt: new Date(),
        });

        const result = await service.createEvent(input);

        expect(repositoryMock.create).toHaveBeenCalledWith(
            expect.objectContaining({
                source: 'github',
                eventType: 'user.created',
                payload,
                status: 'success',
            }),
        );
        expect(result).toBeDefined();
        expect(result.id).toBe('123');
    });

    it('should handle missing eventType', async () => {
        const input = {
            source: 'github',
            payload: {
                data: { id: 1 },
            },
        };

        repositoryMock.create.mockResolvedValue({
            id: '456',
            source: 'github',
            payload: input.payload,
            createdAt: new Date(),
        });

        const result = await service.createEvent(input);

        expect(repositoryMock.create).toHaveBeenCalledWith(
            expect.objectContaining({
                source: 'github',
                payload: input.payload,
                status: 'success',
            }),
        );
        expect(result.id).toBe('456');
    });

    it('should call repository with the expected data', async () => {
        const data = {
            source: 'github',
            payload: {
                foo: 'bar',
            },
        };

        repositoryMock.create.mockResolvedValue({
            id: '123',
            source: 'github',
            payload: data.payload,
            createdAt: new Date(),
        });

        await service.createEvent(data);

        expect(repositoryMock.create).toHaveBeenCalledWith(
            expect.objectContaining({
                source: 'github',
                payload: data.payload,
            }),
        );
    });
});