import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './interfaces/controllers/payment.controller';
import { PaymentRepositoryImpl } from './infrastructure/repositories/payment.repository.impl';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { GetPaymentUseCase } from './application/use-cases/get-payment.use-case';
import { MarkAsPaidUseCase } from './application/use-cases/mark-as-paid.use-case';
import { PaymentEntity } from './domain/entities/payment.entity';
import {DeletePaymentUseCase} from "./application/use-cases/delete-payment.use-case";
import {AuthModule} from "../../auth/oauth.module";

@Module({
    imports: [TypeOrmModule.forFeature([PaymentEntity]),AuthModule],
    controllers: [PaymentController],
    providers: [
        CreatePaymentUseCase,
        GetPaymentUseCase,
        MarkAsPaidUseCase,
        DeletePaymentUseCase,
        {
            provide: 'PaymentRepository',
            useClass: PaymentRepositoryImpl,
        },
    ],
})
export class PaymentModule {}