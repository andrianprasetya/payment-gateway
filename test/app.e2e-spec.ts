import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Payment } from '../src/modules/payment/domain/entities/transaction.entity';

describe('PaymentController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/payments (POST) should create a payment', async () => {
    const dto = { orderId: 'ORD123', amount: 1000  };

    const response = await request(app.getHttpServer())
        .post('/payments')
        .send(dto)
        .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.orderId).toBe(dto.orderId);
    expect(response.body.amount).toBe(dto.amount);
    expect(response.body.status).toBe('PENDING');
  });

  it('/payments/:id (GET) should return a payment', async () => {
    const createResponse = await request(app.getHttpServer())
        .post('/payments')
        .send({ orderId: 'ORD-456', amount: 1000 });

    const id = createResponse.body.id;

    const response = await request(app.getHttpServer())
        .get(`/payments/${id}`)
        .expect(200);

    expect(response.body.id).toBe(id);
    expect(response.body.orderId).toBe('ORD-456');
  });
});

